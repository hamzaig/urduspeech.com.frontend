import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  Languages,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { UrduReadabilityTool } from "@/components/urdu-readability-tool";
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

const title = "Free Urdu Subtitle Speed & Unicode Checker";
const description =
  "Check Urdu Nastaliq subtitle reading speed (CPS) for Reels and YouTube, detect Arabic kaf and yeh characters, and download normalized UTF-8 SRT or VTT.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/tools/urdu-subtitle-checker",
  ogImage: "tools",
});

export default function UrduSubtitleCheckerPage() {
  const path = "/tools/urdu-subtitle-checker" as const;
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
      { name: "Urdu subtitle checker", path },
    ]),
    buildSoftwareApplicationJsonLd({
      name: "UrduSpeech Free Urdu Subtitle Readability & Unicode Fixer",
      description,
      path,
      isAccessibleForFree: true,
      includeOffers: false,
      featureList: [
        "Per-cue Characters Per Second (CPS) and Words Per Minute (WPM) readability scoring for Reels, TikTok, Shorts, and YouTube",
        "Automatic detection of Arabic Kaf (U+0643 ك) and Arabic Yeh (U+064A ي) mixed into Urdu SRT or WebVTT subtitles",
        "One-click Unicode normalization to Urdu Keheh (U+06A9 ک), Choti Yeh (U+06CC ی), and Urdu punctuation (؟ and ،)",
        "100% browser-local JavaScript execution with zero server upload and free UTF-8 SRT/VTT downloads",
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
          { name: "Urdu subtitle checker" },
        ]}
      />
      <MarketingIntro title="Free Urdu subtitle readability & Unicode fixer">
        <p>
          Paste or open any UTF-8 <code>.srt</code> or <code>.vtt</code>{" "}
          subtitle file to measure reading speed (characters per second) for
          mobile Reels or 16:9 YouTube, spot overly dense lines, and fix broken
          Arabic kaf (<code>ك</code>) and yeh (<code>ي</code>) code points into
          proper Urdu <code>ک</code> and <code>ی</code> right inside your
          browser.
        </p>
      </MarketingIntro>

      <UrduReadabilityTool />

      <section
        className="product-section"
        aria-labelledby="why-unicode-matters"
      >
        <h2 id="why-unicode-matters">
          Why raw Urdu subtitles fail in Nastaliq video players
        </h2>
        <ul className="product-points two-col" role="list">
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>Arabic ك / ي breaks Nastaliq letter joining</h3>
            <p>
              Many generic speech models and Whisper outputs mix Arabic Kaf (
              <code>U+0643</code>) and Arabic Yeh (<code>U+064A</code>) into
              Urdu sentences. Inside Nastaliq fonts like Noto Nastaliq Urdu or
              Jameel Noori Nastaleeq, those Arabic characters frequently render
              disconnected glyphs or fallback Naskh boxes. Normalizing to{" "}
              <code>U+06A9</code> (ک) and <code>U+06CC</code> (ی) fixes shaping
              immediately.
            </p>
          </li>
          <li>
            <Smartphone size={24} aria-hidden="true" />
            <h3>Mobile Reels need slower Urdu CPS than English</h3>
            <p>
              Nastaliq ligatures stack diagonally and carry dots above and below
              the baseline. On 9:16 Reels, TikTok, and YouTube Shorts, keeping
              Urdu cues at or below <strong>17 characters per second</strong>{" "}
              and 38 characters per line helps viewers finish reading before the
              next cut arrives.
            </p>
          </li>
          <li>
            <Gauge size={24} aria-hidden="true" />
            <h3>Protected URLs, handles, and English terms</h3>
            <p>
              When fixing Western question marks (<code>?</code>) and commas (
              <code>,</code>) into Urdu <code>؟</code> and <code>،</code>, this
              tool skips mixed English lines, decimal numbers, URLs, and{" "}
              <code>@handles</code> so technical references stay intact.
            </p>
          </li>
          <li>
            <ShieldCheck size={24} aria-hidden="true" />
            <h3>Private client-side processing</h3>
            <p>
              Unreleased scripts, podcast interviews, and client drafts never
              leave your browser tab. Every audit and Unicode normalization step
              executes locally in JavaScript.
            </p>
          </li>
        </ul>
      </section>

      <div className="guide-link-row">
        <Link href="/tools/srt-to-vtt-converter">
          Convert SRT to WebVTT or plain TXT{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/urdu-caption-glossary">
          Read the Urdu subtitling &amp; Nastaliq glossary{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/methodology">
          See how Studio handles Urdu Unicode automatically{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/urdu-captions-for-reels-tiktok">
          Urdu caption workflow for Reels &amp; TikTok{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <section className="demo-next" aria-labelledby="checker-cta">
        <div>
          <h2 id="checker-cta">
            Skip manual subtitle cleanup on your next Urdu video
          </h2>
          <p>
            UrduSpeech Studio applies conservative Urdu Unicode normalization
            and safe-area Noto Nastaliq rendering automatically. Test it on your
            own clip with 10 free minutes (no card required).
          </p>
        </div>
        <StartFree label="Try 10 free minutes" />
      </section>
    </PublicPage>
  );
}
