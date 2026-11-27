import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CreditCard,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  Plans,
  QuestionList,
  StartFree,
  getBillingQuestions,
} from "@/components/marketing";
import { PlanCalculator } from "@/components/plan-calculator";
import { StructuredData } from "@/components/structured-data";
import { MANUAL_PAYMENT_METHODS, PLANS } from "@/lib/plans";
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

const title = "Pricing in PKR for Urdu Captions & Transcripts";
const description =
  "Compare Free, Starter, Creator, and Studio plans in Pakistani rupees by monthly minutes, max file duration, original-quality exports, and media retention.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/pricing",
  ogImage: "pricing",
  markdownPath: "/pricing.md",
});

const included = [
  "Urdu Nastaliq script, Roman Urdu, English translation, and stacked Urdu + English bilingual output",
  "Browser cue editor with local recording playback, non-overlapping timestamp checks, and saved track versions",
  "Optional conservative AI text correction with accept/reject suggestions",
  "Unlimited UTF-8 TXT, SRT, and WebVTT subtitle downloads for your projects",
  "All caption templates for MP4 exports, including Word pop and karaoke",
];

export default function Pricing() {
  const path = "/pricing" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/pricing.png",
      mainEntityId: `${SITE_URL}/#software`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Pricing", path },
    ]),
    buildSoftwareApplicationJsonLd({
      name: "UrduSpeech",
      description,
      path: "/",
      isCanonicalApp: true,
      includeOffers: true,
      featureList: [
        "10 free minutes one-time trial with no card required",
        "Monthly PKR plans (Starter PKR 999, Creator PKR 2,499, Studio PKR 5,999)",
        "Original-resolution (up to 4K) unwatermarked Nastaliq and bilingual MP4 video exports on paid plans",
        "Card checkout via Stripe and manual Pakistani payment verification (bank transfer, JazzCash, Easypaisa, SadaPay, NayaPay)",
      ],
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page pricing-page">
      <StructuredData data={jsonLd} />
      <section className="page-hero" aria-labelledby="compare-plans">
        <Breadcrumbs
          items={[{ name: "Home", href: "/" }, { name: "Pricing" }]}
        />
        <MarketingIntro title="Simple pricing, in rupees">
          <p>
            Audio and video share one duration-based minute allowance. Start
            with 10 free minutes (no card required), then choose a monthly plan
            based on how many minutes you publish, your longest single
            recording, and how long you need original media stored.
          </p>
        </MarketingIntro>
        <h2 className="sr-only" id="compare-plans">
          Compare plans
        </h2>
        <Plans showCardCta showStart={false} />
      </section>

      <section
        className="product-section"
        aria-label="Interactive PKR plan calculator"
      >
        <PlanCalculator source="pricing_page" />
      </section>

      <section className="product-section" aria-labelledby="plan-spec-table">
        <h2 id="plan-spec-table">Full plan limits side by side</h2>
        <p>
          Every paid plan removes the video watermark and raises burned-in MP4
          exports to your original resolution (up to 4K). See{" "}
          <Link href="/supported-formats">
            supported formats and render limits
          </Link>{" "}
          for codec requirements and the 256 MiB MP4 safety cap.
        </p>
        <div
          className="pricing-scroll"
          role="region"
          aria-label="Detailed UrduSpeech plan comparison in Pakistani rupees"
          tabIndex={0}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">Plan</th>
                <th scope="col">Price (PKR)</th>
                <th scope="col">Allowance</th>
                <th scope="col">Approx. PKR / min</th>
                <th scope="col">Max single recording</th>
                <th scope="col">Max upload size</th>
                <th scope="col">Captioned MP4</th>
                <th scope="col">Media retention</th>
              </tr>
            </thead>
            <tbody>
              {PLANS.map((plan) => (
                <tr key={plan.id}>
                  <th scope="row">
                    {plan.name}
                    {plan.recommended ? " (Recommended)" : ""}
                  </th>
                  <td>
                    PKR {plan.priceDisplay}
                    {plan.billingPeriod === "monthly" ? " / mo" : " once"}
                  </td>
                  <td>{plan.minutes} min</td>
                  <td>
                    {plan.pricePkr === 0
                      ? "Free trial"
                      : `PKR ${(plan.pricePkr / plan.minutes).toFixed(1)}`}
                  </td>
                  <td>{plan.maxDurationMinutes} min</td>
                  <td>{plan.maxUploadLabel}</td>
                  <td>{plan.videoQuality}</td>
                  <td>{plan.retentionDays} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pricing-included" aria-labelledby="pricing-included">
        <h2 id="pricing-included">Included on every plan</h2>
        <ul role="list">
          {included.map((feature) => (
            <li key={feature}>
              <Check size={18} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="product-section" aria-labelledby="payment-methods">
        <h2 id="payment-methods">
          Pakistani payment methods and how plans activate
        </h2>
        <p>
          Prices are shown and settled in Pakistani rupees (PKR). The exact
          payment options enabled for your account always appear inside{" "}
          <strong>Studio Billing</strong> before checkout.
        </p>
        <ul className="product-points" role="list">
          <li>
            <CreditCard size={24} aria-hidden="true" />
            <h3>Card checkout via Stripe</h3>
            <p>
              Where card checkout is available, subscriptions renew
              automatically each month and can be cancelled anytime from the
              Stripe billing portal. UrduSpeech never stores full card numbers.
            </p>
          </li>
          <li>
            <Wallet size={24} aria-hidden="true" />
            <h3>Local Pakistani manual payments</h3>
            <p>
              When manual payments are enabled in Studio, you can pay for one
              monthly period at a time using{" "}
              <strong>{MANUAL_PAYMENT_METHODS.join(", ")}</strong>. Submit your
              transfer reference once inside Studio; your plan activates after
              verification and never auto-renews without a new verified payment.
            </p>
          </li>
          <li>
            <ShieldCheck size={24} aria-hidden="true" />
            <h3>Fair minute reservation</h3>
            <p>
              Minutes are committed only when canonical transcription completes.
              If a job fails before completion, reserved minutes are released
              back to your allowance. See our{" "}
              <Link href="/refunds">payments and refunds policy</Link> for
              dispute resolution.
            </p>
          </li>
        </ul>
      </section>

      <section className="product-section" aria-labelledby="choose-a-plan">
        <h2 id="choose-a-plan">Which plan fits your publishing schedule?</h2>
        <ul className="product-points two-col" role="list">
          <li>
            <h3>Free &amp; Starter (PKR 0 to 999)</h3>
            <p>
              Use <strong>Free</strong> to test Nastaliq accuracy and caption
              rendering on a real clip up to 10 minutes. Upgrade to{" "}
              <strong>Starter (60 min/mo)</strong> if you post several short
              reels, voice notes, or one hour-long interview per month.
            </p>
          </li>
          <li>
            <h3>Creator &amp; Studio (PKR 2,499 to 5,999)</h3>
            <p>
              <strong>Creator (200 min/mo)</strong> is built for weekly YouTube
              channels, bilingual educators, and podcasters with recordings up
              to 3 hours. <strong>Studio (500 min/mo)</strong> adds 6-hour file
              support and 90-day media retention for production teams and
              newsrooms.
            </p>
          </li>
        </ul>
      </section>

      <section
        className="product-section pricing-questions"
        aria-labelledby="pricing-questions"
      >
        <h2 id="pricing-questions">Minutes, payments, and retention</h2>
        <QuestionList
          questions={getBillingQuestions({ includePricingLink: false })}
          openFirst
        />
        <div className="guide-link-row">
          <Link href="/refunds">
            Payment support and refunds policy{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/supported-formats">
            Upload, codec &amp; render limits{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/security">
            Media retention &amp; data security{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/compare">
            Compare UrduSpeech with other caption tools{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="demo-next" aria-labelledby="pricing-cta">
        <div>
          <h2 id="pricing-cta">Test UrduSpeech with 10 free minutes</h2>
          <p>
            Start free with no card needed. Create an account, upload an Urdu
            recording up to 10 minutes, and inspect the transcript and captions
            yourself.
          </p>
        </div>
        <div className="product-actions">
          <StartFree label="Try 10 free min" />
          <Link href="/demo" className="button secondary">
            Try the demo
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
