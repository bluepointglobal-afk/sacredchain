'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import RequireAuth from '@/components/RequireAuth';
import { Icon } from '@/components/icons';
import { Api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { connectSocket } from '@/lib/socket';

// Jitsi must only load on the client.
const JitsiRoom = dynamic(() => import('@/components/JitsiRoom'), { ssr: false });

function SessionInner() {
  const router = useRouter();
  const params = useSearchParams();
  const bookingId = params.get('bookingId');
  const { user } = useAuth();

  const [room, setRoom] = useState(null);
  const [displayName, setDisplayName] = useState(user?.name || 'Learner');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const endRef = useRef(null);

  // Resolve the room: real booking room via API, else a demo room.
  useEffect(() => {
    let active = true;
    (async () => {
      if (bookingId) {
        try {
          const data = await Api.bookingRoom(bookingId);
          if (!active) return;
          setRoom(data.room);
          setDisplayName(data.displayName || user?.name || 'Learner');
          return;
        } catch {
          /* fall through to demo */
        }
      }
      setRoom(`sk-demo-${(user?.id || 'guest').toString().slice(-6)}`);
    })();
    return () => { active = false; };
  }, [bookingId, user]);

  // Connect Socket.io chat only for real bookings.
  useEffect(() => {
    if (!bookingId) return undefined;
    const socket = connectSocket();
    socketRef.current = socket;
    socket.on('connect', () => { setConnected(true); socket.emit('session:join', { bookingId }); });
    socket.on('session:history', (h) => setMessages(h.map((m) => ({ ...m, me: m.userId === user?.id }))));
    socket.on('session:message', (m) => setMessages((prev) => [...prev, { ...m, me: m.userId === user?.id }]));
    socket.on('disconnect', () => setConnected(false));
    return () => socket.disconnect();
  }, [bookingId, user]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  function sendMsg(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    if (socketRef.current && connected) {
      socketRef.current.emit('session:message', { text });
    } else {
      // demo / offline: local echo
      const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      setMessages((m) => [...m, { who: displayName, me: true, text, time }]);
    }
    setInput('');
  }

  function endSession() {
    socketRef.current?.disconnect();
    router.push('/journal');
  }

  return (
    <div className="flex h-screen flex-col bg-[#0E1512] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-live px-2.5 py-1 text-[11px] font-bold uppercase"><span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse2" /> Live</span>
          <span className="text-[14.5px] font-semibold">Lesson · Sacred Knowledge</span>
          {!bookingId && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] text-white/60">demo room</span>}
        </div>
        <button onClick={endSession} className="flex items-center gap-2 rounded-full bg-live px-5 py-2 text-[13.5px] font-bold">End session</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 bg-black">
          {room ? <JitsiRoom room={room} displayName={displayName} onEnd={endSession} /> : <div className="flex h-full items-center justify-center text-white/50">Preparing room…</div>}
        </div>

        <div className="hidden w-[320px] flex-shrink-0 flex-col border-l border-white/10 md:flex">
          <div className="border-b border-white/10 px-4 py-3.5 text-[14px] font-bold">
            Session chat {bookingId ? <span className={`ml-1 text-[11px] ${connected ? 'text-online' : 'text-white/40'}`}>● {connected ? 'live' : 'connecting'}</span> : <span className="ml-1 text-[11px] text-white/40">demo</span>}
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && <p className="text-center text-[13px] text-white/40">No messages yet. Say salam 👋</p>}
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
  return (
    <RequireAuth>
      <Suspense fallback={null}>
        <SessionInner />
      </Suspense>
    </RequireAuth>
  );
}
