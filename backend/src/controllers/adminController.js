import Application from '../models/Application.js';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import { asyncHandler } from '../middleware/error.js';

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

// GET /api/admin/applications?kind=teacher|brief&status=
export const listApplications = asyncHandler(async (req, res) => {
  const { kind, status } = req.query;
  const filter = {};
  if (kind) filter.kind = kind;
  if (status) filter.status = status;
  const applications = await Application.find(filter).sort({ createdAt: -1 });
  res.json({ applications });
});

// POST /api/admin/applications/:id/approve — turn a teacher application into a Teacher + user role
export const approveApplication = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).json({ error: 'Application not found' });
  if (app.kind !== 'teacher') {
    app.status = 'accepted';
    await app.save();
    return res.json({ application: app });
  }

  // build a unique slug
  let base = slugify(app.name || 'teacher');
  let slug = base;
  let i = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await Teacher.findOne({ slug })) slug = `${base}-${i++}`;

  const teacher = await Teacher.create({
    slug,
    name: app.name,
    short: (app.specialties || [])[0] || 'Islamic Studies Teacher',
    title: (app.specialties || []).join(' · '),
    gender: app.gender,
    bio: app.bio,
    specialties: app.specialties || [],
    subjects: app.specialties || [],
    price: 20,
    rating: 5,
    reviews: 0,
    languages: ['English'],
    active: true,
  });

  // link to a user account if one exists with the same email
  const user = await User.findOne({ email: (app.email || '').toLowerCase() });
  if (user) {
    user.role = 'teacher';
    user.teacherProfile = teacher._id;
    await user.save();
    teacher.user = user._id;
    await teacher.save();
  }

  app.status = 'accepted';
  await app.save();
  res.json({ application: app, teacher });
});

// POST /api/admin/applications/:id/reject
export const rejectApplication = asyncHandler(async (req, res) => {
  const app = await Application.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  if (!app) return res.status(404).json({ error: 'Application not found' });
  res.json({ application: app });
});

// GET /api/admin/stats
export const stats = asyncHandler(async (req, res) => {
  const [users, teachers, bookings, pending] = await Promise.all([
    User.countDocuments(),
    Teacher.countDocuments(),
    Booking.countDocuments(),
    Application.countDocuments({ status: 'submitted' }),
  ]);
  res.json({ users, teachers, bookings, pendingApplications: pending });
});
