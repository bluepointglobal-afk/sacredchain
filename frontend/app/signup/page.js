'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { AuthLayout, Field } from '../login/page';

function SignupInner() {
  const { register } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/dashboard';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let onboarding;
      try {
        const stored = sessionStorage.getItem('sk_onboarding');
        if (stored) onboarding = JSON.parse(stored);
      } catch {}
      await register({ name, email, password, onboarding });
      sessionStorage.removeItem('sk_onboarding');
      router.push(next);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Create your account" sub="See your matched teachers and start a trial.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Full name" value={name} onChange={setName} placeholder="Your name" />
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 6 characters" />
        {error && <p className="text-[13.5px] font-semibold text-live">{error}</p>}
        <button disabled={loading} className="btn-primary w-full !py-3.5 disabled:opacity-60">
          {loading ? 'Creating…' : 'See my matches'}
        </button>
      </form>
      <p className="mt-6 text-center text-[14px] text-body">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-brand hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupInner />
    </Suspense>
  );
}
