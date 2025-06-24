import { Metadata } from "next";
import WhyUsHero from "@/components/sections/why-us/why-us-hero";
import CoreDifferentiators from "@/components/sections/why-us/core-differentiators";
import QualityCommitment from "@/components/sections/why-us/quality-commitment";
import MeetTheExperts from "@/components/sections/why-us/meet-the-experts";
import TechnologySynergy from "@/components/sections/why-us/technology-synergy";
import ServicesCTA from "@/components/sections/services/services-cta";

export const metadata: Metadata = {
  title: "Why Choose UrduSpeech | Human-Powered Accuracy & Quality",
  description:
    "Discover why UrduSpeech is the leading provider of human-powered Urdu language services. Our commitment to quality, native experts, and cultural accuracy sets us apart.",
  keywords:
    "why UrduSpeech, human-powered services, native Urdu experts, quality assurance, cultural accuracy, Urdu translation benefits",
  openGraph: {
    title: "Why Choose UrduSpeech | Human-Powered Accuracy & Quality",
    description:
      "Discover why UrduSpeech is the leading provider of human-powered Urdu language services.",
    url: "https://urduspeech.com/why-us",
    siteName: "UrduSpeech",
    locale: "en_US",
    type: "website",
  },
};

export default function WhyUsPage() {
  return (
    <>
      <WhyUsHero />
      <CoreDifferentiators />
      <QualityCommitment />
      <MeetTheExperts />
      <TechnologySynergy />
      <ServicesCTA />
    </>
  );
}
