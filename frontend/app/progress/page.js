'use client';

import { useEffect, useState } from 'react';
import RequireAuth from '@/components/RequireAuth';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Api } from '@/lib/api';

const TABS = [['overview', 'Progress overview'], ['certs', 'Certificates'], ['recs', 'AI recommendations']];

function ProgressInner() {
  const [tab, setTab] = useState('overview');
  const [data, setData] = useState(null);

  useEffect(() => { Api.progress().then(setData).catch(() => {}); }, []);

  return (
    <div className="flex min-h-screen bg-[#FBFCFA]">
      <DashboardSidebar />
      <main className="flex-1 p-6 lg:p-9">
        <h1 className="mb-1 text-[26px] font-extrabold tracking-[-.6px] text-ink">Your progress</h1>
        <p className="mb-5 text-[15px] text-body">Track mastery across subjects, certificates and AI guidance.</p>

        <div className="mb-6 flex gap-6 border-b border-line">
          {TABS.map(([v, l]) => (
            <button key={v} onClick={() => setTab(v)} className={`-mb-px border-b-[2.5px] px-1 pb-3 pt-3 text-[14.5px] ${tab === v ? 'border-brand font-semibold text-brand' : 'border-transparent font-medium text-[#7A8178]'}`}>{l}</button>
          ))}
        </div>

        {!data ? <p className="text-muted">Loading…</p> : (
          <>
            {tab === 'overview' && (
              <>
                <div className="mb-8 grid gap-5 md:grid-cols-3">
                  {data.subjects.map((s) => (
                    <div key={s.name} className="rounded-[16px] border border-line bg-white p-5 shadow-card">
                      <div className="mb-4 flex items-center gap-3.5">
                        <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full" style={{ background: `conic-gradient(${s.accent} ${s.pct}%, #EEEAE0 0)` }}>
                          <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white text-[14px] font-extrabold text-ink">{s.pct}%</div>
                        </div>
                        <div>
                          <div className="text-[15px] font-extrabold text-ink">{s.name}</div>
                          <div className="text-[12.5px] font-semibold text-brand">{s.delta} this month</div>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        {s.metrics.map((m) => (
                          <div key={m.l}>
                            <div className="mb-1 flex justify-between text-[12px] text-body"><span>{m.l}</span><span>{m.v}%</span></div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EEEAE0]"><div className="h-full rounded-full" style={{ width: `${m.v}%`, background: s.accent }} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                  <section className="rounded-[18px] border border-line bg-white p-6 shadow-card">
                    <h2 className="mb-4 text-[16px] font-extrabold text-ink">Recent activity</h2>
                    <div className="space-y-3">
                      {data.activity.map((a, i) => (
                        <div key={i} className="flex items-center gap-3.5">
                          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-tint text-[13px] font-extrabold text-brand">{a.score}</span>
                          <div className="flex-1"><div className="text-[14px] text-ink">{a.text}</div><div className="text-[12px] text-muted">{a.date}</div></div>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="space-y-4">
                    {data.insights.map((ins, i) => (
                      <div key={i} className="rounded-[16px] border border-line bg-white p-5 shadow-card">
                        <div className="mb-1.5 flex items-center gap-2 text-[14.5px] font-extrabold text-ink"><span className="text-lg">{ins.icon}</span> {ins.title}</div>
                        <p className="text-[13.5px] leading-[1.5] text-body">{ins.body}</p>
                      </div>
                    ))}
                  </section>
                </div>
              </>
            )}

            {tab === 'certs' && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.certs.map((c, i) => (
                  <div key={i} className="rounded-[16px] border border-line bg-white p-5 shadow-card">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[12px] bg-brand-tint text-xl">{c.done ? '🏅' : '⏳'}</div>
                    <div className="text-[15.5px] font-extrabold text-ink">{c.name}</div>
                    <div className="text-[13px] text-body">{c.teacher}</div>
                    <div className="mt-2 text-[12.5px] font-semibold text-muted">{c.issued}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'recs' && (
              <div className="grid gap-4 md:grid-cols-3">
                {data.recs.map((r, i) => (
                  <div key={i} className="rounded-[16px] border border-line bg-white p-5 shadow-card">
                    <div className="mb-2 text-2xl">{r.icon}</div>
                    <div className="mb-1.5 text-[15px] font-extrabold text-ink">{r.title}</div>
                    <p className="text-[13.5px] leading-[1.5] text-body">{r.body}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function ProgressPage() {
  return <RequireAuth><ProgressInner /></RequireAuth>;
}
