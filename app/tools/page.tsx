import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Captions,
  FileCode2,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import {
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildItemListJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

const title = "Free Browser Tools for Urdu Subtitles & Plans";
const description =
  "Use free browser tools to convert SRT to WebVTT, check Urdu Nastaliq reading speed, fix Arabic kaf and yeh Unicode, and estimate PKR caption plans.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/tools",
  ogImage: "tools",
});

const toolCards = [
  {
    href: "/tools/urdu-subtitle-checker" as const,
    icon: Sparkles,
    topic: "Readability & Unicode",
    title: "Urdu Subtitle Speed & Unicode Checker",
    summary:
      "Measure mobile Reels and YouTube reading speed (CPS), flag lines that run too fast, and normalize Arabic ك / ي to Urdu ک / ی locally in one click.",
  },
  {
    href: "/tools/srt-to-vtt-converter" as const,
    icon: FileCode2,
    topic: "Format Conversion",
    title: "SRT to WebVTT Converter & Validator",
    summary:
      "Convert UTF-8 .srt to .vtt, turn .vtt back to .srt, or strip timestamps into plain .txt while checking overlapping cues with zero server upload.",
  },
  {
    href: "/tools/caption-plan-calculator" as const,
    icon: Calculator,
    topic: "PKR Budget Estimator",
    title: "Monthly Urdu Caption Plan Calculator",
    summary:
      "Enter your monthly Reels, YouTube videos, podcasts, and voice notes to see your exact minute demand, best PKR tier, and cost per minute.",
  },
  {
    href: "/demo" as const,
    icon: Captions,
    topic: "Interactive Preview",
    title: "Live Nastaliq & Bilingual Caption Demo",
    summary:
      "Switch between Urdu Nastaliq, Roman Urdu, English, and stacked bilingual views, edit sample cues, preview 3 styles, and download sample SRT/VTT/TXT.",
  },
  {
    href: "/urdu-caption-glossary" as const,
    icon: BookOpen,
    topic: "Reference Guide",
    title: "Urdu Subtitling & Nastaliq Glossary",
    summary:
      "Plain definitions of Nastaliq vs Naskh, RTL bidirectional isolation, Unicode U+06A9/U+06CC, CPS pacing, BT.2020 HDR tone-mapping, and safe areas.",
  },
];

export default function ToolsHubPage() {
  const path = "/tools" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      type: "CollectionPage",
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/tools.png",
      mainEntityId: `${SITE_URL}${path}#itemlist`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Free Tools", path },
    ]),
    buildItemListJsonLd({
      path,
      name: "Free Browser Tools for Urdu Creators",
      items: toolCards.map((card) => ({
        name: card.title,
        path: card.href,
        description: card.summary,
      })),
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Free Tools" }]}
      />
      <MarketingIntro title="Free browser tools for Urdu video and subtitle workflows">
        <p>
          Every utility below runs directly in your browser with no account
          required and zero file uploads. Fix broken Arabic kaf and yeh Unicode
          in existing Urdu subtitle files, check Reels and YouTube reading
          speed, convert SRT to WebVTT, or calculate your monthly captioning
          minutes in PKR.
        </p>
      </MarketingIntro>

      <section className="product-section" aria-labelledby="tools-directory">
        <h2 id="tools-directory">Available creator utilities</h2>
        <ul className="guide-cards" role="list">
          {toolCards.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <span className="guide-card-icon">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <span className="guide-card-topic">{item.topic}</span>
                  <span className="guide-card-title">
                    <strong>{item.title}</strong>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                  <span className="guide-card-summary">{item.summary}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="guide-link-row">
        <Link href="/video-captions">
          Generate Nastaliq MP4 captions automatically{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/urdu-transcription">
          Transcribe Urdu audio to UTF-8 text{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/compare">
          Compare Urdu caption tools side by side{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/pricing">
          View monthly PKR plans <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <section className="demo-next" aria-labelledby="tools-studio-cta">
        <div>
          <h2 id="tools-studio-cta">
            Need captions generated directly from spoken Urdu audio or video?
          </h2>
          <p>
            Start with 10 free minutes in UrduSpeech Studio (no card required).
            Upload MP3, M4A, WAV, FLAC, MP4, or MOV and export editable UTF-8
            TXT, SRT, VTT, or burned-in Nastaliq MP4.
          </p>
        </div>
        <StartFree label="Try 10 free minutes" />
      </section>
    </PublicPage>
  );
}
