import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { PublicPage } from "@/components/public-site";
import { MarketingIntro } from "@/components/marketing";
import { publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "Contact UrduSpeech",
  description:
    "Contact UrduSpeech about account, upload, export or payment issues.",
  path: "/contact",
});

export default function Contact() {
  return (
    <PublicPage mainClassName="public-container marketing-page marketing-reading">
      <MarketingIntro title="Contact support">
        <p>
          For help with your account, recordings, exports or payments, email us
          with a short description of what happened.
        </p>
        <a className="button" href="mailto:notification@urduspeech.com">
          <Mail size={17} aria-hidden="true" /> Email support
        </a>
        <p className="contact-address">notification@urduspeech.com</p>
      </MarketingIntro>
      <div className="question-list support-links">
        <Link href="/guides">
          Creator guides <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/faq">
          Answers to common questions{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/supported-formats">
          Upload and export limits <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/refunds">
          Payment issues and refunds <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </PublicPage>
  );
}
