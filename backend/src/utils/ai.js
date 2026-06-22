// AI Scholar Companion — calls the Anthropic Claude API when ANTHROPIC_API_KEY is set,
// otherwise returns a graceful, on-brand fallback so the UI keeps working.

const PERSONA =
  'You are the AI Scholar Companion for Sacred Knowledge, an Islamic learning platform. ' +
  'You help students understand Quran, Hadith, Aqeedah, Fiqh, Arabic and Islamic history. ' +
  'Be warm, concise and respectful, grounded in mainstream Sunni scholarship. ' +
  'Cite a source (surah or hadith collection) where relevant. Keep replies to 2-3 short paragraphs. ' +
  'Gently note when a question truly needs a qualified local scholar.';

const FALLBACK =
  'As-salamu alaykum. I can help explain concepts, give context on your lessons, generate practice ' +
  'questions, or summarise sessions. (The live AI model is not configured on this server yet — set ' +
  'ANTHROPIC_API_KEY in the backend .env to enable full responses.) For rulings specific to your ' +
  'situation, please also consult a qualified local scholar.';

export async function scholarComplete(messages) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { text: FALLBACK, model: 'fallback' };
  }

  const model = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001';

  // messages: [{ role: 'user' | 'assistant', text }]
  const apiMessages = messages
    .filter((m) => m.text && m.text.trim())
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text }));

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 700,
        system: PERSONA,
        messages: apiMessages,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error('[ai] anthropic error', resp.status, detail);
      return { text: 'I had trouble connecting just now. Please try again in a moment, inshaAllah.', model: 'error' };
    }

    const data = await resp.json();
    const text = (data.content || []).map((c) => c.text || '').join('').trim();
    return { text: text || FALLBACK, model };
  } catch (err) {
    console.error('[ai] request failed', err);
    return { text: 'I had trouble connecting just now. Please try again in a moment, inshaAllah.', model: 'error' };
  }
}
