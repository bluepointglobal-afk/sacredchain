'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Api } from '@/lib/api';
import { AuthLayout, Field } from '../login/page';

function ResetInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await Api.resetPassword({ token: params.get('token'), id: params.get('id'), password });
      setDone(true);
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Choose a new password" sub="Pick something strong you’ll remember.">
      {done ? (
        <div className="rounded-[12px] bg-brand-tint px-5 py-4 text-[14.5px] text-[#3C6B58]">
          ✅ Password updated. Redirecting to log in…
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="New password" type="password" value={password} onChange={setPassword} placeholder="At least 8 characters" />
          {error && <p className="text-[13.5px] font-semibold text-live">{error}</p>}
          <button disabled={loading} className="btn-primary w-full !py-3.5 disabled:opacity-60">{loading ? 'Saving…' : 'Reset password'}</button>
          <p className="text-center text-[14px] text-body"><Link href="/login" className="font-bold text-brand hover:underline">Back to log in</Link></p>
        </form>
      )}
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return <Suspense fallback={null}><ResetInner /></Suspense>;
}
