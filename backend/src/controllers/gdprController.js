import { asyncHandler } from '../middleware/error.js';
import Booking from '../models/Booking.js';
import Enrollment from '../models/Enrollment.js';
import JournalEntry from '../models/JournalEntry.js';
import User from '../models/User.js';

// GET /api/account/export  (auth) — full data export (GDPR Art. 20)
export const exportData = asyncHandler(async (req, res) => {
  const [bookings, enrollments, journal] = await Promise.all([
    Booking.find({ user: req.user._id }).lean(),
    Enrollment.find({ user: req.user._id }).lean(),
    JournalEntry.find({ user: req.user._id }).lean(),
  ]);
  res.setHeader('Content-Disposition', 'attachment; filename="sacred-knowledge-data.json"');
  res.json({
    exportedAt: new Date().toISOString(),
    account: req.user.toSafeJSON(),
    bookings,
    enrollments,
    journal,
  });
});

// DELETE /api/account  (auth) — erase account and personal data (GDPR Art. 17)
export const deleteAccount = asyncHandler(async (req, res) => {
  const uid = req.user._id;
  await Promise.all([
    Booking.deleteMany({ user: uid }),
    Enrollment.deleteMany({ user: uid }),
    JournalEntry.deleteMany({ user: uid }),
  ]);
  await User.findByIdAndDelete(uid);
  res.json({ ok: true, deleted: true });
});
