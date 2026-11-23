import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDownRight,
  ArrowRight,
  Captions,
  Check,
  FileText,
  FileVideo,
  Languages,
  LockKeyhole,
  ShieldCheck,
  Timer,
  Wallet,
} from "lucide-react";
import { CaptionStudioDemo } from "@/components/caption-studio-demo";
import { CaptionStyleGallery } from "@/components/caption-style-gallery";
import { GuideCards } from "@/components/guide-cards";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { SiteHeader } from "@/components/site-header";
import {
  Plans,
  QuestionList,
  StartFree,
  commonQuestions,
} from "@/components/marketing";
import { PublicFooter } from "@/components/public-site";
import { StructuredData } from "@/components/structured-data";
import { publicGuides } from "@/lib/public-guides";
import {
  SITE_URL,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";
import "./landing.css";

const absoluteTitle = "Urdu Captions & Transcripts for Creators | UrduSpeech";
const description =
  "Upload Urdu audio or video for editable Nastaliq, Roman Urdu, English, and bilingual captions. Export UTF-8 TXT, SRT, VTT, or MP4.";

export const metadata: Metadata = {
  ...publicMetadata({
    title: "Urdu Captions & Transcripts for Creators",
    absoluteTitle,
    description,
    path: "/",
    ogImage: "default",
    markdownPath: "/index.md",
  }),
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

const proof = [
  { value: "4", label: "Caption scripts, from Urdu to bilingual" },
  { value: "SRT · VTT · MP4", label: "Exports for editors and socials" },
  { value: "10 min", label: "Free to try, no card required" },
  { value: "PKR", label: "Local pricing for Pakistani creators" },
];

const homeQuestions = [
  commonQuestions[0],
  commonQuestions[1],
  commonQuestions[2],
  commonQuestions[3],
  commonQuestions[4],
  commonQuestions[7],
];

export default function Home() {
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: absoluteTitle,
      description,
      path: "/",
      primaryImage: "/og/default.png",
      hasBreadcrumb: false,
      mainEntityId: `${SITE_URL}/#software`,
      dateModified: "2026-11-22",
    }),
    buildSoftwareApplicationJsonLd({
      name: "UrduSpeech",
      description,
      path: "/",
      isCanonicalApp: true,
      includeOffers: true,
      featureList: [
        "AI-assisted Urdu speech-to-text transcription for uploaded audio and video (MP3, FLAC, WAV, M4A, MP4, MOV)",
        "Editable Urdu script (Noto Nastaliq Urdu RTL), Roman Urdu (ur-Latn), English translation, and stacked bilingual captions",
        "Optional conservative AI text correction with reviewable accept/reject suggestions",
        "UTF-8 TXT transcripts, SRT and WebVTT subtitle files, and burned-in H.264 captioned MP4 exports",
      ],
    }),
  ]);

  return (
    <>
      <StructuredData data={jsonLd} />
      <SiteHeader />
      <main id="main" className="home-site" tabIndex={-1}>
        <section className="landing-hero" aria-labelledby="hero-title">
          <HeroBackdrop />
          <div className="public-container">
            <p className="landing-eyebrow">
              <span className="landing-eyebrow-dot" aria-hidden="true" />
              Urdu caption studio for creators
              <span className="landing-eyebrow-urdu" lang="ur" dir="rtl">
                اردو
              </span>
            </p>
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
                  <StartFree label="Try 10 free minutes" />
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
            <ul className="landing-proof" role="list" aria-label="At a glance">
              {proof.map(({ value, label }) => (
                <li key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="what-is-urduspeech"
          className="landing-section landing-entity"
          aria-labelledby="entity-title"
        >
          <div className="public-container landing-entity-grid">
            <div className="landing-entity-copy">
              <p className="landing-kicker">What is UrduSpeech?</p>
              <h2 id="entity-title">
                An automated AI Urdu caption and transcription studio
              </h2>
              <p>
                <strong>UrduSpeech</strong> (<code>urduspeech.com</code>),
                operated by <strong>MoonSys Ltd</strong>, is a browser-based AI
                speech-to-text and video captioning studio built specifically
                for spoken Urdu audio and video recordings. Creators upload
                local MP3, FLAC, PCM WAV, AAC M4A, MP4, or MOV files, choose
                Nastaliq Urdu script, Roman Urdu, English translation, or
                stacked bilingual captions, review every word and timestamp in
                Studio, and export UTF-8 TXT, SRT, VTT, or burned-in MP4 video.
              </p>
              <p>
                Unlike human transcription agencies, processing is fully
                automated and recordings are never used to train models.
                UrduSpeech is an independent creator software application and is
                unrelated to the academic ASLP-lab/UrduSpeech research corpus.
              </p>
              <div className="guide-link-row">
                <Link href="/about">
                  About UrduSpeech &amp; MoonSys Ltd{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/methodology">
                  How our AI correction &amp; Nastaliq pipeline works{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <aside
              className="landing-entity-facts"
              aria-label="Product summary"
            >
              <h3>Platform facts</h3>
              <dl>
                <div>
                  <dt>Operator</dt>
                  <dd>MoonSys Ltd (automated web studio)</dd>
                </div>
                <div>
                  <dt>Input formats</dt>
                  <dd>MP3, FLAC, PCM WAV, AAC M4A, MP4, MOV</dd>
                </div>
                <div>
                  <dt>Outputs</dt>
                  <dd>Urdu Nastaliq, Roman Urdu, English, Urdu + English</dd>
                </div>
                <div>
                  <dt>Exports</dt>
                  <dd>UTF-8 TXT, SRT, WebVTT, burned-in H.264 MP4</dd>
                </div>
                <div>
                  <dt>Pricing</dt>
                  <dd>10 free min, then PKR 999 – 5,999 / month</dd>
                </div>
              </dl>
            </aside>
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
              <p className="landing-kicker">Caption styles</p>
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
          id="features"
          className="landing-section landing-features"
          aria-labelledby="features-title"
          tabIndex={-1}
        >
          <div className="public-container">
            <div className="landing-section-heading landing-heading-center">
              <p className="landing-kicker">Why UrduSpeech</p>
              <h2 id="features-title">Built for Urdu from the first word</h2>
              <p>
                Generic caption tools treat Urdu as an afterthought. UrduSpeech
                is designed around Nastaliq, right-to-left reading and the way
                Pakistani creators actually speak.
              </p>
            </div>
            <ul className="bento" role="list">
              <li className="bento-card bento-nastaliq">
                <span className="bento-icon">
                  <Languages size={20} aria-hidden="true" />
                </span>
                <h3>Real Nastaliq, not a fallback font</h3>
                <p>
                  Urdu captions render in proper Nastaliq with room for every
                  stroke, so they read naturally on screen.
                </p>
                <p className="bento-urdu" lang="ur" dir="rtl">
                  آپ کی آواز، آپ کے الفاظ
                </p>
              </li>
              <li className="bento-card bento-outputs">
                <span className="bento-icon">
                  <Captions size={20} aria-hidden="true" />
                </span>
                <h3>Four outputs from one recording</h3>
                <p>Choose the script or translation that fits your audience.</p>
                <ul className="bento-chips" role="list">
                  <li lang="ur" dir="rtl">
                    <Link href="/urdu-transcription">اردو</Link>
                  </li>
                  <li>
                    <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link>
                  </li>
                  <li>
                    <Link href="/urdu-audio-to-english-text">English</Link>
                  </li>
                  <li>
                    <Link href="/bilingual-urdu-english-captions">
                      Bilingual
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="bento-card bento-timing">
                <span className="bento-icon">
                  <Timer size={20} aria-hidden="true" />
                </span>
                <h3>Edit words and timing</h3>
                <p>
                  Fix names and numbers, then nudge each caption&rsquo;s start
                  and end before you export.
                </p>
                <div className="bento-timeline" aria-hidden="true">
                  <span style={{ inlineSize: "28%" }} />
                  <span style={{ inlineSize: "18%" }} data-active="" />
                  <span style={{ inlineSize: "34%" }} />
                </div>
              </li>
              <li className="bento-card bento-dark bento-export">
                <span className="bento-icon">
                  <FileVideo size={20} aria-hidden="true" />
                </span>
                <h3>Captions burned into MP4</h3>
                <p>
                  Render a ready-to-post video in clean, highlighted or boxed
                  styles, or take SRT and VTT to your editor.
                </p>
                <ul className="bento-formats" role="list">
                  <li>TXT</li>
                  <li>SRT</li>
                  <li>VTT</li>
                  <li>MP4</li>
                </ul>
              </li>
              <li className="bento-card bento-private">
                <span className="bento-icon">
                  <ShieldCheck size={20} aria-hidden="true" />
                </span>
                <h3>Your media, on your terms</h3>
                <p>
                  Recordings expire with your plan&rsquo;s retention period, and
                  you can delete a project or your account from Studio.
                </p>
              </li>
              <li className="bento-card bento-local">
                <span className="bento-icon">
                  <Wallet size={20} aria-hidden="true" />
                </span>
                <h3>Priced in rupees</h3>
                <p>
                  Plans are billed in PKR. Start with 10 free minutes, no card
                  required.
                </p>
              </li>
            </ul>
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
              <p className="landing-kicker">How it works</p>
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
                <p className="landing-kicker">Pricing</p>
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
          id="guides"
          className="landing-section landing-guides"
          aria-labelledby="home-guides"
        >
          <div className="public-container">
            <div className="landing-section-heading landing-heading-row">
              <div>
                <p className="landing-kicker">Creator guides &amp; workflows</p>
                <h2 id="home-guides">
                  Practical workflows for Urdu audio &amp; video
                </h2>
                <p>
                  Compare scripts, convert saved voice notes to text, and
                  prepare SRT, VTT, or MP4 exports for YouTube and social feeds.
                </p>
              </div>
              <Link className="public-inline-link" href="/guides">
                All creator guides <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <GuideCards guides={publicGuides.slice(0, 3)} />
            <div className="guide-link-row">
              <Link href="/urdu-captions-for-reels-tiktok">
                Urdu captions for Instagram Reels &amp; TikTok{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/youtube-urdu-subtitles">
                YouTube Urdu &amp; English subtitle workflow{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/compare">
                Compare UrduSpeech vs CapCut, Descript &amp; Whisper{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/tools">
                Free Urdu subtitle checker, SRT to VTT &amp; PKR calculator{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/urdu-caption-glossary">
                Urdu subtitling, Nastaliq &amp; Unicode technical glossary{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="landing-section landing-questions"
          aria-labelledby="home-questions"
        >
          <div className="public-container landing-questions-grid">
            <div className="landing-section-heading">
              <p className="landing-kicker">FAQ</p>
              <h2 id="home-questions">Common questions</h2>
              <div className="landing-privacy">
                <LockKeyhole size={23} aria-hidden="true" />
                <h3>Your recordings</h3>
                <p>
                  Media expires with your plan’s retention period. You can
                  request project or account deletion in Studio.
                </p>
                <Link className="public-inline-link" href="/security">
                  Read security &amp; retention details{" "}
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
            <p
              className="landing-close-urdu"
              lang="ur"
              dir="rtl"
              aria-hidden="true"
            >
              آواز کو الفاظ دیں
            </p>
            <div>
              <h2>Give your next video Urdu captions</h2>
              <p>
                Start with a recording. Make the captions your own in Studio.
              </p>
              <ul className="landing-close-ticks" role="list">
                <li>
                  <Check size={15} aria-hidden="true" /> 10 free minutes
                </li>
                <li>
                  <Check size={15} aria-hidden="true" /> No card required
                </li>
                <li>
                  <Check size={15} aria-hidden="true" /> Edit before you publish
                </li>
              </ul>
            </div>
            <StartFree label="Try 10 free minutes" />
          </div>
        }
      />
    </>
  );
}
