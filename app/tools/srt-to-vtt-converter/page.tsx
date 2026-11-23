import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { SrtVttTool } from "@/components/srt-vtt-tool";
import { StructuredData } from "@/components/structured-data";
import {
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

const title = "Free SRT to WebVTT Converter & Urdu Validator";
const description =
  "Convert UTF-8 SRT to WebVTT, VTT to SRT, or subtitles to plain TXT right in your browser. Validate overlapping timestamps and RTL Urdu cues free.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/tools/srt-to-vtt-converter",
  ogImage: "tools",
});

export default function SrtToVttConverterPage() {
  const path = "/tools/srt-to-vtt-converter" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/tools.png",
      mainEntityId: `${SITE_URL}${path}#app`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Free Tools", path: "/tools" },
      { name: "SRT to WebVTT converter", path },
    ]),
    buildSoftwareApplicationJsonLd({
      name: "UrduSpeech Free SRT to WebVTT Converter & Urdu Subtitle Validator",
      description,
      path,
      isAccessibleForFree: true,
      includeOffers: false,
      featureList: [
        "100% client-side UTF-8 SRT to WebVTT (.vtt) and WebVTT to SRT (.srt) conversion",
        "Strip timestamps to extract clean UTF-8 plain-text (.txt) transcripts",
        "Automatic Urdu RTL script detection and overlapping cue timestamp checks",
        "Zero account required and zero file upload to external servers",
      ],
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Free Tools", href: "/tools" },
          { name: "SRT to WebVTT converter" },
        ]}
      />
      <MarketingIntro title="Free SRT to WebVTT converter & Urdu subtitle validator">
        <p>
          Convert existing UTF-8 <code>.srt</code> files into
          standards-compliant <code>.vtt</code> (WebVTT), turn <code>.vtt</code>{" "}
          back into <code>.srt</code>, or strip timestamps to extract a plain{" "}
          <code>.txt</code> transcript while checking for overlapping cues,
          inverted timestamps, and right-to-left Urdu script. Everything runs
          locally in your browser with no account required.
        </p>
      </MarketingIntro>

      <SrtVttTool />

      <section className="product-section" aria-labelledby="tool-benefits">
        <h2 id="tool-benefits">
          Why use a UTF-8 Urdu-safe subtitle converter?
        </h2>
        <ul className="product-points two-col" role="list">
          <li>
            <ShieldCheck size={24} aria-hidden="true" />
            <h3>Zero server upload for private scripts</h3>
            <p>
              Unlike ad-heavy converter sites that upload unreleased video
              scripts to unknown servers, this converter executes purely in
              client-side JavaScript inside your browser tab.
            </p>
          </li>
          <li>
            <Globe size={24} aria-hidden="true" />
            <h3>Preserves Urdu Unicode &amp; bilingual lines</h3>
            <p>
              Strips stray UTF-8 BOM headers, preserves right-to-left Urdu
              Nastaliq code points untouched, and safely escapes{" "}
              <code>&amp;</code>, <code>&lt;</code>, and <code>&gt;</code> when
              generating WebVTT files for HTML5 <code>&lt;track&gt;</code>{" "}
              players.
            </p>
          </li>
          <li>
            <CheckCircle2 size={24} aria-hidden="true" />
            <h3>Catches YouTube &amp; NLE timing bugs early</h3>
            <p>
              Automatically flags overlapping cues, cues ending before their
              start time, ultra-short flashes under 500 ms, and overly long
              lines over 84 characters before you upload to YouTube Studio or
              Premiere Pro.
            </p>
          </li>
          <li>
            <FileText size={24} aria-hidden="true" />
            <h3>Need subtitles generated from audio or video?</h3>
            <p>
              This browser tool converts existing subtitle files. When you have
              an Urdu audio or video file that does not have captions yet, use{" "}
              <Link href="/video-captions">UrduSpeech Studio</Link> to generate
              timed Nastaliq, Roman Urdu, English, or bilingual captions
              automatically.
            </p>
          </li>
        </ul>
      </section>

      <div className="guide-link-row">
        <Link href="/tools/urdu-subtitle-checker">
          Check Urdu CPS speed &amp; fix Arabic ك / ي Unicode{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/tools/caption-plan-calculator">
          Estimate your monthly Urdu captioning PKR plan{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/srt-vtt-urdu-subtitle-generator">
          Generate Urdu SRT &amp; VTT automatically from video{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/guides/urdu-subtitles-for-youtube">
          How to upload SRT &amp; VTT files to YouTube Studio{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <section className="demo-next" aria-labelledby="tool-studio-cta">
        <div>
          <h2 id="tool-studio-cta">
            Start from spoken Urdu audio or video instead?
          </h2>
          <p>
            Upload MP3, M4A, WAV, FLAC, MP4, or MOV in UrduSpeech Studio to
            generate editable Nastaliq, Roman Urdu, or English subtitles with 10
            free minutes.
          </p>
        </div>
        <StartFree />
      </section>
    </PublicPage>
  );
}
