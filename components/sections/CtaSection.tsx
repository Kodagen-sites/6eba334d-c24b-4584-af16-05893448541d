import Link from "next/link";
import { FadeUp, MagneticButton, TextReveal } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

/** CTA1 — Centered Oversized Type on a moody photo/parallax background. */
export default function CtaSection() {
  const { eyebrow, heading, body, primaryCta, secondaryCta } = siteConfig.ctaBlock;
  const { img } = siteConfig.assets;
  return (
    <section className="relative overflow-hidden section-pad-lg border-y border-white/10 bg-bg">
      <img
        src={img("section-cta")}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/85 via-bg/65 to-bg" />
      <div className="absolute inset-0 tech-grid opacity-20" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="eyebrow mb-6 justify-center inline-flex items-center gap-2">
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {eyebrow}
          </div>
        </FadeUp>
        <TextReveal
          as="h2"
          className="font-display text-5xl md:text-7xl lg:text-8xl text-ink font-medium tracking-tight leading-[0.95]"
          stagger={0.05}
        >
          {heading}
        </TextReveal>
        <FadeUp delay={0.4}>
          <p className="mt-6 text-base md:text-lg text-ink/75 max-w-xl mx-auto leading-relaxed">
            {body}
          </p>
        </FadeUp>
        <FadeUp delay={0.55}>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <MagneticButton
              as="a"
              href={primaryCta.href}
              className="min-h-[52px] px-8 py-4 rounded-full bg-primary text-bg font-display font-medium hover:brightness-110 shadow-[0_10px_40px_-10px_rgba(6,182,212,0.55)]"
            >
              {primaryCta.label}
            </MagneticButton>
            <Link
              href={secondaryCta.href}
              className="min-h-[52px] px-8 py-4 rounded-full border border-accent/30 text-ink font-display font-medium hover:bg-white/5 inline-flex items-center justify-center transition-colors"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.7}>
          <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] font-mono text-ink/55 uppercase tracking-[0.22em]">
            {siteConfig.trustBar.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
