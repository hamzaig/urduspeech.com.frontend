import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, LockKeyhole, Server, Trash2 } from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

const title = "Data Security, Privacy & Media Retention";
const description =
  "Zero model training on recordings, private AWS S3 storage, 3 to 90 day automatic media expiry, sub-processors, and verified deletion receipts.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/security",
  ogImage: "about",
  markdownPath: "/security.md",
});

export default function SecurityPage() {
  const path = "/security" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/about.png",
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Security & retention", path },
    ]),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page marketing-reading">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Security & retention" }]}
      />
      <MarketingIntro title="Security, privacy, and media retention">
        <p>
          Journalists, agencies, educators, and creators trust UrduSpeech with
          unreleased interviews and private voice recordings. Here is exactly
          where files live, which automated providers process them, when media
          expires, and how you can verify deletion.
        </p>
      </MarketingIntro>

      <section className="product-section" aria-labelledby="security-pillars">
        <h2 id="security-pillars">Core privacy and security commitments</h2>
        <ul className="product-points two-col" role="list">
          <li>
            <LockKeyhole size={24} aria-hidden="true" />
            <h3>Automated processing, zero model training</h3>
            <p>
              Processing is strictly automated: there are no human
              transcriptionists listening to your uploads, and UrduSpeech does
              not train its own AI models on your audio, video, or transcripts.
              Browser sessions use necessary authentication cookies with zero
              session-replay trackers.
            </p>
          </li>
          <li>
            <Server size={24} aria-hidden="true" />
            <h3>Private storage and encrypted transport</h3>
            <p>
              Source uploads stream directly to private AWS S3 buckets in US
              East (Ohio) over HTTPS using byte-verified multipart transfers.
              Provider API credentials stay encrypted on the server and are
              never exposed to browser clients.
            </p>
          </li>
          <li>
            <Clock size={24} aria-hidden="true" />
            <h3>Automatic plan-based media expiry</h3>
            <p>
              Uploaded recordings and rendered captioned MP4 files expire
              automatically after <strong>3 days</strong> (Free),{" "}
              <strong>15 days</strong> (Starter), <strong>30 days</strong>{" "}
              (Creator), or <strong>90 days</strong> (Studio), starting from
              upload validation. Temporary prepared audio and abandoned uploads
              are scheduled for automatic cleanup.
            </p>
          </li>
          <li>
            <Trash2 size={24} aria-hidden="true" />
            <h3>Receipt-verified account deletion</h3>
            <p>
              Delete individual projects anytime inside Studio, or request full
              account deletion in Studio Settings. Access is revoked
              immediately, and a private JSON deletion receipt lets you monitor
              content removal, subscription cleanup, and backup propagation
              after sign-out.
            </p>
          </li>
        </ul>
      </section>

      <section className="product-section" aria-labelledby="subprocessors">
        <h2 id="subprocessors">Infrastructure and AI sub-processors</h2>
        <p>
          To keep latency predictable and avoid opaque third-party chains, we
          publish the exact service providers that support UrduSpeech Studio
          (note that infrastructure may process data outside Pakistan):
        </p>
        <div
          className="pricing-scroll"
          role="region"
          aria-label="UrduSpeech sub-processors and infrastructure roles"
          tabIndex={0}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">Role in UrduSpeech</th>
                <th scope="col">Data scope</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">AWS S3 (US East Ohio)</th>
                <td>Private object storage</td>
                <td>
                  Uploaded recordings and rendered MP4 outputs until expiry
                </td>
              </tr>
              <tr>
                <th scope="row">Hetzner &amp; Vercel</th>
                <td>Backend API &amp; web application hosting</td>
                <td>Account metadata, project state, edited subtitle tracks</td>
              </tr>
              <tr>
                <th scope="row">Modal</th>
                <td>Media inspection &amp; video rendering</td>
                <td>
                  Container validation, audio preparation, Nastaliq MP4 burn-in
                </td>
              </tr>
              <tr>
                <th scope="row">Deepgram &amp; OpenAI</th>
                <td>Automated speech &amp; language processing</td>
                <td>
                  Audio/text needed for transcription, correction, translation
                </td>
              </tr>
              <tr>
                <th scope="row">Stripe &amp; Zoho</th>
                <td>Card billing &amp; transactional email</td>
                <td>
                  Card checkout (when enabled) and verification/reset emails
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="product-section" aria-labelledby="media-vs-text">
        <h2 id="media-vs-text">
          What expires automatically vs what stays in your workspace
        </h2>
        <p>
          Download your original recording and any rendered MP4 video before the
          retention date displayed inside your Studio project. Changing plans or
          rendering a second video does not extend an earlier upload’s expiry
          deadline. Once source media expires, your UTF-8 transcripts, cue
          timestamps, and SRT/VTT downloads remain available inside Studio until
          you delete the project or close your account.
        </p>
        <div className="guide-link-row">
          <Link href="/privacy">
            Read the full privacy policy{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/delete-account">
            How to delete your account &amp; check receipts{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/terms">
            Terms of service <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/methodology">
            AI transcription &amp; rendering methodology{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="demo-next" aria-labelledby="security-cta">
        <div>
          <h2 id="security-cta">Questions about privacy or compliance?</h2>
          <p>
            Email MoonSys Ltd support at{" "}
            <a href="mailto:notification@urduspeech.com">
              notification@urduspeech.com
            </a>{" "}
            or test UrduSpeech Studio with 10 free minutes.
          </p>
        </div>
        <div className="product-actions">
          <StartFree />
          <Link href="/contact" className="button secondary">
            Contact support
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
