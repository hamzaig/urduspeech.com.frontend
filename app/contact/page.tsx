import { Metadata } from "next";
import ContactHero from "@/components/sections/contact/contact-hero";
import EnhancedContactForm from "@/components/sections/contact/enhanced-contact-form";
import ContactInfo from "@/components/sections/contact/contact-info";
import JsonLd from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch | UrduSpeech",
  description:
    "Contact UrduSpeech for professional Urdu language services. Get in touch via phone, email, or our contact form. We're here to help with your speech-to-text, translation, and transcription needs.",
  keywords:
    "contact UrduSpeech, Urdu language services contact, speech to text contact, translation services contact, transcription contact",
  openGraph: {
    title: "Contact Us | Get in Touch | UrduSpeech",
    description:
      "Contact UrduSpeech for professional Urdu language services. Get in touch via phone, email, or our contact form.",
    url: "https://urduspeech.com/contact",
    siteName: "UrduSpeech",
    images: [
      {
        url: "https://urduspeech.com/og-image-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact UrduSpeech - Get in Touch",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Get in Touch | UrduSpeech",
    description:
      "Contact UrduSpeech for professional Urdu language services. Get in touch via phone, email, or our contact form.",
    images: ["https://urduspeech.com/og-image-contact.png"],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Us",
  url: "https://urduspeech.com/contact",
  description:
    "Contact page for UrduSpeech - Professional Urdu language services.",
  mainEntity: {
    "@type": "Organization",
    name: "UrduSpeech",
    url: "https://urduspeech.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+92-305-7777911",
        contactType: "Customer Service",
        availableLanguage: ["English", "Urdu"],
      },
      {
        "@type": "ContactPoint",
        email: "contact@urduspeech.com",
        contactType: "Customer Service",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "Pakistan",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <ContactHero />
      <EnhancedContactForm />
      <ContactInfo />
    </>
  );
}
