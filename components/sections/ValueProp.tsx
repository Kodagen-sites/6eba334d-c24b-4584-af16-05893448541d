import { FadeUp, TextReveal } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

export default function ValueProp() {
  const { eyebrow, heading, body } = siteConfig.valueProp;
  return (
    <section className="relative section-pad px-6 md:px-12 bg-bg border-t border-white/5">
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-4">
          <FadeUp>
            <div className="eyebrow">{eyebrow}</div>
          </FadeUp>
        </div>
        <div className="md:col-span-8">
          <TextReveal
            as="h2"
            className="font-display text-3xl md:text-5xl lg:text-6xl text-ink font-medium tracking-tight leading-[1.05]"
            stagger={0.04}
          >
            {heading}
          </TextReveal>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-ink/75 leading-relaxed">
              {body}
            </p>
          </FadeUp>
          <FadeUp delay={0.35}>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Spans", "Metrics", "Logs", "Traces", "Replay"].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65 border border-accent/20 rounded-full px-4 py-2 bg-white/[0.02]"
                >
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
