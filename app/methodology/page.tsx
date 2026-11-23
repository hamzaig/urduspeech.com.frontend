import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Breadcrumbs,
  PublicPage,
  ReadingSections,
  type DocumentSection,
} from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import {
  SITE_URL,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildEditorialTeamJsonLd,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

const title = "AI Transcription & Nastaliq Methodology";
const description =
  "How automated Urdu speech recognition, conservative AI correction, protected tokens, Noto Nastaliq safe-area rendering, and HDR tone-mapping work.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/methodology",
  ogType: "article",
  ogImage: "about",
  publishedTime: "2026-11-22T00:00:00+05:00",
  modifiedTime: "2026-11-22T00:00:00+05:00",
  markdownPath: "/methodology.md",
});

const sections: readonly DocumentSection[] = [
  {
    title: "1. Container inspection and speech-track selection",
    body: (
      <>
        <p>
          Before any transcription minutes are committed, Studio runs an
          automated media inspection on your uploaded MP3, FLAC, PCM WAV, AAC
          M4A, MP4, or MOV file. Validation verifies the real container format,
          audio stream presence, duration against your plan ceiling, and the 2
          GiB minus one byte scanning limit.
        </p>
        <p>
          If an uploaded video contains multiple audio streams (common on
          dual-mic interviews or screen recordings), Studio pauses at the{" "}
          <strong>Media check</strong> step and asks you to choose the exact
          spoken-Urdu track. Minutes are committed only once canonical
          transcription finishes; failures prior to commit release the reserved
          allowance automatically.
        </p>
      </>
    ),
  },
  {
    title: "2. Canonical Urdu speech recognition and script generation",
    body: (
      <>
        <p>
          Speech recognition operates on the extracted spoken audio stream (not
          visual frames or existing soft subtitles) to create a canonical Urdu
          transcript anchored to phrase timestamps. From that canonical text,
          Studio generates whichever output you requested:
        </p>
        <ul>
          <li>
            <strong>Urdu script:</strong> Right-to-left Urdu Unicode text ready
            for Nastaliq rendering.
          </li>
          <li>
            <strong>Roman Urdu:</strong> Left-to-right Latin transliteration
            preserving original Urdu words and cadence.
          </li>
          <li>
            <strong>English:</strong> Meaning-focused English translation
            anchored to the canonical Urdu phrases.
          </li>
          <li>
            <strong>Urdu + English:</strong> Stacked two-line bilingual output
            ordered Urdu-first or English-first.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Conservative AI text correction and protected tokens",
    body: (
      <>
        <p>
          Generic LLM rewrites frequently corrupt transcripts by hallucinating
          words, changing spoken numbers, or rewriting dialect into stiff formal
          prose. UrduSpeech’s optional <strong>AI text correction</strong> stage
          follows strict conservation rules:
        </p>
        <ul>
          <li>
            <strong>Safe automatic normalization:</strong> Standardizes
            equivalent Arabic vs Urdu Unicode code points (such as Urdu{" "}
            <span lang="ur" dir="rtl">
              ک
            </span>{" "}
            and{" "}
            <span lang="ur" dir="rtl">
              ی
            </span>
            ) and applies safe punctuation.
          </li>
          <li>
            <strong>Protected token guardrails:</strong> Numeric values,
            currencies, dates, URLs, email addresses, hashtags, and{" "}
            <code>@handles</code> are protected against silent alteration.
          </li>
          <li>
            <strong>Explicit review cards:</strong> Uncertain wording proposals
            are surfaced in Studio with <code>before</code> and{" "}
            <code>after</code> text plus a brief reason so you can accept or
            reject each change individually—or disable AI text correction
            altogether at upload time.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Non-overlapping timing alignment and track versioning",
    body: (
      <>
        <p>
          Timed caption cues are aligned to the recording timeline and validated
          server-side so start and end times remain strictly ordered,
          non-overlapping, and within the media duration. Inside Studio, you
          attach your original local recording for zero-upload playback review,
          edit text or timestamps in seconds, and save a versioned track
          snapshot before exporting UTF-8 TXT, SRT, WebVTT, or video.
        </p>
      </>
    ),
  },
  {
    title: "5. Noto Nastaliq safe-area rendering and HDR tone-mapping",
    body: (
      <>
        <p>
          Burned-in captioned MP4 videos are rendered in cloud media workers
          using <strong>Noto Nastaliq Urdu</strong> for Urdu script and{" "}
          <strong>Inter</strong> for Latin characters and digits, optically
          sized so mixed Urdu-English cues remain balanced. Every cue is
          measured against verified safe-area margins so tall Nastaliq ascenders
          and lower dots never clip at frame edges across 16:9, 9:16, and 1:1
          aspect ratios.
        </p>
        <p>
          Properly tagged BT.2020 HLG and PQ HDR phone videos are tone-mapped to
          standard 8-bit SDR BT.709 H.264 MP4 with AAC audio so playback looks
          consistent across mobile social feeds. Rendered videos respect plan
          height tiers (720p watermarked on Free; 1080p unwatermarked on paid
          plans) and the 256 MiB operational safety limit.
        </p>
      </>
    ),
  },
  {
    title: "6. Honest boundaries and creator review checklist",
    body: (
      <>
        <p>
          No automated speech pipeline is error-free. We do not publish
          marketing accuracy percentages because real-world accuracy depends
          heavily on microphone quality, room echo, overlapping voices, and
          background music. UrduSpeech currently does not perform speaker
          diarization, OCR of visual slides, live microphone dictation, or
          synthetic voice dubbing. Before publishing, always review proper
          names, numbers, dates, and mixed-language idioms against your original
          recording.
        </p>
      </>
    ),
  },
];

export default function MethodologyPage() {
  const path = "/methodology" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildEditorialTeamJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/about.png",
      datePublished: "2026-11-22T00:00:00+05:00",
      dateModified: "2026-11-22T00:00:00+05:00",
      mainEntityId: `${SITE_URL}${path}#article`,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Methodology", path },
    ]),
    buildArticleJsonLd({
      type: "TechArticle",
      headline:
        "How UrduSpeech processes audio, AI correction, and Nastaliq video",
      description,
      path,
      datePublished: "2026-11-22T00:00:00+05:00",
      dateModified: "2026-11-22T00:00:00+05:00",
      image: "/og/about.png",
      articleSection: "Engineering methodology",
      wordCount: 820,
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Methodology" }]}
      />
      <article>
        <MarketingIntro title="How UrduSpeech turns spoken Urdu into publishable captions">
          <div className="author-byline">
            <span>
              By{" "}
              <Link href="/about#editorial-team">
                UrduSpeech Editorial &amp; Engineering Team
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <span>Updated 22 November 2026</span>
          </div>
          <p>
            A transparent technical look at our media validation, Urdu speech
            recognition, conservative AI correction guardrails, non-overlapping
            subtitle timing, and Noto Nastaliq video rendering pipeline.
          </p>
        </MarketingIntro>
        <ReadingSections sections={sections} />
      </article>

      <div className="guide-link-row">
        <Link href="/supported-formats">
          Supported codecs &amp; upload limits{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/security">
          Security, sub-processors &amp; media retention{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/about">
          About UrduSpeech &amp; MoonSys Ltd{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/demo">
          Test Nastaliq &amp; bilingual editing in the demo{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <section className="demo-next" aria-labelledby="methodology-cta">
        <div>
          <h2 id="methodology-cta">
            Inspect the pipeline on your own recording
          </h2>
          <p>
            Every new account includes 10 free minutes with no card required,
            including optional AI correction and local preview review.
          </p>
        </div>
        <StartFree />
      </section>
    </PublicPage>
  );
}
