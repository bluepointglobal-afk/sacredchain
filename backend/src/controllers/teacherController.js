import Teacher from '../models/Teacher.js';
import { asyncHandler } from '../middleware/error.js';

// GET /api/teachers  — supports ?q=&subject=&gender=&language=&track=&weekend=&featured=
export const listTeachers = asyncHandler(async (req, res) => {
  const { q, subject, gender, language, track, weekend, featured } = req.query;
  const filter = {};

  if (subject && subject !== 'all') filter.subjects = subject;
  if (gender && gender !== 'all') filter.gender = gender;
  if (language && language !== 'all') filter.languages = language;
  if (track && track !== 'all') filter.track = track;
  if (weekend === 'true') filter.weekend = true;
  if (featured === 'true') filter.featured = true;

  if (q && q.trim()) {
    const rx = new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [{ name: rx }, { short: rx }, { specialties: rx }, { subjects: rx }, { country: rx }];
  }

  const teachers = await Teacher.find(filter).sort({ featured: -1, rating: -1 });
  res.json({ count: teachers.length, teachers });
});

// GET /api/teachers/:slug
export const getTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findOne({ slug: req.params.slug });
  if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
  res.json({ teacher });
});
