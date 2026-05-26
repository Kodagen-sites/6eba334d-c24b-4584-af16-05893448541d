import HeroScrub from "@/components/sections/HeroScrub";
import ValueProp from "@/components/sections/ValueProp";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Showcase from "@/components/sections/Showcase";
import Statement from "@/components/sections/Statement";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CtaSection from "@/components/sections/CtaSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroScrub />
      <ValueProp />
      <ServicesGrid />
      <Showcase />
      <Statement />
      <Process />
      <Stats />
      <Testimonials />
      <CtaSection />
      <ContactSection />
    </>
  );
}
