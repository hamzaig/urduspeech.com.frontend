import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GuideCards } from "@/components/guide-cards";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { PublicPage, ReadingSections } from "@/components/public-site";
import { StructuredData } from "@/components/structured-data";
import { publicGuides } from "@/lib/public-guides";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
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
  });
}

export default async function GuidePage({ params }: GuideParams) {
  const guide = await getGuide(params);
  const path = `/guides/${guide.slug}` as const;
  const jsonLd = [
    buildOrganizationJsonLd(),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Creator guides", path: "/guides" },
      { name: guide.title, path },
    ]),
    buildArticleJsonLd({
      headline: guide.title,
      description: guide.description,
      path,
      datePublished: guide.updated,
      dateModified: guide.updated,
    }),
  ];

  return (
    <PublicPage mainClassName="public-container marketing-page guide-article">
      <StructuredData data={jsonLd} />
      <nav className="guide-breadcrumbs" aria-label="Breadcrumb">
        <ol role="list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link className="guide-back" href="/guides">
              <ArrowLeft size={16} aria-hidden="true" /> Creator guides
            </Link>
          </li>
          <li aria-current="page">{guide.title}</li>
        </ol>
      </nav>
      <article>
        <MarketingIntro title={guide.title}>
          <p className="policy-date">
            {guide.topic} · Updated {guide.displayUpdated}
          </p>
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
