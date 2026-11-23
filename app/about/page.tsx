import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import {
  SITE_URL,
  SUPPORT_EMAIL,
  buildBreadcrumbJsonLd,
  buildEditorialTeamJsonLd,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

const title = "About Us & MoonSys Ltd";
const description =
  "Learn how MoonSys Ltd builds automated AI Urdu transcription, Nastaliq subtitling, and creator workflows, and how we differ from human agencies.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/about",
  ogImage: "about",
  markdownPath: "/about.md",
});

export default function AboutPage() {
  const path = "/about" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildEditorialTeamJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      type: "AboutPage",
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/about.png",
      mainEntityId: `${SITE_URL}/#organization`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "About", path },
    ]),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page marketing-reading">
      <StructuredData data={jsonLd} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
      <MarketingIntro title="Built for Urdu creators by MoonSys Ltd">
        <p>
          <strong>UrduSpeech</strong> (<code>urduspeech.com</code>) is a
          browser-based, automated AI transcription and video captioning studio
          operated by <strong>MoonSys Ltd</strong>. We built it because Urdu
          speakers—podcasters, journalists, educators, and social video
          creators—deserve software that treats right-to-left Nastaliq script,
          Roman Urdu, Urdu-English code-switching, and Pakistani rupee pricing
          as first-class citizens.
        </p>
      </MarketingIntro>

      <section
        className="entity-callout"
        aria-labelledby="disambiguation-title"
      >
        <h2 id="disambiguation-title">
          What UrduSpeech is — and what it is not
        </h2>
        <p>
          Clear entity boundaries help both creators and search systems
          understand our service accurately:
        </p>
        <ul>
          <li>
            <strong>Automated AI creator software (not a human agency):</strong>{" "}
            UrduSpeech is a self-service web studio. Processing is automated
            (speech recognition, optional AI correction or translation, timing
            alignment, and burned-in MP4 rendering). We do not employ human
            transcriptionists, do not take manual typing orders by email, and do
            not claim certified legal or medical accuracy scores.
          </li>
          <li>
            <strong>Unrelated to academic datasets:</strong> UrduSpeech (
            <code>urduspeech.com</code> by MoonSys Ltd) is a commercial creator
            web application and has no affiliation with the academic{" "}
            <code>ASLP-lab/UrduSpeech</code> speech research corpus published on
            arXiv or Hugging Face.
          </li>
          <li>
            <strong>Zero training on your recordings:</strong> Uploaded user
            audio and video files are processed strictly to generate your
            requested transcripts and captions, expire automatically after your
            plan’s 3, 15, 30, or 90 day window, and are never used to train our
            own AI models.
          </li>
        </ul>
      </section>

      <section className="product-section" aria-labelledby="why-we-built-it">
        <h2 id="why-we-built-it">
          Why we built a dedicated Urdu caption studio
        </h2>
        <ul className="product-points two-col" role="list">
          <li>
            <Globe size={24} aria-hidden="true" />
            <h3>First-class Nastaliq and RTL engineering</h3>
            <p>
              Most global video editors treat Urdu as an afterthought, breaking
              ligatures or substituting generic Arabic Naskh fonts. Our render
              pipeline uses Noto Nastaliq Urdu paired with Inter, generous line
              spacing, and safe-area edge checks so Urdu captions read naturally
              on every screen.
            </p>
          </li>
          <li>
            <CheckCircle2 size={24} aria-hidden="true" />
            <h3>Honest human-in-the-loop review</h3>
            <p>
              Automated AI models can mishear regional names, figures, and noisy
              speech. Instead of hiding uncertainty behind inflated accuracy
              claims, Studio gives you local audio/video playback, reviewable
              accept/reject AI correction cards, and non-overlapping timestamp
              editing before export.
            </p>
          </li>
          <li>
            <Building2 size={24} aria-hidden="true" />
            <h3>Local Pakistani pricing and rails</h3>
            <p>
              Creator tools priced in USD with international-only cards lock out
              local publishers. UrduSpeech publishes transparent monthly plans
              in Pakistani rupees (PKR 999 to PKR 5,999 after 10 free minutes)
              with Stripe card checkout and local manual verification options
              (bank transfer, JazzCash, Easypaisa, SadaPay, NayaPay) displayed
              inside Studio Billing.
            </p>
          </li>
          <li>
            <ShieldCheck size={24} aria-hidden="true" />
            <h3>Transparent infrastructure and verifiable deletion</h3>
            <p>
              We publish our exact infrastructure sub-processors (AWS S3 US East
              Ohio, Hetzner, Vercel, Modal, Deepgram, OpenAI, Zoho, Stripe) and
              provide self-service project deletion and receipt-tracked account
              deletion. Read our{" "}
              <Link href="/security">security and retention documentation</Link>
              .
            </p>
          </li>
        </ul>
      </section>

      <section
        id="editorial-team"
        className="product-section"
        aria-labelledby="editorial-team-heading"
      >
        <h2 id="editorial-team-heading">
          UrduSpeech Editorial &amp; Engineering Team
        </h2>
        <p>
          All creator guides, technical codec documentation, and tool
          comparisons published on <code>urduspeech.com</code> are written and
          reviewed by the{" "}
          <strong>UrduSpeech Editorial &amp; Engineering Team</strong> at
          MoonSys Ltd—the engineers and product specialists who build and
          maintain the speech-processing, Unicode normalization, subtitle
          export, and video-rendering pipeline.
        </p>
        <p>
          Every guide and comparison adheres to strict factual verification: we
          document actual Studio limits (including the 2 GiB scanning ceiling,
          256 MiB MP4 render limit, 720p Free watermark, and unsupported
          workflows like live dictation or speaker diarization), link primary
          standards such as W3C WebVTT and YouTube Help, and never publish
          unverified accuracy percentages or fabricated customer reviews.
        </p>
        <p>
          Questions, corrections, or press inquiries can be sent directly to{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </section>

      <div className="guide-link-row">
        <Link href="/methodology">
          Read our AI &amp; Nastaliq rendering methodology{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/security">
          Security, sub-processors &amp; media retention{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/pricing">
          View Pakistani rupee plans <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/contact">
          Contact support <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <section className="demo-next" aria-labelledby="about-cta">
        <div>
          <h2 id="about-cta">Try UrduSpeech Studio yourself</h2>
          <p>
            Start with 10 free minutes (no card required) or inspect live sample
            captions right now in the browser editor.
          </p>
        </div>
        <div className="product-actions">
          <StartFree />
          <Link href="/demo" className="button secondary">
            Open interactive demo
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
