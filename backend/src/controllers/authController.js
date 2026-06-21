import User from '../models/User.js';
import { signToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/error.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, onboarding } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ error: 'An account with this email already exists' });

  const user = new User({
    name,
    first: name.split(' ')[0],
    email,
    onboarding: onboarding || {},
  });
  await user.setPassword(password);
  await user.save();

  const token = signToken(user);
  res.status(201).json({ token, user: user.toSafeJSON() });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const ok = await user.verifyPassword(password);
  if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

  const token = signToken(user);
  res.json({ token, user: user.toSafeJSON() });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
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
