'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('amina@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome back" sub="Log in to continue your learning journey.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
        {error && <p className="text-[13.5px] font-semibold text-live">{error}</p>}
        <div className="text-right">
          <Link href="/forgot-password" className="text-[13px] font-semibold text-brand hover:underline">Forgot password?</Link>
        </div>
        <button disabled={loading} className="btn-primary w-full !py-3.5 disabled:opacity-60">
          {loading ? 'Signing in…' : 'Log in'}
        </button>
      </form>
      <p className="mt-6 text-center text-[14px] text-body">
        New here?{' '}
        <Link href="/onboarding" className="font-bold text-brand hover:underline">Find your teacher</Link>
      </p>
      <p className="mt-3 rounded-[11px] bg-brand-tint px-4 py-3 text-center text-[12.5px] text-[#3C6B58]">
        Demo account is pre-filled — just press Log in.
      </p>
    </AuthLayout>
  );
}

export function AuthLayout({ title, sub, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[42%_58%]">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand to-brand-deeper p-12 text-white lg:flex">
        <Link href="/" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
          <Icon name="arrowLeft" size={20} />
        </Link>
        <div>
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[22px] bg-white/12">
            <Icon name="bookOpen" size={40} strokeWidth={1.6} />
          </div>
          <h2 className="mb-3 text-[30px] font-extrabold leading-tight tracking-[-.6px]">
            Knowledge is light.<br />Carry it with adab.
          </h2>
          <p className="max-w-[360px] text-[15px] leading-[1.6] text-white/75">
            Learn Quran, Hadith, Arabic and the Islamic sciences with patient, vetted teachers — at your own pace.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-semibold text-white/80">
          <Icon name="bookOpen" size={18} /> Sacred Knowledge
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-[420px]">
          <h1 className="mb-1.5 text-[28px] font-extrabold tracking-[-.6px] text-ink">{title}</h1>
          <p className="mb-7 text-[15px] text-body">{sub}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Field({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-bold text-[#54605A]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[11px] border border-[#E5DFD1] px-4 py-3 text-[15px] outline-none focus:border-brand"
      />
    </label>
  );
}
