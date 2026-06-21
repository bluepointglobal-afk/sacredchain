'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from './icons';
import { useAuth } from '@/lib/auth';

export default function SiteHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <>
      {/* Utility bar promoting SacredChain */}
      <div className="bg-[#0E4D3B] text-white">
        <div className="container-x flex min-h-[40px] flex-wrap items-center justify-center gap-3.5 text-center">
          <span className="text-[12.5px] text-white/80">
            For mosques, businesses &amp; organisations — halal certification, zakat &amp; Islamic finance advisory
          </span>
          <Link
            href="/sacredchain"
            className="sk-btn inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[12.5px] font-bold text-[#0E4D3B]"
          >
            Explore SacredChain <Icon name="arrow" size={13} />
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-[60] border-b border-[#ECEFE9] bg-white/[.88] backdrop-blur-[14px]">
        <div className="container-x flex h-[74px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] bg-gradient-to-br from-brand-bright to-brand-deep shadow-[0_6px_16px_-6px_rgba(12,74,56,.55)]">
              <Icon name="bookOpen" size={22} className="text-white" strokeWidth={1.7} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[19px] font-extrabold tracking-[-.4px] text-ink">Sacred Knowledge</span>
              <span className="mt-1 text-[10.5px] font-semibold uppercase tracking-[1.6px] text-[#9AA59C]">
                Learn with trusted teachers
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/explore" className="text-[14.5px] font-semibold text-body hover:text-brand">Find teachers</Link>
            <Link href="/explore" className="text-[14.5px] font-semibold text-body hover:text-brand">Subjects</Link>
            <Link href="/bundles" className="text-[14.5px] font-semibold text-body hover:text-brand">Courses</Link>
            <Link href="/become-teacher" className="text-[14.5px] font-semibold text-body hover:text-brand">Become a teacher</Link>
          </nav>

          <div className="flex items-center gap-3.5">
            {user ? (
              <>
                <Link href="/dashboard" className="text-[14.5px] font-bold text-brand">Dashboard</Link>
                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="btn-primary"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[14.5px] font-bold text-brand">Log in</Link>
                <Link href="/onboarding" className="btn-primary">Get started</Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
