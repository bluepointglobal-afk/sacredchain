'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Icon } from './icons';

export default function TeacherCard({ teacher, variant = 'grid' }) {
  const router = useRouter();
  const t = teacher;
  const price = `from $${t.price}/hr`;
  const chips = (t.specialties || []).slice(0, 3);

  if (variant === 'list') {
    return (
      <div className="card-flat sk-card flex overflow-hidden">
        <Link href={`/teachers/${t.slug}`} className="relative w-[190px] flex-shrink-0 overflow-hidden bg-emerald-tint">
          {t.photo && <img src={t.photo} alt={t.name} className="sk-zoom h-full w-full object-cover" />}
          <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-ink/75 px-2.5 py-1 text-[11px] font-bold text-white">
            <Icon name="play" size={10} className="fill-current" /> Intro
          </span>
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-1.5 flex items-start justify-between gap-3">
            <div>
              <div className="font-display text-[17px] font-bold text-ink">{t.name}</div>
              <div className="mt-0.5 text-[13px] text-muted">{t.short} · {t.flag} {t.country}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-[17px] font-bold text-emerald">{price}</div>
              <div className="mt-0.5 flex items-center justify-end gap-1">
                <Star size={14} /><span className="text-[13px] font-bold text-ink">{t.rating}</span>
                <span className="text-[12px] text-muted">({t.reviews})</span>
              </div>
            </div>
          </div>
          <div className="my-2 flex flex-wrap gap-1.5">
            {chips.map((c) => <span key={c} className="chip">{c}</span>)}
          </div>
          <div className="mt-auto flex gap-2.5">
            <Link href={`/teachers/${t.slug}`} className="btn-secondary !px-5 !py-2.5 !text-[14px]">View profile</Link>
            <button onClick={() => router.push(`/booking?teacher=${t.slug}`)} className="btn-primary !px-5 !py-2.5 !text-[14px]">Book trial</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-flat sk-card flex h-full flex-col overflow-hidden">
      <Link href={`/teachers/${t.slug}`} className="relative aspect-[16/11] overflow-hidden bg-emerald-tint">
        {t.photo && <img src={t.photo} alt={t.name} className="sk-zoom h-full w-full object-cover" />}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-bold text-emerald">{price}</span>
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-ink/75 px-2.5 py-1 text-[11.5px] font-bold text-white">
          <Icon name="play" size={11} className="fill-current" /> Watch intro
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-0.5 flex items-center justify-between gap-2">
          <span className="font-display text-[16px] font-bold text-ink">{t.name}</span>
          <span className="flex items-center gap-1"><Star size={14} /><span className="text-[13px] font-bold text-ink">{t.rating}</span></span>
        </div>
        <div className="mb-2 text-[13px] text-muted">{t.short}</div>
        <div className="mb-3 flex items-center gap-1.5 text-[12.5px] text-muted">{t.flag} {t.country} · {t.reviews} reviews</div>
        <div className="mb-4 flex flex-1 flex-wrap content-start gap-1.5">
          {chips.map((c) => <span key={c} className="chip">{c}</span>)}
        </div>
        <div className="flex gap-2">
          <Link href={`/teachers/${t.slug}`} className="btn-secondary flex-1 !px-3 !py-2.5 !text-[14px]">Profile</Link>
          <button onClick={() => router.push(`/booking?teacher=${t.slug}`)} className="btn-primary flex-1 !px-3 !py-2.5 !text-[14px]">Book trial</button>
        </div>
      </div>
    </div>
  );
}
