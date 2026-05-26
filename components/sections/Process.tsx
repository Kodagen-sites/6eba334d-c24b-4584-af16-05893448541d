import { FadeUp, StaggerChildren } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

export default function Process() {
  const { eyebrow, heading, steps } = siteConfig.process;
  return (
    <section className="relative section-pad px-6 md:px-12 bg-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 md:sticky md:top-32 self-start">
          <FadeUp>
            <div className="eyebrow mb-3">{eyebrow}</div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-ink font-medium tracking-tight leading-[1.05]">
              {heading}
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="mt-6 max-w-md text-base text-ink/70 leading-relaxed">
              No SDR call. No POC theatre. Install the agent, point your existing emitters at the endpoint, query.
            </p>
          </FadeUp>
        </div>
        <StaggerChildren staggerDelay={0.1} className="md:col-span-7 space-y-3">
          {steps.map((step) => (
            <div
              key={step.index}
              className="surface-card rounded-xl p-6 md:p-7 flex items-start gap-5 hover:border-primary/40 transition-colors"
            >
              <div className="font-mono text-xs text-primary tracking-[0.25em] mt-1.5 flex-shrink-0">
                {step.index}
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl text-ink font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-ink/65 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
