import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import CtaSection from "@/components/sections/CtaSection";
import { FadeUp, StaggerChildren, CardTiltLayer } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Services — The platform, module by module",
  description:
    "Distributed tracing, metrics without cardinality caps, log search, anomaly detection, incident replay, integrations. One auth, one bill, one API.",
};

export default function ServicesPage() {
  const { img } = siteConfig.assets;
  return (
    <>
      <PageHero
        eyebrow="Services · Modules"
        title="One platform. Six modules. Every signal."
        intro="Each module ships independently and queries the same typed signal graph. Adopt one. Migrate the next month. Cancel the four tools you replaced."
        image={img("section-services-hero")}
      />

      <section className="section-pad px-6 md:px-12 bg-bg">
        <div className="max-w-7xl mx-auto">
          <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {siteConfig.services.map((svc) => (
              <CardTiltLayer key={svc.slug} intensity={0.16} lift={6} className="h-full">
                <ServiceCard service={svc} imageSrc={img(`service-${svc.slug}`) || undefined} />
              </CardTiltLayer>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Module deep-dives anchored from /services#slug */}
      <section className="section-pad-lg px-6 md:px-12 bg-[color:var(--bg-secondary)] border-t border-white/5">
        <div className="max-w-5xl mx-auto space-y-20">
          {siteConfig.services.map((svc) => (
            <article id={svc.slug} key={svc.slug} className="scroll-mt-32">
              <FadeUp>
                <div className="eyebrow mb-3">{svc.tagline}</div>
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="font-display text-3xl md:text-5xl text-ink font-medium tracking-tight leading-tight max-w-3xl">
                  {svc.name}
                </h2>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="mt-5 max-w-2xl text-base md:text-lg text-ink/75 leading-relaxed">
                  {svc.description}
                </p>
              </FadeUp>
              {svc.bullets && (
                <FadeUp delay={0.25}>
                  <ul className="mt-8 grid sm:grid-cols-3 gap-3 max-w-3xl">
                    {svc.bullets.map((b) => (
                      <li
                        key={b}
                        className="surface-card rounded-lg p-4 text-sm font-mono text-ink/75 flex items-start gap-2"
                      >
                        <span className="text-primary">→</span> {b}
                      </li>
                    ))}
                  </ul>
                </FadeUp>
              )}
              <FadeUp delay={0.35}>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.22em] text-primary hover:text-accent transition-colors"
                  >
                    Talk to engineering →
                  </Link>
                </div>
              </FadeUp>
            </article>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
