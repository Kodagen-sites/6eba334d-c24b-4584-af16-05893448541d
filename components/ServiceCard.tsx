"use client";

import Link from "next/link";
import { GlassCursorHighlight } from "@/components/motion";

type Service = {
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  bullets?: readonly string[];
};

type Props = {
  service: Service;
  imageSrc?: string;
};

/** CV4 — Liquid Glass card (Next.js variant). */
export default function ServiceCard({ service, imageSrc }: Props) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative block rounded-2xl overflow-hidden h-full transition-transform duration-500 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        border: "1px solid rgba(103,232,249,0.14)",
        boxShadow:
          "inset 0 1px 0 rgba(103,232,249,0.14), 0 20px 60px -20px rgba(6,182,212,0.18)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          padding: 1,
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(6,182,212,0.55), rgba(103,232,249,0.55), rgba(6,182,212,0.55))",
          WebkitMask:
            "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <GlassCursorHighlight accent="#06B6D4" opacity={0.32} radius={320}>
        {imageSrc && (
          <div className="aspect-[16/10] relative overflow-hidden">
            <img
              src={imageSrc}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg/60 to-transparent" />
          </div>
        )}

        <div className="p-6 relative">
          <div className="eyebrow mb-3">{service.tagline ?? "Module"}</div>
          <h3 className="font-display text-xl md:text-2xl text-ink mb-3 font-medium leading-tight tracking-tight">
            {service.name}
          </h3>
          <p className="text-ink/70 text-sm leading-relaxed line-clamp-3">
            {service.description}
          </p>
          {service.bullets && service.bullets.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {service.bullets.slice(0, 3).map((b) => (
                <li key={b} className="text-[12px] font-mono text-ink/55 flex items-start gap-2">
                  <span className="text-primary mt-0.5">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 font-mono text-xs text-ink/55 group-hover:text-primary transition-colors">
            Read the spec →
          </div>
        </div>
      </GlassCursorHighlight>
    </Link>
  );
}
