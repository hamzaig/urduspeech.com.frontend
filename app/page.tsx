import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDownRight,
  ArrowRight,
  Captions,
  Check,
  FileText,
  FileVideo,
  LockKeyhole,
} from "lucide-react";
import sampleStill from "@/assets/studio-interview.webp";
import { CaptionStudioDemo } from "@/components/caption-studio-demo";
import { CaptionStyleGallery } from "@/components/caption-style-gallery";
import { GuideCards } from "@/components/guide-cards";
import { SiteHeader } from "@/components/site-header";
import {
  Plans,
  QuestionList,
  StartFree,
  commonQuestions,
} from "@/components/marketing";
import { PublicFooter } from "@/components/public-site";
import "./landing.css";

const title = "Urdu captions and transcripts for creators";
const description =
  "Turn Urdu recordings into editable transcripts and subtitles in Urdu, Roman Urdu, English or both. Try the demo and start with 10 free minutes.";

export const metadata: Metadata = {
  metadataBase: new URL("https://urduspeech.com"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "UrduSpeech",
    title,
    description,
    url: "/",
    images: [
      {
        url: sampleStill.src,
        width: sampleStill.width,
        height: sampleStill.height,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [sampleStill.src],
  },
  other: { "page-type": "software", "site-kind": "software" },
};

const workflow = [
  {
    title: "Upload a recording",
    description: "Add an audio file or a video with spoken Urdu.",
  },
  {
    title: "Review the draft",
    description:
      "Correct words and names, and adjust when each caption appears.",
  },
  {
    title: "Export your work",
    description:
      "Choose a transcript, subtitle track, or a video with captions.",
  },
];

const exports = [
  {
    icon: FileText,
    name: "Plain text",
    description: "For show notes, quotes and articles",
    format: "TXT",
  },
  {
    icon: Captions,
    name: "Timed subtitles",
    description: "For video editors and web players",
    format: "SRT · VTT",
  },
  {
    icon: FileVideo,
    name: "Captioned video",
    description: "For sharing with captions on the video",
    format: "MP4",
  },
];

const homeQuestions = [
  commonQuestions[0],
  commonQuestions[1],
  commonQuestions[2],
  commonQuestions[3],
  commonQuestions[6],
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="home-site" tabIndex={-1}>
        <section className="landing-hero" aria-labelledby="hero-title">
          <div className="public-container">
            <div className="landing-hero-intro">
              <h1 id="hero-title">
                Urdu captions.
                <br />
                <span>Ready to publish.</span>
              </h1>
              <div className="landing-hero-copy">
                <p>
                  Turn spoken Urdu into captions and transcripts you can edit,
                  translate and share. Built for interviews, podcasts and reels.
                </p>
                <div className="landing-hero-actions">
                  <StartFree />
                  <a className="button secondary" href="#caption-demo">
                    Try the demo <ArrowDownRight size={17} aria-hidden="true" />
                  </a>
                </div>
                <small>
                  <Check size={15} aria-hidden="true" /> 10 free minutes. No
                  card required.
                </small>
              </div>
            </div>
            <CaptionStudioDemo />
          </div>
        </section>

        <section
          id="use-cases"
          className="landing-section landing-styles"
          aria-labelledby="caption-styles-title"
          tabIndex={-1}
        >
          <div className="public-container landing-style-layout">
            <div className="landing-section-heading">
              <h2 id="caption-styles-title">Make the words fit the frame</h2>
              <p>
                See how a style reads over your footage. Preview clean,
                highlighted and boxed captions before you render.
              </p>
              <Link href="/video-captions" className="public-inline-link">
                Explore video captions{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <CaptionStyleGallery />
          </div>
        </section>

        <section
          id="workflow"
          className="landing-section landing-workflow"
          aria-labelledby="workflow-title"
          tabIndex={-1}
        >
          <div className="public-container landing-workflow-layout">
            <div className="landing-section-heading">
              <h2 id="workflow-title">From recording to final cut</h2>
              <ol className="landing-steps" role="list">
                {workflow.map(({ title, description }, index) => (
                  <li key={title}>
                    <span aria-hidden="true">{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="landing-export-panel">
              <div className="landing-export-heading">
                <h3>Choose your export</h3>
                <Link href="/supported-formats" className="public-inline-link">
                  File requirements <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <ul className="landing-export-list" role="list">
                {exports.map(({ icon: Icon, name, description, format }) => (
                  <li key={name}>
                    <span className="landing-export-icon">
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>{name}</strong>
                      <small>{description}</small>
                    </div>
                    <span className="landing-export-format">{format}</span>
                  </li>
                ))}
              </ul>
              <Link href="/urdu-transcription" className="public-inline-link">
                Explore Urdu transcription{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="landing-section landing-pricing"
          aria-labelledby="pricing-title"
          tabIndex={-1}
        >
          <div className="public-container">
            <div className="landing-section-heading landing-heading-row">
              <div>
                <h2 id="pricing-title">Start with 10 free minutes</h2>
                <p>
                  Compare plans by minutes, video quality and media retention.
                </p>
              </div>
              <Link className="public-inline-link" href="/pricing">
                See pricing details <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <Plans showStart={false} />
          </div>
        </section>

        <section
          className="landing-section landing-guides"
          aria-labelledby="creator-guides-title"
        >
          <div className="public-container">
            <div className="landing-section-heading landing-heading-row">
              <h2 id="creator-guides-title">Creator guides</h2>
              <Link className="public-inline-link" href="/guides">
                See all guides <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <GuideCards />
          </div>
        </section>

        <section
          className="landing-section landing-questions"
          aria-labelledby="home-questions"
        >
          <div className="public-container landing-questions-grid">
            <div className="landing-section-heading">
              <h2 id="home-questions">Common questions</h2>
              <div className="landing-privacy">
                <LockKeyhole size={23} aria-hidden="true" />
                <h3>Your recordings</h3>
                <p>
                  Media expires with your plan’s retention period. You can
                  request project or account deletion in Studio.
                </p>
                <Link className="public-inline-link" href="/privacy">
                  Read the privacy policy{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div>
              <QuestionList questions={homeQuestions} openFirst />
              <Link className="public-inline-link" href="/faq">
                See all questions <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter
        intro={
          <div className="landing-close">
            <div>
              <h2>Give your next video Urdu captions</h2>
              <p>
                Start with a recording. Make the captions your own in Studio.
              </p>
            </div>
            <StartFree />
          </div>
        }
      />
    </>
  );
}
