'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from './icons';
import Button from './ui/Button';
import { useAuth } from '@/lib/auth';

const NAV = [
  ['Find teachers', '/explore'],
  ['Subjects', '/explore'],
  ['Courses', '/bundles'],
  ['Become a teacher', '/become-teacher'],
];

export default function SiteHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* SacredChain B2B advisory strip (midnight) */}
      <div className="bg-midnight text-white">
        <div className="container-x flex min-h-[42px] flex-wrap items-center justify-center gap-3 py-1.5 text-center">
          <span className="text-[12.5px] text-white/75">
            For mosques, businesses &amp; organisations — halal certification, zakat &amp; Islamic finance advisory
          </span>
          <Link
            href="/sacredchain"
            className="sk-btn inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[12.5px] font-bold text-ink"
          >
            Explore SacredChain <Icon name="arrow" size={13} />
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-[60] border-b border-line bg-paper/90 backdrop-blur-[14px]">
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Sacred Knowledge home">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] bg-gradient-to-br from-emerald to-emerald-700">
              <Icon name="bookOpen" size={22} className="text-white" strokeWidth={1.7} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[19px] font-bold tracking-[-.01em] text-ink">Sacred Knowledge</span>
              <span className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">Learn with trusted teachers</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map(([label, href]) => (
              <Link key={label} href={href} className="text-[15px] font-medium text-ink/80 transition hover:text-emerald">{label}</Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <>
                <Link href="/dashboard" className="text-[15px] font-semibold text-emerald">Dashboard</Link>
                <Button variant="primary" size="sm" onClick={async () => { await logout(); router.push('/'); }}>Log out</Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[15px] font-semibold text-ink hover:text-emerald">Log in</Link>
                <Button href="/onboarding" variant="primary" size="sm" arrow>Get started</Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-line lg:hidden" aria-label="Open menu">
            <Icon name="list" size={22} className="text-ink" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-ink/40" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-[340px] flex-col bg-paper p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-[18px] font-bold text-ink">Menu</span>
              <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-line" aria-label="Close menu">
                <span className="text-[20px] leading-none text-ink">×</span>
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map(([label, href]) => (
                <Link key={label} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-[16px] font-semibold text-ink hover:bg-emerald-tint">{label}</Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-line pt-6">
              {user ? (
                <>
                  <Button href="/dashboard" variant="secondary" onClick={() => setOpen(false)}>Dashboard</Button>
                  <Button variant="primary" onClick={async () => { setOpen(false); await logout(); router.push('/'); }}>Log out</Button>
                </>
              ) : (
                <>
                  <Button href="/login" variant="secondary" onClick={() => setOpen(false)}>Log in</Button>
                  <Button href="/onboarding" variant="primary" arrow onClick={() => setOpen(false)}>Get started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
