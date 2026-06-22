'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RequireAuth from '@/components/RequireAuth';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Api, API_URL, getToken } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/Toast';

function AccountInner() {
  const { user, logout } = useAuth();
  const { flash } = useToast();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  async function exportData() {
    setBusy(true);
    try {
      // Use a direct fetch so the browser downloads the JSON attachment.
      const res = await fetch(`${API_URL}/account/export`, { headers: { Authorization: `Bearer ${getToken()}` }, credentials: 'include' });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sacred-knowledge-data.json';
      a.click();
      URL.revokeObjectURL(url);
      flash('Your data export has downloaded');
    } catch {
      flash('Could not export data');
    } finally {
      setBusy(false);
    }
  }

  async function deleteAccount() {
    setBusy(true);
    try {
      await Api.deleteAccount();
      await logout();
      router.push('/');
    } catch (e) {
      flash(e.message);
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FBFCFA]">
      <DashboardSidebar />
      <main className="flex-1 p-6 lg:p-9">
        <h1 className="mb-6 text-[26px] font-extrabold tracking-[-.6px] text-ink">Account settings</h1>

        <div className="max-w-[640px] space-y-5">
          <Section title="Profile">
            <Row label="Name" value={user?.name} />
            <Row label="Email" value={user?.email} />
            <Row label="Role" value={user?.role} />
            <Row
              label="Email verified"
              value={user?.emailVerified ? '✅ Verified' : '⚠️ Not verified — check your inbox for the link'}
            />
          </Section>

          <Section title="Your data (GDPR)">
            <p className="mb-4 text-[14px] text-body">Download a copy of everything we hold about you, or permanently erase your account.</p>
            <div className="flex flex-wrap gap-3">
              <button disabled={busy} onClick={exportData} className="btn-ghost !py-3 disabled:opacity-60">Export my data</button>
              {!confirming ? (
                <button onClick={() => setConfirming(true)} className="rounded-[11px] border border-live/30 bg-[#FDECEC] px-5 py-3 text-[14px] font-bold text-live sk-btn">Delete my account</button>
              ) : (
                <div className="flex items-center gap-2 rounded-[11px] border border-live/30 bg-[#FDECEC] px-4 py-2">
                  <span className="text-[13px] font-semibold text-live">Are you sure? This cannot be undone.</span>
                  <button disabled={busy} onClick={deleteAccount} className="rounded-[8px] bg-live px-3 py-1.5 text-[13px] font-bold text-white">Yes, delete</button>
                  <button onClick={() => setConfirming(false)} className="text-[13px] font-semibold text-body">Cancel</button>
                </div>
              )}
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-[18px] border border-line bg-white p-6 shadow-card">
      <h2 className="mb-4 text-[16px] font-extrabold text-ink">{title}</h2>
      {children}
    </section>
  );
}
function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-line py-2.5 text-[14.5px] last:border-0">
      <span className="text-muted">{label}</span>
      <span className="font-semibold capitalize text-ink">{value}</span>
    </div>
  );
}

export default function AccountPage() {
  return <RequireAuth><AccountInner /></RequireAuth>;
}
