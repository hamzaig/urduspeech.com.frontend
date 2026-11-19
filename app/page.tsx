import Link from "next/link";
import Image from "next/image";
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
import shortVideoStill from "@/assets/short-video-demo.webp";
import { CaptionStudioDemo } from "@/components/caption-studio-demo";
import { LandingHeader } from "@/components/landing-header";
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
      <LandingHeader />
      <main id="main" className="home-site" tabIndex={-1}>
        <section
          className="hero hero--centred landing-hero"
          aria-labelledby="hero-title"
          data-enter
        >
          <div className="public-container wrap">
            <div className="hero-text">
              <div className="landing-hero-copy">
                <h1 id="hero-title">
                  Urdu captions <span>for creators</span>
                </h1>
                <p>
                  Transcribe spoken Urdu, then edit and export captions in Urdu,
                  Roman Urdu, English or both Urdu and English.
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
          id="use-cases"
          className="landing-section landing-use-cases"
          aria-labelledby="use-cases-title"
          tabIndex={-1}
        >
          <div className="public-container wrap">
            <div className="landing-section-heading">
              <h2 id="use-cases-title">Video captions and audio transcripts</h2>
            </div>
            <div className="landing-case-grid">
              <Link href="/video-captions" className="landing-case">
                <div
                  className="landing-case-visual case-video"
                  aria-hidden="true"
                  data-visual
                >
                  <Image
                    src={shortVideoStill}
                    alt=""
                    width={shortVideoStill.width}
                    height={shortVideoStill.height}
                    sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1316px) calc(50vw - 60px), 598px"
                  />
                  <div className="case-video-caption">
                    <span lang="ur" dir="rtl">
                      {captionCues[0].urdu}
                    </span>
                    <span>{captionCues[0].english}</span>
                  </div>
                </div>
                <div className="landing-case-copy">
                  <div>
                    <h3>Captions for short videos</h3>
                    <p>
                      Give viewers subtitles they can read with the sound off.
                    </p>
                  </div>
                  <ArrowRight size={23} aria-hidden="true" />
                </div>
              </Link>
              <Link href="/urdu-transcription" className="landing-case">
                <div
                  className="landing-case-visual case-audio"
                  aria-hidden="true"
                >
                  <div className="case-transcript">
                    <div>
                      <FileText size={16} /> interview.txt
                    </div>
                    {captionCues.map(({ start, urdu }) => (
                      <p key={start} lang="ur" dir="rtl">
                        {urdu}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="landing-case-copy">
                  <div>
                    <h3>Transcripts for interviews</h3>
                    <p>
                      Turn interviews and podcasts into text for quotes and show
                      notes.
                    </p>
                  </div>
                  <ArrowRight size={23} aria-hidden="true" />
                </div>
              </Link>
            </div>
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
