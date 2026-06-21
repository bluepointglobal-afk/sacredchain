'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import RequireAuth from '@/components/RequireAuth';
import { Icon } from '@/components/icons';
import { Api } from '@/lib/api';
import { useToast } from '@/components/Toast';

function AdminInner() {
  const { flash } = useToast();
  const [stats, setStats] = useState(null);
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState('teacher');
  const [busy, setBusy] = useState(null);

  async function load() {
    const [s, a] = await Promise.all([Api.adminStats(), Api.adminApplications(`?kind=${filter}`)]);
    setStats(s);
    setApps(a.applications);
  }
  useEffect(() => { load().catch(() => {}); /* eslint-disable-next-line */ }, [filter]);

  async function act(id, action) {
    setBusy(id);
    try {
      if (action === 'approve') await Api.approveApplication(id);
      else await Api.rejectApplication(id);
      flash(action === 'approve' ? 'Application approved — teacher created' : 'Application rejected');
      await load();
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#FBFCFA]">
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-[68px] items-center justify-between">
          <span className="text-[18px] font-extrabold text-ink">Admin console</span>
          <Link href="/" className="text-[14px] font-semibold text-muted hover:text-brand">← Site</Link>
        </div>
      </header>

      <main className="container-x py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[['Users', stats?.users], ['Teachers', stats?.teachers], ['Bookings', stats?.bookings], ['Pending apps', stats?.pendingApplications]].map(([l, v]) => (
            <div key={l} className="rounded-[16px] border border-line bg-white p-5 shadow-card">
              <div className="text-[28px] font-extrabold text-brand">{v ?? '—'}</div>
              <div className="text-[13px] text-muted">{l}</div>
            </div>
          ))}
        </div>

        <div className="mb-4 flex gap-2">
          {['teacher', 'brief'].map((k) => (
            <button key={k} onClick={() => setFilter(k)} className={`rounded-full px-4 py-2 text-[13.5px] font-semibold ${filter === k ? 'bg-brand text-white' : 'border border-line bg-white text-body'}`}>
              {k === 'teacher' ? 'Teacher applications' : 'B2B briefs'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {apps.length === 0 && <p className="py-10 text-center text-muted">No applications.</p>}
          {apps.map((a) => (
            <div key={a._id} className="flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-line bg-white p-5 shadow-card">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15.5px] font-extrabold text-ink">{a.name || a.organisation || a.email}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase ${a.status === 'submitted' ? 'bg-brand-tint text-brand' : a.status === 'accepted' ? 'bg-[#E7F8EE] text-[#1A7A4E]' : 'bg-[#FDECEC] text-live'}`}>{a.status}</span>
                </div>
                <div className="text-[13px] text-body">{a.email}{a.specialties?.length ? ` · ${a.specialties.join(', ')}` : ''}{a.serviceSlug ? ` · ${a.serviceSlug}` : ''}</div>
                {a.bio && <p className="mt-1 max-w-[560px] text-[13px] text-muted">{a.bio}</p>}
                {a.details && <p className="mt-1 max-w-[560px] text-[13px] text-muted">{a.details}</p>}
              </div>
              {a.kind === 'teacher' && a.status === 'submitted' && (
                <div className="flex gap-2">
                  <button disabled={busy === a._id} onClick={() => act(a._id, 'reject')} className="btn-ghost !py-2.5 !text-[13.5px]">Reject</button>
                  <button disabled={busy === a._id} onClick={() => act(a._id, 'approve')} className="btn-primary !py-2.5 !text-[13.5px]"><Icon name="check" size={15} /> Approve</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  return <RequireAuth role="admin"><AdminInner /></RequireAuth>;
}
