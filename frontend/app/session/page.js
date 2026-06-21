'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import RequireAuth from '@/components/RequireAuth';
import { Icon } from '@/components/icons';

function SessionInner() {
  const router = useRouter();
  const [secs, setSecs] = useState(3600);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [messages, setMessages] = useState([
    { who: 'Sheikh Ahmad', me: false, time: '7:01 PM', text: 'Assalamu alaikum, welcome to our session today.' },
    { who: 'You', me: true, time: '7:01 PM', text: 'Wa alaikum salam Sheikh, thank you for having me.' },
    { who: 'Sheikh Ahmad', me: false, time: '7:02 PM', text: 'Have you reviewed the verses from our last session?' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const mm = Math.floor(secs / 60);
  const ss = secs % 60;

  function sendMsg(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setMessages((m) => [...m, { who: 'You', me: true, time: now, text: input.trim() }]);
    setInput('');
  }

  return (
    <div className="flex h-screen flex-col bg-[#0E1512] text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-live px-2.5 py-1 text-[11px] font-bold uppercase"><span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse2" /> Live</span>
          <span className="text-[14.5px] font-semibold">Quran Memorization · Surah Al-Mulk</span>
        </div>
        <div className="flex items-center gap-2 text-[14px] font-semibold text-white/80">
          <Icon name="clock" size={16} /> {mm} min {ss < 10 ? '0' : ''}{ss}s remaining
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Stage */}
        <div className="flex flex-1 flex-col p-5">
          <div className="relative flex-1 overflow-hidden rounded-[18px] bg-gradient-to-br from-[#1a2a24] to-[#0d1714]">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-brand text-[36px] font-extrabold">SA</div>
                <div className="text-[18px] font-bold">Sheikh Ahmad Al-Nouri</div>
                <div className="text-[13px] text-white/50">Teacher</div>
              </div>
            </div>
            {/* Your tile */}
            <div className="absolute bottom-4 right-4 flex h-28 w-40 items-center justify-center overflow-hidden rounded-[12px] border border-white/15 bg-[#15211c]">
              {camOn ? <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2C7A63] font-extrabold">You</div> : <Icon name="video" size={28} className="text-white/40" />}
            </div>
            {/* Now reciting */}
            <div className="absolute left-4 top-4 rounded-[12px] bg-black/40 px-3.5 py-2.5 backdrop-blur">
              <div className="text-[11px] uppercase tracking-wide text-white/50">Now reciting</div>
              <div className="font-amiri text-[18px]">سُورَةُ الْمُلْك · ١٣</div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button onClick={() => setMicOn((v) => !v)} className={`flex h-12 w-12 items-center justify-center rounded-full ${micOn ? 'bg-white/12' : 'bg-white/25'}`}><Icon name="mic" size={20} /></button>
            <button onClick={() => setCamOn((v) => !v)} className={`flex h-12 w-12 items-center justify-center rounded-full ${camOn ? 'bg-white/12' : 'bg-white/25'}`}><Icon name="video" size={20} /></button>
            <button onClick={() => router.push('/journal')} className="flex items-center gap-2 rounded-full bg-live px-6 py-3 text-[14px] font-bold">End session</button>
          </div>
        </div>

        {/* Chat */}
        <div className="hidden w-[320px] flex-shrink-0 flex-col border-l border-white/10 md:flex">
          <div className="border-b border-white/10 px-4 py-3.5 text-[14px] font-bold">Session chat</div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.me ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[84%] rounded-[14px] px-3.5 py-2.5 text-[13.5px] leading-[1.45] ${m.me ? 'rounded-br-[4px] bg-brand text-white' : 'rounded-bl-[4px] bg-[#23282A] text-[#E8EBE6]'}`}>{m.text}</div>
                <span className="mt-1 text-[10.5px] text-white/40">{m.who} · {m.time}</span>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={sendMsg} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message…" className="flex-1 rounded-[10px] bg-white/10 px-3.5 py-2.5 text-[13.5px] text-white outline-none placeholder:text-white/40" />
            <button className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand"><Icon name="arrow" size={16} /></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SessionPage() {
  return <RequireAuth><SessionInner /></RequireAuth>;
}
