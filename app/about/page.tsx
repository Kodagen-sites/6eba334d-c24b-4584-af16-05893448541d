import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Stats from "@/components/sections/Stats";
import CtaSection from "@/components/sections/CtaSection";
import { FadeUp, StaggerChildren } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pulse Digital is built by engineers who shipped distributed systems at Stripe, Datadog and Cloudflare. The thesis: every signal belongs in one typed graph.",
};

/** AB2 — Industry Hero + Bold Contrast Headline. */
export default function AboutPage() {
  const { img } = siteConfig.assets;
  const principles = [
    {
      h: "Signals over symptoms.",
      b: "Traces, metrics and logs encode the same causal graph in three sample formats. We store them as one graph, not three silos.",
    },
    {
      h: "Latency is a feature.",
      b: "If a dashboard takes more than a second to load, the SRE patches over the lag with a worse mental model. We refuse to ship that.",
    },
    {
      h: "Cost is a UX bug.",
      b: "Per-event pricing means engineers stop deleting telemetry they don't 'have budget' for. The graph is only useful when it's complete.",
    },
    {
      h: "Replay or it didn't happen.",
      b: "Post-mortems written without the actual on-call view are fiction. Pulse records the operator's exact pane, frame by frame.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="About · Series A · 2024"
        title="Built by engineers who measure their own work."
        intro="Pulse Digital was started in 2024 by three former staff engineers from Stripe, Datadog and Cloudflare. We shipped distributed systems for a decade. We hated the observability bill more than we hated the bugs."
        image={img("section-about-hero")}
      />

      {/* Bold contrast manifesto */}
      <section className="section-pad-lg bg-bg border-y border-white/5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <FadeUp>
              <div className="eyebrow mb-3">Thesis</div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-4xl md:text-6xl text-ink font-medium tracking-tight leading-[1.05]">
                Every signal belongs in{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  one typed graph.
                </span>
              </h2>
            </FadeUp>
          </div>
          <StaggerChildren staggerDelay={0.1} className="md:col-span-7 space-y-6">
            {principles.map((p) => (
              <div key={p.h} className="border-l-2 border-primary/40 pl-6">
                <h3 className="font-display text-xl md:text-2xl text-ink font-medium tracking-tight">
                  {p.h}
                </h3>
                <p className="mt-2 text-base text-ink/70 leading-relaxed">{p.b}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <Stats />

      <section className="section-pad px-6 md:px-12 bg-bg border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="eyebrow mb-3">Funded by</div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-display text-2xl md:text-4xl text-ink/85 font-medium tracking-tight leading-snug max-w-3xl">
              Backed by Sequoia, Index Ventures and operating engineers from Cloudflare, GitLab, Datadog and Honeycomb.
            </p>
          </FadeUp>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
