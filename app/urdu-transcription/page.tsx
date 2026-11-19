import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Languages, PencilLine } from "lucide-react";
import { PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { PublicCaptionPreview } from "@/components/public-caption-preview";

export const metadata: Metadata = {
  title: "Urdu transcription for audio and video",
  description:
    "Turn Urdu recordings into editable transcripts in Urdu script, Roman Urdu, English or bilingual output.",
};

export default function UrduTranscription() {
  return (
    <PublicPage mainClassName="public-container marketing-page">
      <section className="product-hero" aria-label="Urdu transcription">
        <MarketingIntro title="Urdu audio into editable text">
          <p>
            Transcribe interviews, podcasts and voice recordings. Review the
            words in Studio, then export the transcript for your notes, quotes
            or articles.
          </p>
          <StartFree />
        </MarketingIntro>
        <PublicCaptionPreview />
      </section>
      <section
        className="product-section"
        aria-labelledby="transcription-workflow"
      >
        <h2 id="transcription-workflow">From recording to transcript</h2>
        <ol className="product-points" role="list">
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>Choose your output</h3>
            <p>
              Keep Urdu script, switch to Roman Urdu, translate to English or
              show both languages.
            </p>
          </li>
          <li>
            <PencilLine size={24} aria-hidden="true" />
            <h3>Review the draft</h3>
            <p>
              Check names, numbers and hard-to-hear words. You can turn
              automated correction off.
            </p>
          </li>
          <li>
            <FileText size={24} aria-hidden="true" />
            <h3>Download the text</h3>
            <p>
              Export TXT when the transcript is ready and use it as plain text
              in your next document.
            </p>
          </li>
        </ol>
        <div className="guide-link-row">
          <Link href="/guides/urdu-roman-urdu-and-english">
            Compare scripts and translations{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/video-captions">
            Try timed captions for video{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
