import Link from "next/link";
import type { Metadata } from "next";
import { StampHero } from "@/components/stamp-hero";
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
import "./home-ajrak.css";

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

const readings = [
  {
    script: "اردو",
    name: "Urdu",
    lang: "ur",
    dir: "rtl",
    text: "ہر کہانی کی اپنی آواز ہوتی ہے۔",
    note: "Nastaliq script for Urdu readers.",
  },
  {
    script: "Roman",
    name: "Roman Urdu",
    lang: "ur-Latn",
    dir: "ltr",
    text: "Har kahani ki apni awaaz hoti hai.",
    note: "Urdu words in English letters.",
  },
  {
    script: "English",
    name: "English",
    lang: "en",
    dir: "ltr",
    text: "Every story has a voice of its own.",
    note: "A translation for wider audiences.",
  },
] as const;

const workflow = [
  {
    title: "Upload a recording",
    description:
      "Add MP3, M4A, WAV, FLAC, MP4, or MOV with spoken Urdu. Audio and video share one minute allowance.",
  },
  {
    title: "Review the draft",
    description:
      "Correct names and numbers, accept or reject AI suggestions, and nudge when each caption starts and ends.",
  },
  {
    title: "Export your work",
    description:
      "Download a UTF-8 transcript, SRT or WebVTT subtitles, or render a captioned MP4.",
  },
];

const exportsList = [
  { format: "TXT", name: "Transcript for show notes and articles" },
  { format: "SRT", name: "Subtitles for Premiere, CapCut, and YouTube" },
  { format: "VTT", name: "Subtitles for web players" },
  { format: "MP4", name: "Captions burned into the video" },
];

