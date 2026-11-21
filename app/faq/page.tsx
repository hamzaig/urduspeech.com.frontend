import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  QuestionList,
  commonQuestions,
} from "@/components/marketing";
import { publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "Frequently asked questions",
  description:
    "Answers about UrduSpeech uploads, caption languages, file exports, minutes and retention.",
  path: "/faq",
});

export default function Faq() {
  return (
    <PublicPage mainClassName="public-container marketing-page marketing-reading">
      <MarketingIntro title="Frequently asked questions">
        <p>
          Find out what you can upload, how to edit captions and what you can
          download.
        </p>
      </MarketingIntro>
      <div className="faq-topics">
        <section aria-labelledby="faq-captions">
          <h2 id="faq-captions">Uploads and captions</h2>
          <QuestionList
            questions={commonQuestions.filter(
              ({ category }) => category !== "billing",
            )}
          />
        </section>
        <section aria-labelledby="faq-billing">
          <h2 id="faq-billing">Plans and media retention</h2>
          <QuestionList
            questions={commonQuestions.filter(
              ({ category }) => category === "billing",
            )}
          />
        </section>
      </div>
      <div className="guide-link-row">
        <Link href="/guides">
          Read creator guides <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/contact">
          Contact support <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </PublicPage>
  );
}
