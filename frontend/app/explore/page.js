'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiteShell } from '@/components/Shell';
import TeacherCard from '@/components/TeacherCard';
import { Icon } from '@/components/icons';
import { Api } from '@/lib/api';

const SUBJECTS = ['all', 'Quran', 'Hadith', 'Fiqh', 'Aqeedah', 'Arabic', 'Tafsir', 'Calligraphy & Art', 'Islamic History'];
const GENDERS = [['all', 'Any gender'], ['male', 'Male'], ['female', 'Female']];
const LANGUAGES = ['all', 'Arabic', 'English', 'French', 'Urdu', 'Turkish', 'Malay'];
const TRACKS = [['all', 'All teachers'], ['student', 'Student of Knowledge'], ['seeker', 'Truth Seeker']];

function ExploreInner() {
  const params = useSearchParams();
  const matchMode = params.get('match') === '1';
  const matchName = params.get('name');

  const [filters, setFilters] = useState({
    q: '',
    subject: params.get('subject') || 'all',
    gender: params.get('gender') || 'all',
    language: params.get('language') || 'all',
    track: params.get('track') || 'all',
    weekend: false,
    view: 'grid',
  });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const qs = new URLSearchParams();
    if (filters.q) qs.set('q', filters.q);
    ['subject', 'gender', 'language', 'track'].forEach((k) => {
      if (filters[k] && filters[k] !== 'all') qs.set(k, filters[k]);
    });
    if (filters.weekend) qs.set('weekend', 'true');
    const str = qs.toString();
    const t = setTimeout(() => {
      Api.teachers(str ? `?${str}` : '')
        .then((d) => setTeachers(d.teachers))
        .catch(() => setTeachers([]))
        .finally(() => setLoading(false));
    }, 200);
    return () => clearTimeout(t);
  }, [filters]);

  const set = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  return (
    <SiteShell>
      <main className="container-x py-9 pb-[72px]">
        {matchMode && (
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-[#D6E8DD] bg-gradient-to-r from-brand-tint to-white px-6 py-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-brand text-white"><Icon name="sparkles" size={22} /></div>
              <div>
                <div className="text-[16.5px] font-extrabold text-[#16382E]">Your hand-picked matches{matchName ? `, ${matchName}` : ''}</div>
                <div className="text-[13.5px] text-body">Based on your answers — refine with filters below anytime.</div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h1 className="mb-1.5 text-[32px] font-extrabold tracking-[-1px] text-ink">Find your teacher</h1>
          <p className="text-[15.5px] text-[#6B776F]">Browse {teachers.length} verified teachers — filter, watch intros, book a trial.</p>
        </div>

        {/* Filter bar */}
        <div className="mb-3.5 rounded-[18px] border border-[#E8EBE4] bg-white p-4 shadow-card">
          <div className="mb-3.5 flex items-center gap-2.5 rounded-[12px] border border-[#E8EBE4] bg-surface px-3.5 py-3">
            <Icon name="search" size={19} className="text-muted" />
            <input
              value={filters.q}
              onChange={(e) => set('q', e.target.value)}
              placeholder="Search by name, subject or specialty"
              className="w-full bg-transparent text-[14.5px] outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <Select value={filters.subject} onChange={(v) => set('subject', v)} options={SUBJECTS.map((s) => [s, s === 'all' ? 'All subjects' : s])} />
              <Select value={filters.gender} onChange={(v) => set('gender', v)} options={GENDERS} />
              <Select value={filters.language} onChange={(v) => set('language', v)} options={LANGUAGES.map((s) => [s, s === 'all' ? 'Any language' : s])} />
              <button onClick={() => set('weekend', !filters.weekend)} className="flex items-center gap-2 px-1 py-2">
                <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border ${filters.weekend ? 'border-brand bg-brand text-white' : 'border-[#C9CEC4] bg-white'}`}>
                  {filters.weekend && <Icon name="check" size={12} strokeWidth={3.5} />}
                </span>
                <span className="text-[13.5px] font-semibold text-body">Weekend availability</span>
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <ViewBtn active={filters.view === 'grid'} onClick={() => set('view', 'grid')} icon="grid" />
              <ViewBtn active={filters.view === 'list'} onClick={() => set('view', 'list')} icon="list" />
            </div>
          </div>
          <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
            {TRACKS.map(([v, l]) => (
              <button
                key={v}
                onClick={() => set('track', v)}
                className={`sk-btn rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${
                  filters.track === v ? 'bg-brand text-white' : 'border border-line bg-white text-body'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="my-4 px-0.5 text-[13.5px] font-semibold text-muted">
          {loading ? 'Loading…' : `${teachers.length} teachers available`}
        </div>

        {filters.view === 'grid' ? (
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((t) => <TeacherCard key={t.slug} teacher={t} />)}
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {teachers.map((t) => <TeacherCard key={t.slug} teacher={t} variant="list" />)}
          </div>
        )}

        {!loading && teachers.length === 0 && (
          <div className="rounded-[18px] border border-line bg-surface py-16 text-center text-body">
            No teachers match these filters. Try clearing some.
          </div>
        )}
      </main>
    </SiteShell>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="cursor-pointer rounded-[10px] border border-[#E2DCCE] bg-white px-3.5 py-2.5 text-[13.5px] font-semibold text-body outline-none"
    >
      {options.map(([v, l]) => (
        <option key={v} value={v}>{l}</option>
      ))}
    </select>
  );
}

function ViewBtn({ active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`sk-btn flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border ${
        active ? 'border-brand bg-brand-tint text-brand' : 'border-line bg-white text-muted'
      }`}
    >
      <Icon name={icon} size={15} />
    </button>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreInner />
    </Suspense>
  );
}
