import Link from "next/link";
import type { Metadata } from "next";
import {
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

const exportsList = [
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
    format: "SRT / VTT",
  },
  {
    icon: FileVideo,
    name: "Captioned video",
    description: "For sharing with captions on the video",
    format: "MP4",
  },
];

const proof = [
  {
    value: "4 scripts",
    label: "Urdu Nastaliq, Roman Urdu, English, bilingual",
  },
  { value: "4 exports", label: "UTF-8 TXT, SRT, WebVTT, burned-in MP4" },
  { value: "10 min free", label: "One-time trial, no card required" },
  { value: "PKR plans", label: "Local pricing for Pakistani creators" },
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
      dateModified: "2026-11-23",
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
          <div className="public-container landing-hero-stage">
            <div className="landing-hero-intro">
              <h1 id="hero-title">Urdu captions, ready to publish.</h1>
              <div className="landing-hero-copy">
                <p>
                  Turn Urdu recordings into Nastaliq, Roman Urdu, English, and
                  bilingual captions.
                </p>
                <div className="landing-hero-actions">
                  <StartFree label="Try 10 free min" />
                  <Link className="button secondary" href="/demo">
                    Edit sample
                  </Link>
                </div>
                <small className="landing-hero-note">
                  <Check size={15} aria-hidden="true" /> 10 free minutes, no
                  card required.
                </small>
              </div>
            </div>
            <CaptionStudioDemo compact />
          </div>
        </section>

        <section
          className="landing-proof-band"
          aria-label="Platform highlights"
        >
          <div className="public-container">
            <ul className="landing-proof" role="list">
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
          id="use-cases"
          className="landing-section landing-styles"
          aria-labelledby="caption-styles-title"
          tabIndex={-1}
        >
          <div className="public-container landing-style-layout">
            <div className="landing-section-heading">
              <h2 id="caption-styles-title">
                Preview Nastaliq styles over real video
              </h2>
              <p>
                Compare clean, highlighted, and boxed Nastaliq captions over
                real lighting before you render a 1080p MP4.
              </p>
              <Link href="/video-captions" className="public-inline-link">
                Explore video captions
              </Link>
            </div>
            <CaptionStyleGallery />
          </div>
        </section>

        <section
          id="features"
          className="landing-section landing-section--spacious landing-features"
          aria-labelledby="features-title"
          tabIndex={-1}
        >
          <div className="public-container">
            <div className="landing-section-heading">
              <h2 id="features-title">Built for Urdu from the first word</h2>
              <p>
                Designed around Noto Nastaliq Urdu, right-to-left reading, and
                the mixed Urdu-English way Pakistani creators speak.
              </p>
            </div>
            <ul className="bento" role="list">
              <li className="bento-card bento-nastaliq">
                <div className="bento-head">
                  <Languages size={20} aria-hidden="true" />
                  <h3>Real Nastaliq, not a fallback font</h3>
                </div>
                <p>
                  Urdu captions render in Noto Nastaliq Urdu with calibrated
                  line height so every stroke reads naturally on screen.
                </p>
                <p className="bento-urdu" lang="ur" dir="rtl">
                  آپ کی آواز، آپ کے الفاظ
                </p>
              </li>
              <li className="bento-card bento-outputs">
                <div className="bento-head">
                  <Captions size={20} aria-hidden="true" />
                  <h3>Four outputs from one recording</h3>
                </div>
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
                <div className="bento-head">
                  <Timer size={20} aria-hidden="true" />
                  <h3>Refine Urdu names and cue timing</h3>
                </div>
                <p>
                  Fix names and numbers, then nudge each caption&rsquo;s start
                  and end before you export.
                </p>
                <ol className="bento-cues" aria-label="Example cue edit">
                  <li>
                    <span className="bento-cue-time">00:00 – 00:04</span>
                    <span className="bento-cue-text" lang="ur" dir="rtl">
                      آج کچھ نیا بناتے ہیں۔
                    </span>
                  </li>
                  <li data-active="">
                    <span className="bento-cue-time">
                      00:04 – <ins>00:07.6</ins>
                    </span>
                    <span className="bento-cue-text" lang="ur" dir="rtl">
                      <del>عائیشہ</del> <ins>عائشہ</ins> کی کہانی
                    </span>
                  </li>
                </ol>
              </li>
              <li className="bento-card bento-dark bento-export">
                <div className="bento-head">
                  <FileVideo size={20} aria-hidden="true" />
                  <h3>Captions burned into MP4</h3>
                </div>
                <p>
                  Render a ready-to-post video in clean, highlighted, or boxed
                  styles, or take UTF-8 SRT and VTT to your editor.
                </p>
                <ul className="bento-formats" role="list">
                  <li>TXT</li>
                  <li>SRT</li>
                  <li>VTT</li>
                  <li>MP4</li>
                </ul>
              </li>
              <li className="bento-card bento-private">
                <div className="bento-head">
                  <ShieldCheck size={20} aria-hidden="true" />
                  <h3>Private S3 storage and timed expiry</h3>
                </div>
                <p>
                  Recordings expire with your plan&rsquo;s retention period,
                  never train models, and delete on demand inside Studio.
                </p>
              </li>
              <li className="bento-card bento-local">
                <div className="bento-head">
                  <Wallet size={20} aria-hidden="true" />
                  <h3>Priced in rupees</h3>
                </div>
                <p>
                  Fixed monthly plans in Pakistani rupees with card checkout and
                  local manual verification.
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
              <h2 id="workflow-title">
                From Urdu recording to SRT, VTT, or MP4
              </h2>
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
                  File requirements
                </Link>
              </div>
              <ul className="landing-export-list" role="list">
                {exportsList.map(
                  ({ icon: Icon, name, description, format }) => (
                    <li key={name}>
                      <span className="landing-export-icon">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <div>
                        <strong>{name}</strong>
                        <small>{description}</small>
                      </div>
                      <span className="landing-export-format">{format}</span>
                    </li>
                  ),
                )}
              </ul>
              <Link href="/urdu-transcription" className="public-inline-link">
                Explore Urdu transcription
              </Link>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="landing-section landing-section--spacious landing-pricing"
          aria-labelledby="pricing-title"
          tabIndex={-1}
        >
          <div className="public-container">
            <div className="landing-section-heading landing-heading-row">
              <div>
                <h2 id="pricing-title">Start with 10 free minutes</h2>
                <p>
                  Compare plans by minutes, video quality, and media retention.
                </p>
              </div>
              <Link className="public-inline-link" href="/pricing">
                See pricing details
              </Link>
            </div>
            <Plans showStart={false} />
          </div>
        </section>

        <section
          id="what-is-urduspeech"
          className="landing-section landing-entity"
          aria-labelledby="entity-title"
        >
          <div className="public-container landing-entity-grid">
            <div className="landing-entity-copy">
              <h2 id="entity-title">
                Automated AI Urdu caption and transcription studio
              </h2>
              <p>
                <strong>UrduSpeech</strong> (<code>urduspeech.com</code>),
                operated by <strong>MoonSys Ltd</strong>, is a browser-based AI
                studio for spoken Urdu audio and video. Upload MP3, FLAC, PCM
                WAV, AAC M4A, MP4, or MOV files, review every word and timestamp
                locally, and export UTF-8 TXT, SRT, VTT, or burned-in MP4.
              </p>
              <p>
                Processing is fully automated with zero model training on
                uploads. UrduSpeech is independent creator software and is
                unrelated to the academic ASLP-lab/UrduSpeech research corpus.
              </p>
              <div className="guide-link-row">
                <Link href="/about">
                  About MoonSys Ltd <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/methodology">
                  AI &amp; Nastaliq pipeline{" "}
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
                  <dd>PKR 999 to 5,999 / month after free trial</dd>
                </div>
              </dl>
            </aside>
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
                <h2 id="home-guides">
                  Practical workflows for Urdu audio &amp; video
                </h2>
                <p>
                  Compare scripts, turn saved voice notes into text, and prepare
                  SRT, VTT, or MP4 exports for YouTube and Reels.
                </p>
              </div>
              <Link className="public-inline-link" href="/guides">
                All creator guides
              </Link>
            </div>
            <GuideCards guides={publicGuides.slice(0, 3)} />
            <div className="guide-link-row">
              <Link href="/urdu-captions-for-reels-tiktok">
                Reels &amp; TikTok captions{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/youtube-urdu-subtitles">
                YouTube Urdu subtitles{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/compare">
                Compare caption tools{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/tools">
                Free Urdu subtitle tools{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/urdu-caption-glossary">
                Urdu Nastaliq glossary{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/supported-formats">
                Supported formats &amp; limits{" "}
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
              <h2 id="home-questions">
                Urdu captioning &amp; billing questions
              </h2>
              <div className="landing-privacy">
                <div className="landing-privacy-head">
                  <LockKeyhole size={20} aria-hidden="true" />
                  <h3>Your recordings</h3>
                </div>
                <p>
                  Media expires with your plan&rsquo;s retention period. You can
                  request project or account deletion in Studio.
                </p>
                <Link className="public-inline-link" href="/security">
                  Security &amp; retention
                </Link>
              </div>
            </div>
            <div>
              <QuestionList questions={homeQuestions} openFirst />
              <Link className="public-inline-link" href="/faq">
                See all questions
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
                  <Check size={15} aria-hidden="true" /> Nastaliq &amp;
                  bilingual
                </li>
                <li>
                  <Check size={15} aria-hidden="true" /> UTF-8 SRT, VTT, MP4
                </li>
                <li>
                  <Check size={15} aria-hidden="true" /> Edit before you publish
                </li>
              </ul>
            </div>
            <StartFree label="Try 10 free min" />
          </div>
        }
      />
    </>
  );
}
