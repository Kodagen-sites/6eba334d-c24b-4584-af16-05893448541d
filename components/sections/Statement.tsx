import { FadeUp, TextReveal } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

export default function Statement() {
  const { eyebrow, headline, body } = siteConfig.statement;
  return (
    <section className="relative section-pad-lg px-6 md:px-12 overflow-hidden bg-[color:var(--bg-tertiary)] border-t border-white/5">
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />
      <div className="absolute -top-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <FadeUp>
          <div className="eyebrow mb-6">{eyebrow}</div>
        </FadeUp>
        <TextReveal
          as="h2"
          className="font-display font-medium text-[68px] sm:text-[120px] md:text-[180px] lg:text-[240px] leading-[0.86] tracking-tighter text-ink"
          stagger={0.08}
        >
          {headline}
        </TextReveal>
        <FadeUp delay={0.4}>
          <p className="mt-10 max-w-xl text-base md:text-lg text-ink/75 leading-relaxed">
            {body}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
