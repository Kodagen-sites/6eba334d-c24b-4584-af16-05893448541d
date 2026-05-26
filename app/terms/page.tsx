import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Service terms for ${siteConfig.company.name} — the contract you agree to when you sign up.`,
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-ink/80">
      <div className="eyebrow mb-5">Legal</div>
      <h1 className="font-display text-4xl md:text-6xl text-ink font-medium tracking-tight mb-6">Terms of Service</h1>
      <p className="text-sm font-mono text-ink/55 mb-10">Effective 2026-05-26</p>

      <Section title="1. The contract">
        <p>
          These terms govern use of {siteConfig.company.legalName}'s observability platform.
          By creating an account, you agree to them. If you sign an Order Form, the Order
          Form controls where it differs.
        </p>
      </Section>

      <Section title="2. Free tier">
        <p>
          The first 50 million events per month are free, indefinitely. We never charge
          retroactively if you exceed the free tier — we notify you, and you choose to
          upgrade or sample down.
        </p>
      </Section>

      <Section title="3. Acceptable use">
        <ul>
          <li>Don't ship personal data you don't have a lawful basis to send.</li>
          <li>Don't probe other tenants. We log every cross-tenant access attempt.</li>
          <li>Don't bench us against competitors and publish results without our review.</li>
        </ul>
      </Section>

      <Section title="4. SLA">
        <p>
          99.99% uptime on the Pro tier, measured monthly. Service credits per the SLA
          schedule available at /trust/sla. Cumulative cap: 30% of monthly fee.
        </p>
      </Section>

      <Section title="5. Termination">
        <p>
          Delete your account at any time via the dashboard. Data is purged within 30
          days. We may suspend accounts that breach Section 3, with 7 days' notice
          except for active security incidents (immediate).
        </p>
      </Section>

      <Section title="6. Liability">
        <p>
          Liability is capped at the fees paid in the prior 12 months. We do not
          exclude liability for fraud, willful misconduct or anything that cannot
          legally be excluded.
        </p>
      </Section>

      <Section title="7. Law">
        <p>
          Delaware law, with arbitration in San Francisco for US customers and London
          for UK/EU customers, per the addendum you signed at onboarding.
        </p>
      </Section>

      <Section title="8. Contact">
        <p>
          Legal:{" "}
          <a href="mailto:legal@pulse.digital" className="text-primary hover:text-accent">
            legal@pulse.digital
          </a>
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl md:text-2xl text-ink font-medium tracking-tight mb-3">{title}</h2>
      <div className="space-y-3 text-base leading-relaxed [&_a]:underline [&_a]:decoration-primary/40 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
        {children}
      </div>
    </section>
  );
}
