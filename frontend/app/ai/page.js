'use client';

import { useEffect, useRef, useState } from 'react';
import RequireAuth from '@/components/RequireAuth';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Icon } from '@/components/icons';
import { Api } from '@/lib/api';

const TABS = [['chat', 'Chat assistant'], ['summaries', 'Session summaries'], ['cards', 'Revision cards']];

function AiInner() {
  const [tab, setTab] = useState('chat');
  const [content, setContent] = useState({ suggested: [], summaries: [], cards: [] });
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'As-salamu alaykum! I am your AI Scholar Companion. I can help explain concepts, give context on your lessons, generate practice questions, or summarise previous sessions. How may I assist your learning journey today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState({});
  const endRef = useRef(null);

  useEffect(() => { Api.aiContent().then(setContent).catch(() => {}); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  async function send(preset) {
    const text = (typeof preset === 'string' ? preset : input).trim();
    if (!text || loading) return;
    const history = [...messages, { role: 'user', text }];
    setMessages(history);
    setInput('');
    setLoading(true);
    try {
      const { reply } = await Api.aiChat(history.map((m) => ({ role: m.role, text: m.text })));
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: 'I had trouble connecting just now. Please try again in a moment, inshaAllah.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FBFCFA]">
      <DashboardSidebar />
      <main className="flex flex-1 flex-col p-6 lg:p-9">
        <h1 className="mb-1 text-[26px] font-extrabold tracking-[-.6px] text-ink">AI Scholar Companion ✨</h1>
        <p className="mb-5 text-[15px] text-body">Grounded in mainstream Sunni scholarship. For personal rulings, consult a qualified local scholar.</p>

        <div className="mb-5 flex gap-6 border-b border-line">
          {TABS.map(([v, l]) => (
            <button key={v} onClick={() => setTab(v)} className={`-mb-px border-b-[2.5px] px-1 pb-3 pt-3 text-[14.5px] ${tab === v ? 'border-brand font-semibold text-brand' : 'border-transparent font-medium text-[#7A8178]'}`}>{l}</button>
          ))}
        </div>

        {tab === 'chat' && (
          <div className="flex flex-1 flex-col rounded-[18px] border border-line bg-white shadow-card">
            <div className="flex-1 space-y-4 overflow-y-auto p-5" style={{ maxHeight: '52vh' }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[76%] whitespace-pre-wrap rounded-[16px] px-4 py-3.5 text-[14.5px] leading-[1.55] ${m.role === 'user' ? 'rounded-br-[5px] bg-brand text-white' : 'rounded-bl-[5px] border border-[#EDE8DC] bg-white text-[#2C342C]'}`}>{m.text}</div>
                </div>
              ))}
              {loading && <div className="flex justify-start"><div className="rounded-[16px] rounded-bl-[5px] border border-[#EDE8DC] bg-white px-4 py-3.5 text-[14px] text-muted">Thinking…</div></div>}
              <div ref={endRef} />
            </div>
            <div className="border-t border-line p-3">
              {messages.length <= 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {content.suggested.map((q) => (
                    <button key={q} onClick={() => send(q)} className="sk-btn rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] font-semibold text-body">{q}</button>
                  ))}
                </div>
              )}
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Quran, Hadith, Fiqh, Arabic…" className="flex-1 rounded-[12px] border border-[#E5DFD1] px-4 py-3 text-[14.5px] outline-none focus:border-brand" />
                <button disabled={loading} className="btn-primary !px-5 !py-3 disabled:opacity-60"><Icon name="arrow" size={18} /></button>
              </form>
            </div>
          </div>
        )}

        {tab === 'summaries' && (
          <div className="space-y-4">
            {content.summaries.map((s, i) => (
              <div key={i} className="rounded-[16px] border border-line bg-white p-5 shadow-card">
                <div className="mb-1 text-[15px] font-extrabold text-ink">{s.title}</div>
                <div className="mb-3 text-[12.5px] text-muted">{s.date}</div>
                <ul className="space-y-2">
                  {s.points.map((p) => <li key={p} className="flex items-start gap-2.5 text-[14px] text-body"><span className="mt-0.5 text-brand"><Icon name="check" size={15} /></span>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === 'cards' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {content.cards.map((c, i) => (
              <button key={i} onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))} className="min-h-[140px] rounded-[16px] border border-line bg-white p-5 text-left shadow-card transition hover:-translate-y-1">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted">{flipped[i] ? 'Answer' : 'Question'} · tap to flip</div>
                <div className="text-[15px] font-semibold text-ink">{flipped[i] ? c.back : c.front}</div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function AiPage() {
  return <RequireAuth><AiInner /></RequireAuth>;
}
