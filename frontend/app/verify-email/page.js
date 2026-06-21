'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Api } from '@/lib/api';
import { AuthLayout } from '../login/page';

function VerifyInner() {
  const params = useSearchParams();
  const [state, setState] = useState('working'); // working | ok | error

  useEffect(() => {
    const token = params.get('token');
    const id = params.get('id');
    if (!token || !id) { setState('error'); return; }
    Api.verifyEmail({ token, id }).then(() => setState('ok')).catch(() => setState('error'));
  }, [params]);

  return (
    <AuthLayout title="Email verification" sub="Confirming your email address.">
      {state === 'working' && <p className="text-body">Verifying…</p>}
      {state === 'ok' && (
        <div className="rounded-[12px] bg-brand-tint px-5 py-4 text-[14.5px] text-[#3C6B58]">
          ✅ Your email is verified. <Link href="/dashboard" className="font-bold text-brand hover:underline">Go to dashboard →</Link>
        </div>
      )}
      {state === 'error' && (
        <div className="rounded-[12px] bg-[#FDECEC] px-5 py-4 text-[14.5px] text-live">
          This verification link is invalid or has expired. You can request a new one from your account settings.
        </div>
      )}
    </AuthLayout>
  );
}

export default function VerifyEmailPage() {
  return <Suspense fallback={null}><VerifyInner /></Suspense>;
}
