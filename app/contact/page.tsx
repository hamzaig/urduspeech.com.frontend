import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { MarketingIntro } from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import { ContactForm } from "@/components/contact-form";
import {
  SITE_URL,
  SUPPORT_EMAIL,
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

const title = "Contact Support & Help";
const description =
  "Message or email our MoonSys Ltd support team for help with Studio accounts, audio or video uploads, subtitle exports, manual PKR verification, or deletion.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/contact",
  ogImage: "about",
});

export default function Contact() {
  const path = "/contact" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      type: "ContactPage",
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/about.png",
      mainEntityId: `${SITE_URL}/#organization`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Contact", path },
    ]),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page contact-page">
      <StructuredData data={jsonLd} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
      <div className="contact-layout">
        <MarketingIntro title="Contact UrduSpeech support">
          <p>
            UrduSpeech is operated by <strong>MoonSys Ltd</strong>. Ask about
            your Studio account, uploaded recordings, subtitle exports,
            burned-in MP4 renders, or Pakistani rupee billing.
          </p>
          <p className="contact-alt">
            Prefer email? Write to{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>
              <Mail size={15} aria-hidden="true" /> {SUPPORT_EMAIL}
            </a>{" "}
            from your registered account address.
          </p>
        </MarketingIntro>
        <ContactForm />
      </div>
      <div className="marketing-reading">
        <section
          className="product-section"
          aria-labelledby="contact-checklist"
        >
          <h2 id="contact-checklist">What to include for faster help</h2>
          <p>
            Including the right reference lets us inspect server logs or billing
            status right away. Never send a full card number, banking PIN, OTP,
            or account password by email.
          </p>
          <ul className="product-points two-col" role="list">
            <li>
              <h3>Upload, transcription, or render issues</h3>
              <p>
                Share your account email, the Studio project reference ID, your
                file format (for example MP4 H.264/AAC or M4A), approximate file
                size and duration, and the exact error notice displayed in
                Studio. Do not attach large video files unless support asks for
                a short reproducer clip.
              </p>
            </li>
            <li>
              <h3>PKR payments &amp; manual verification</h3>
              <p>
                Include your account email, chosen plan (Starter, Creator, or
                Studio), payment date, amount in PKR, payment rail (Stripe card,
                bank transfer, JazzCash, Easypaisa, SadaPay, or NayaPay), and
                the transaction or invoice reference submitted in Studio.
              </p>
            </li>
            <li>
              <h3>Privacy &amp; account deletion requests</h3>
              <p>
                For data access questions or help checking a private deletion
                receipt, email from the account address on file and reference
                your deletion status or project ID. You can initiate
                self-service deletion anytime under{" "}
                <Link href="/delete-account">delete account instructions</Link>.
              </p>
            </li>
            <li>
              <h3>Operator &amp; service scope</h3>
              <p>
                UrduSpeech is an automated AI creator platform operated by
                MoonSys Ltd (<code>urduspeech.com</code>). We do not accept
                manual human-transcription orders by email. Read{" "}
                <Link href="/about">About UrduSpeech</Link> for company and
                product details.
              </p>
            </li>
          </ul>
        </section>

        <section
          className="product-section"
          aria-labelledby="self-service-help"
        >
          <h2 id="self-service-help">Self-service guides and policies</h2>
          <p>
            Many common upload, format, export, and billing questions can be
            resolved immediately using the reference pages below.
          </p>
          <div className="question-list support-links">
            <Link href="/supported-formats">
              Supported audio/video codecs and upload limits{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/faq">
              Frequently asked questions{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/guides">
              Step-by-step creator guides{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/refunds">
              Payment issues, manual verification &amp; refunds{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/security">
              Data security &amp; media retention policy{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </PublicPage>
  );
}
