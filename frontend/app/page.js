'use client';

import { useEffect, useState } from 'react';
import { SiteShell } from '@/components/Shell';
import TeacherCard from '@/components/TeacherCard';
import { Icon, Star, Stars } from '@/components/icons';
import Button from '@/components/ui/Button';
import Pill from '@/components/ui/Pill';
import Card from '@/components/ui/Card';
import StatBlock from '@/components/ui/StatBlock';
import SectionHeader from '@/components/ui/SectionHeader';
import NumberBadge from '@/components/ui/NumberBadge';
import GeometricTexture from '@/components/ui/GeometricTexture';
import Reveal from '@/components/ui/Reveal';
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
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-paper">
          <div className="container-x grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <Reveal>
              <div className="eyebrow mb-5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                320 ijazah-verified teachers across 40+ countries
              </div>
              <h1 className="h1-hero">
                Find your Quran &amp;<br />Islamic studies<br /><span className="text-emerald">teacher</span>
              </h1>
              <p className="mt-6 max-w-[480px] text-[18px] leading-relaxed text-muted">
                1-on-1 lessons in Quran, Tajweed, Arabic, Hadith and more — with patient, vetted teachers. Book a trial and start this week.
              </p>

              <form action="/explore" className="mt-8 flex max-w-[540px] items-center gap-2 rounded-full border border-line bg-paper p-2 shadow-float">
                <div className="flex flex-1 items-center gap-2.5 pl-4">
                  <Icon name="search" size={20} className="text-muted" />
                  <input aria-label="Search for a subject or teacher" placeholder="Try “Tajweed” or “Quran for kids”" className="w-full bg-transparent py-2 text-[15px] outline-none placeholder:text-muted" />
                </div>
                <Button href="/explore" className="whitespace-nowrap">Find a teacher</Button>
              </form>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <span className="text-[14px] font-semibold text-muted">Popular:</span>
                {['Quran memorization', 'Tajweed', 'Arabic'].map((p) => (
                  <Pill key={p} href="/explore" className="!bg-paper !text-ink border border-line hover:!bg-emerald-tint hover:!text-emerald">{p}</Pill>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative">
                {/* soft emerald panel + geometric texture behind photo */}
                <div className="absolute -right-6 -top-6 hidden h-[86%] w-[86%] rounded-[32px] bg-emerald-tint lg:block">
                  <GeometricTexture color="#0E6B4F" opacity={0.07} />
                </div>
                <div className="relative overflow-hidden rounded-[28px] border border-line shadow-float">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80&auto=format&fit=crop"
                    alt="A teacher guiding a student through Qur'an study"
                    className="aspect-[5/5.2] w-full object-cover"
                  />
                </div>
                {/* floating flat chips */}
                <div className="absolute -left-4 top-6 flex items-center gap-3 rounded-2xl border border-line bg-paper p-3.5 shadow-float sm:-left-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-tint text-emerald">
                    <Icon name="check" size={20} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-ink">Ijazah verified</div>
                    <div className="text-[12px] text-muted">Al-Azhar · Madinah</div>
                  </div>
                </div>
                <div className="absolute -right-3 bottom-8 rounded-2xl border border-line bg-paper p-3.5 shadow-float sm:-right-5">
                  <div className="flex items-center gap-1.5">
                    <Star size={16} /><span className="text-[15px] font-bold text-ink">4.9</span>
                    <span className="text-[12px] text-muted">avg rating</span>
                  </div>
                  <div className="mt-1 text-[12px] text-muted">from 6,200+ trial lessons</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ STAT BAND ============ */}
        <section className="border-y border-line bg-parchment">
          <div className="container-x grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
            {STATS.map(([v, l], i) => (
              <div key={l} className={i > 0 ? 'md:border-l md:border-line' : ''}>
                <StatBlock value={v} label={l} />
              </div>
            ))}
          </div>
        </section>

        {/* ============ BROWSE BY SUBJECT ============ */}
        <section className="container-x section-y">
          <Reveal>
            <SectionHeader
              eyebrow="18 subjects"
              title="Browse by subject"
              subtitle="Pick where you want to focus — teachers for every level."
              link={{ href: '/explore', label: 'All subjects' }}
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {subjects.map((s, i) => (
              <Reveal key={s.name} delay={i * 40}>
                <Card href="/explore" className="flex h-full flex-col gap-3.5 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-emerald-tint text-emerald">
                    <Icon name="book" size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="mb-1 font-display text-[17px] font-bold text-ink">{s.name}</div>
                    <div className="text-[13px] leading-snug text-muted">{s.sub}</div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ FEATURED TEACHERS ============ */}
        <section className="container-x pb-4">
          <Reveal>
            <SectionHeader
              eyebrow="Hand-vetted"
              title="Meet top-rated teachers"
              subtitle="Watch a short intro and book a trial that fits your schedule."
              link={{ href: '/explore', label: 'All teachers' }}
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((t, i) => (
              <Reveal key={t.slug} delay={i * 50}><TeacherCard teacher={t} /></Reveal>
            ))}
          </div>
        </section>

        {/* ============ VALUE PROPS (parchment) ============ */}
        <section className="mt-16 border-y border-line bg-parchment">
          <div className="container-x section-y grid gap-5 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="card-flat h-full p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-tint text-emerald">
                    <Icon name={p.icon} size={24} strokeWidth={1.8} />
                  </div>
                  <h3 className="mb-2 font-display text-[20px] font-bold text-ink">{p.title}</h3>
                  <p className="text-[15.5px] leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ HOW IT WORKS (emerald wash) ============ */}
        <section className="bg-emerald-tint">
          <div className="container-x section-y">
            <Reveal>
              <SectionHeader
                align="center"
                eyebrow="Start in minutes"
                title="Three simple steps"
                subtitle="From “where do I begin?” to your first lesson — with gentle guidance."
              />
            </Reveal>
            <div className="grid gap-8 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 70} className="text-center">
                  <div className="flex flex-col items-center">
                    <NumberBadge n={s.n} tone="gold" className="mb-5" />
                    <h3 className="mb-2 font-display text-[19px] font-bold text-ink">{s.title}</h3>
                    <p className="mx-auto max-w-[300px] text-[15px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button href="/onboarding" size="lg" arrow>Find my teacher</Button>
            </div>
          </div>
        </section>

        {/* ============ SACREDCHAIN (midnight, B2B) ============ */}
        <section className="relative overflow-hidden bg-midnight text-white">
          <GeometricTexture color="#ffffff" opacity={0.06} />
          <div className="container-x section-y relative grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-gold">
                For business
              </div>
              <h2 className="h2-section text-white">Shariah expertise,<br />delivered on demand.</h2>
              <p className="mt-5 max-w-[460px] text-[17px] leading-relaxed text-white/70">
                SacredChain connects organisations with verified scholars for halal certification, zakat advisory, inheritance (faraid), wills and Islamic finance compliance.
              </p>
              <div className="mt-8">
                <Button href="/sacredchain" variant="white" arrow>Explore SacredChain</Button>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-3.5">
                {SC_TILES.map(([t, s]) => (
                  <div key={t} className="rounded-2xl border border-white/15 bg-white/[.06] p-5">
                    <div className="text-[15px] font-bold text-white">{t}</div>
                    <div className="mt-1 text-[13px] text-gold">{s}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section className="container-x section-y">
          <Reveal>
            <SectionHeader align="center" eyebrow="Loved by families" title="Learners & parents on Sacred Knowledge" />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((r, i) => (
              <Reveal key={r.name} delay={i * 60}>
                <div className="card-flat h-full p-7">
                  <div className="mb-4"><Stars /></div>
                  <p className="mb-5 text-[16px] leading-relaxed text-ink/85">“{r.quote}”</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald font-display text-[15px] font-bold text-white">{r.initials}</div>
                    <div>
                      <div className="text-[14.5px] font-bold text-ink">{r.name}</div>
                      <div className="text-[13px] text-muted">{r.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ FINAL CTA (emerald) ============ */}
        <section className="container-x pb-20">
          <div className="relative overflow-hidden rounded-[28px] bg-emerald px-8 py-16 text-center text-white sm:px-16">
            <GeometricTexture color="#ffffff" opacity={0.08} />
            <div className="relative">
              <h2 className="h2-section mx-auto max-w-[620px] text-white">Begin your journey today</h2>
              <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-relaxed text-white/80">
                Connect with a trusted teacher and book your first trial lesson — no commitment, no pressure.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <Button href="/onboarding" variant="white" size="lg" arrow>Find my teacher</Button>
                <Button href="/explore" variant="outlineWhite" size="lg">Browse teachers</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
