import { asyncHandler } from '../middleware/error.js';
import { scholarComplete } from '../utils/ai.js';

// POST /api/ai/chat  (auth)
// body: { messages: [{ role: 'user'|'assistant', text }] }
export const chat = asyncHandler(async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }
  const { text, model } = await scholarComplete(messages);
  res.json({ reply: text, model });
});
