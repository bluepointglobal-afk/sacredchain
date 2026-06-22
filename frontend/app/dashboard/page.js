'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import RequireAuth from '@/components/RequireAuth';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Icon } from '@/components/icons';
import { Api } from '@/lib/api';
import { useAuth } from '@/lib/auth';

function DashboardInner() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get('page') || 'dashboard';
  const [data, setData] = useState(null);

  useEffect(() => {
    Api.dashboard().then(setData).catch(() => {});
  }, []);

  const first = user?.first || 'friend';

  return (
    <div className="flex min-h-screen bg-[#FBFCFA]">
      <DashboardSidebar />
      <main className="flex-1 p-6 lg:p-9">
        {page === 'dashboard' && (
          <>
            <h1 className="mb-1 text-[26px] font-extrabold tracking-[-.6px] text-ink">As-salamu alaykum, {first} 🌙</h1>
            <p className="mb-7 text-[15px] text-body">Here’s what’s happening with your learning today.</p>

            {!data ? (
              <p className="text-muted">Loading…</p>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                <div className="space-y-6">
                  {/* Upcoming */}
                  <Card title="Upcoming sessions">
                    <div className="space-y-3">
                      {data.upcoming.map((u, i) => (
                        <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-line bg-surface p-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[15px] font-extrabold text-ink">{u.title}</span>
                              {u.live && <span className="rounded-full bg-live px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white animate-pulse2">Live soon</span>}
                            </div>
                            <div className="text-[13px] text-body">{u.sub}</div>
                            <div className="mt-1 text-[12.5px] text-muted">{u.date} · {u.time}</div>
                          </div>
                          <button onClick={() => router.push('/session')} className="btn-primary !py-2.5 !text-[13.5px]">Join</button>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Enrolled */}
                  <Card title="Your courses">
                    <div className="space-y-4">
                      {data.enrolled.map((e) => (
                        <div key={e.id} className="rounded-[14px] border border-line p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-[15px] font-extrabold text-ink">{e.name}</span>
                            <span className="text-[12.5px] text-muted">{e.done}/{e.total} sessions</span>
                          </div>
                          <div className="mb-1.5 text-[12.5px] text-body">{e.teacher} · next {e.next}</div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-[#EEF0EB]">
                            <div className="h-full rounded-full bg-gradient-to-r from-brand to-[#2C7A63]" style={{ width: `${e.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Notifications */}
                  <Card title="Notifications">
                    <div className="space-y-3">
                      {data.notifs.map((n, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-[18px]">{n.icon}</span>
                          <div className="flex-1">
                            <div className="text-[13.5px] leading-[1.4] text-ink">{n.text}</div>
                            <div className="text-[12px] text-muted">{n.time}</div>
                          </div>
                          {n.unread && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand" />}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* AI promo */}
                  <div className="rounded-[18px] bg-gradient-to-br from-brand to-brand-deep p-6 text-white">
                    <div className="mb-2 text-2xl">✨</div>
                    <h3 className="mb-1.5 text-[17px] font-extrabold">AI Scholar Companion</h3>
                    <p className="mb-4 text-[13.5px] leading-[1.5] text-white/80">Ask questions, generate revision cards, and get session summaries.</p>
                    <Link href="/ai" className="sk-btn inline-flex rounded-[10px] bg-white px-4 py-2.5 text-[13.5px] font-bold text-brand">Open companion</Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {page !== 'dashboard' && data && <SubPage page={page} data={data} router={router} />}
      </main>
    </div>
  );
}

function SubPage({ page, data, router }) {
  if (page === 'mybundles') {
    return (
      <>
        <h1 className="mb-6 text-[26px] font-extrabold tracking-[-.6px] text-ink">My bundles</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {data.enrolled.map((e) => (
            <div key={e.id} className="rounded-[16px] border border-line bg-white p-5 shadow-card">
              <div className="text-[16px] font-extrabold text-ink">{e.name}</div>
              <div className="mb-3 text-[13px] text-body">{e.teacher}</div>
              <div className="mb-1.5 flex justify-between text-[12.5px] text-muted"><span>{e.progress}% complete</span><span>{e.done}/{e.total}</span></div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#EEF0EB]"><div className="h-full rounded-full bg-brand" style={{ width: `${e.progress}%` }} /></div>
            </div>
          ))}
        </div>
      </>
    );
  }
  if (page === 'schedule') {
    return (
      <>
        <h1 className="mb-6 text-[26px] font-extrabold tracking-[-.6px] text-ink">Schedule</h1>
        <div className="space-y-3">
          {data.upcoming.map((u, i) => (
            <div key={i} className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-line bg-white p-4 shadow-card">
              <div>
                <div className="text-[15px] font-extrabold text-ink">{u.title}</div>
                <div className="text-[13px] text-body">{u.sub}</div>
                <div className="mt-1 text-[12.5px] text-muted">{u.date} · {u.time}</div>
              </div>
              <button onClick={() => router.push('/session')} className="btn-primary !py-2.5 !text-[13.5px]">Join</button>
            </div>
          ))}
        </div>
      </>
    );
  }
  if (page === 'materials') {
    return (
      <>
        <h1 className="mb-6 text-[26px] font-extrabold tracking-[-.6px] text-ink">Materials</h1>
        <div className="space-y-3">
          {data.materials.map((m, i) => (
            <div key={i} className="flex items-center gap-4 rounded-[14px] border border-line bg-white p-4 shadow-card">
              <span className="text-2xl">{m.icon}</span>
              <div className="flex-1">
                <div className="text-[14.5px] font-bold text-ink">{m.name}</div>
                <div className="text-[12.5px] text-muted">{m.sub}</div>
              </div>
              <span className="rounded-[7px] bg-brand-tint px-2.5 py-1 text-[11.5px] font-bold text-brand">{m.tag}</span>
            </div>
          ))}
        </div>
      </>
    );
  }
  return null;
}

function Card({ title, children }) {
  return (
    <section className="rounded-[18px] border border-line bg-white p-6 shadow-card">
      <h2 className="mb-4 text-[16px] font-extrabold text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <Suspense fallback={null}>
        <DashboardInner />
      </Suspense>
    </RequireAuth>
  );
}
