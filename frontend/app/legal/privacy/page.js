import { SiteShell } from '@/components/Shell';

export const metadata = { title: 'Privacy Policy — Sacred Knowledge' };

export default function PrivacyPage() {
  return (
    <SiteShell>
      <main className="container-x max-w-[760px] py-12 pb-20">
        <h1 className="mb-2 text-[32px] font-extrabold tracking-[-.8px] text-ink">Privacy Policy</h1>
        <p className="mb-8 text-[14px] text-muted">Last updated: {new Date().getFullYear()}</p>
        <div className="space-y-5 text-[15px] leading-[1.7] text-body">
          <Section t="What we collect">Account details (name, email), learning activity (bookings, progress, journal entries), and payment metadata processed by our payment provider. We do not store full card numbers.</Section>
          <Section t="How we use it">To provide the service: matching you with teachers, scheduling lessons, processing payments, and personalising your learning. We send transactional email (verification, password reset, booking confirmations).</Section>
          <Section t="AI companion">Messages you send to the AI Scholar Companion are processed to generate replies and are subject to per-user limits. Avoid sharing sensitive personal data in chat.</Section>
          <Section t="Your rights (GDPR)">You can export all your data or permanently delete your account at any time from <b>Account settings</b>. We honour access, rectification, erasure and portability requests.</Section>
          <Section t="Cookies">We use a secure, httpOnly cookie to keep you signed in (refresh token) and local storage for your short-lived access token. No third-party advertising cookies.</Section>
          <Section t="Data retention">We retain your data while your account is active. On deletion, your personal records (bookings, journal, enrolments) are erased.</Section>
          <Section t="Contact">Privacy questions or requests: privacy@sacredknowledge.app.</Section>
        </div>
      </main>
    </SiteShell>
  );
}

function Section({ t, children }) {
  return (
    <div>
      <h2 className="mb-1.5 text-[18px] font-extrabold text-ink">{t}</h2>
      <p>{children}</p>
    </div>
  );
}
