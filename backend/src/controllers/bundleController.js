import Bundle from '../models/Bundle.js';
import Teacher from '../models/Teacher.js';
import { asyncHandler } from '../middleware/error.js';

// GET /api/bundles — supports ?subject=&level=&price= (low|mid|high)
export const listBundles = asyncHandler(async (req, res) => {
  const { subject, level, price } = req.query;
  const filter = {};
  if (subject && subject !== 'all') filter.subject = subject;
  if (level && level !== 'all') filter.level = level;
  if (price === 'low') filter.price = { $lt: 400 };
  else if (price === 'mid') filter.price = { $gte: 400, $lte: 550 };
  else if (price === 'high') filter.price = { $gt: 550 };

  const bundles = await Bundle.find(filter).sort({ featured: -1, rating: -1 });
  const teachers = await Teacher.find({ slug: { $in: bundles.map((b) => b.teacherSlug) } });
  const bySlug = Object.fromEntries(teachers.map((t) => [t.slug, t]));

  const enriched = bundles.map((b) => ({
    ...b.toObject(),
    teacher: bySlug[b.teacherSlug]
      ? { name: bySlug[b.teacherSlug].name, photo: bySlug[b.teacherSlug].photo, slug: bySlug[b.teacherSlug].slug }
      : null,
  }));
  res.json({ count: enriched.length, bundles: enriched });
});

// GET /api/bundles/:slug
export const getBundle = asyncHandler(async (req, res) => {
  const bundle = await Bundle.findOne({ slug: req.params.slug });
  if (!bundle) return res.status(404).json({ error: 'Bundle not found' });
  const teacher = await Teacher.findOne({ slug: bundle.teacherSlug });
  res.json({ bundle, teacher });
});
