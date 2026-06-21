import Teacher from '../models/Teacher.js';
import Booking from '../models/Booking.js';
import { asyncHandler } from '../middleware/error.js';

// GET /api/teachers  — supports ?q=&subject=&gender=&language=&track=&weekend=&featured=
export const listTeachers = asyncHandler(async (req, res) => {
  const { q, subject, gender, language, track, weekend, featured } = req.query;
  const filter = { active: { $ne: false } };

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

// ---- Teacher self-service (role: teacher) ----

// GET /api/teacher/me
export const myTeacherProfile = asyncHandler(async (req, res) => {
  if (!req.user.teacherProfile) return res.status(404).json({ error: 'No teacher profile linked to this account' });
  const teacher = await Teacher.findById(req.user.teacherProfile);
  res.json({ teacher });
});

// PUT /api/teacher/me — update own profile + availability slots
export const updateMyProfile = asyncHandler(async (req, res) => {
  if (!req.user.teacherProfile) return res.status(404).json({ error: 'No teacher profile linked to this account' });
  const allowed = ['title', 'short', 'bio', 'price', 'languages', 'specialties', 'slots'];
  const update = {};
  for (const k of allowed) if (req.body[k] !== undefined) update[k] = req.body[k];
  const teacher = await Teacher.findByIdAndUpdate(req.user.teacherProfile, { $set: update }, { new: true });
  res.json({ teacher });
});

// GET /api/teacher/bookings — bookings for the logged-in teacher
export const myTeacherBookings = asyncHandler(async (req, res) => {
  if (!req.user.teacherProfile) return res.status(404).json({ error: 'No teacher profile linked to this account' });
  const bookings = await Booking.find({ teacher: req.user.teacherProfile })
    .populate('user', 'name email')
    .sort({ startAt: 1, createdAt: -1 });
  res.json({ bookings });
});
