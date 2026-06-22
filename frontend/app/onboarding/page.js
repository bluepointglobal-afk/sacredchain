'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons';
import { Api } from '@/lib/api';
import { useAuth } from '@/lib/auth';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [configs, setConfigs] = useState(null);
  const [pathway, setPathway] = useState(null);
  const [step, setStep] = useState(0); // 0 = pathway, 1..N = questions, N+1 = account/result
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState('');

  useEffect(() => {
    Api.onboardingConfig().then((d) => setConfigs(d.configs)).catch(() => {});
  }, []);

  const questions = pathway && configs ? configs[pathway] : [];
  const totalQ = questions.length;

  function pickPathway(p) {
    setPathway(p);
    setStep(1);
    setAnswers({});
  }

  function select(key, value) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function next() {
    setStep((s) => s + 1);
  }
  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function finish() {
    const onboarding = { pathway, answers: { ...answers, name }, completed: true };
    try {
      sessionStorage.setItem('sk_onboarding', JSON.stringify(onboarding));
    } catch {}
    // build match filters from answers
    const subject = answers.subject || answers.interest || 'all';
    const gender = answers.gender || 'all';
    const language = answers.language && answers.language !== 'both' ? answers.language : 'all';
    const qs = new URLSearchParams({ match: '1', name: name || 'friend', subject, gender, language, track: pathway === 'seeker' ? 'seeker' : 'student' });
    if (user) router.push(`/explore?${qs.toString()}`);
    else router.push(`/signup?next=${encodeURIComponent(`/explore?${qs.toString()}`)}`);
  }

  const isPathway = step === 0;
  const isQuestion = step >= 1 && step <= totalQ;
  const isAccount = step === totalQ + 1;
  const currentQ = isQuestion ? questions[step - 1] : null;
  const answered = currentQ ? answers[currentQ.key] != null : false;
  const progress = totalQ ? Math.round(((step - 1) / totalQ) * 100) : 0;

  return (
    <div className="grid min-h-screen lg:grid-cols-[42%_58%]">
      {/* Left illustration panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand to-brand-deeper p-12 text-white lg:flex">
        <button onClick={() => (isPathway ? router.push('/') : back())} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
          <Icon name="arrowLeft" size={20} />
        </button>
        <div>
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-[26px] bg-white/12">
            <Icon name="bookOpen" size={46} strokeWidth={1.5} />
            <span className="absolute -right-2 -top-2 text-2xl">⭐</span>
          </div>
          <h2 className="mb-3 text-[28px] font-extrabold leading-tight tracking-[-.6px]">
            A few gentle questions,<br />then meet your matches.
          </h2>
          <p className="max-w-[340px] text-[15px] leading-[1.6] text-white/75">
            Your intention shapes your path. Tell us a little, and we’ll hand-pick teachers for you.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-semibold text-white/80">
          <Icon name="bookOpen" size={18} /> Sacred Knowledge
        </div>
      </div>

      {/* Right content panel */}
      <div className="relative flex items-center justify-center p-6">
        <Link href="/" className="absolute right-6 top-6 text-[13.5px] font-semibold text-muted hover:text-brand">Exit</Link>
        <div className="w-full max-w-[540px]">
          {isPathway && (
            <div className="animate-fadeUp">
              <h1 className="mb-2 text-[30px] font-extrabold tracking-[-.8px] text-ink">What brings you here?</h1>
              <p className="mb-8 text-[15.5px] text-body">Choose the path that fits you best — you can change later.</p>
              <div className="space-y-3.5">
                <PathwayRow
                  emoji="🕮"
                  title="Student of Knowledge"
                  desc="I want to study Quran, Hadith, Fiqh, Arabic and the sciences with structure."
                  onClick={() => pickPathway('student')}
                />
                <PathwayRow
                  emoji="🧭"
                  title="Curious Explorer"
                  desc="I’m drawn to Islamic history, art, language and culture — at a relaxed pace."
                  onClick={() => pickPathway('seeker')}
                />
              </div>
            </div>
          )}

          {isQuestion && currentQ && (
            <div key={currentQ.key} className="animate-fadeUp">
              <div className="mb-6">
                <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EEF0EB]">
                  <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-[12.5px] font-bold uppercase tracking-[1.2px] text-muted">
                  Question {step} of {totalQ}
                </span>
              </div>
              <h1 className="mb-2 text-[27px] font-extrabold tracking-[-.6px] text-ink">{currentQ.q}</h1>
              <p className="mb-6 text-[15px] text-body">{currentQ.sub}</p>
              <div className="space-y-2.5">
                {currentQ.options.map((o) => {
                  const sel = answers[currentQ.key] === o.value;
                  return (
                    <button
                      key={o.value}
                      onClick={() => select(currentQ.key, o.value)}
                      className={`flex w-full items-center gap-3.5 rounded-[14px] border p-3.5 text-left transition ${
                        sel ? 'border-brand bg-brand-tint' : 'border-line bg-white hover:bg-[#F6F7F3]'
                      }`}
                    >
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[11px] bg-brand-tint text-[18px]">{o.icon}</span>
                      <span className="flex-1">
                        <span className="block text-[15px] font-bold text-[#16382E]">{o.label}</span>
                        {o.desc ? <span className="block text-[13px] text-muted">{o.desc}</span> : null}
                      </span>
                      <span className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 ${sel ? 'border-brand' : 'border-[#D0D6CE]'}`}>
                        {sel && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={next}
                disabled={!answered}
                className={`mt-7 w-full rounded-[12px] py-3.5 text-[15px] font-bold transition ${
                  answered ? 'bg-brand text-white shadow-btn sk-btn' : 'cursor-not-allowed bg-[#E7EAE4] text-[#A7AFA6]'
                }`}
              >
                Continue
              </button>
            </div>
          )}

          {isAccount && (
            <div className="animate-fadeUp">
              <span className="text-[12.5px] font-bold uppercase tracking-[1.2px] text-muted">Last step</span>
              <h1 className="mb-2 mt-2 text-[28px] font-extrabold tracking-[-.6px] text-ink">What should we call you?</h1>
              <p className="mb-6 text-[15px] text-body">We’ll personalise your matches.</p>
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-bold text-[#54605A]">Your name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amina"
                  className="w-full rounded-[11px] border border-[#E5DFD1] px-4 py-3 text-[15px] outline-none focus:border-brand"
                />
              </label>
              <button
                onClick={finish}
                disabled={!name.trim()}
                className={`mt-7 w-full rounded-[12px] py-3.5 text-[15px] font-bold transition ${
                  name.trim() ? 'bg-brand text-white shadow-btn sk-btn' : 'cursor-not-allowed bg-[#E7EAE4] text-[#A7AFA6]'
                }`}
              >
                See my matches
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PathwayRow({ emoji, title, desc, onClick }) {
  return (
    <button onClick={onClick} className="sk-card flex w-full items-center gap-4 rounded-[16px] border border-line bg-white p-5 text-left">
      <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[14px] bg-brand-tint text-[26px]">{emoji}</span>
      <span className="flex-1">
        <span className="block text-[18px] font-extrabold text-[#16382E]">{title}</span>
        <span className="block text-[14px] leading-[1.5] text-body">{desc}</span>
      </span>
      <Icon name="arrow" size={20} className="text-brand" />
    </button>
  );
}
