import User from '../models/User.js';
import { asyncHandler } from '../middleware/error.js';
import {
  signAccessToken, signRefreshToken, verifyRefresh, randomToken, hashToken,
  REFRESH_COOKIE, refreshCookieOptions,
} from '../utils/tokens.js';
import { sendMail, templates } from '../utils/mailer.js';
import env from '../config/env.js';
import crypto from 'crypto';

const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1000;

async function issueSession(res, user) {
  // rotate: create a refresh record
  const jti = crypto.randomUUID();
  const refreshToken = signRefreshToken(user, jti);
  user.refreshTokens.push({ jti, hash: hashToken(refreshToken), expiresAt: new Date(Date.now() + REFRESH_TTL_MS) });
  // keep at most 5 active sessions
  if (user.refreshTokens.length > 5) user.refreshTokens = user.refreshTokens.slice(-5);
  await user.save();
  res.cookie(REFRESH_COOKIE, refreshToken, refreshCookieOptions());
  return signAccessToken(user);
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, onboarding } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ error: 'An account with this email already exists' });

  const user = new User({ name, first: name.split(' ')[0], email, onboarding: onboarding || {} });
  await user.setPassword(password);

  // email verification token
  const verifyTok = randomToken();
  user.verifyTokenHash = hashToken(verifyTok);
  await user.save();

  const url = `${env.clientOrigin}/verify-email?token=${verifyTok}&id=${user._id}`;
  const tpl = templates.verify(url);
  sendMail({ to: user.email, ...tpl }).catch(() => {});

  const token = await issueSession(res, user);
  res.status(201).json({ token, user: user.toSafeJSON() });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const ok = await user.verifyPassword(password);
  if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

  const token = await issueSession(res, user);
  res.json({ token, user: user.toSafeJSON() });
});

// Exchange a valid refresh cookie for a new access token (with rotation).
export const refresh = asyncHandler(async (req, res) => {
  const cookie = req.cookies?.[REFRESH_COOKIE];
  if (!cookie) return res.status(401).json({ error: 'No refresh token' });

  let payload;
  try {
    payload = verifyRefresh(cookie);
  } catch {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }

  const user = await User.findById(payload.sub);
  if (!user) return res.status(401).json({ error: 'Invalid refresh token' });

  const record = user.refreshTokens.find((t) => t.jti === payload.jti);
  if (!record || record.hash !== hashToken(cookie)) {
    // token reuse / unknown — revoke all as a precaution
    user.refreshTokens = [];
    await user.save();
    return res.status(401).json({ error: 'Refresh token revoked' });
  }

  // rotate out the old record
  user.refreshTokens = user.refreshTokens.filter((t) => t.jti !== payload.jti);
  const token = await issueSession(res, user);
  res.json({ token, user: user.toSafeJSON() });
});

export const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies?.[REFRESH_COOKIE];
  if (cookie) {
    try {
      const payload = verifyRefresh(cookie);
      const user = await User.findById(payload.sub);
      if (user) {
        user.refreshTokens = user.refreshTokens.filter((t) => t.jti !== payload.jti);
        await user.save();
      }
    } catch { /* ignore */ }
  }
  res.clearCookie(REFRESH_COOKIE, { ...refreshCookieOptions(), maxAge: undefined });
  res.json({ ok: true });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token, id } = req.body;
  const user = await User.findById(id);
  if (!user || !user.verifyTokenHash || user.verifyTokenHash !== hashToken(token || '')) {
    return res.status(400).json({ error: 'Invalid or expired verification link' });
  }
  user.emailVerified = true;
  user.verifyTokenHash = null;
  await user.save();
  res.json({ ok: true, user: user.toSafeJSON() });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  // Always respond 200 to avoid account enumeration
  if (user) {
    const tok = randomToken();
    user.resetTokenHash = hashToken(tok);
    user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1h
    await user.save();
    const url = `${env.clientOrigin}/reset-password?token=${tok}&id=${user._id}`;
    const tpl = templates.reset(url);
    sendMail({ to: user.email, ...tpl }).catch(() => {});
  }
  res.json({ ok: true });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password, id } = req.body;
  const user = id ? await User.findById(id) : null;
  if (!user || !user.resetTokenHash || user.resetTokenHash !== hashToken(token) || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired reset link' });
  }
  await user.setPassword(password);
  user.resetTokenHash = null;
  user.resetTokenExpires = null;
  user.refreshTokens = []; // log out other sessions
  await user.save();
  res.json({ ok: true });
});

export const updateOnboarding = asyncHandler(async (req, res) => {
  const { pathway, answers, completed } = req.body;
  req.user.onboarding = {
    pathway: pathway ?? req.user.onboarding?.pathway ?? null,
    answers: answers ?? req.user.onboarding?.answers ?? {},
    completed: completed ?? req.user.onboarding?.completed ?? false,
  };
  await req.user.save();
  res.json({ user: req.user.toSafeJSON() });
});

export const toggleFavourite = asyncHandler(async (req, res) => {
  const { teacherId } = req.body;
  if (!teacherId) return res.status(400).json({ error: 'teacherId is required' });
  const idx = req.user.favourites.findIndex((f) => f.toString() === teacherId);
  if (idx >= 0) req.user.favourites.splice(idx, 1);
  else req.user.favourites.push(teacherId);
  await req.user.save();
  res.json({ favourites: req.user.favourites });
});

export const listFavourites = asyncHandler(async (req, res) => {
  await req.user.populate('favourites');
  res.json({ favourites: req.user.favourites });
});
