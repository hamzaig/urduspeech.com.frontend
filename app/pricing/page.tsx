import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  Plans,
  QuestionList,
  commonQuestions,
} from "@/components/marketing";
import { publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "Pricing for Urdu transcription and captions",
  description:
    "Compare UrduSpeech plans in Pakistani rupees, including minutes, video exports and media retention.",
  path: "/pricing",
});

const included = [
  "Urdu, Roman Urdu, English and bilingual output",
  "Editable caption text and timing",
  "TXT, SRT and VTT downloads",
];

export default function Pricing() {
  return (
    <PublicPage mainClassName="public-container marketing-page pricing-page">
      <MarketingIntro title="Simple pricing, in rupees">
        <p>
          Audio and video share one minute allowance. Start with 10 free
          minutes, then compare plans by minutes, export resolution and media
          retention.
        </p>
      </MarketingIntro>
      <section aria-labelledby="compare-plans">
        <h2 className="sr-only" id="compare-plans">
          Compare plans
        </h2>
        <Plans />
      </section>
      <section className="pricing-included" aria-labelledby="pricing-included">
        <h2 id="pricing-included">Included on every plan</h2>
        <ul role="list">
          {included.map((feature) => (
            <li key={feature}>
              <Check size={18} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </section>
      <section
        className="product-section pricing-questions"
        aria-labelledby="pricing-questions"
      >
        <h2 id="pricing-questions">Minutes and retention</h2>
        <QuestionList
          questions={commonQuestions.filter(
            ({ category }) => category === "billing",
          )}
        />
        <Link className="public-inline-link" href="/refunds">
          Payment support and refunds
        </Link>
      </section>
    </PublicPage>
  );
}
