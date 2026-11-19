import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  Plans,
  QuestionList,
  commonQuestions,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "Pricing for Urdu transcription and captions",
  description:
    "Compare UrduSpeech plans in Pakistani rupees, including minutes, video exports and media retention.",
};

export default function Pricing() {
  return (
    <PublicPage
      current="/pricing"
      mainClassName="public-container marketing-page"
    >
      <MarketingIntro title="Plans in Pakistani rupees.">
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
      <section className="marketing-detail" aria-labelledby="pricing-questions">
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
