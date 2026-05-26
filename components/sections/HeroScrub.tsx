"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site-config";
import ScrollCanvas from "@/components/ScrollCanvas";
import { MagneticButton, ScrollHint } from "@/components/motion";
import frames from "@/content/frames-manifest.json";

/**
 * Scrub-Cinematic Hero (Mode 2)
 * Wraps the page-top scroll-paced canvas player with a HO2 left-split
 * overlay (text anchored to left third). Frame data comes from
 * content/frames-manifest.json populated by `npm run gen:frames`.
 */
export default function HeroScrub() {
  const { eyebrow, h1, body, primaryCta, secondaryCta } = siteConfig.hero;
  const { posterUrl, scrollDistance } = siteConfig.scrollHero;
  const frameCount = (frames as { frameCount?: number }).frameCount ?? 0;
  const frameUrlTemplate = (frames as { frameUrlTemplate?: string }).frameUrlTemplate ?? "";

  return (
    <section className="relative bg-bg">
      <ScrollCanvas
        frameCount={frameCount}
        frameUrlTemplate={frameUrlTemplate}
        posterUrl={posterUrl}
        scrollDistance={scrollDistance}
      >
        <HeroOverlay eyebrow={eyebrow} h1={h1} body={body} primaryCta={primaryCta} secondaryCta={secondaryCta} />
      </ScrollCanvas>
    </section>
  );
}

type OverlayProps = {
  eyebrow: string;
  h1: ReadonlyArray<{ text: string; accent?: boolean }>;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

/** HO2 — Left-Split layout, H3 gradient text pattern, E2 word-split rise entrance. */
function HeroOverlay({ eyebrow, h1, body, primaryCta, secondaryCta }: OverlayProps) {
  const words = h1.flatMap((line, li) =>
    line.text.split(" ").map((w, wi) => ({
      key: `${li}-${wi}-${w}`,
      text: w,
      accent: !!line.accent,
      isLineStart: wi === 0,
    }))
  );

  return (
    <div className="absolute inset-0 px-6 md:px-12 lg:px-20 flex items-end md:items-center pb-20 md:pb-0">
      <div className="max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-5 inline-flex items-center gap-2"
        >
          <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {eyebrow}
        </motion.div>

        <h1
          className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-ink font-medium tracking-tight leading-[0.95]"
          aria-label={h1.map((l) => l.text).join(" ")}
        >
          {h1.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              {line.text.split(" ").map((w, wi) => (
                <motion.span
                  key={`${li}-${wi}`}
                  aria-hidden
                  className={
                    "inline-block mr-[0.18em] " +
                    (line.accent
                      ? "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                      : "")
                  }
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.25 + (li * 0.15 + wi * 0.05),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {w}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base md:text-lg text-ink/75 leading-relaxed max-w-md"
        >
          {body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 flex flex-col sm:flex-row gap-3"
        >
          <MagneticButton
            as="a"
            href={primaryCta.href}
            className="min-h-[52px] px-7 py-3.5 rounded-full bg-primary text-bg font-display font-medium text-sm hover:brightness-110 transition-all shadow-[0_10px_40px_-10px_rgba(6,182,212,0.55)]"
          >
            {primaryCta.label}
          </MagneticButton>
          <Link
            href={secondaryCta.href}
            className="min-h-[52px] px-7 py-3.5 rounded-full border border-accent/30 bg-white/[0.04] text-ink font-display font-medium text-sm backdrop-blur-md hover:bg-white/10 hover:border-accent/60 inline-flex items-center justify-center transition-all"
          >
            {secondaryCta.label}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-mono text-ink/50 uppercase tracking-[0.25em]"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary" />
            OTel native
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary" />
            12ms p99
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary" />
            30-day retention
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollHint />
      </div>
    </div>
  );
}
