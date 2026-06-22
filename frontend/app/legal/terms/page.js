import { SiteShell } from '@/components/Shell';

export const metadata = { title: 'Terms of Service — Sacred Knowledge' };

export default function TermsPage() {
  return (
    <SiteShell>
      <main className="container-x max-w-[760px] py-12 pb-20">
        <h1 className="mb-2 text-[32px] font-extrabold tracking-[-.8px] text-ink">Terms of Service</h1>
        <p className="mb-8 text-[14px] text-muted">Last updated: {new Date().getFullYear()}</p>
        <div className="space-y-5 text-[15px] leading-[1.7] text-body">
          <Section t="1. Acceptance of terms">By creating an account or booking a lesson, you agree to these Terms. If you do not agree, please do not use Sacred Knowledge.</Section>
          <Section t="2. The service">Sacred Knowledge is a marketplace connecting learners with independent teachers, and (via SacredChain) organisations with verified scholars. We facilitate discovery, scheduling, payments and live sessions; teachers and scholars are responsible for the content of their lessons and advice.</Section>
          <Section t="3. Accounts">You are responsible for safeguarding your password and for all activity under your account. You must provide accurate information and be at least the age of majority in your jurisdiction (or have guardian consent for a child learner).</Section>
          <Section t="4. Payments & refunds">Trial lessons are free. Paid lessons and course bundles are charged via our payment processor. Refunds are handled per the cancellation policy shown at checkout.</Section>
          <Section t="5. Conduct">Use the platform with adab and respect. Harassment, misrepresentation of credentials, or unlawful activity may result in account termination.</Section>
          <Section t="6. Religious content disclaimer">Educational content and AI responses are for learning and reflection. For rulings specific to your situation, consult a qualified local scholar.</Section>
          <Section t="7. Limitation of liability">The service is provided “as is”. To the maximum extent permitted by law, Sacred Knowledge is not liable for indirect or consequential damages arising from use of the platform.</Section>
          <Section t="8. Contact">Questions about these Terms? Email legal@sacredknowledge.app.</Section>
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
