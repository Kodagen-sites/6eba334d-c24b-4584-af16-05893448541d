"use client";

import { useState } from "react";
import { FadeUp, MagneticButton } from "@/components/motion";
import { siteConfig } from "@/content/site-config";

/** CT4 — Split Photo + Form. */
export default function ContactSection() {
  const { eyebrow, heading, body, response, imageSlot } = siteConfig.contact;
  const { img } = siteConfig.assets;
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      setState("sent");
      e.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section id="contact" className="relative bg-bg border-t border-white/10">
      <div className="grid md:grid-cols-2 min-h-[80vh]">
        {/* Left: photo */}
        <div className="relative min-h-[40vh] md:min-h-full order-1 md:order-1">
          <img
            src={img(imageSlot)}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-bg/40 via-transparent to-bg/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg/30 md:to-bg/10" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <FadeUp>
              <div className="eyebrow mb-3">Contact</div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="space-y-3 text-ink/80 text-sm font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-primary">→</span>
                  <a href={`mailto:${siteConfig.company.email}`} className="hover:text-primary transition-colors">
                    {siteConfig.company.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">→</span>
                  <a href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                    {siteConfig.company.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">→</span>
                  <span className="leading-relaxed">{siteConfig.company.location}</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Right: form */}
        <div className="relative p-8 md:p-12 lg:p-16 order-2 md:order-2 bg-[color:var(--bg-secondary)]">
          <div className="max-w-md">
            <FadeUp>
              <div className="eyebrow mb-4">{eyebrow}</div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-3xl md:text-5xl text-ink font-medium tracking-tight leading-[1.05]">
                {heading}
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-4 text-base text-ink/65 leading-relaxed">{body}</p>
            </FadeUp>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <FormField name="name" label="Name" required />
              <FormField name="workEmail" label="Work email" type="email" required />
              <FormField name="company" label="Company" />
              <FormField name="stack" label="Stack we'd integrate with" placeholder="e.g. Node + Postgres on GKE" />
              <FormField name="message" label="What you're instrumenting" textarea required />

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <MagneticButton
                  as="button"
                  className="min-h-[48px] px-7 py-3.5 rounded-full bg-primary text-bg font-display font-medium text-sm hover:brightness-110 disabled:opacity-50 transition-all"
                >
                  {state === "sending" ? "Sending…" : state === "sent" ? "Sent ✓" : "Send"}
                </MagneticButton>
                <p className="text-xs font-mono text-ink/55 tracking-wider">{response}</p>
              </div>
              {state === "error" && (
                <p className="text-xs font-mono text-red-400">
                  Couldn't send. Email us directly at {siteConfig.company.email}.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  name,
  label,
  type = "text",
  required,
  textarea,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const baseClass =
    "peer w-full bg-transparent border-b border-white/15 px-1 py-3 text-ink placeholder-transparent focus:outline-none focus:border-primary transition-colors text-sm font-mono";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={3}
          placeholder=" "
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder ?? " "}
          className={baseClass}
        />
      )}
      <label
        htmlFor={name}
        className="absolute left-1 top-3 text-ink/55 text-sm font-mono pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-[0.22em] peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-[0.22em] peer-[&:not(:placeholder-shown)]:text-ink/55"
      >
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
    </div>
  );
}
