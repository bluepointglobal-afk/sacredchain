import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import env from '../config/env.js';

export function signAccessToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

export function signRefreshToken(user, tokenId) {
  return jwt.sign({ sub: user._id.toString(), jti: tokenId }, env.refreshSecret, {
    expiresIn: env.refreshExpiresIn,
  });
}

export function verifyAccess(token) {
  return jwt.verify(token, env.jwtSecret);
}

export function verifyRefresh(token) {
  return jwt.verify(token, env.refreshSecret);
}

export function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export const REFRESH_COOKIE = 'sk_refresh';

export function refreshCookieOptions() {
  const maxAgeMs = 30 * 24 * 60 * 60 * 1000; // 30d
  return {
    httpOnly: true,
    secure: env.isProd,
    sameSite: env.isProd ? 'none' : 'lax',
    domain: env.cookieDomain,
    path: '/api/auth',
    maxAge: maxAgeMs,
  };
}
