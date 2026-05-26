import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.company.name} collects, processes and stores personal data — written by a human, not a generator.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-ink/80">
      <div className="eyebrow mb-5">Legal</div>
      <h1 className="font-display text-4xl md:text-6xl text-ink font-medium tracking-tight mb-6">Privacy Policy</h1>
      <p className="text-sm font-mono text-ink/55 mb-10">Last updated: 2026-05-26</p>

      <Section title="1. Who we are">
        <p>
          {siteConfig.company.legalName} (“{siteConfig.company.name}”, “we”) is a US-incorporated
          observability platform with EU and UK data residency options. Registered office:
          San Francisco, CA. EU representative on file with our DPO.
        </p>
      </Section>

      <Section title="2. What we collect from your visit">
        <ul>
          <li>Page URLs and referrers (used for product analytics, retained 30 days)</li>
          <li>Device class and country (resolved server-side from IP, IP itself is not stored)</li>
          <li>Form submissions you send via the Contact page</li>
          <li>Cookies: a single session cookie when you log into a tenant</li>
        </ul>
      </Section>

      <Section title="3. What customer data we process">
        <p>
          When you instrument your stack with Pulse, you send us spans, metrics and logs.
          You remain the controller of that data. We act as processor under the terms of
          our DPA. We never train models on customer telemetry.
        </p>
      </Section>

      <Section title="4. Retention">
        <ul>
          <li>Telemetry: 30 days by default, extendable per contract</li>
          <li>Account metadata: until account deletion plus 90 days for audit</li>
          <li>Billing records: 7 years (US/EU tax law)</li>
        </ul>
      </Section>

      <Section title="5. Your rights (GDPR / UK GDPR / CCPA)">
        <p>
          Access, rectify, port and erase your data by emailing{" "}
          <a href="mailto:privacy@pulse.digital" className="text-primary hover:text-accent">
            privacy@pulse.digital
          </a>
          . Responses within 30 days.
        </p>
      </Section>

      <Section title="6. Sub-processors">
        <p>
          A current list of sub-processors (cloud, payments, email) is maintained at
          /trust/subprocessors. We notify customers in writing 30 days before adding any.
        </p>
      </Section>

      <Section title="7. Contact">
        <p>
          Privacy inquiries:{" "}
          <a href="mailto:privacy@pulse.digital" className="text-primary hover:text-accent">
            privacy@pulse.digital
          </a>
          <br />
          DPO:{" "}
          <a href="mailto:dpo@pulse.digital" className="text-primary hover:text-accent">
            dpo@pulse.digital
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
