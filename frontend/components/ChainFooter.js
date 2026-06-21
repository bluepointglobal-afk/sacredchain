import Link from 'next/link';
import { Icon } from './icons';

export default function ChainFooter() {
  return (
    <footer className="bg-chain-footer text-white">
      <div className="container-x flex flex-wrap items-center justify-between gap-6 py-12">
        <div className="flex items-center gap-3">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] bg-gradient-to-br from-chain-bright to-chain-deep">
            <Icon name="chain" size={22} className="text-white" strokeWidth={1.8} />
          </div>
          <div>
            <div className="text-[18px] font-extrabold">SacredChain</div>
            <div className="text-[13px] text-white/55">Shariah expertise, delivered on demand.</div>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2 text-[14px] font-semibold text-white/80 hover:text-white">
          <Icon name="arrowLeft" size={15} /> Back to Sacred Knowledge
        </Link>
      </div>
    </footer>
  );
}
