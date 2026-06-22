'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function RequireAuth({ children, role }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center text-muted">Loading…</div>;
  }

  if (role && user.role !== role && user.role !== 'admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
        <div className="text-2xl">🔒</div>
        <p className="text-body">You don’t have access to this area.</p>
        <button onClick={() => router.push('/dashboard')} className="btn-primary !py-2.5">Back to dashboard</button>
      </div>
    );
  }
  return children;
}
