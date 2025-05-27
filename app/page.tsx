import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Features from "@/components/sections/features";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import FAQ from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}