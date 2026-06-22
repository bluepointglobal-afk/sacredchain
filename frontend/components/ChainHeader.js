'use client';

import Link from 'next/link';
import { Icon } from './icons';
import { useToast } from './Toast';

export default function ChainHeader() {
  const { flash } = useToast();
  return (
    <header className="sticky top-0 z-[60] border-b border-[#E6EAF6] bg-white/90 backdrop-blur-[14px]">
      <div className="container-x flex h-[74px] items-center justify-between gap-6">
        <Link href="/sacredchain" className="flex items-center gap-3">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] bg-gradient-to-br from-chain-bright to-chain-deep shadow-[0_6px_16px_-6px_rgba(30,61,190,.55)]">
            <Icon name="chain" size={22} className="text-white" strokeWidth={1.8} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[19px] font-extrabold tracking-[-.4px] text-chain-navy">SacredChain</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[1.4px] text-[#9099AE]">
              Shariah advisory for business
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/sacredchain" className="text-[14.5px] font-semibold text-[#3A4256] hover:text-chain">Services</Link>
          <Link href="/sacredchain" className="text-[14.5px] font-semibold text-[#3A4256] hover:text-chain">How it works</Link>
          <Link href="/sacredchain" className="text-[14.5px] font-semibold text-[#3A4256] hover:text-chain">Providers</Link>
          <Link href="/sacredchain" className="text-[14.5px] font-semibold text-[#3A4256] hover:text-chain">Pricing</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-[13.5px] font-semibold text-[#748093] hover:text-chain">
            <Icon name="arrowLeft" size={14} /> Sacred Knowledge
          </Link>
          <button onClick={() => flash('Request brief started — a specialist will respond shortly')} className="btn-indigo">
            Post a brief
          </button>
        </div>
      </div>
    </header>
  );
}
