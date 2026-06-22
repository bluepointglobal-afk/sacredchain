import Application from '../models/Application.js';
import { asyncHandler } from '../middleware/error.js';

// POST /api/applications/teacher — "Become a teacher" application
export const applyTeacher = asyncHandler(async (req, res) => {
  const { name, email, phone, gender, bio, specialties } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
  const application = await Application.create({
    kind: 'teacher',
    name,
    email,
    phone,
    gender,
    bio,
    specialties: specialties || [],
  });
  res.status(201).json({ ok: true, application });
});
