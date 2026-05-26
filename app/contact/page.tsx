import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/sections/ContactSection";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Contact engineering",
  description:
    "Tell us what you're instrumenting. Architecture reviews and migration walk-throughs by appointment. We reply within one US business day.",
};

export default function ContactPage() {
  const { img } = siteConfig.assets;
  return (
    <>
      <PageHero
        eyebrow="Contact engineering"
        title="Tell us what you're instrumenting."
        intro="We answer technical questions in one US business day. Architecture reviews and migration walk-throughs by appointment. Sales lives at the bottom of the queue."
        image={img("section-contact-hero")}
      />
      <ContactSection />
    </>
  );
}
