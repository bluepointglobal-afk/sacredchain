import Link from 'next/link';

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
  );
}

export default function SectionHeader({ eyebrow, title, subtitle, link, align = 'left', tone = 'ink' }) {
  const titleColor = tone === 'light' ? 'text-white' : 'text-ink';
  const subColor = tone === 'light' ? 'text-white/70' : 'text-muted';
  return (
    <div className={`mb-9 flex flex-wrap items-end gap-4 ${align === 'center' ? 'flex-col text-center' : 'justify-between'}`}>
      <div className={align === 'center' ? 'mx-auto max-w-[640px]' : 'max-w-[720px]'}>
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h2 className={`h2-section ${titleColor}`}>{title}</h2>
        {subtitle && <p className={`mt-3 text-[17px] leading-relaxed ${subColor}`}>{subtitle}</p>}
      </div>
      {link && (
        <Link href={link.href} className="flex items-center gap-1.5 text-[15px] font-semibold text-emerald hover:underline">
          {link.label} <Arrow />
        </Link>
      )}
    </div>
  );
}
