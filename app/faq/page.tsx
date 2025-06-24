import { Metadata } from "next";
import FAQHero from "@/components/sections/faq/faq-hero";
import CategorizedFAQ from "@/components/sections/faq/categorized-faq";
import Contact from "@/components/sections/contact/contact";
import JsonLd from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions | UrduSpeech",
  description:
    "Find answers to common questions about our Urdu language services including speech-to-text, translation, transcription, and content creation. Get detailed information about our human-powered services.",
  keywords:
    "Urdu speech to text FAQ, Urdu translation questions, transcription services FAQ, content creation FAQ, Urdu language services help",
  openGraph: {
    title: "FAQ | Frequently Asked Questions | UrduSpeech",
    description:
      "Find answers to common questions about our Urdu language services including speech-to-text, translation, transcription, and content creation.",
    url: "https://urduspeech.com/faq",
    siteName: "UrduSpeech",
    images: [
      {
        url: "https://urduspeech.com/og-image-faq.png",
        width: 1200,
        height: 630,
        alt: "FAQ - Frequently Asked Questions for UrduSpeech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Frequently Asked Questions | UrduSpeech",
    description:
      "Find answers to common questions about our Urdu language services including speech-to-text, translation, transcription, and content creation.",
    images: ["https://urduspeech.com/og-image-faq.png"],
  },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: "Frequently Asked Questions",
  url: "https://urduspeech.com/faq",
  description:
    "A comprehensive FAQ page answering common questions about Urdu language services.",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does UrduSpeech provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UrduSpeech offers a comprehensive range of Urdu language services including speech-to-text conversion, translation, transcription, content creation, subtitling, and proofreading services. All our services are delivered by native Urdu speakers to ensure the highest quality and cultural accuracy.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is your Urdu speech-to-text service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our Urdu speech-to-text service achieves over 99% accuracy through a combination of advanced technology and human verification by native Urdu speakers. We handle various accents, dialects, and audio quality levels with exceptional precision.",
      },
    },
  ],
  about: {
    "@type": "Organization",
    name: "UrduSpeech",
    url: "https://urduspeech.com",
  },
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqPageSchema} />
      <FAQHero />
      <CategorizedFAQ />
      <Contact />
    </>
  );
}
