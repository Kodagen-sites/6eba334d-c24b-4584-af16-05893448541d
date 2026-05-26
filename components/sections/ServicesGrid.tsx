import { FadeUp, StaggerChildren, CardTiltLayer } from "@/components/motion";
import { siteConfig } from "@/content/site-config";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesGrid() {
  const { img } = siteConfig.assets;
  return (
    <section className="relative section-pad px-6 md:px-12 bg-[color:var(--bg-secondary)] border-t border-white/5">
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-12">
          <FadeUp>
            <div className="eyebrow mb-3">What we ship</div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-ink font-medium tracking-tight leading-[1.05] max-w-3xl">
              One platform.{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Three signals.
              </span>{" "}
              Every query.
            </h2>
          </FadeUp>
        </div>

        <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.services.map((svc) => (
            <CardTiltLayer key={svc.slug} intensity={0.18} lift={6} className="h-full">
              <ServiceCard service={svc} imageSrc={img(`service-${svc.slug}`) || undefined} />
            </CardTiltLayer>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
