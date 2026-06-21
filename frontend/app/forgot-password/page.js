'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Api } from '@/lib/api';
import { AuthLayout, Field } from '../login/page';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try { await Api.forgotPassword(email); } catch { /* always succeeds UX-wise */ }
    setSent(true);
    setLoading(false);
  }

  return (
    <AuthLayout title="Forgot your password?" sub="We’ll email you a secure reset link.">
      {sent ? (
        <div className="rounded-[12px] bg-brand-tint px-5 py-4 text-[14.5px] text-[#3C6B58]">
          If an account exists for <b>{email}</b>, a reset link is on its way. Check your inbox (and spam).
          <div className="mt-3"><Link href="/login" className="font-bold text-brand hover:underline">Back to log in</Link></div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <button disabled={loading} className="btn-primary w-full !py-3.5 disabled:opacity-60">{loading ? 'Sending…' : 'Send reset link'}</button>
          <p className="text-center text-[14px] text-body"><Link href="/login" className="font-bold text-brand hover:underline">Back to log in</Link></p>
        </form>
      )}
    </AuthLayout>
  );
}
