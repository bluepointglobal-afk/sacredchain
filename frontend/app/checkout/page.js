'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import RequireAuth from '@/components/RequireAuth';
import StripeCheckout from '@/components/StripeCheckout';
import { Icon } from '@/components/icons';
import { Api } from '@/lib/api';

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();
  const kind = params.get('kind') || 'bundle';
  const slug = params.get('slug');
  const [bundle, setBundle] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (kind === 'bundle' && slug) Api.bundle(slug).then((d) => setBundle(d.bundle)).catch(() => {});
  }, [kind, slug]);

  return (
    <div className="min-h-screen bg-[#F7F8F5]">
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-[68px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-brand-bright to-brand-deep text-white"><Icon name="bookOpen" size={18} strokeWidth={1.7} /></div>
            <span className="text-[16px] font-extrabold text-ink">Sacred Knowledge</span>
          </Link>
          <Link href="/bundles" className="text-[14px] font-semibold text-muted hover:text-brand">Cancel</Link>
        </div>
      </header>

      <main className="container-x max-w-[560px] py-12">
        {done ? (
          <div className="rounded-[20px] border border-line bg-white p-10 text-center shadow-card">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-tint text-brand"><Icon name="check" size={32} strokeWidth={2.5} /></div>
            <h1 className="mb-2 text-[24px] font-extrabold text-ink">Enrolment confirmed</h1>
            <p className="mb-6 text-[15px] text-body">You’re enrolled{bundle ? ` in ${bundle.name}` : ''}. Your first session details are in your dashboard.</p>
            <Link href="/dashboard" className="btn-primary !py-3.5">Go to dashboard</Link>
          </div>
        ) : (
          <div className="rounded-[20px] border border-line bg-white p-7 shadow-card">
            <h1 className="mb-1 text-[22px] font-extrabold text-ink">Checkout</h1>
            <p className="mb-5 text-[14px] text-body">{bundle ? bundle.name : 'Your order'}</p>
            {bundle && (
              <div className="mb-5 flex items-center justify-between rounded-[12px] bg-surface px-4 py-3 text-[14.5px]">
                <span className="text-body">{bundle.weeks} weeks · {bundle.perWeek}/week</span>
                <span className="text-[18px] font-extrabold text-brand">${bundle.price}</span>
              </div>
            )}
            {(!bundle && kind === 'bundle') ? (
              <p className="text-muted">Loading…</p>
            ) : (
              <StripeCheckout
                kind={kind}
                bundleSlug={slug}
                amount={bundle ? bundle.price : Number(params.get('amount') || 0)}
                label="Enroll & pay"
                onSuccess={() => setDone(true)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <Suspense fallback={null}>
        <CheckoutInner />
      </Suspense>
    </RequireAuth>
  );
}
