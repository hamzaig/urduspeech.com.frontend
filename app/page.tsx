import Hero from "@/components/sections/main/hero";
import Services from "@/components/sections/services/services";
import Features from "@/components/sections/main/features";
import Testimonials from "@/components/sections/testimonials/testimonials";
import Contact from "@/components/sections/contact/contact";
import FAQ from "@/components/sections/faq/faq";
import { Metadata } from "next";
import HowItWorks from "@/components/sections/main/how-it-works";
import JsonLd from "@/lib/json-ld";

export const metadata: Metadata = {
  title:
    "UrduSpeech | Human-Powered Urdu Speech-to-Text & Translation Services",
  description:
    "High-quality, human-powered Urdu language services including speech-to-text, translation, transcription, and content creation. 99%+ accuracy with native Urdu speakers.",
  keywords:
    "Urdu speech to text, Urdu translation, human transcription, native Urdu speakers, Urdu language services, professional Urdu translation",
  openGraph: {
    title:
      "UrduSpeech | Human-Powered Urdu Speech-to-Text & Translation Services",
    description:
      "High-quality, human-powered Urdu language services with 99%+ accuracy from native Urdu speakers.",
    url: "https://urduspeech.com",
    siteName: "UrduSpeech",
    images: [
      {
        url: "https://urduspeech.com/og-image.png", // To be replaced with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "UrduSpeech - Human-Powered Urdu Language Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "UrduSpeech | Human-Powered Urdu Speech-to-Text & Translation Services",
    description:
      "High-quality, human-powered Urdu language services with 99%+ accuracy from native Urdu speakers.",
    images: ["https://urduspeech.com/og-image.png"], // To be replaced with your actual OG image URL
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UrduSpeech",
  url: "https://urduspeech.com",
  logo: "https://urduspeech.com/logo.png", // To be replaced with your actual logo URL
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-305-7777911",
    contactType: "Customer Service",
  },
  sameAs: [
    // Add your social media links here
    // "https://www.facebook.com/UrduSpeech",
    // "https://www.twitter.com/UrduSpeech"
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <Hero />
      <Services />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
