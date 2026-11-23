import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Scale } from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import { publicAlternatives } from "@/lib/public-alternatives";
import { publicComparisons } from "@/lib/public-comparisons";
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

const title = "Compare Urdu Caption & Transcription Tools";
const description =
  "Honest side-by-side comparisons of Nastaliq rendering, Roman Urdu, code-switching, PKR pricing, and export limits across popular captioning tools.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/compare",
  ogImage: "compare",
});

export default function CompareHubPage() {
  const path = "/compare" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      type: "CollectionPage",
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/compare.png",
      mainEntityId: `${SITE_URL}${path}#itemlist`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Compare", path },
    ]),
    buildItemListJsonLd({
      path,
      name: "UrduSpeech Tool Comparisons",
      items: publicComparisons.map((item) => ({
        name: item.title,
        path: `/compare/${item.slug}` as const,
        description: item.summary,
      })),
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Compare" }]} />
      <MarketingIntro title="Compare UrduSpeech with other caption and transcription tools">
        <p>
          Every tool has real strengths and real limits. These honest,
          evidence-based comparisons (verified November 2026) show where
          UrduSpeech’s dedicated Urdu Nastaliq, Roman Urdu, bilingual, and PKR
          workflow fits best, and when a general video editor, local Whisper
          setup, or live dictation tool is the right choice.
        </p>
      </MarketingIntro>

      <section className="product-section" aria-labelledby="compare-cards">
        <h2 id="compare-cards">Head-to-head comparisons</h2>
        <ul className="guide-cards" role="list">
          {publicComparisons.map((item) => (
            <li key={item.slug}>
              <Link href={`/compare/${item.slug}`}>
                <span className="guide-card-icon">
                  <Scale size={24} aria-hidden="true" />
                </span>
                <span className="guide-card-topic">Comparison</span>
                <span className="guide-card-title">
                  <strong>UrduSpeech vs {item.competitor}</strong>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
                <span className="guide-card-summary">{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="product-section" aria-labelledby="compare-overview">
        <h2 id="compare-overview">Quick overview matrix</h2>
        <p>
          Compare core Urdu production capabilities at a glance before diving
          into individual reviews.
        </p>
        <div
          className="pricing-scroll"
          role="region"
          aria-label="Overview matrix comparing UrduSpeech and alternatives"
          tabIndex={0}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">Tool</th>
                <th scope="col">Native Nastaliq MP4</th>
                <th scope="col">Roman Urdu &amp; Bilingual</th>
                <th scope="col">Best primary job</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">UrduSpeech</th>
                <td>Built-in Noto Nastaliq + safe-area checks</td>
                <td>Yes (Urdu, Roman Urdu, English, Urdu + English)</td>
                <td>
                  Dedicated Urdu transcription, UTF-8 SRT/VTT, and Nastaliq
                  video captions in PKR
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <Link href="/compare/urduspeech-vs-capcut">CapCut</Link>
                </th>
                <td>Manual font/RTL setup often needed</td>
                <td>General auto-captions (no dedicated Roman Urdu)</td>
                <td>Cutting clips, B-roll, transitions, and motion effects</td>
              </tr>
              <tr>
                <th scope="row">
                  <Link href="/compare/urduspeech-vs-descript">Descript</Link>
                </th>
                <td>English/LTR focused</td>
                <td>English-first workflow</td>
                <td>
                  English text-based podcast cutting &amp; speaker diarization
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <Link href="/compare/urduspeech-vs-veed">VEED.io</Link>
                </th>
                <td>General browser caption layers</td>
                <td>Multi-language translate (USD tiers)</td>
                <td>Broad USD browser video suite with stock templates</td>
              </tr>
              <tr>
                <th scope="row">
                  <Link href="/compare/urduspeech-vs-whisper">
                    OpenAI Whisper
                  </Link>
                </th>
                <td>DIY FFmpeg/libass scripts required</td>
                <td>Raw transcription / English translate only</td>
                <td>Air-gapped local developer pipelines on personal GPUs</td>
              </tr>
              <tr>
                <th scope="row">
                  <Link href="/compare/urduspeech-vs-google-docs-voice-typing">
                    Google Docs Voice Typing
                  </Link>
                </th>
                <td>No video or subtitle export</td>
                <td>Live single-language dictation only</td>
                <td>Free live microphone typing straight into a Google Doc</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="product-section" aria-labelledby="switching-guides">
        <h2 id="switching-guides">
          Switching &amp; alternative guides (November 2026)
        </h2>
        <p>
          Looking specifically to move your Urdu captioning workflow from a
          general video or podcast editor? Follow these 4-step migration guides.
        </p>
        <div className="guide-link-row">
          {publicAlternatives.map((alt) => (
            <Link key={alt.slug} href={`/alternatives/${alt.slug}`}>
              {alt.competitor} Urdu alternative &amp; migration guide{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <div className="guide-link-row">
        <Link href="/demo">
          Test UrduSpeech captions live in your browser{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/pricing">
          Compare transparent Pakistani rupee plans{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/methodology">
          Read our AI &amp; Nastaliq rendering methodology{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/tools/srt-to-vtt-converter">
          Try our free browser SRT to WebVTT converter{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <section className="demo-next" aria-labelledby="compare-cta">
        <div>
          <h2 id="compare-cta">Test UrduSpeech on a real clip for free</h2>
          <p>
            No card required. Upload up to 10 minutes of spoken Urdu audio or
            video and compare the draft quality and Nastaliq output firsthand.
          </p>
        </div>
        <StartFree />
      </section>
    </PublicPage>
  );
}
