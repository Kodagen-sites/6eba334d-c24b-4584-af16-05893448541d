import { FadeUp, NumberCounter } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

/** ST1 — Three-Across Counters (4 here since brand has 4 meaningful numbers). */
export default function Stats() {
  const { eyebrow, items } = siteConfig.stats;
  return (
    <section className="relative section-pad px-6 md:px-12 bg-[color:var(--bg-accent)] border-y border-accent/15">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="eyebrow mb-10">{eyebrow}</div>
        </FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {items.map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.1}>
              <div>
                <div className="font-display font-medium text-5xl md:text-7xl text-ink tracking-tight leading-none flex items-baseline gap-1">
                  <NumberCounter to={item.value} />
                  <span className="text-primary text-3xl md:text-5xl">{item.suffix}</span>
                </div>
                <div className="mt-4 text-sm font-mono text-ink/65 uppercase tracking-[0.18em] leading-snug">
                  {item.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
