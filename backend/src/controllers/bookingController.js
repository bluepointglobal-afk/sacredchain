import Booking from '../models/Booking.js';
import Teacher from '../models/Teacher.js';
import Enrollment from '../models/Enrollment.js';
import { asyncHandler } from '../middleware/error.js';
import { sendMail, templates } from '../utils/mailer.js';
import crypto from 'crypto';

function roomName(teacherSlug, userId) {
  return `sk-${teacherSlug}-${userId.toString().slice(-6)}-${crypto.randomBytes(3).toString('hex')}`;
}

// POST /api/bookings  (auth)
export const createBooking = asyncHandler(async (req, res) => {
  const { teacherSlug, day, time, startAt, sessionType, notes, isTrial, bundleSlug } = req.body;
  const teacher = await Teacher.findOne({ slug: teacherSlug });
  if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

  const trial = isTrial !== false;
  const price = trial ? 0 : teacher.price;
  const start = startAt ? new Date(startAt) : null;

  // Conflict check: prevent double-booking the same teacher at the same start time.
  if (start) {
    const windowStart = new Date(start.getTime() - 59 * 60 * 1000);
    const windowEnd = new Date(start.getTime() + 59 * 60 * 1000);
    const clash = await Booking.findOne({
      teacher: teacher._id,
      status: { $in: ['pending', 'confirmed'] },
      startAt: { $gt: windowStart, $lt: windowEnd },
    });
    if (clash) return res.status(409).json({ error: 'That time slot is no longer available. Please pick another.' });
  }

  const booking = await Booking.create({
    user: req.user._id,
    teacher: teacher._id,
    bundleSlug: bundleSlug || null,
    day,
    time,
    startAt: start,
    sessionType: sessionType || 'video',
    notes,
    isTrial: trial,
    price,
    roomName: roomName(teacher.slug, req.user._id),
    paymentStatus: price > 0 ? 'pending' : 'none',
    status: 'confirmed',
  });

  const when = [day, time].filter(Boolean).join(' at ') || 'your chosen time';
  const tpl = templates.bookingConfirmed(teacher.name, when);
  sendMail({ to: req.user.email, ...tpl }).catch(() => {});

  res.status(201).json({ booking });
});

// GET /api/bookings  (auth)
export const listMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('teacher', 'name slug photo short')
    .sort({ createdAt: -1 });
  res.json({ bookings });
});

// GET /api/bookings/:id/room  (auth) — returns Jitsi room info if the user owns the booking
export const getRoom = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('teacher', 'name slug photo');
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  const isOwner = booking.user.toString() === req.user._id.toString();
  const isTeacher = req.user.teacherProfile && booking.teacher?._id?.toString() === req.user.teacherProfile.toString();
  if (!isOwner && !isTeacher && req.user.role !== 'admin') return res.status(403).json({ error: 'Not your session' });

  if (!booking.roomName) {
    booking.roomName = roomName(booking.teacher.slug, booking.user);
    await booking.save();
  }
  res.json({
    room: booking.roomName,
    displayName: req.user.name,
    teacher: booking.teacher,
    subject: booking.bundleSlug || 'Lesson',
  });
});

// GET /api/enrollments (auth)
export const listEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ enrollments });
});
