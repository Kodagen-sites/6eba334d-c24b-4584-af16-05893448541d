import { FadeUp } from "@/components/motion";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
};

export default function PageHero({ eyebrow, title, intro, image }: Props) {
  return (
    <section className="relative w-full min-h-[80vh] flex items-end overflow-hidden border-b border-white/10">
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-bg to-bg" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      <div className="absolute inset-0 tech-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 pb-20 pt-40 w-full">
        <FadeUp>
          <div className="eyebrow mb-5">{eyebrow}</div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ink font-medium tracking-tight leading-[0.95] max-w-4xl">
            {title}
          </h1>
        </FadeUp>
        {intro && (
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-ink/75 leading-relaxed">
              {intro}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
