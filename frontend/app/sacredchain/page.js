'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChainShell } from '@/components/Shell';
import { Icon, Star } from '@/components/icons';
import { Api } from '@/lib/api';
import { useToast } from '@/components/Toast';

export default function SacredChainPage() {
  const { flash } = useToast();
  const [services, setServices] = useState([]);
  const [steps, setSteps] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    Api.services().then((d) => { setServices(d.services); setSteps(d.steps); }).catch(() => {});
    Api.providers().then((d) => setProviders(d.providers)).catch(() => {});
  }, []);

  return (
    <ChainShell>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#16306E] to-chain-deep text-white">
        <div className="container-x py-20">
          <div className="max-w-[680px]">
            <span className="rounded-full bg-white/14 px-3 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[1.2px]">Shariah advisory for business</span>
            <h1 className="mt-5 text-[48px] font-extrabold leading-[1.08] tracking-[-1.4px]">Shariah expertise,<br />delivered on demand.</h1>
            <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-white/80">
              Connect with verified scholars and specialist firms for halal certification, zakat, inheritance, wills and Islamic finance compliance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <button onClick={() => flash('Request brief started — a specialist will respond shortly')} className="sk-btn rounded-[12px] bg-white px-6 py-3.5 text-[15px] font-bold text-chain-deep">Post a brief</button>
              <button onClick={() => flash('An advisor will reach out shortly, in sha’ Allah')} className="sk-btn rounded-[12px] border border-white/30 bg-white/10 px-6 py-3.5 text-[15px] font-bold text-white">Talk to an advisor</button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-7 text-[13px] font-semibold text-white/55">
              <span>Trusted by mosques · charities · fintechs · family offices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-x py-16">
        <h2 className="mb-2 text-[30px] font-extrabold tracking-[-.8px] text-chain-navy">Services</h2>
        <p className="mb-8 text-[15.5px] text-[#5A6478]">Fixed-quote, scholar-verified engagements.</p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} href={`/sacredchain/${s.slug}`} className="sk-card flex flex-col rounded-[18px] border border-[#E6EAF6] bg-white p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[13px] bg-chain-tint text-2xl">{s.icon}</div>
              <span className="mb-2 inline-block w-fit rounded-full bg-chain-tint px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-chain">{s.cat}</span>
              <h3 className="mb-2 text-[18px] font-extrabold text-chain-navy">{s.name}</h3>
              <p className="mb-4 flex-1 text-[14px] leading-[1.5] text-[#5A6478]">{s.desc}</p>
              <div className="flex items-center justify-between border-t border-[#EEF1F8] pt-4 text-[13px]">
                <span className="font-extrabold text-chain">from ${s.from}</span>
                <span className="text-[#8A93A6]">{s.providers} providers · {s.deliver}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-[#E6EAF6] bg-[#F6F8FE]">
        <div className="container-x py-16">
          <h2 className="mb-10 text-center text-[30px] font-extrabold tracking-[-.8px] text-chain-navy">How it works</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, i) => (
              <div key={i} className="rounded-[18px] border border-[#E6EAF6] bg-white p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] bg-chain text-[18px] font-extrabold text-white">{i + 1}</div>
                <h3 className="mb-2 text-[16px] font-extrabold text-chain-navy">{st.title}</h3>
                <p className="text-[14px] leading-[1.5] text-[#5A6478]">{st.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Providers */}
      <section className="container-x py-16">
        <h2 className="mb-8 text-[30px] font-extrabold tracking-[-.8px] text-chain-navy">Top-rated providers</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {providers.map((p) => (
            <div key={p.slug} className="rounded-[18px] border border-[#E6EAF6] bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3.5">
                <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-chain-navy text-[18px] font-extrabold text-white">{p.initials}</div>
                <div>
                  <div className="text-[16px] font-extrabold text-chain-navy">{p.name}</div>
                  <div className="text-[13px] text-[#5A6478]">{p.firm}</div>
                </div>
              </div>
              <div className="mb-3 flex items-center gap-3 text-[13px] text-[#5A6478]">
                <span className="flex items-center gap-1"><Star size={13} /> {p.rating}</span>
                <span>{p.jobs} jobs</span>
                <span>{p.country}</span>
              </div>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {p.skills.map((s) => <span key={s} className="rounded-[7px] bg-chain-tint px-2.5 py-1 text-[11.5px] font-semibold text-chain">{s}</span>)}
              </div>
              <div className="flex items-center justify-between border-t border-[#EEF1F8] pt-4">
                <span className="text-[17px] font-extrabold text-chain">${p.rate}/hr</span>
                <button onClick={() => flash(`Message sent to ${p.name}`)} className="btn-indigo !px-4 !py-2 !text-[13.5px]">Contact</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-16">
        <div className="rounded-[24px] bg-gradient-to-br from-chain-deep to-[#16306E] px-10 py-14 text-center text-white">
          <h2 className="mb-3 text-[30px] font-extrabold tracking-[-.8px]">Ready to post your brief?</h2>
          <p className="mx-auto mb-7 max-w-[480px] text-[16px] text-white/80">Describe what you need and receive scholar-verified proposals with fixed quotes.</p>
          <button onClick={() => flash('Request brief started — a specialist will respond shortly')} className="sk-btn rounded-[12px] bg-white px-7 py-3.5 text-[15px] font-bold text-chain-deep">Post a brief</button>
        </div>
      </section>
    </ChainShell>
  );
}
