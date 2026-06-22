'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChainShell } from '@/components/Shell';
import { Icon, Star } from '@/components/icons';
import { Api } from '@/lib/api';
import { useToast } from '@/components/Toast';

const INCLUDES = [
  'Verified, credentialled specialist',
  'Fixed quote agreed up front',
  'Secure document exchange',
  'Certified deliverable & audit trail',
  'Post-delivery clarifications included',
];

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { flash } = useToast();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Api.service(slug).then(setData).catch(() => setError(true));
  }, [slug]);

  if (error) return <ChainShell><div className="container-x py-24 text-center text-[#5A6478]">Service not found.</div></ChainShell>;
  if (!data) return <ChainShell><div className="container-x py-24 text-center text-[#8A93A6]">Loading…</div></ChainShell>;
  const { service: s, providers } = data;

  return (
    <ChainShell>
      <div className="bg-[#F6F8FE]">
        <div className="container-x py-10">
          <nav className="mb-6 flex items-center gap-2 text-[13px] text-[#5A6478]">
            <Link href="/sacredchain" className="hover:text-chain">SacredChain</Link>
            <Icon name="arrow" size={12} />
            <span className="font-semibold text-chain-navy">{s.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
            <div>
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-[16px] bg-chain-tint text-3xl">{s.icon}</div>
                <div>
                  <span className="rounded-full bg-chain-tint px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-chain">{s.cat}</span>
                  <h1 className="mt-2 text-[30px] font-extrabold tracking-[-.8px] text-chain-navy">{s.name}</h1>
                </div>
              </div>
              <p className="mb-7 text-[16px] leading-[1.6] text-[#475066]">{s.desc}</p>

              <div className="mb-8 rounded-[18px] border border-[#E6EAF6] bg-white p-6">
                <h3 className="mb-4 text-[16px] font-extrabold text-chain-navy">What’s included</h3>
                <ul className="space-y-2.5">
                  {(s.includes || INCLUDES).map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-[14.5px] text-[#475066]">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-chain-tint text-chain"><Icon name="check" size={12} strokeWidth={3} /></span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="mb-4 text-[18px] font-extrabold text-chain-navy">Specialists for this service</h3>
              <div className="space-y-3.5">
                {providers.map((p) => (
                  <div key={p.slug} className="flex items-center gap-4 rounded-[16px] border border-[#E6EAF6] bg-white p-4 shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-chain-navy text-[15px] font-extrabold text-white">{p.initials}</div>
                    <div className="flex-1">
                      <div className="text-[15px] font-extrabold text-chain-navy">{p.name}</div>
                      <div className="flex items-center gap-2.5 text-[12.5px] text-[#5A6478]"><Star size={12} /> {p.rating} · {p.jobs} jobs · {p.country}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[15px] font-extrabold text-chain">${p.rate}/hr</div>
                      <button onClick={() => flash(`Message sent to ${p.name}`)} className="mt-1 text-[12.5px] font-bold text-chain hover:underline">Contact</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-[100px] lg:self-start">
              <div className="rounded-[20px] border border-[#E6EAF6] bg-white p-6 shadow-float">
                <div className="mb-1 text-[14px] text-[#5A6478]">Starting from</div>
                <div className="mb-5 text-[30px] font-extrabold text-chain">${s.from}</div>
                <button onClick={() => flash('Request brief started — a specialist will respond shortly')} className="btn-indigo mb-2.5 w-full !py-3.5">Post a brief</button>
                <button onClick={() => flash('An advisor will reach out shortly, in sha’ Allah')} className="w-full rounded-[11px] border border-[#D5DCEF] bg-white py-3.5 text-[14.5px] font-bold text-chain sk-btn">Talk to an advisor</button>
                <div className="mt-5 space-y-2.5 border-t border-[#EEF1F8] pt-5 text-[13.5px] text-[#475066]">
                  <div className="flex justify-between"><span className="text-[#8A93A6]">Providers</span><b>{s.providers}</b></div>
                  <div className="flex justify-between"><span className="text-[#8A93A6]">Turnaround</span><b>{s.deliver}</b></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </ChainShell>
  );
}
