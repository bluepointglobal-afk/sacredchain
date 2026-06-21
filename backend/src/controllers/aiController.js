import { asyncHandler } from '../middleware/error.js';
import { scholarComplete } from '../utils/ai.js';
import AiUsage from '../models/AiUsage.js';

const DAILY_LIMIT = parseInt(process.env.AI_DAILY_LIMIT || '50', 10);

// POST /api/ai/chat  (auth)
// body: { messages: [{ role: 'user'|'assistant', text }] }
export const chat = asyncHandler(async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }
  if (messages.length > 40) {
    return res.status(400).json({ error: 'Conversation is too long' });
  }

  // per-user daily cap
  const day = new Date().toISOString().slice(0, 10);
  const usage = await AiUsage.findOneAndUpdate(
    { user: req.user._id, day },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
  if (usage.count > DAILY_LIMIT) {
    return res.status(429).json({ error: `Daily AI limit reached (${DAILY_LIMIT} messages). Please try again tomorrow, in sha' Allah.` });
  }

  const { text, model } = await scholarComplete(messages.slice(-20));
  res.json({ reply: text, model, remaining: Math.max(0, DAILY_LIMIT - usage.count) });
});
