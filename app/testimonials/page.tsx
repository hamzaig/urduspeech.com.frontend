import { Metadata } from "next";
import TestimonialsHero from "@/components/sections/testimonials/testimonials-hero";
import AllTestimonials from "@/components/sections/testimonials/all-testimonials";
import Contact from "@/components/sections/contact/contact";
import JsonLd from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Testimonials | What Our Clients Say | UrduSpeech",
  description:
    "Read testimonials from our satisfied clients. See how our human-powered Urdu language services have helped businesses and individuals achieve their goals.",
  keywords:
    "client testimonials, Urdu speech to text reviews, Urdu translation success stories, customer feedback, Urdu transcription testimonials",
  openGraph: {
    title: "Testimonials | What Our Clients Say | UrduSpeech",
    description:
      "Read testimonials from our satisfied clients. See how our human-powered Urdu language services have helped businesses and individuals achieve their goals.",
    url: "https://urduspeech.com/testimonials",
    siteName: "UrduSpeech",
    images: [
      {
        url: "https://urduspeech.com/og-image-testimonials.png",
        width: 1200,
        height: 630,
        alt: "Client Testimonials for UrduSpeech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | What Our Clients Say | UrduSpeech",
    description:
      "Read testimonials from our satisfied clients. See how our human-powered Urdu language services have helped businesses and individuals achieve their goals.",
    images: ["https://urduspeech.com/og-image-testimonials.png"],
  },
};

const testimonialsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Testimonials",
  url: "https://urduspeech.com/testimonials",
  description: "A collection of testimonials from our satisfied clients.",
  about: {
    "@type": "Organization",
    name: "UrduSpeech",
    url: "https://urduspeech.com",
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd data={testimonialsPageSchema} />
      <TestimonialsHero />
      <AllTestimonials />
      <Contact />
    </>
  );
}
