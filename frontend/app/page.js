'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/Shell';
import TeacherCard from '@/components/TeacherCard';
import { Icon, Star, Stars } from '@/components/icons';
import { Api } from '@/lib/api';

const STATS = [
  ['2,400+', 'learners guided'],
  ['320', 'vetted teachers'],
  ['18', 'subjects'],
  ['40+', 'countries'],
];

const PILLARS = [
  { icon: 'shield', title: 'Verified, ijazah-checked', body: 'Every teacher is vetted for credentials and chains of transmission. You learn from those who truly carry the knowledge.' },
  { icon: 'compass', title: 'Matched to your path', body: 'Whether you seek a structured curriculum or a relaxed cultural journey, we connect you with the right guide.' },
  { icon: 'hands', title: 'Learning with adab', body: 'A respectful, focused environment that honours Islamic etiquette — for Muslims and curious minds alike.' },
];

const STEPS = [
  { n: 1, title: 'Tell us your intention', body: 'Answer a few gentle questions about your goals, level and pace — for you or your child.' },
  { n: 2, title: 'Meet your matches', body: 'Review hand-matched teachers, watch intros, and book a trial to find the right fit.' },
  { n: 3, title: 'Learn & grow', body: 'Attend live sessions, track progress, reflect in your journal, and carry the knowledge forward.' },
];

const SC_TILES = [
  ['Halal Certification', 'Audit & compliance'],
  ['Zakat Advisory', 'Per madhab'],
  ['Faraid', 'Inheritance'],
  ['Islamic Finance', 'Shariah audit'],
];

