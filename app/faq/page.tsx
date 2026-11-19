import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  QuestionList,
  commonQuestions,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about UrduSpeech uploads, caption languages, file exports, minutes and retention.",
};

export default function Faq() {
  return (
    <PublicPage
      current="/faq"
      mainClassName="public-container marketing-page marketing-reading"
    >
      <MarketingIntro title="Frequently asked questions">
        <p>
          Find out what you can upload, how to edit captions and what you can
          download.
        </p>
      </MarketingIntro>
      <QuestionList questions={commonQuestions} />
      <Link className="public-inline-link" href="/contact">
        Contact support
      </Link>
    </PublicPage>
  );
}
