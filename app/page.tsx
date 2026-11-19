import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  Captions,
  FileAudio,
  FileText,
  FileVideo,
  LockKeyhole,
} from "lucide-react";
import clipStill from "@/assets/caption-demo.webp";
import { CaptionStudioDemo } from "@/components/caption-studio-demo";
import { CaptionStyleGallery } from "@/components/caption-style-gallery";
import { GuideCards } from "@/components/guide-cards";
import { SiteHeader } from "@/components/site-header";
import { LandingMotion } from "@/components/landing-motion";
import {
  Plans,
  QuestionList,
  StartFree,
  commonQuestions,
} from "@/components/marketing";
import { PublicFooter } from "@/components/public-site";
import { captionCues, sampleSrt } from "@/lib/caption-demo";
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
      { url: clipStill.src, width: clipStill.width, height: clipStill.height },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [clipStill.src],
  },
  other: { "page-type": "software", "site-kind": "software" },
};

const exportFormats = [
  {
    icon: FileText,
    name: "TXT transcripts",
    description:
      "Pull a quote, write show notes or edit the transcript in a document.",
  },
  {
    icon: Captions,
    name: "SRT and VTT subtitles",
    description: "Import captions into an editor or a compatible video player.",
  },
  {
    icon: FileVideo,
    name: "Captioned MP4 video",
    description:
      "Render supported videos with captions visible in the exported file.",
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
      <SiteHeader landing />
      <main id="main" className="home-site" tabIndex={-1}>
        <section
          className="hero hero--split landing-hero"
          aria-labelledby="hero-title"
          data-enter
        >
          <div className="public-container wrap">
            <div className="hero-text">
              <div className="landing-hero-copy">
                <h1 id="hero-title">
                  Urdu captions <span>for your videos</span>
                </h1>
                <p>
                  Upload an Urdu recording and review the words and timing.
                  Export subtitles, an editable transcript or a video with
                  captions.
                </p>
                <div className="landing-hero-actions">
                  <StartFree />
                  <a className="button secondary" href="#caption-demo">
                    Try the demo <ArrowDown size={16} aria-hidden="true" />
                  </a>
                </div>
                <small>10 free minutes per account. No card required.</small>
              </div>
              <div className="landing-hero-frame" data-enter-media>
                <CaptionStudioDemo />
              </div>
            </div>
          </div>
        </section>
        <section
          id="use-cases"
          className="landing-section landing-styles"
          aria-labelledby="caption-styles-title"
          tabIndex={-1}
        >
          <div className="public-container wrap">
            <div className="landing-section-heading">
              <h2 id="caption-styles-title">Caption styles for your video</h2>
              <p>
                Try a style on the same Urdu line before choosing one in Studio.
              </p>
            </div>
            <CaptionStyleGallery />
            <div className="guide-link-row">
              <Link href="/video-captions">
                Make captions for videos{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/urdu-transcription">
                Transcribe interviews and podcasts{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section
          id="workflow"
          className="landing-section landing-workflow"
          aria-labelledby="workflow-title"
          tabIndex={-1}
        >
          <div className="public-container wrap">
            <div className="landing-section-heading">
              <h2 id="workflow-title">The Urdu caption workflow</h2>
              <p>Review the draft and make the final edits in Studio.</p>
            </div>
            <ol className="landing-steps" role="list">
              <li>
                <div
                  className="step-visual step-upload"
                  aria-hidden="true"
                  data-ui="source-recording"
                >
                  <div className="step-fragment">
                    <div className="step-file">
                      <FileAudio size={22} />
                      <span>
                        <strong>interview.m4a</strong>
                        <small>Source recording</small>
                      </span>
                    </div>
                    <div className="step-wave">
                      {[
                        16, 28, 21, 39, 31, 50, 35, 42, 22, 33, 48, 25, 53, 38,
                        46, 28, 38, 49, 26, 33, 20, 11,
                      ].map((height, index) => (
                        <span key={index} style={{ height }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="landing-step-copy">
                  <h3>Upload a recording</h3>
                  <p>Add an audio file or a video with spoken Urdu.</p>
                </div>
              </li>
              <li>
                <div
                  className="step-visual step-edit"
                  aria-hidden="true"
                  data-ui="caption-timing"
                >
                  <div className="step-edit-card">
                    <div>
                      <span>00:04.000</span>
                      <span>00:08.000</span>
                    </div>
                    <span lang="ur" dir="rtl">
                      {captionCues[1].urdu}
                    </span>
                    <div className="step-edit-track">
                      {captionCues.map(({ start }) => (
                        <span key={start} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="landing-step-copy">
                  <h3>Edit words and timing</h3>
                  <p>
                    Correct names and sentences, then adjust when each caption
                    appears.
                  </p>
                </div>
              </li>
              <li>
                <div
                  className="step-visual step-export"
                  aria-hidden="true"
                  data-ui="subtitle-export"
                >
                  <div className="step-fragment">
                    <div className="step-formats">
                      <span>TXT</span>
                      <span>SRT</span>
                      <span>VTT</span>
                    </div>
                    <div className="step-file">
                      <Captions size={22} />
                      <span>
                        <strong>interview.srt</strong>
                        <small>Timed subtitles</small>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="landing-step-copy">
                  <h3>Export your work</h3>
                  <p>
                    Download text, subtitle files or a video with captions on
                    it.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>
        <section
          className="landing-section landing-exports"
          aria-labelledby="export-title"
          data-moment="iris-opens"
        >
          <div className="public-container wrap">
            <div className="landing-section-heading">
              <h2 id="export-title">Caption and transcript exports</h2>
            </div>
            <div className="landing-export-grid">
              <div className="landing-export-copy">
                <ul className="landing-export-list" role="list">
                  {exportFormats.map(({ icon: Icon, name, description }) => (
                    <li key={name}>
                      <Icon size={23} aria-hidden="true" />
                      <div>
                        <h3>{name}</h3>
                        <p>{description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/supported-formats" className="public-inline-link">
                  Check supported formats{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
              <div className="landing-srt app-frame">
                <div>
                  <Captions size={18} aria-hidden="true" /> interview.srt
                </div>
                <pre>
                  <code>{sampleSrt("bilingual").trimEnd()}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="landing-section landing-pricing"
          aria-labelledby="pricing-title"
          tabIndex={-1}
        >
          <div className="public-container wrap">
            <div className="landing-section-heading landing-heading-row">
              <div>
                <h2 id="pricing-title">Plans in Pakistani rupees</h2>
                <p>
                  Compare transcription minutes, video quality and how long we
                  keep your media.
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
          <div className="public-container wrap">
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
          <div className="public-container wrap landing-questions-grid">
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
        <LandingMotion />
      </main>
      <PublicFooter
        intro={
          <div className="landing-close">
            <div>
              <h2>Create your first Urdu captions</h2>
              <p>
                Bring an audio or video recording into Studio and review the
                draft.
              </p>
            </div>
            <StartFree />
          </div>
        }
      />
    </>
  );
}
