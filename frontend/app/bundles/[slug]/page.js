'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SiteShell } from '@/components/Shell';
import { Icon, Star } from '@/components/icons';
import { Api } from '@/lib/api';
import { useToast } from '@/components/Toast';

const TABS = [['overview', 'Overview'], ['curriculum', 'Curriculum'], ['teacher', 'Teacher'], ['faq', 'FAQ']];

export default function BundleDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { flash } = useToast();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('overview');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    Api.bundle(slug).then(setData).catch(() => setError(true));
  }, [slug]);

  if (error) return <SiteShell><div className="container-x py-24 text-center text-body">Course not found.</div></SiteShell>;
  if (!data) return <SiteShell><div className="container-x py-24 text-center text-muted">Loading…</div></SiteShell>;
  const { bundle: b, teacher } = data;

  return (
    <SiteShell>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand to-brand-deep text-white">
        <div className="container-x py-12">
          <Link href="/bundles" className="mb-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white/70 hover:text-white">
            <Icon name="arrowLeft" size={15} /> All courses
          </Link>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11.5px] font-bold uppercase tracking-wide">{b.subject} · {b.level}</span>
          <h1 className="mt-3 max-w-[680px] text-[34px] font-extrabold leading-tight tracking-[-.8px]">{b.name}</h1>
          <p className="mt-3 max-w-[560px] text-[16px] leading-[1.6] text-white/80">{b.desc}</p>
          <div className="mt-5 flex flex-wrap gap-5 text-[14px] text-white/85">
            <span className="flex items-center gap-1.5"><Icon name="calendar" size={16} /> {b.weeks} weeks</span>
            <span className="flex items-center gap-1.5"><Icon name="clock" size={16} /> {b.perWeek} sessions/week · {b.mins} min</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> {b.rating}</span>
          </div>
        </div>
      </section>

      <main className="container-x grid gap-8 py-10 pb-[72px] lg:grid-cols-[1.55fr_1fr]">
        <div>
          <div className="flex gap-6 border-b border-line">
            {TABS.map(([v, l]) => (
              <button key={v} onClick={() => setTab(v)} className={`-mb-px border-b-[2.5px] px-1 pb-3.5 pt-3.5 text-[14.5px] transition ${tab === v ? 'border-brand font-semibold text-brand' : 'border-transparent font-medium text-[#7A8178]'}`}>{l}</button>
            ))}
          </div>

          <div className="py-6">
            {tab === 'overview' && (
              <div className="space-y-5">
                <p className="text-[15px] leading-[1.65] text-body">{b.desc}</p>
                <div>
                  <h3 className="mb-3 text-[16px] font-extrabold text-ink">What’s included</h3>
                  <ul className="space-y-2.5">
                    {(b.includes || []).map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-[14.5px] text-body">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand"><Icon name="check" size={12} strokeWidth={3} /></span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tab === 'curriculum' && (
              <div className="space-y-3">
                {(b.curriculum || []).map((c, i) => (
                  <div key={i} className="rounded-[14px] border border-line bg-surface p-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white">{i + 1}</span>
                      <span className="text-[15px] font-extrabold text-ink">{c.title}</span>
                    </div>
                    <p className="mt-2 pl-9 text-[14px] text-body">{c.detail}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === 'teacher' && teacher && (
              <div className="flex flex-col gap-4 rounded-[16px] border border-line bg-white p-5 shadow-card sm:flex-row">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-[16px] bg-brand-tint">
                  {teacher.photo && <img src={teacher.photo} alt={teacher.name} className="h-full w-full object-cover" />}
                </div>
                <div>
                  <div className="text-[18px] font-extrabold text-ink">{teacher.name}</div>
                  <div className="mb-2 text-[13.5px] text-body">{teacher.title}</div>
                  <p className="mb-3 text-[14px] leading-[1.55] text-body">{teacher.bio}</p>
                  <Link href={`/teachers/${teacher.slug}`} className="text-[13.5px] font-bold text-brand hover:underline">View full profile →</Link>
                </div>
              </div>
            )}

            {tab === 'faq' && (
              <div className="space-y-2.5">
                {(b.faq || []).map((f, i) => (
                  <div key={i} className="rounded-[14px] border border-line bg-white">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left">
                      <span className="text-[15px] font-bold text-ink">{f.q}</span>
                      <span className={`transition ${openFaq === i ? 'rotate-180' : ''}`}><Icon name="arrow" size={16} className="text-brand rotate-90" /></span>
                    </button>
                    {openFaq === i && <p className="px-4 pb-4 text-[14px] leading-[1.55] text-body">{f.a}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Enroll card */}
        <aside className="lg:sticky lg:top-[100px] lg:self-start">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-float">
            <div className="mb-1 flex items-baseline gap-1.5">
              <span className="text-[30px] font-extrabold text-brand">${b.price}</span>
              <span className="text-[14px] text-muted">total</span>
            </div>
            <p className="mb-5 text-[13.5px] text-body">{b.weeks} weeks · {b.perWeek} sessions/week · {b.mins} min each</p>
            <button onClick={() => flash('Enrolment started — complete checkout to begin')} className="btn-primary mb-2.5 w-full !py-3.5">Enroll now</button>
            {teacher && <button onClick={() => router.push(`/booking?teacher=${teacher.slug}`)} className="btn-ghost w-full !py-3.5">Book a trial first</button>}
            <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[13.5px] text-body">
              {(b.includes || []).slice(0, 4).map((inc) => (
                <li key={inc} className="flex items-start gap-2"><Icon name="check" size={15} className="mt-0.5 text-brand" /> {inc}</li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </SiteShell>
  );
}
