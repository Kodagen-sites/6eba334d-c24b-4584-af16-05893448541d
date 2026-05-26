import { FadeUp, StaggerChildren, ImageRevealMask } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

export default function Showcase() {
  const { img } = siteConfig.assets;
  const items = siteConfig.showcase;

  return (
    <section className="relative section-pad px-6 md:px-12 bg-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <FadeUp>
              <div className="eyebrow mb-3">Surface</div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-3xl md:text-5xl text-ink font-medium tracking-tight leading-[1.05] max-w-2xl">
                What it looks like in production.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <p className="text-sm md:text-base text-ink/65 max-w-sm md:text-right">
              Real frames from anonymised customer instances. Names redacted, latencies preserved.
            </p>
          </FadeUp>
        </div>

        <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {items.map((item, i) => (
            <div
              key={item.slot}
              className={`relative group rounded-2xl overflow-hidden border border-white/10 ${
                i === 0
                  ? "md:col-span-8 aspect-[16/10]"
                  : i === 1
                    ? "md:col-span-4 aspect-[4/5]"
                    : i === 2
                      ? "md:col-span-5 aspect-[4/3]"
                      : "md:col-span-7 aspect-[16/9]"
              }`}
            >
              <ImageRevealMask
                src={img(item.slot)}
                alt={item.label}
                aspectClass="aspect-auto h-full"
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/15 via-bg to-accent/10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div className="eyebrow !text-ink/80">{item.label}</div>
                <span className="font-mono text-[10px] text-ink/55 tracking-[0.25em]">FRAME {String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
