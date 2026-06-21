'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SiteShell } from '@/components/Shell';
import { Icon, Star } from '@/components/icons';
import { Api } from '@/lib/api';
import { useToast } from '@/components/Toast';

const TABS = [['about', 'About'], ['quals', 'Qualifications'], ['reviews', 'Reviews'], ['availability', 'Availability']];

export default function TeacherProfilePage() {
  const { slug } = useParams();
  const router = useRouter();
  const { flash } = useToast();
  const [teacher, setTeacher] = useState(null);
  const [tab, setTab] = useState('about');
  const [error, setError] = useState(false);

  useEffect(() => {
    Api.teacher(slug).then((d) => setTeacher(d.teacher)).catch(() => setError(true));
  }, [slug]);

  if (error) return <SiteShell><div className="container-x py-24 text-center text-body">Teacher not found.</div></SiteShell>;
  if (!teacher) return <SiteShell><div className="container-x py-24 text-center text-muted">Loading…</div></SiteShell>;
  const t = teacher;

  return (
    <SiteShell>
      <main className="container-x py-9 pb-[72px]">
        <Link href="/explore" className="mb-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-body hover:text-brand">
          <Icon name="arrowLeft" size={16} /> Back to teachers
        </Link>

        <div className="grid gap-7 lg:grid-cols-[1.55fr_1fr]">
          <div>
            {/* Header card */}
            <div className="flex flex-col gap-5 rounded-[20px] border border-line bg-white p-6 shadow-card sm:flex-row">
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-[18px] bg-brand-tint">
                {t.photo && <img src={t.photo} alt={t.name} className="h-full w-full object-cover" />}
                <span className="absolute bottom-2 right-2 h-3 w-3 rounded-full border-2 border-white bg-online" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2.5">
                  <h1 className="text-[24px] font-extrabold tracking-[-.5px] text-ink">{t.name}</h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-tint px-2.5 py-1 text-[11.5px] font-bold text-brand">
                    <Icon name="check" size={12} strokeWidth={3} /> Ijazah verified
                  </span>
                </div>
                {t.ar && <div className="mb-1.5 font-amiri text-[18px] text-body">{t.ar}</div>}
                <p className="mb-3 text-[14.5px] text-body">{t.title}</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13.5px] text-body">
                  <span className="flex items-center gap-1.5"><Star size={15} /><b className="text-ink">{t.rating}</b> ({t.reviews} reviews)</span>
                  <span>{t.flag} {t.country}</span>
                  <span>{t.experience} experience</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex gap-6 border-b border-line">
              {TABS.map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setTab(v)}
                  className={`-mb-px border-b-[2.5px] px-1 pb-3.5 pt-3.5 text-[14.5px] transition ${
                    tab === v ? 'border-brand font-semibold text-brand' : 'border-transparent font-medium text-[#7A8178]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="py-6">
              {tab === 'about' && (
                <div className="space-y-5">
                  <p className="text-[15px] leading-[1.65] text-body">{t.bio}</p>
                  {t.approach?.length > 0 && (
                    <div>
                      <h3 className="mb-3 text-[16px] font-extrabold text-ink">Teaching approach</h3>
                      <ul className="space-y-2.5">
                        {t.approach.map((a) => (
                          <li key={a} className="flex items-start gap-2.5 text-[14.5px] text-body">
                            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand"><Icon name="check" size={12} strokeWidth={3} /></span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {t.specialties.map((s) => <span key={s} className="chip">{s}</span>)}
                  </div>
                </div>
              )}

              {tab === 'quals' && (
                <div className="space-y-3.5">
                  {(t.credentials || []).map((c) => (
                    <div key={c.title} className="rounded-[14px] border border-line bg-surface p-4">
                      <div className="text-[15px] font-extrabold text-ink">{c.title}</div>
                      <div className="text-[13.5px] text-body">{c.issuer} · {c.year}</div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'reviews' && (
                <div className="space-y-3.5">
                  {(t.reviewList || []).map((r, i) => (
                    <div key={i} className="rounded-[14px] border border-line bg-white p-4 shadow-card">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[14.5px] font-extrabold text-ink">{r.name}</span>
                        <span className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, k) => <Star key={k} size={13} />)}</span>
                      </div>
                      <div className="mb-2 text-[12.5px] text-muted">{r.date}</div>
                      <p className="text-[14px] leading-[1.55] text-body">{r.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'availability' && (
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {(t.availability || []).map((slot) => (
                    <div key={slot} className="rounded-[12px] border border-line bg-surface px-3 py-3 text-center text-[13.5px] font-semibold text-body">
                      {slot}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sticky booking card */}
          <aside className="lg:sticky lg:top-[100px] lg:self-start">
            <div className="rounded-[20px] border border-line bg-white p-6 shadow-float">
              <div className="mb-1 flex items-baseline gap-1.5">
                <span className="text-[30px] font-extrabold text-brand">${t.price}</span>
                <span className="text-[14px] text-muted">/ hour</span>
              </div>
              <p className="mb-5 text-[13.5px] text-body">First trial lesson is free — no commitment.</p>
              <button onClick={() => router.push(`/booking?teacher=${t.slug}`)} className="btn-primary mb-2.5 w-full !py-3.5">Book a trial lesson</button>
              <button onClick={() => flash('Saved to favourites')} className="btn-ghost w-full !py-3.5">
                <Icon name="heart" size={16} /> Save to favourites
              </button>
              <div className="mt-5 space-y-2.5 border-t border-line pt-5 text-[13.5px]">
                <Fact label="Languages" value={t.languages.join(', ')} />
                <Fact label="Response time" value="Within a few hours" />
                <Fact label="Lessons given" value={`${t.reviews * 6}+`} />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </SiteShell>
  );
}

function Fact({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted">{label}</span>
      <span className="text-right font-semibold text-ink">{value}</span>
    </div>
  );
}
