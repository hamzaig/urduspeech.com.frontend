import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { GuideCards } from "@/components/guide-cards";
import { MarketingIntro, StartFree } from "@/components/marketing";
import {
  Breadcrumbs,
  PublicPage,
  ReadingSections,
} from "@/components/public-site";
import { StructuredData } from "@/components/structured-data";
import { publicGuides } from "@/lib/public-guides";
import {
  SITE_URL,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildEditorialTeamJsonLd,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

type GuideParams = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publicGuides.map(({ slug }) => ({ slug }));
}

async function getGuide(params: GuideParams["params"]) {
  const { slug } = await params;
  const guide = publicGuides.find((entry) => entry.slug === slug);
  if (!guide) notFound();
  return guide;
}

export async function generateMetadata({
  params,
}: GuideParams): Promise<Metadata> {
  const guide = await getGuide(params);
  return publicMetadata({
    title: guide.title,
    absoluteTitle: guide.seoTitle,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    ogType: "article",
    ogImage: "guides",
    publishedTime: guide.publishedIso,
    modifiedTime: guide.updatedIso,
    markdownPath: `/guides/${guide.slug}.md`,
  });
}

export default async function GuidePage({ params }: GuideParams) {
  const guide = await getGuide(params);
  const path = `/guides/${guide.slug}` as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildEditorialTeamJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: guide.seoTitle ?? `${guide.title} | UrduSpeech`,
      description: guide.description,
      path,
      primaryImage: "/og/guides.png",
      datePublished: guide.publishedIso,
      dateModified: guide.updatedIso,
      mainEntityId: `${SITE_URL}${path}#article`,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Creator guides", path: "/guides" },
      { name: guide.title, path },
    ]),
    buildArticleJsonLd({
      headline: guide.title,
      description: guide.description,
      path,
      datePublished: guide.publishedIso,
      dateModified: guide.updatedIso,
      image: "/og/guides.png",
      articleSection: guide.topic,
      wordCount: guide.wordCount,
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page guide-article">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Creator guides", href: "/guides" },
          { name: guide.title },
        ]}
      />
      <article>
        <MarketingIntro title={guide.title}>
          <div className="author-byline">
            <span>
              By{" "}
              <Link href="/about#editorial-team">
                UrduSpeech Editorial &amp; Engineering Team
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <span>{guide.topic}</span>
            <span aria-hidden="true">·</span>
            <span>
              Updated{" "}
              <time dateTime={guide.updated}>{guide.displayUpdated}</time>
            </span>
          </div>
          <p>{guide.summary}</p>
        </MarketingIntro>
        <ReadingSections sections={guide.sections} />
      </article>
      <section className="demo-next" aria-labelledby="guide-cta-title">
        <div>
          <h2 id="guide-cta-title">{guide.ctaTitle}</h2>
          <p>{guide.ctaCopy}</p>
        </div>
        <div className="product-actions">
          <StartFree />
          <Link href={guide.primaryProductHref} className="button secondary">
            {guide.primaryProductLabel}{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        className="product-section guide-related"
        aria-labelledby="guide-related"
      >
        <h2 id="guide-related">More creator guides</h2>
        <GuideCards
          guides={publicGuides.filter(({ slug }) => slug !== guide.slug)}
        />
      </section>
    </PublicPage>
  );
}
