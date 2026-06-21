import Link from 'next/link';
import { Icon } from './icons';

const cols = [
  { title: 'Learn', links: ['Find teachers', 'Subjects', 'Courses', 'Become a teacher'] },
  { title: 'Platform', links: ['How it works', 'Pricing', 'AI companion', 'Progress tracking'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact', 'SacredChain'] },
];

export default function SiteFooter() {
  return (
    <footer className="bg-brand-footer text-white">
      <div className="container-x grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] bg-gradient-to-br from-brand-bright to-brand-deep">
              <Icon name="bookOpen" size={22} className="text-white" strokeWidth={1.7} />
            </div>
            <span className="text-[19px] font-extrabold tracking-[-.4px]">Sacred Knowledge</span>
          </div>
          <p className="max-w-[300px] text-[14px] leading-[1.6] text-white/70">
            Connecting learners with patient, vetted teachers of Quran, Hadith, Arabic and the Islamic sciences —
            with adab and ihsan.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-[12.5px] font-bold uppercase tracking-[1.4px] text-white/60">{c.title}</h4>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <Link href="/explore" className="text-[14px] text-white/80 hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5 text-[13px] text-white/55">
          <span>© {new Date().getFullYear()} Sacred Knowledge. Learning with adab, in sha’ Allah.</span>
          <span className="flex gap-4">
            <Link href="/legal/terms" className="hover:text-white">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-white">Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
