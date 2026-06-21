'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/Shell';
import { Icon, Star } from '@/components/icons';
import { Api } from '@/lib/api';

const SUBJECTS = ['all', 'Quran', 'Hadith', 'Fiqh', 'Aqeedah', 'Arabic'];
const LEVELS = ['all', 'Beginner', 'Intermediate', 'All Levels'];
const PRICES = [['all', 'Any price'], ['low', 'Under $400'], ['mid', '$400–550'], ['high', 'Over $550']];

export default function BundlesPage() {
  const [filters, setFilters] = useState({ subject: 'all', level: 'all', price: 'all' });
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const qs = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v !== 'all') qs.set(k, v); });
    const str = qs.toString();
    Api.bundles(str ? `?${str}` : '').then((d) => setBundles(d.bundles)).catch(() => setBundles([])).finally(() => setLoading(false));
  }, [filters]);

  const set = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  return (
    <SiteShell>
      <main className="container-x py-9 pb-[72px]">
        <div className="mb-6">
          <h1 className="mb-1.5 text-[32px] font-extrabold tracking-[-1px] text-ink">Structured courses & bundles</h1>
          <p className="text-[15.5px] text-[#6B776F]">Multi-week programs with a dedicated teacher, curriculum and certificate.</p>
        </div>

        <div className="mb-7 flex flex-wrap gap-2.5">
          <Select value={filters.subject} onChange={(v) => set('subject', v)} options={SUBJECTS.map((s) => [s, s === 'all' ? 'All subjects' : s])} />
          <Select value={filters.level} onChange={(v) => set('level', v)} options={LEVELS.map((s) => [s, s === 'all' ? 'Any level' : s])} />
          <Select value={filters.price} onChange={(v) => set('price', v)} options={PRICES} />
        </div>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map((b) => (
            <Link key={b.slug} href={`/bundles/${b.slug}`} className="sk-card flex flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-card">
              <div className="relative bg-gradient-to-br from-brand to-brand-deep p-5 text-white">
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">{b.subject} · {b.level}</span>
                <h3 className="mt-3 text-[19px] font-extrabold leading-tight">{b.name}</h3>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-4 flex-1 text-[14px] leading-[1.5] text-body">{b.desc}</p>
                {b.teacher && (
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="h-8 w-8 overflow-hidden rounded-full bg-brand-tint">
                      {b.teacher.photo && <img src={b.teacher.photo} alt={b.teacher.name} className="h-full w-full object-cover" />}
                    </div>
                    <span className="text-[13px] font-semibold text-ink">{b.teacher.name}</span>
                  </div>
                )}
                <div className="mb-4 flex items-center gap-3 text-[12.5px] text-muted">
                  <span className="flex items-center gap-1"><Icon name="calendar" size={14} /> {b.weeks} weeks</span>
                  <span className="flex items-center gap-1"><Icon name="clock" size={14} /> {b.perWeek}/week</span>
                  <span className="flex items-center gap-1"><Star size={13} /> {b.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[20px] font-extrabold text-brand">${b.price}</span>
                  <span className="flex items-center gap-1 text-[13.5px] font-bold text-brand">Details <Icon name="arrow" size={15} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {!loading && bundles.length === 0 && <p className="py-16 text-center text-body">No bundles match these filters.</p>}
      </main>
    </SiteShell>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="cursor-pointer rounded-[10px] border border-[#E2DCCE] bg-white px-4 py-2.5 text-[13.5px] font-semibold text-body outline-none">
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}
