import { FadeUp, StaggerChildren } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

/** TS4 — Review-Card Stack with Platform Badges. */
export default function Testimonials() {
  const { eyebrow, items } = siteConfig.testimonials;
  return (
    <section className="relative section-pad px-6 md:px-12 bg-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <FadeUp>
            <div className="eyebrow">{eyebrow}</div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="text-xs font-mono text-ink/55 tracking-[0.22em] uppercase">
              4.9 / 5 across 2,400+ reviews
            </div>
          </FadeUp>
        </div>

        <StaggerChildren staggerDelay={0.1} className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <article
              key={i}
              className="surface-card rounded-xl p-6 md:p-7 flex flex-col gap-5 hover:border-primary/40 transition-colors"
            >
              <header className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary border border-primary/30 rounded-full px-3 py-1">
                  {t.platform}
                </span>
                <span aria-label={`${t.rating} out of 5`} className="text-accent font-mono text-xs">
                  {"★".repeat(t.rating)}
                </span>
              </header>
              <blockquote className="font-display text-base md:text-lg text-ink/90 leading-relaxed font-medium">
                “{t.quote}”
              </blockquote>
              <footer className="mt-auto pt-4 border-t border-white/10">
                <div className="text-sm text-ink font-medium">{t.author}</div>
                <div className="text-xs text-ink/55 mt-0.5 font-mono">
                  {t.role} · {t.company}
                </div>
              </footer>
            </article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
