import Link from 'next/link';
import { Icon } from './icons';

const cols = [
  { title: 'Learn', links: [['Find teachers', '/explore'], ['Subjects', '/explore'], ['Courses', '/bundles'], ['Become a teacher', '/become-teacher']] },
  { title: 'Platform', links: [['How it works', '/onboarding'], ['AI companion', '/ai'], ['Progress', '/progress'], ['Journal', '/journal']] },
  { title: 'Company', links: [['SacredChain', '/sacredchain'], ['Terms', '/legal/terms'], ['Privacy', '/legal/privacy'], ['Log in', '/login']] },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid grid-cols-2 gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] bg-gradient-to-br from-emerald to-emerald-700">
              <Icon name="bookOpen" size={22} className="text-white" strokeWidth={1.7} />
            </div>
            <span className="font-display text-[19px] font-bold">Sacred Knowledge</span>
          </div>
          <p className="max-w-[320px] text-[14.5px] leading-relaxed text-white/60">
            Connecting learners with patient, vetted teachers of Quran, Hadith, Arabic and the Islamic sciences — with adab and ihsan.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-[12.5px] font-bold uppercase tracking-[0.12em] text-gold">{c.title}</h4>
            <ul className="space-y-2.5">
              {c.links.map(([l, href]) => (
                <li key={l}>
                  <Link href={href} className="text-[14.5px] text-white/70 transition hover:text-white">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5 text-[13px] text-white/50">
          <span>© {new Date().getFullYear()} Sacred Knowledge</span>
          <span>Learning with adab, in sha’ Allah.</span>
        </div>
      </div>
    </footer>
  );
}
