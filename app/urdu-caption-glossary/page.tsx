import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import { URDU_GLOSSARY_TERMS } from "@/lib/urdu-glossary";
import {
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildDefinedTermSetJsonLd,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

const title = "Urdu Subtitling & Nastaliq Caption Glossary";
const absoluteTitle =
  "Urdu Subtitling & Nastaliq Caption Glossary | UrduSpeech";
const description =
  "Clear technical definitions of Nastaliq vs Naskh, Urdu Unicode normalization, RTL isolation, Roman Urdu, CPS speed, SRT vs WebVTT, and HDR tone-mapping.";

export const metadata: Metadata = publicMetadata({
  title,
  absoluteTitle,
  description,
  path: "/urdu-caption-glossary",
  ogImage: "guides",
  markdownPath: "/urdu-caption-glossary.md",
});

const categories = [
  "Urdu Script & Typography",
  "Subtitle Formats & Timing",
  "Video & Audio Engineering",
  "AI Workflow & Privacy",
] as const;

export default function UrduCaptionGlossaryPage() {
  const path = "/urdu-caption-glossary" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: absoluteTitle,
      description,
      path,
      primaryImage: "/og/guides.png",
      mainEntityId: `${SITE_URL}${path}#termset`,
      datePublished: "2026-11-22T00:00:00+05:00",
      dateModified: "2026-11-22T00:00:00+05:00",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Urdu caption glossary", path },
    ]),
    buildDefinedTermSetJsonLd({
      path,
      name: "Urdu Subtitling, Nastaliq & Transcription Technical Glossary",
      description,
      terms: URDU_GLOSSARY_TERMS.map((item) => ({
        id: item.id,
        term: item.term,
        definition: item.definition,
      })),
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Urdu caption glossary" }]}
      />
      <MarketingIntro title="Urdu subtitling, Nastaliq & transcription glossary">
        <div className="author-byline">
          <span>
            Maintained by{" "}
            <Link href="/about#editorial-team">
              UrduSpeech Editorial &amp; Engineering Team
            </Link>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Updated <time dateTime="2026-11-22">22 November 2026</time>
          </span>
        </div>
        <p>
          Plain-language reference definitions for the typography, Unicode,
          subtitle timing, HDR video, and data-retention concepts behind clean
          Urdu and bilingual video captions.
        </p>
      </MarketingIntro>

      <nav className="glossary-jump" aria-label="Glossary categories">
        {categories.map((cat) => {
          const anchor = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <a key={cat} href={`#${anchor}`}>
              <BookOpen size={15} aria-hidden="true" />
              {cat}
            </a>
          );
        })}
      </nav>

      {categories.map((category) => {
        const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const items = URDU_GLOSSARY_TERMS.filter(
          (item) => item.category === category,
        );
        return (
          <section
            key={category}
            id={anchor}
            className="product-section"
            aria-labelledby={`${anchor}-heading`}
          >
            <h2 id={`${anchor}-heading`}>{category}</h2>
            <dl className="glossary-list">
              {items.map((item) => (
                <div key={item.id} id={item.id} className="glossary-card">
                  <dt>
                    <span>{item.term}</span>
                    {item.urduTerm && (
                      <span className="glossary-urdu" lang="ur" dir="rtl">
                        {item.urduTerm}
                      </span>
                    )}
                  </dt>
                  <dd>
                    <p>{item.definition}</p>
                    {item.relatedHref && item.relatedLabel && (
                      <Link
                        href={item.relatedHref}
                        className="public-inline-link"
                      >
                        {item.relatedLabel}{" "}
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}

      <div className="guide-link-row">
        <Link href="/tools/urdu-subtitle-checker">
          Test your subtitles with our Urdu CPS &amp; Unicode checker{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/tools/srt-to-vtt-converter">
          Convert SRT to WebVTT locally in browser{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/methodology">
          Read our full AI &amp; Nastaliq pipeline methodology{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/guides">
          Browse creator workflow guides{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <section className="demo-next" aria-labelledby="glossary-cta">
        <div>
          <h2 id="glossary-cta">
            See clean Nastaliq, Roman Urdu, and bilingual captions live
          </h2>
          <p>
            Test every output mode right now in our zero-signup browser demo, or
            upload a 10-minute clip free in Studio.
          </p>
        </div>
        <div className="product-actions">
          <StartFree label="Try 10 free minutes" />
          <Link href="/demo" className="button secondary">
            Open live demo
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
