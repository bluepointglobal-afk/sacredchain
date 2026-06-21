'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/Shell';
import { Icon } from '@/components/icons';
import { Api } from '@/lib/api';

const STEP_LABELS = ['Personal Info', 'Credentials', 'References', 'Verification', 'Submit'];
const SPECS = ['Quran Memorization', 'Tajweed', 'Tafsir', 'Hadith', 'Fiqh', 'Aqeedah', 'Arabic', 'Seerah'];

export default function BecomeTeacherPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', gender: '', bio: '', specialties: [] });
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleSpec = (sp) => setForm((f) => ({ ...f, specialties: f.specialties.includes(sp) ? f.specialties.filter((x) => x !== sp) : [...f.specialties, sp] }));

  async function submit() {
    setError('');
    try {
      await Api.applyTeacher(form);
      setDone(true);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <SiteShell>
      <main className="container-x max-w-[760px] py-12 pb-20">
        {done ? (
          <div className="rounded-[20px] border border-line bg-white p-10 text-center shadow-card">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-tint text-brand"><Icon name="check" size={32} strokeWidth={2.5} /></div>
            <h1 className="mb-2 text-[26px] font-extrabold text-ink">Application submitted</h1>
            <p className="mb-6 text-[15px] text-body">Jazak Allahu khayran, {form.name || 'teacher'}. Our team will review your credentials and reach out within a few days, in sha’ Allah.</p>
            <Link href="/explore" className="btn-primary !py-3.5">Explore the platform</Link>
          </div>
        ) : (
          <>
            <h1 className="mb-1.5 text-[30px] font-extrabold tracking-[-.8px] text-ink">Become a teacher</h1>
            <p className="mb-8 text-[15.5px] text-body">Share your knowledge with learners around the world.</p>

            {/* Stepper */}
            <div className="mb-8 flex items-center">
              {STEP_LABELS.map((l, i) => {
                const n = i + 1;
                const active = step === n, doneStep = step > n;
                return (
                  <div key={l} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-bold ${active || doneStep ? 'bg-brand text-white' : 'bg-[#E9E3D5] text-[#9AA39A]'}`}>{doneStep ? <Icon name="check" size={15} strokeWidth={3} /> : n}</div>
                      <span className={`mt-1.5 hidden whitespace-nowrap text-[11.5px] font-semibold sm:block ${active || doneStep ? 'text-brand' : 'text-[#9AA39A]'}`}>{l}</span>
                    </div>
                    {i < STEP_LABELS.length - 1 && <div className={`mx-1.5 h-0.5 flex-1 ${doneStep ? 'bg-brand' : 'bg-[#E9E3D5]'}`} />}
                  </div>
                );
              })}
            </div>

            <div className="rounded-[20px] border border-line bg-white p-6 shadow-card">
              {step === 1 && (
                <div className="space-y-4">
                  <Input label="Full name" value={form.name} onChange={(v) => set('name', v)} />
                  <Input label="Email" type="email" value={form.email} onChange={(v) => set('email', v)} />
                  <Input label="Phone" value={form.phone} onChange={(v) => set('phone', v)} />
                  <div>
                    <span className="mb-1.5 block text-[13px] font-bold text-[#54605A]">Gender</span>
                    <div className="flex gap-2.5">
                      {['male', 'female'].map((g) => (
                        <button key={g} onClick={() => set('gender', g)} className={`flex-1 rounded-[11px] border py-3 text-[14px] font-semibold capitalize ${form.gender === g ? 'border-brand bg-brand-tint text-brand' : 'border-line text-body'}`}>{g}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <span className="mb-3 block text-[14px] font-bold text-ink">Select your specialties</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {SPECS.map((sp) => (
                      <button key={sp} onClick={() => toggleSpec(sp)} className={`flex items-center gap-2.5 rounded-[11px] border p-3 text-left text-[13.5px] font-semibold ${form.specialties.includes(sp) ? 'border-brand bg-brand-tint text-brand' : 'border-line text-body'}`}>
                        <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[6px] border ${form.specialties.includes(sp) ? 'border-brand bg-brand text-white' : 'border-[#C9CEC4] bg-white'}`}>{form.specialties.includes(sp) && <Icon name="check" size={12} strokeWidth={3} />}</span>
                        {sp}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <span className="mb-1.5 block text-[13px] font-bold text-[#54605A]">Short bio</span>
                    <textarea value={form.bio} onChange={(e) => set('bio', e.target.value)} rows={4} placeholder="Tell learners about your background and approach…" className="w-full rounded-[11px] border border-[#E5DFD1] p-3.5 text-[14.5px] outline-none focus:border-brand" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-[14px] text-body">Provide two references who can vouch for your knowledge and character (scholars, institutions, or community leaders).</p>
                  <Input label="Reference 1 — name & contact" value={form.ref1 || ''} onChange={(v) => set('ref1', v)} />
                  <Input label="Reference 2 — name & contact" value={form.ref2 || ''} onChange={(v) => set('ref2', v)} />
                </div>
              )}

              {step === 4 && (
                <div className="rounded-[14px] border border-dashed border-[#C9CEC4] bg-surface p-10 text-center">
                  <div className="mb-3 text-3xl">📄</div>
                  <div className="text-[15px] font-bold text-ink">Upload your ijazah / credentials</div>
                  <p className="mt-1 text-[13.5px] text-body">PDF or images. (Demo — upload is simulated.)</p>
                  <button className="btn-ghost mt-4 !py-2.5">Choose files</button>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-3 text-[14.5px]">
                  <h3 className="text-[16px] font-extrabold text-ink">Review & submit</h3>
                  <Summary label="Name" value={form.name} />
                  <Summary label="Email" value={form.email} />
                  <Summary label="Gender" value={form.gender} />
                  <Summary label="Specialties" value={form.specialties.join(', ') || '—'} />
                  {error && <p className="text-[13.5px] font-semibold text-live">{error}</p>}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                {step > 1 && <button onClick={() => setStep((s) => s - 1)} className="btn-ghost flex-1 !py-3.5">Back</button>}
                {step < 5 ? (
                  <button onClick={() => setStep((s) => s + 1)} className="btn-primary flex-1 !py-3.5">Continue</button>
                ) : (
                  <button onClick={submit} className="btn-primary flex-1 !py-3.5">Submit application</button>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </SiteShell>
  );
}

function Input({ label, type = 'text', value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-bold text-[#54605A]">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-[11px] border border-[#E5DFD1] px-4 py-3 text-[15px] outline-none focus:border-brand" />
    </label>
  );
}

function Summary({ label, value }) {
  return (
    <div className="flex justify-between border-b border-line py-2">
      <span className="text-muted">{label}</span>
      <span className="font-semibold capitalize text-ink">{value}</span>
    </div>
  );
}
