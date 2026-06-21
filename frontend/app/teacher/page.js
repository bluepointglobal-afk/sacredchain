'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import RequireAuth from '@/components/RequireAuth';
import { Icon } from '@/components/icons';
import { Api } from '@/lib/api';
import { useToast } from '@/components/Toast';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function TeacherInner() {
  const { flash } = useToast();
  const [teacher, setTeacher] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ title: '', short: '', bio: '', price: 20 });
  const [slots, setSlots] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Api.teacherMe().then(({ teacher: t }) => {
      setTeacher(t);
      setForm({ title: t.title || '', short: t.short || '', bio: t.bio || '', price: t.price || 20 });
      setSlots(t.slots || []);
    }).catch(() => {});
    Api.teacherBookings().then((d) => setBookings(d.bookings)).catch(() => {});
  }, []);

  async function save() {
    setSaving(true);
    try {
      await Api.updateTeacherMe({ ...form, price: Number(form.price), slots });
      flash('Profile updated');
    } catch (e) {
      flash(e.message);
    } finally {
      setSaving(false);
    }
  }

  const addSlot = () => setSlots((s) => [...s, { dow: 1, start: '18:00', end: '20:00' }]);
  const setSlot = (i, k, v) => setSlots((s) => s.map((sl, idx) => (idx === i ? { ...sl, [k]: k === 'dow' ? Number(v) : v } : sl)));
  const removeSlot = (i) => setSlots((s) => s.filter((_, idx) => idx !== i));

  if (!teacher) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center">
        <div>
          <p className="mb-3 text-body">No teacher profile is linked to your account yet.</p>
          <Link href="/become-teacher" className="btn-primary !py-2.5">Apply to teach</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFCFA]">
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-[68px] items-center justify-between">
          <span className="text-[18px] font-extrabold text-ink">Teacher studio</span>
          <Link href="/" className="text-[14px] font-semibold text-muted hover:text-brand">← Site</Link>
        </div>
      </header>

      <main className="container-x grid gap-6 py-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-[18px] border border-line bg-white p-6 shadow-card">
          <h2 className="mb-4 text-[16px] font-extrabold text-ink">Your profile</h2>
          <div className="space-y-4">
            <Field label="Headline" value={form.short} onChange={(v) => setForm((f) => ({ ...f, short: v }))} />
            <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
            <div>
              <span className="mb-1.5 block text-[13px] font-bold text-[#54605A]">Bio</span>
              <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} rows={4} className="w-full rounded-[11px] border border-[#E5DFD1] p-3.5 text-[14.5px] outline-none focus:border-brand" />
            </div>
            <Field label="Price (USD/hr)" type="number" value={form.price} onChange={(v) => setForm((f) => ({ ...f, price: v }))} />

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[14px] font-bold text-ink">Weekly availability</span>
                <button onClick={addSlot} className="text-[13px] font-bold text-brand hover:underline">+ Add slot</button>
              </div>
              <div className="space-y-2">
                {slots.map((sl, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <select value={sl.dow} onChange={(e) => setSlot(i, 'dow', e.target.value)} className="rounded-[9px] border border-[#E2DCCE] px-2.5 py-2 text-[13.5px]">
                      {DOW.map((d, idx) => <option key={d} value={idx}>{d}</option>)}
                    </select>
                    <input type="time" value={sl.start} onChange={(e) => setSlot(i, 'start', e.target.value)} className="rounded-[9px] border border-[#E2DCCE] px-2.5 py-2 text-[13.5px]" />
                    <span className="text-muted">–</span>
                    <input type="time" value={sl.end} onChange={(e) => setSlot(i, 'end', e.target.value)} className="rounded-[9px] border border-[#E2DCCE] px-2.5 py-2 text-[13.5px]" />
                    <button onClick={() => removeSlot(i)} className="text-[13px] text-live">Remove</button>
                  </div>
                ))}
                {slots.length === 0 && <p className="text-[13px] text-muted">No slots yet — add your weekly availability.</p>}
              </div>
            </div>

            <button onClick={save} disabled={saving} className="btn-primary !py-3.5 disabled:opacity-60">{saving ? 'Saving…' : 'Save changes'}</button>
          </div>
        </section>

        <section className="rounded-[18px] border border-line bg-white p-6 shadow-card">
          <h2 className="mb-4 text-[16px] font-extrabold text-ink">Upcoming bookings</h2>
          <div className="space-y-3">
            {bookings.length === 0 && <p className="text-[13.5px] text-muted">No bookings yet.</p>}
            {bookings.map((b) => (
              <div key={b._id} className="rounded-[12px] border border-line p-3.5">
                <div className="text-[14px] font-bold text-ink">{b.user?.name || 'Learner'}</div>
                <div className="text-[12.5px] text-body">{[b.day, b.time].filter(Boolean).join(' · ') || 'Time TBC'} · {b.sessionType}</div>
                <div className="mt-1 flex items-center gap-2 text-[12px] text-muted">
                  <span className={`rounded-full px-2 py-0.5 ${b.isTrial ? 'bg-brand-tint text-brand' : 'bg-[#FBF3DC] text-[#9C7A2E]'}`}>{b.isTrial ? 'Trial' : `$${b.price}`}</span>
                  {b._id && <Link href={`/session?bookingId=${b._id}`} className="font-bold text-brand hover:underline">Join room</Link>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({ label, type = 'text', value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-bold text-[#54605A]">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-[11px] border border-[#E5DFD1] px-4 py-3 text-[15px] outline-none focus:border-brand" />
    </label>
  );
}

export default function TeacherStudioPage() {
  return <RequireAuth role="teacher"><TeacherInner /></RequireAuth>;
}
