import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  QuestionList,
  StartFree,
} from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import {
  getAlternativeBySlug,
  publicAlternatives,
} from "@/lib/public-alternatives";
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

type AlternativeParams = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publicAlternatives.map(({ slug }) => ({ slug }));
}

async function resolveAlternative(params: AlternativeParams["params"]) {
  const { slug } = await params;
  const spec = getAlternativeBySlug(slug);
  if (!spec) notFound();
  return spec;
}

export async function generateMetadata({
  params,
}: AlternativeParams): Promise<Metadata> {
  const spec = await resolveAlternative(params);
  return publicMetadata({
    title: spec.title,
    absoluteTitle: spec.seoTitle,
    description: spec.description,
    path: `/alternatives/${spec.slug}`,
    ogType: "article",
    ogImage: "compare",
    publishedTime: spec.updatedIso,
    modifiedTime: spec.updatedIso,
    markdownPath: `/alternatives/${spec.slug}.md`,
  });
}

export default async function AlternativeDetailPage({
  params,
}: AlternativeParams) {
  const spec = await resolveAlternative(params);
  const path = `/alternatives/${spec.slug}` as const;

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
      { name: `${spec.competitor} Urdu alternative`, path },
    ]),
    buildArticleJsonLd({
      headline: spec.title,
      description: spec.description,
      path,
      datePublished: spec.updatedIso,
      dateModified: spec.updatedIso,
      image: "/og/compare.png",
      articleSection: "Alternatives",
      wordCount: spec.wordCount,
    }),
  ]);

  const otherAlternatives = publicAlternatives.filter(
    (item) => item.slug !== spec.slug,
  );

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Compare", href: "/compare" },
          { name: `${spec.competitor} alternative` },
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
              Verified <time dateTime={spec.updated}>{spec.asOfDate}</time>
            </span>
          </div>
          <p>{spec.summary}</p>
        </MarketingIntro>

        <section className="product-section" aria-labelledby="why-switch">
          <h2 id="why-switch">
            Why Urdu creators add or switch from {spec.competitor}
          </h2>
          <ul className="product-points two-col" role="list">
            {spec.whyCreatorsSwitch.map((item) => (
              <li key={item.title}>
                <CheckCircle2 size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="entity-callout" aria-labelledby="keep-competitor">
          <h2 id="keep-competitor">
            When you should keep {spec.competitor} in your workflow
          </h2>
          <ul>
            {spec.keepCompetitorFor.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="product-section" aria-labelledby="alt-matrix">
          <h2 id="alt-matrix">Key differences as of {spec.asOfDate}</h2>
          <div
            className="pricing-scroll"
            role="region"
            aria-label={`Summary comparison of UrduSpeech and ${spec.competitor}`}
            tabIndex={0}
          >
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Factor</th>
                  <th scope="col">UrduSpeech</th>
                  <th scope="col">{spec.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {spec.quickMatrix.map((row) => (
                  <tr key={row.factor}>
                    <th scope="row">{row.factor}</th>
                    <td>{row.urduSpeech}</td>
                    <td>{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="product-section" aria-labelledby="migration-steps">
          <h2 id="migration-steps">
            How to move your Urdu captioning workflow in 4 steps
          </h2>
          <ol className="landing-steps" role="list">
            {spec.migrationSteps.map((item, idx) => (
              <li key={item.step}>
                <span aria-hidden="true">{idx + 1}</span>
                <div>
                  <h3>{item.step}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="product-section marketing-reading">
          <h2>{spec.bodySection.title}</h2>
          {spec.bodySection.body}
        </section>

        <section
          className="product-section pricing-questions"
          aria-labelledby="alt-faq"
        >
          <h2 id="alt-faq">Questions about switching from {spec.competitor}</h2>
          <QuestionList questions={spec.faqs} openFirst />
        </section>
      </article>

      <div className="guide-link-row">
        <Link href={`/compare/${spec.relatedCompareSlug}`}>
          Full head-to-head: UrduSpeech vs {spec.competitor}{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        {otherAlternatives.map((item) => (
          <Link key={item.slug} href={`/alternatives/${item.slug}`}>
            {item.competitor} alternative for Urdu{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        ))}
        <Link href="/tools/caption-plan-calculator">
          Estimate your PKR monthly plan{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <section className="demo-next" aria-labelledby="alt-cta">
        <div>
          <h2 id="alt-cta">Test on a real Urdu clip before switching</h2>
          <p>
            Every account includes 10 free minutes (no card required). Upload a
            video up to 10 minutes or explore the zero-signup browser demo
            first.
          </p>
        </div>
        <div className="product-actions">
          <StartFree label="Try 10 free minutes" />
          <Link href="/demo" className="button secondary">
            Try browser demo
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
