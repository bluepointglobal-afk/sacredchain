'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icon, Star } from '@/components/icons';
import { Api } from '@/lib/api';
import { useAuth } from '@/lib/auth';

const STEPS = ['Select Time', 'Review', 'Payment', 'Confirmation'];
const TIMES = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM', '8:30 PM'];

function nextDays(n) {
  const out = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    out.push({
      key: i,
      dow: day.toLocaleDateString('en-US', { weekday: 'short' }),
      label: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  }
  return out;
}

function BookingInner() {
  const params = useSearchParams();
  const slug = params.get('teacher');
  const router = useRouter();
  const { user } = useAuth();

  const [teacher, setTeacher] = useState(null);
  const [step, setStep] = useState(1);
  const [day, setDay] = useState(1);
  const [time, setTime] = useState('7:00 PM');
  const [sessionType, setSessionType] = useState('video');
  const [notes, setNotes] = useState('');
  const [booking, setBooking] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const days = useMemo(() => nextDays(7), []);

  useEffect(() => {
    if (slug) Api.teacher(slug).then((d) => setTeacher(d.teacher)).catch(() => {});
  }, [slug]);

  async function confirm() {
    setBookingError('');
    try {
      if (user) {
        const { booking: b } = await Api.createBooking({ teacherSlug: slug, day: days[day]?.label, time, sessionType, notes, isTrial: true });
        setBooking(b);
      }
      setStep(4);
    } catch (e) {
      setBookingError(e.message || 'Could not complete booking');
    }
  }

  if (!teacher) {
    return <MinimalShell><div className="container-x py-24 text-center text-muted">Loading…</div></MinimalShell>;
  }

  return (
    <MinimalShell>
      <main className="container-x py-8 pb-20">
        {/* Stepper */}
        <div className="mx-auto mb-8 flex max-w-[640px] items-center">
          {STEPS.map((s, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={s} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-bold ${active || done ? 'bg-brand text-white' : 'bg-[#E9E3D5] text-[#9AA39A]'}`}>
                    {done ? <Icon name="check" size={15} strokeWidth={3} /> : n}
                  </div>
                  <span className={`mt-1.5 whitespace-nowrap text-[11.5px] font-semibold ${active || done ? 'text-brand' : 'text-[#9AA39A]'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${done ? 'bg-brand' : 'bg-[#E9E3D5]'}`} />}
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-card">
            {step === 1 && (
              <>
                <h2 className="mb-4 text-[20px] font-extrabold text-ink">Choose a day & time</h2>
                <div className="mb-5 flex flex-wrap gap-2">
                  {days.map((d) => (
                    <button key={d.key} onClick={() => setDay(d.key)} className={`flex flex-col items-center rounded-[12px] border px-3.5 py-2.5 ${day === d.key ? 'border-brand bg-brand-tint text-brand' : 'border-line bg-white text-body'}`}>
                      <span className="text-[12px] font-semibold">{d.dow}</span>
                      <span className="text-[13.5px] font-bold">{d.label}</span>
                    </button>
                  ))}
                </div>
                <h3 className="mb-3 text-[14px] font-bold text-ink">Available times</h3>
                <div className="mb-6 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                  {TIMES.map((tm) => (
                    <button key={tm} onClick={() => setTime(tm)} className={`rounded-[10px] border px-2 py-2.5 text-[13.5px] font-semibold ${time === tm ? 'border-brand bg-brand-tint text-brand' : 'border-line bg-white text-body'}`}>
                      {tm}
                    </button>
                  ))}
                </div>
                <h3 className="mb-3 text-[14px] font-bold text-ink">Session type</h3>
                <div className="mb-6 grid grid-cols-2 gap-3">
                  {[['video', 'Video call', 'video'], ['voice', 'Voice only', 'mic']].map(([v, l, icon]) => (
                    <button key={v} onClick={() => setSessionType(v)} className={`flex items-center gap-3 rounded-[14px] border p-4 text-left ${sessionType === v ? 'border-brand bg-brand-tint' : 'border-line bg-white'}`}>
                      <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-white text-brand"><Icon name={icon} size={20} /></span>
                      <span className="text-[14.5px] font-bold text-ink">{l}</span>
                    </button>
                  ))}
                </div>
                <label className="mb-1.5 block text-[14px] font-bold text-ink">Notes for your teacher (optional)</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Tell your teacher about your goals or level…" className="mb-6 w-full rounded-[12px] border border-[#E5DFD1] p-3.5 text-[14.5px] outline-none focus:border-brand" />
                <button onClick={() => setStep(2)} className="btn-primary w-full !py-3.5">Continue</button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="mb-4 text-[20px] font-extrabold text-ink">Review your trial</h2>
                <div className="space-y-3 text-[14.5px]">
                  <Row label="Teacher" value={teacher.name} />
                  <Row label="Day" value={days[day]?.label} />
                  <Row label="Time" value={time} />
                  <Row label="Session" value={sessionType === 'video' ? 'Video call' : 'Voice only'} />
                  {notes && <Row label="Notes" value={notes} />}
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-ghost flex-1 !py-3.5">Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1 !py-3.5">Continue</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="mb-1 text-[20px] font-extrabold text-ink">Payment</h2>
                <p className="mb-5 text-[14px] text-body">Your trial lesson is free — no card charged today.</p>
                <div className="space-y-3.5">
                  <input placeholder="Card number" className="w-full rounded-[11px] border border-[#E5DFD1] px-4 py-3 text-[15px] outline-none focus:border-brand" />
                  <div className="flex gap-3">
                    <input placeholder="MM / YY" className="w-1/2 rounded-[11px] border border-[#E5DFD1] px-4 py-3 text-[15px] outline-none focus:border-brand" />
                    <input placeholder="CVC" className="w-1/2 rounded-[11px] border border-[#E5DFD1] px-4 py-3 text-[15px] outline-none focus:border-brand" />
                  </div>
                </div>
                {bookingError && <p className="mt-3 text-[13.5px] font-semibold text-live">{bookingError}</p>}
                {!user && <p className="mt-3 rounded-[11px] bg-brand-tint px-4 py-3 text-[12.5px] text-[#3C6B58]">Tip: log in first to save this booking and join the live room.</p>}
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-ghost flex-1 !py-3.5">Back</button>
                  <button onClick={confirm} className="btn-primary flex-1 !py-3.5">Confirm booking</button>
                </div>
              </>
            )}

            {step === 4 && (
              <div className="py-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-tint text-brand">
                  <Icon name="check" size={32} strokeWidth={2.5} />
                </div>
                <h2 className="mb-2 text-[24px] font-extrabold text-ink">You’re booked!</h2>
                <p className="mb-6 text-[15px] text-body">Your trial with {teacher.name} is confirmed for {days[day]?.label} at {time}.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {booking?._id && <Link href={`/session?bookingId=${booking._id}`} className="btn-primary !py-3.5">Join the room</Link>}
                  <Link href="/dashboard" className="btn-ghost !py-3.5">Go to dashboard</Link>
                  <Link href="/explore" className="btn-ghost !py-3.5">Browse more</Link>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-[90px] lg:self-start">
            <div className="rounded-[20px] border border-line bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-14 w-14 overflow-hidden rounded-[12px] bg-brand-tint">
                  {teacher.photo && <img src={teacher.photo} alt={teacher.name} className="h-full w-full object-cover" />}
                </div>
                <div>
                  <div className="text-[15px] font-extrabold text-ink">{teacher.name}</div>
                  <div className="flex items-center gap-1 text-[12.5px] text-muted"><Star size={12} /> {teacher.rating} · {teacher.short}</div>
                </div>
              </div>
              <div className="space-y-2.5 border-t border-line pt-4 text-[14px]">
                <Row label="Trial lesson (60 min)" value="$0.00" />
                <Row label="Platform fee" value="$0.00" />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                <span className="text-[15px] font-bold text-ink">Due today</span>
                <span className="text-[20px] font-extrabold text-brand">$0</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </MinimalShell>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span className="text-right font-semibold text-ink">{value}</span>
    </div>
  );
}

function MinimalShell({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F8F5]">
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-[68px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-brand-bright to-brand-deep text-white"><Icon name="bookOpen" size={18} strokeWidth={1.7} /></div>
            <span className="text-[16px] font-extrabold text-ink">Sacred Knowledge</span>
          </Link>
          <Link href="/explore" className="text-[14px] font-semibold text-muted hover:text-brand">Exit</Link>
        </div>
      </header>
      {children}
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingInner />
    </Suspense>
  );
}
