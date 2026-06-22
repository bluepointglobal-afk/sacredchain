'use client';

import { useEffect, useState } from 'react';
import RequireAuth from '@/components/RequireAuth';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Icon } from '@/components/icons';
import { Api } from '@/lib/api';
import { useToast } from '@/components/Toast';

const TABS = [['entries', 'Journal entries'], ['dua', "Du'a collection"], ['insights', 'AI insights']];

function JournalInner() {
  const { flash } = useToast();
  const [tab, setTab] = useState('entries');
  const [entries, setEntries] = useState([]);
  const [duas, setDuas] = useState([]);
  const [input, setInput] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Api.journal().then((d) => { setEntries(d.entries); setDuas(d.duas); }).catch(() => {});
  }, []);

  async function save() {
    if (!input.trim() || saving) return;
    setSaving(true);
    try {
      const { entry } = await Api.addJournal({ body: input, private: isPrivate });
      setEntries((e) => [entry, ...e]);
      setInput('');
      flash('Reflection saved');
    } catch {
      flash('Could not save — please try again');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FBFCFA]">
      <DashboardSidebar />
      <main className="flex-1 p-6 lg:p-9">
        <h1 className="mb-1 text-[26px] font-extrabold tracking-[-.6px] text-ink">Reflection journal</h1>
        <p className="mb-5 text-[15px] text-body">Capture what each lesson stirred in your heart.</p>

        <div className="mb-6 flex gap-6 border-b border-line">
          {TABS.map(([v, l]) => (
            <button key={v} onClick={() => setTab(v)} className={`-mb-px border-b-[2.5px] px-1 pb-3 pt-3 text-[14.5px] ${tab === v ? 'border-brand font-semibold text-brand' : 'border-transparent font-medium text-[#7A8178]'}`}>{l}</button>
          ))}
        </div>

        {tab === 'entries' && (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              <div className="rounded-[18px] border border-line bg-white p-5 shadow-card">
                <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} placeholder="What did today’s lesson teach you?" className="w-full resize-none rounded-[12px] border border-[#E5DFD1] p-3.5 text-[14.5px] outline-none focus:border-brand" />
                <div className="mt-3 flex items-center justify-between">
                  <button onClick={() => setIsPrivate((p) => !p)} className="flex items-center gap-2 text-[13.5px] font-semibold text-body">
                    <span className={`flex h-[19px] w-[19px] items-center justify-center rounded-[5px] border ${isPrivate ? 'border-brand bg-brand text-white' : 'border-[#C9CEC4] bg-white'}`}>{isPrivate && <Icon name="check" size={12} strokeWidth={3} />}</span>
                    Keep private
                  </button>
                  <button onClick={save} disabled={saving} className="btn-primary !py-2.5 !text-[13.5px] disabled:opacity-60">Save reflection</button>
                </div>
              </div>

              {entries.map((e) => (
                <div key={e._id || e.id || e.date} className="rounded-[16px] border border-line bg-white p-5 shadow-card">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[12.5px] font-semibold text-muted">{e.date}</span>
                    {e.private && <span className="rounded-full bg-brand-tint px-2 py-0.5 text-[10.5px] font-bold text-brand">Private</span>}
                  </div>
                  <div className="mb-1.5 text-[13.5px] font-bold text-ink">{e.session}</div>
                  <p className="mb-3 text-[14px] leading-[1.55] text-body">{e.body}</p>
                  <div className="flex flex-wrap gap-1.5">{(e.tags || []).map((t) => <span key={t} className="chip">#{t}</span>)}</div>
                </div>
              ))}
            </div>
            <aside className="rounded-[18px] border border-line bg-white p-6 shadow-card lg:sticky lg:top-9 lg:self-start">
              <h3 className="mb-3 text-[15px] font-extrabold text-ink">Reflection prompts</h3>
              <ul className="space-y-2.5 text-[13.5px] text-body">
                <li>How has today’s lesson changed your understanding of Allah’s attributes?</li>
                <li>What is one way you can apply today’s knowledge in daily life?</li>
                <li>Which concept did you find most challenging, and why?</li>
              </ul>
            </aside>
          </div>
        )}

        {tab === 'dua' && (
          <div className="grid gap-4 md:grid-cols-3">
            {duas.map((d, i) => (
              <div key={i} className="rounded-[16px] border border-line bg-white p-6 text-center shadow-card">
                <div className="mb-3 font-amiri text-[26px] leading-relaxed text-ink">{d.ar}</div>
                <p className="mb-2 text-[14px] italic text-body">“{d.tr}”</p>
                <div className="text-[12.5px] font-semibold text-muted">{d.src}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'insights' && (
          <div className="rounded-[18px] border border-line bg-white p-6 text-body shadow-card">
            Your reflections suggest a recurring theme of <b className="text-ink">intention (niyyah)</b> and <b className="text-ink">focus</b>.
            Consider pairing memorisation with short, consistent review sessions — your entries show the strongest recall when you revisit material within 48 hours.
          </div>
        )}
      </main>
    </div>
  );
}

export default function JournalPage() {
  return <RequireAuth><JournalInner /></RequireAuth>;
}
