import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Wallet } from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { MarketingIntro, Plans, StartFree } from "@/components/marketing";
import { PlanCalculator } from "@/components/plan-calculator";
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

const title = "Urdu Caption & Transcription Cost Calculator";
const description =
  "Estimate monthly Urdu transcription and video caption minutes across Reels, YouTube videos, podcasts, and voice notes to find your best PKR plan.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/tools/caption-plan-calculator",
  ogImage: "pricing",
});

export default function CaptionPlanCalculatorPage() {
  const path = "/tools/caption-plan-calculator" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/pricing.png",
      mainEntityId: `${SITE_URL}${path}#app`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Free Tools", path: "/tools" },
      { name: "PKR plan calculator", path },
    ]),
    buildSoftwareApplicationJsonLd({
      name: "UrduSpeech PKR Caption & Transcription Plan Calculator",
      description,
      path,
      isAccessibleForFree: true,
      includeOffers: true,
      featureList: [
        "Interactive monthly minute estimator across Reels, TikTok, YouTube videos, podcasts, and voice notes",
        "Single-recording duration limit and original-quality unwatermarked video matching",
        "Exact Pakistani rupee (PKR) cost-per-minute breakdown for Free, Starter, Creator, and Studio tiers",
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
          { name: "PKR plan calculator" },
        ]}
      />
      <MarketingIntro title="Urdu caption & transcription PKR plan calculator">
        <p>
          Unsure whether Starter (PKR 999), Creator (PKR 2,499), or Studio (PKR
          5,999) fits your monthly publishing cadence? Dial in your short clips,
          long videos, podcasts, and voice notes below to see your exact monthly
          minute total and effective cost per minute in Pakistani rupees.
        </p>
      </MarketingIntro>

      <PlanCalculator source="standalone_tool" />

      <section className="product-section" aria-labelledby="calc-rules">
        <h2 id="calc-rules">How UrduSpeech calculates minutes and limits</h2>
        <ul className="product-points" role="list">
          <li>
            <Clock size={24} aria-hidden="true" />
            <h3>One shared allowance for audio and video</h3>
            <p>
              Audio files (MP3, M4A, WAV, FLAC) and videos (MP4, MOV) draw from
              the same duration-based minute balance. Re-exporting UTF-8 TXT,
              SRT, or WebVTT from a finished project uses zero extra minutes.
            </p>
          </li>
          <li>
            <CheckCircle2 size={24} aria-hidden="true" />
            <h3>Single-recording length also sets your tier</h3>
            <p>
              Even if you only transcribe one 2-hour podcast a month, you need
              Creator (180-minute max single file) or Studio (360-minute max
              single file) to upload it without splitting.
            </p>
          </li>
          <li>
            <Wallet size={24} aria-hidden="true" />
            <h3>Fixed PKR prices, local payment rails</h3>
            <p>
              Every paid tier includes clean original-quality unwatermarked MP4 exports and
              supports Stripe card checkout plus Pakistani manual verification
              (Bank transfer, JazzCash, Easypaisa, SadaPay, NayaPay) when
              enabled.
            </p>
          </li>
        </ul>
      </section>

      <section className="product-section" aria-labelledby="calc-all-plans">
        <h2 id="calc-all-plans">Compare all four tiers side by side</h2>
        <Plans showCardCta showStart={false} />
      </section>

      <div className="guide-link-row">
        <Link href="/pricing">
          Full pricing table &amp; payment details{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/supported-formats">
          Check file sizes, codecs &amp; 256 MiB MP4 limit{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/tools/urdu-subtitle-checker">
          Check Urdu subtitle CPS speed &amp; Unicode{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <section className="demo-next" aria-labelledby="calc-page-cta">
        <div>
          <h2 id="calc-page-cta">Try your first 10 minutes free</h2>
          <p>
            No card required. Test Nastaliq accuracy, Roman Urdu, English
            translation, and subtitle exports on a real recording before picking
            a monthly tier.
          </p>
        </div>
        <StartFree label="Try 10 free minutes" />
      </section>
    </PublicPage>
  );
}
