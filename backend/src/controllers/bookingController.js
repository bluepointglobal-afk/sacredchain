import Booking from '../models/Booking.js';
import Teacher from '../models/Teacher.js';
import { asyncHandler } from '../middleware/error.js';

// POST /api/bookings  (auth)
export const createBooking = asyncHandler(async (req, res) => {
  const { teacherSlug, day, time, sessionType, notes, isTrial, bundleSlug } = req.body;
  const teacher = await Teacher.findOne({ slug: teacherSlug });
  if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

  const booking = await Booking.create({
    user: req.user._id,
    teacher: teacher._id,
    bundleSlug: bundleSlug || null,
    day,
    time,
    sessionType: sessionType || 'video',
    notes,
    isTrial: isTrial !== false,
    price: isTrial !== false ? 0 : teacher.price,
    status: 'confirmed',
  });

  res.status(201).json({ booking });
});

// GET /api/bookings  (auth) — current user's bookings
export const listMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('teacher', 'name slug photo short')
    .sort({ createdAt: -1 });
  res.json({ bookings });
});