const promises = [
  {
    title: "Real Nastaliq, not a fallback font",
    text: "Urdu captions render in Noto Nastaliq Urdu with calibrated line height, so every stroke reads on screen.",
  },
  {
    title: "Names and numbers stay yours",
    text: "AI can miss names, numbers, and timing. Fix them in Studio before anything is published.",
  },
  {
    title: "Private storage with timed expiry",
    text: "Recordings expire with your plan’s retention period, never train models, and delete on demand.",
  },
  {
    title: "Priced in rupees, paid locally",
    text: "Monthly PKR plans with card checkout, or bank transfer, JazzCash, Easypaisa, SadaPay, and NayaPay.",
  },
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
      <main id="main" className="home-site ajrak-home" tabIndex={-1}>
        <section className="ajrak-field home-hero" aria-labelledby="hero-title">
          <div className="public-container home-hero-copy">
            <h1 id="hero-title">
              Urdu captions,
              <br /> ready to publish.
            </h1>
            <p className="home-hero-nastaliq" lang="ur" dir="rtl">
              آواز کو الفاظ دیں
            </p>
            <p className="home-hero-lead">
              Upload a recording. Get Nastaliq, Roman Urdu, English, or
              bilingual captions you can edit and export.
            </p>
            <div className="home-hero-actions">
              <StartFree label="Try 10 free minutes" className="home-cta" />
              <Link className="home-hero-link" href="/demo">
                Edit the sample
              </Link>
            </div>
            <p className="home-hero-note">No card required. PKR plans after.</p>
          </div>
          <div className="public-container home-hero-stage">
            <StampHero />
          </div>
        </section>

        <section className="home-manifest" aria-label="What you get">
          <span className="ajrak-band" aria-hidden="true" />
          <div className="public-container">
            <p>
              <span>4 scripts</span>
              <span className="home-manifest-dot" aria-hidden="true" />
              <span>TXT, SRT, VTT, MP4</span>
              <span className="home-manifest-dot" aria-hidden="true" />
              <span>10 free minutes</span>
              <span className="home-manifest-dot" aria-hidden="true" />
              <span>Plans in PKR</span>
            </p>
          </div>
        </section>

        <section
          id="use-cases"
          className="home-section home-readings"
          aria-labelledby="readings-title"
          tabIndex={-1}
        >
          <div className="public-container">
            <div className="home-heading">
              <h2 id="readings-title">One recording, read four ways</h2>
              <p>
                Choose the script your audience reads. Bilingual stacks Urdu and
                English on one caption.
              </p>
            </div>
            <ol className="home-reading-grid" role="list">
              {readings.map((reading) => (
                <li key={reading.name} className="home-reading">
                  <span className="home-ticket">
                    <span>{reading.name}</span>
                    <span>00:04–00:08</span>
                  </span>
                  <p lang={reading.lang} dir={reading.dir}>
                    {reading.text}
                  </p>
                  <small>{reading.note}</small>
                </li>
              ))}
              <li className="home-reading home-reading-bilingual">
                <span className="home-ticket">
                  <span>Bilingual</span>
                  <span>00:04–00:08</span>
                </span>
                <p lang="ur" dir="rtl">
                  ہر کہانی کی اپنی آواز ہوتی ہے۔
                </p>
                <p lang="en">Every story has a voice of its own.</p>
                <small>Urdu first or English first, stacked.</small>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="home-section home-styles"
          aria-labelledby="caption-styles-title"
        >
          <div className="public-container home-styles-layout">
            <div className="home-heading">
              <h2 id="caption-styles-title">
                Captions that hold up on a phone screen
              </h2>
              <p>
                Compare clean, highlighted, and boxed Nastaliq over real
                lighting, then render an MP4 at your original quality for Reels, TikTok, or
                YouTube.
              </p>
              <Link href="/video-captions" className="home-inline-link">
                Explore video captions
              </Link>
            </div>
            <CaptionStyleGallery />
          </div>
        </section>

        <section
          id="workflow"
          className="home-section home-workflow"
          aria-labelledby="workflow-title"
          tabIndex={-1}
        >
          <span className="ajrak-band" aria-hidden="true" />
          <div className="public-container">
            <div className="home-heading">
              <h2 id="workflow-title">
                From recording to captions in three steps
              </h2>
            </div>
            <ol className="home-steps" role="list">
              {workflow.map(({ title, description }, index) => (
                <li key={title}>
                  <span className="home-step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
            <ul className="home-exports" role="list" aria-label="Exports">
              {exportsList.map(({ format, name }) => (
                <li key={format}>
                  <strong>{format}</strong>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
          <span className="ajrak-band" aria-hidden="true" />
        </section>

        <section
          id="features"
          className="home-section home-promises"
          aria-labelledby="features-title"
          tabIndex={-1}
        >
          <div className="public-container home-promises-layout">
            <div className="home-heading">
              <h2 id="features-title">Built for Urdu from the first word</h2>
              <p>
                Right-to-left reading, mixed Urdu-English speech, and the way
                Pakistani creators actually publish.
              </p>
              <p
                className="home-promises-urdu"
                lang="ur"
                dir="rtl"
                aria-hidden="true"
              >
                آپ کی آواز، آپ کے الفاظ
              </p>
            </div>
            <dl className="home-promise-list">
              {promises.map(({ title, text }) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="pricing"
          className="home-section home-pricing"
          aria-labelledby="pricing-title"
          tabIndex={-1}
        >
          <div className="public-container">
            <div className="home-heading home-heading-row">
              <div>
                <h2 id="pricing-title">Start with 10 free minutes</h2>
                <p>
                  Then pick a monthly plan by minutes, video quality, and
                  retention.
                </p>
              </div>
              <Link className="home-inline-link" href="/pricing">
                Full pricing details
              </Link>
            </div>
            <Plans showStart={false} showCardCta />
          </div>
        </section>

        <section
          className="home-section home-questions"
          aria-labelledby="home-questions"
        >
          <div className="public-container home-questions-layout">
            <div className="home-heading">
              <h2 id="home-questions">Questions creators ask first</h2>
              <p>
                Media expires with your plan’s retention period, and you can
                delete a project or your account in Studio.{" "}
                <Link href="/security">Security &amp; retention</Link>
              </p>
              <Link className="home-inline-link" href="/faq">
                See all questions
              </Link>
            </div>
            <QuestionList questions={homeQuestions} openFirst />
          </div>
        </section>

        <section
          id="guides"
          className="home-section home-guides"
          aria-labelledby="home-guides"
        >
          <div className="public-container">
            <div className="home-heading home-heading-row">
              <h2 id="home-guides">Guides for Urdu audio and video</h2>
              <Link className="home-inline-link" href="/guides">
                All creator guides
              </Link>
            </div>
            <GuideCards guides={publicGuides.slice(0, 3)} />
            <nav className="home-guide-links" aria-label="Use cases and tools">
              <Link href="/urdu-captions-for-reels-tiktok">
                Reels &amp; TikTok captions
              </Link>
              <Link href="/youtube-urdu-subtitles">YouTube Urdu subtitles</Link>
              <Link href="/urdu-podcast-transcription">
                Podcast transcription
              </Link>
              <Link href="/compare">Compare caption tools</Link>
              <Link href="/tools">Free subtitle tools</Link>
              <Link href="/supported-formats">Supported formats</Link>
            </nav>
          </div>
        </section>

        <section
          id="what-is-urduspeech"
          className="home-section home-entity"
          aria-labelledby="entity-title"
        >
          <div className="public-container home-entity-layout">
            <div>
              <h2 id="entity-title">About UrduSpeech</h2>
              <p>
                <strong>UrduSpeech</strong> (<code>urduspeech.com</code>),
                operated by <strong>MoonSys Ltd</strong>, is a browser-based AI
                studio for spoken Urdu audio and video. Upload MP3, FLAC, PCM
                WAV, AAC M4A, MP4, or MOV files, review every word and
                timestamp, and export UTF-8 TXT, SRT, VTT, or burned-in MP4.
              </p>
              <p>
                Processing is fully automated with zero model training on
                uploads. UrduSpeech is independent creator software and is
                unrelated to the academic ASLP-lab/UrduSpeech research corpus.
              </p>
              <p className="home-entity-links">
                <Link href="/about">About MoonSys Ltd</Link>
                <Link href="/methodology">AI &amp; Nastaliq pipeline</Link>
              </p>
            </div>
            <dl className="home-facts" aria-label="Product summary">
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
                <dd>PKR 999 to 5,999 / month after the free trial</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <PublicFooter
        intro={
          <div className="ajrak-field home-close">
            <span className="ajrak-band home-close-band" aria-hidden="true" />
            <div className="home-close-copy">
              <p
                className="home-close-urdu"
                lang="ur"
                dir="rtl"
                aria-hidden="true"
              >
                آواز کو الفاظ دیں
              </p>
              <h2>Give your next video Urdu captions</h2>
              <p>
                Start with a recording. Make the captions your own in Studio.
              </p>
              <StartFree label="Try 10 free minutes" className="home-cta" />
            </div>
            <span className="ajrak-band home-close-band" aria-hidden="true" />
          </div>
        }
      />
    </>
  );
}
