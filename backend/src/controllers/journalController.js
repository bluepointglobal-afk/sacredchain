import JournalEntry from '../models/JournalEntry.js';
import { asyncHandler } from '../middleware/error.js';
import { learningContent } from '../seed/data.js';

// GET /api/journal  (auth)
export const listEntries = asyncHandler(async (req, res) => {
  const entries = await JournalEntry.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ entries, duas: learningContent.duas });
});

// POST /api/journal  (auth)
export const createEntry = asyncHandler(async (req, res) => {
  const { body, private: isPrivate, session, teacher, tags } = req.body;
  if (!body || !body.trim()) return res.status(400).json({ error: 'body is required' });
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const entry = await JournalEntry.create({
    user: req.user._id,
    date: today,
    session: session || 'Quran Memorization · Surah Al-Mulk (Session 8)',
    teacher: teacher || 'Sheikh Ahmad Al-Nouri',
    private: isPrivate !== false,
    body: body.trim(),
    tags: tags && tags.length ? tags : ['reflection'],
  });
  res.status(201).json({ entry });
});

// DELETE /api/journal/:id  (auth)
export const deleteEntry = asyncHandler(async (req, res) => {
  const entry = await JournalEntry.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!entry) return res.status(404).json({ error: 'Entry not found' });
  res.json({ ok: true });
});
