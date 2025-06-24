import { Metadata } from "next";
import ServicesHero from "@/components/sections/services/services-hero";
import ServicesList from "@/components/sections/services/services-list";
import ServicesPricing from "@/components/sections/services/services-pricing";
import ServicesProcess from "@/components/sections/services/services-process";
import ServicesCTA from "@/components/sections/services/services-cta";

export const metadata: Metadata = {
  title:
    "Our Services - UrduSpeech | Professional Human-Based Urdu Language Services",
  description:
    "Discover our comprehensive human-based Urdu language services including speech-to-text, translation, transcription, content creation, and more. Expert native speakers deliver quality results.",
  keywords:
    "Urdu services, human translation, Urdu speech to text, Urdu transcription, Urdu content creation, professional Urdu services",
  openGraph: {
    title:
      "Our Services - UrduSpeech | Professional Human-Based Urdu Language Services",
    description:
      "Discover our comprehensive human-based Urdu language services including speech-to-text, translation, transcription, content creation, and more.",
    url: "https://urduspeech.com/services",
    siteName: "UrduSpeech",
    locale: "en_US",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <ServicesProcess />
      <ServicesPricing />
      <ServicesCTA />
    </>
  );
}
