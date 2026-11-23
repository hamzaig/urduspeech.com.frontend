import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  QuestionList,
  StartFree,
} from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import {
  getComparisonBySlug,
  publicComparisons,
} from "@/lib/public-comparisons";
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

type CompareParams = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publicComparisons.map(({ slug }) => ({ slug }));
}

async function resolveComparison(params: CompareParams["params"]) {
  const { slug } = await params;
  const spec = getComparisonBySlug(slug);
  if (!spec) notFound();
  return spec;
}

export async function generateMetadata({
  params,
}: CompareParams): Promise<Metadata> {
  const spec = await resolveComparison(params);
  return publicMetadata({
    title: spec.title,
    absoluteTitle: spec.seoTitle,
    description: spec.description,
    path: `/compare/${spec.slug}`,
    ogType: "article",
    ogImage: "compare",
    publishedTime: spec.updatedIso,
    modifiedTime: spec.updatedIso,
    markdownPath: `/compare/${spec.slug}.md`,
  });
}

export default async function ComparisonDetailPage({ params }: CompareParams) {
  const spec = await resolveComparison(params);
  const path = `/compare/${spec.slug}` as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildEditorialTeamJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: spec.seoTitle,
      description: spec.description,
      path,
      primaryImage: "/og/compare.png",
      datePublished: spec.updatedIso,
      dateModified: spec.updatedIso,
      mainEntityId: `${SITE_URL}${path}#article`,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Compare", path: "/compare" },
      { name: `UrduSpeech vs ${spec.competitor}`, path },
    ]),
    buildArticleJsonLd({
      headline: spec.title,
      description: spec.description,
      path,
      datePublished: spec.updatedIso,
      dateModified: spec.updatedIso,
      image: "/og/compare.png",
      articleSection: "Tool comparisons",
      wordCount: spec.wordCount,
    }),
  ]);

  const otherComparisons = publicComparisons.filter(
    (item) => item.slug !== spec.slug,
  );

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Compare", href: "/compare" },
          { name: `UrduSpeech vs ${spec.competitor}` },
        ]}
      />
      <article>
        <MarketingIntro title={spec.title}>
          <div className="author-byline">
            <span>
              By{" "}
              <Link href="/about#editorial-team">
                UrduSpeech Editorial &amp; Engineering Team
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Updated <time dateTime={spec.updated}>{spec.displayUpdated}</time>
            </span>
          </div>
          <p>{spec.summary}</p>
        </MarketingIntro>

        <section className="entity-callout" aria-labelledby="quick-verdict">
          <h2 id="quick-verdict">Quick verdict</h2>
          <p>{spec.verdictSummary}</p>
        </section>

        <section
          className="product-section"
          aria-labelledby="who-should-choose"
        >
          <h2 id="who-should-choose">When to choose each tool</h2>
          <div className="compare-verdict">
            <div className="compare-verdict-card" data-accent="true">
              <h3>Choose UrduSpeech when…</h3>
              <ul>
                {spec.chooseUrduSpeech.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="compare-verdict-card">
              <h3>Choose {spec.competitor} when…</h3>
              <ul>
                {spec.chooseCompetitor.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="product-section"
          aria-labelledby="feature-comparison"
        >
          <h2 id="feature-comparison">
            Feature-by-feature comparison: UrduSpeech vs {spec.competitor}
          </h2>
          <div
            className="pricing-scroll"
            role="region"
            aria-label={`Feature comparison between UrduSpeech and ${spec.competitor}`}
            tabIndex={0}
          >
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Dimension</th>
                  <th scope="col">UrduSpeech</th>
                  <th scope="col">{spec.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {spec.matrixRows.map((row) => (
                  <tr key={row.dimension}>
                    <th scope="row">{row.dimension}</th>
                    <td>{row.urduSpeech}</td>
                    <td>{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {spec.analysisSections.map((section) => (
          <section
            key={section.title}
            className="product-section marketing-reading"
          >
            <h2>{section.title}</h2>
            {section.body}
          </section>
        ))}

        <section
          className="product-section pricing-questions"
          aria-labelledby="compare-faq"
        >
          <h2 id="compare-faq">
            Common questions about UrduSpeech vs {spec.competitor}
          </h2>
          <QuestionList questions={spec.faqs} openFirst />
        </section>
      </article>

      <section className="product-section" aria-labelledby="more-comparisons">
        <h2 id="more-comparisons">More tool comparisons</h2>
        <div className="guide-link-row">
          {otherComparisons.map((item) => (
            <Link key={item.slug} href={`/compare/${item.slug}`}>
              UrduSpeech vs {item.competitor}{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="demo-next" aria-labelledby="compare-detail-cta">
        <div>
          <h2 id="compare-detail-cta">
            Try UrduSpeech free on your own Urdu recording
          </h2>
          <p>
            Every account starts with 10 free minutes (no card required), or
            preview Nastaliq, Roman Urdu, and English exports right now in the
            browser demo.
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