export default function LandingPage() {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    Api.teachers('?featured=true').then((d) => setTeachers(d.teachers.slice(0, 4))).catch(() => {});
    Api.subjects().then((d) => setSubjects(d.subjects)).catch(() => {});
    Api.testimonials().then((d) => setTestimonials(d.testimonials)).catch(() => {});
  }, []);

  return (
    <SiteShell>
      <main>
        {/* HERO */}
        <section className="relative bg-[radial-gradient(120%_90%_at_80%_-10%,#EAF5EF_0%,#fff_60%)]">
          <div className="container-x grid items-center gap-14 py-16 lg:grid-cols-[1.06fr_.94fr]">
            <div className="animate-fadeUp">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E1EAE3] bg-white py-1.5 pl-1.5 pr-3.5 text-[12.5px] font-semibold text-[#3C6B58] shadow-[0_4px_14px_-8px_rgba(15,92,70,.3)]">
                <span className="rounded-full bg-brand px-2.5 py-[3px] text-[11px] font-bold text-white">New</span>
                <span className="text-[#5B6660]">320 ijazah-verified teachers across 40+ countries</span>
              </div>
              <h1 className="mb-5 text-[44px] font-extrabold leading-[1.05] tracking-[-1.8px] text-[#0E211A] md:text-[56px]">
                Find your<br />Quran &amp; Islamic<br /><span className="text-brand">studies teacher</span>
              </h1>
              <p className="mb-7 max-w-[460px] text-[18px] leading-[1.6] text-[#54605A]">
                1-on-1 lessons in Quran, Tajweed, Arabic, Hadith and more — with patient, vetted teachers. Book a trial and start this week.
              </p>
              <div className="flex max-w-[520px] items-center gap-2 rounded-[16px] border border-[#E4EAE3] bg-white p-2 shadow-float">
                <div className="flex flex-1 items-center gap-2.5 px-3">
                  <Icon name="search" size={20} className="text-muted" />
                  <input placeholder="Try “Tajweed” or “Quran for kids”" className="w-full bg-transparent text-[15px] outline-none" />
                </div>
                <Link href="/explore" className="btn-primary !shadow-none whitespace-nowrap">Find a teacher</Link>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="text-[13px] font-semibold text-muted">Popular:</span>
                {['Quran memorization', 'Tajweed', 'Arabic'].map((p) => (
                  <Link key={p} href="/explore" className="sk-btn rounded-full border border-[#E4EAE3] bg-white px-3 py-1.5 text-[13px] font-semibold text-body">
                    {p}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative animate-fadeUp">
              <div className="relative aspect-[5/5.4] overflow-hidden rounded-[24px] shadow-[0_40px_80px_-34px_rgba(14,55,42,.5)]">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80&auto=format&fit=crop"
                  alt="Teacher and student"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,40,30,.4)]" />
              </div>
              <div className="absolute -left-[18px] -top-4 flex animate-float items-center gap-3 rounded-[16px] bg-white p-3.5 shadow-[0_18px_40px_-18px_rgba(14,55,42,.4)]">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-brand-tint text-brand">
                  <Icon name="check" size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[13px] font-extrabold text-[#16382E]">Ijazah verified</div>
                  <div className="text-[11.5px] text-muted">Al-Azhar · Madinah</div>
                </div>
              </div>
              <div className="absolute -right-[18px] bottom-6 animate-floatSlow rounded-[16px] bg-white p-3.5 shadow-[0_18px_40px_-18px_rgba(14,55,42,.4)]">
                <div className="flex items-center gap-1.5">
                  <Star size={16} /><span className="text-[15px] font-extrabold text-[#16382E]">4.9</span>
                  <span className="text-[12px] text-muted">avg rating</span>
                </div>
                <div className="mt-1 text-[11.5px] text-muted">from 6,200+ trial lessons</div>
              </div>
            </div>
          </div>
        </section>

        {/* STAT STRIP */}
        <section className="border-y border-[#EEF0EB] bg-surface">
          <div className="container-x flex flex-wrap items-center justify-around gap-5 py-6">
            {STATS.map(([n, l], i) => (
              <div key={l} className="flex items-center gap-5">
                {i > 0 && <div className="hidden h-[34px] w-px bg-[#E6E9E2] sm:block" />}
                <div className="text-center">
                  <div className="text-[24px] font-extrabold text-brand">{n}</div>
                  <div className="mt-0.5 text-[13px] text-muted">{l}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SUBJECTS */}
        <section className="container-x pb-4 pt-16">
          <SectionHead title="Browse by subject" sub="Pick where you want to focus — teachers for every level." href="/explore" link="All subjects" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {subjects.map((s) => (
              <Link key={s.name} href="/explore" className="sk-card flex flex-col gap-3 rounded-[16px] border border-line bg-white p-5 shadow-card">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-brand-tint text-brand">
                  <Icon name="book" size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="mb-0.5 text-[16.5px] font-extrabold text-[#16382E]">{s.name}</div>
                  <div className="text-[13px] leading-[1.4] text-muted">{s.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED TEACHERS */}
        <section className="container-x pb-4 pt-14">
          <SectionHead title="Meet top-rated teachers" sub="Watch a short intro and book a trial that fits your schedule." href="/explore" link="All teachers" />
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((t) => <TeacherCard key={t.slug} teacher={t} />)}
          </div>
        </section>

        {/* PILLARS */}
        <section className="container-x py-16">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-[18px] border border-[#EEF0EB] bg-surface p-7">
                <div className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-brand-tint text-brand">
                  <Icon name={p.icon} size={24} strokeWidth={1.8} />
                </div>
                <h3 className="mb-2 text-[18px] font-extrabold tracking-[-.3px] text-[#16382E]">{p.title}</h3>
                <p className="text-[14.5px] leading-[1.55] text-[#5B6660]">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-y border-[#EEF0EB] bg-surface">
          <div className="container-x py-16">
            <div className="mb-11 text-center">
              <h2 className="mb-2 text-[30px] font-extrabold tracking-[-.8px] text-ink">Start in three simple steps</h2>
              <p className="text-[15.5px] text-[#6B776F]">From “where do I begin?” to your first lesson — in minutes.</p>
            </div>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n} className="text-center">
                  <div className="mx-auto mb-4 flex h-[54px] w-[54px] items-center justify-center rounded-[16px] bg-brand text-[22px] font-extrabold text-white">{s.n}</div>
                  <h3 className="mb-2 text-[17px] font-extrabold text-[#16382E]">{s.title}</h3>
                  <p className="mx-auto max-w-[300px] text-[14px] leading-[1.55] text-[#5B6660]">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/onboarding" className="btn-primary !px-[30px] !py-3.5 !text-[15.5px]">Find my teacher</Link>
            </div>
          </div>
        </section>

        {/* SACREDCHAIN TEASER */}
        <section className="container-x py-16">
          <div className="relative grid items-center gap-10 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#16306E] to-chain-deep p-12 md:grid-cols-[1.1fr_.9fr]">
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[.14] px-3 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[1.2px] text-white">For business</div>
              <h2 className="mb-3.5 text-[32px] font-extrabold leading-[1.15] tracking-[-.8px] text-white">Shariah expertise,<br />on demand.</h2>
              <p className="mb-6 max-w-[440px] text-[16px] leading-[1.6] text-white/[.78]">
                SacredChain connects organisations with verified scholars for halal certification, zakat advisory, inheritance (faraid), wills and Islamic finance compliance.
              </p>
              <Link href="/sacredchain" className="sk-btn inline-flex items-center gap-2 rounded-[12px] bg-white px-6 py-3 text-[15px] font-bold text-chain-deep">
                Explore SacredChain <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-3">
              {SC_TILES.map(([t, s]) => (
                <div key={t} className="rounded-[14px] border border-white/[.16] bg-white/10 p-4">
                  <div className="text-[13.5px] font-extrabold text-white">{t}</div>
                  <div className="mt-0.5 text-[12px] text-white/60">{s}</div>
                </div>
              ))}
            </div>
            <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/[.06]" />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="container-x px-7 pb-16 pt-4">
          <div className="mb-10 text-center">
            <h2 className="text-[30px] font-extrabold tracking-[-.8px] text-ink">Loved by learners &amp; parents</h2>
          </div>
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
            {testimonials.map((r) => (
              <div key={r.name} className="rounded-[18px] border border-line bg-white p-6 shadow-card">
                <div className="mb-3.5"><Stars /></div>
                <p className="mb-4 text-[15px] leading-[1.6] text-[#37433C]">{r.quote}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-[15px] font-extrabold text-white">{r.initials}</div>
                  <div>
                    <div className="text-[14px] font-extrabold text-[#16382E]">{r.name}</div>
                    <div className="text-[12.5px] text-muted">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-x px-7 pb-[72px]">
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-brand to-brand-deeper px-10 py-14 text-center">
            <h2 className="relative z-10 mb-3 text-[34px] font-extrabold tracking-[-1px] text-white">Begin your journey today</h2>
            <p className="relative z-10 mx-auto mb-7 max-w-[520px] text-[16.5px] text-white/80">
              Connect with a trusted teacher and book your first trial lesson — no commitment, no pressure.
            </p>
            <div className="relative z-10 flex flex-wrap justify-center gap-3.5">
              <Link href="/onboarding" className="sk-btn rounded-[13px] bg-white px-[30px] py-3.5 text-[15.5px] font-bold text-brand">Find my teacher</Link>
              <Link href="/explore" className="sk-btn rounded-[13px] border border-white/30 bg-white/[.12] px-[30px] py-3.5 text-[15.5px] font-bold text-white">Browse teachers</Link>
            </div>
            <div className="absolute -bottom-[70px] -left-[70px] h-60 w-60 rounded-full bg-white/[.05]" />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

function SectionHead({ title, sub, href, link }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="mb-1.5 text-[30px] font-extrabold tracking-[-.8px] text-ink">{title}</h2>
        <p className="text-[15.5px] text-[#6B776F]">{sub}</p>
      </div>
      <Link href={href} className="flex items-center gap-1.5 text-[14.5px] font-bold text-brand hover:underline">
        {link} <Icon name="arrow" size={16} />
      </Link>
    </div>
  );
}
