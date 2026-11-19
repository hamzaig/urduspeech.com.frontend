import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDownRight,
  ArrowRight,
  FileVideo,
  FileText,
  Captions,
} from "lucide-react";
import { PublicCaptionPreview } from "@/components/public-caption-preview";
import { PublicPage } from "@/components/public-site";
import { Plans, QuestionList, commonQuestions } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Urdu transcripts and video captions",
  description:
    "Create editable Urdu and Roman Urdu captions, English translations and bilingual subtitles. Start with 10 free minutes. Plans in PKR.",
};

const steps = [
  {
    title: "Upload your recording",
    text: "Bring a reel, an interview, a podcast or a longer video. Pick how you want your Urdu speech to appear.",
  },
  {
    title: "Review words and timing",
    text: "AI prepares the draft. Correct names and numbers, adjust the timing and preview your captions against the original.",
  },
  {
    title: "Export for where you publish",
    text: "Take subtitle files into your editor or render a video with captions already on it.",
  },
];

export default function Home() {
  return (
    <PublicPage mainClassName="home-site">
      <section className="public-hero" aria-labelledby="hero-title">
        <div className="public-container">
          <div className="hero-intro">
            <h1 id="hero-title">
              Turn Urdu speech
              <br /> into <span>captions.</span>
            </h1>
            <p>
              Upload a recording, edit the words and timing, and export in Urdu,
              Roman Urdu, English or both Urdu and English.
            </p>
            <div className="hero-actions">
              <Link className="button hero-action" href="/auth/register">
                Start free <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a className="button secondary" href="#caption-demo">
                Try the demo
              </a>
            </div>
            <small>10 free minutes once. No card required.</small>
          </div>
          <PublicCaptionPreview />
        </div>
      </section>
      <section
        className="workflow-section public-container"
        id="workflow"
        aria-labelledby="workflow-title"
      >
        <div className="workflow-intro">
          <h2 id="workflow-title">From recording to finished captions.</h2>
          <Link href="/supported-formats" className="public-inline-link">
            Check supported formats{" "}
            <ArrowDownRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <ol className="public-steps" role="list">
          {steps.map(({ title, text }, index) => (
            <li key={title}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <ul className="format-strip" aria-label="Export formats" role="list">
          <li>
            <FileText size={19} aria-hidden="true" /> <strong>TXT</strong>{" "}
            Transcript
          </li>
          <li>
            <Captions size={19} aria-hidden="true" /> <strong>SRT / VTT</strong>{" "}
            Subtitles
          </li>
          <li>
            <FileVideo size={19} aria-hidden="true" /> <strong>MP4</strong>{" "}
            Captioned video
          </li>
        </ul>
      </section>
      <section
        className="public-container marketing-detail home-use-cases"
        aria-labelledby="use-cases"
      >
        <div>
          <h2 id="use-cases">Made for what you record.</h2>
          <p>Take the same recording into an edit, a transcript or both.</p>
        </div>
        <div className="support-links">
          <Link href="/video-captions">
            <span>
              <strong>Reels and short videos</strong>
              <small>Time your subtitles and render a captioned MP4.</small>
            </span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/urdu-transcription">
            <span>
              <strong>Interviews and podcasts</strong>
              <small>
                Turn a conversation into text for quotes, notes or articles.
              </small>
            </span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        className="pricing-section"
        id="pricing"
        aria-labelledby="pricing-title"
      >
        <div className="public-container">
          <div className="pricing-intro">
            <h2 id="pricing-title">Plans in PKR.</h2>
            <Link className="public-inline-link" href="/pricing">
              Explore pricing <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <Plans />
        </div>
      </section>
      <section
        className="public-container marketing-detail home-questions"
        aria-labelledby="home-questions"
      >
        <h2 id="home-questions">Common questions</h2>
        <div>
          <QuestionList questions={commonQuestions.slice(0, 3)} />
          <Link className="public-inline-link" href="/faq">
            See all questions <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
