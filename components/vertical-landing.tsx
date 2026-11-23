import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  QuestionList,
  StartFree,
} from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import {
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo";
import type { VerticalPageSpec } from "@/lib/public-verticals";

export function VerticalLandingView({ spec }: { spec: VerticalPageSpec }) {
  const path = `/${spec.slug}` as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${spec.title} | UrduSpeech`,
      description: spec.description,
      path,
      primaryImage: `/og/${spec.ogImage}.png`,
      mainEntityId: `${SITE_URL}${path}#app`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: spec.breadcrumb, path },
    ]),
    buildSoftwareApplicationJsonLd({
      name: spec.appName,
      description: spec.description,
      path,
      includeOffers: true,
      featureList: spec.featureList,
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: spec.breadcrumb }]}
      />
      <section className="product-hero" aria-label={spec.breadcrumb}>
        <MarketingIntro title={spec.h1}>
          {spec.intro}
          <div className="product-actions">
            <StartFree />
            <Link href="/demo" className="button secondary">
              Try the editor
            </Link>
          </div>
          <p className="free-note">
            One-time 10-minute free allowance, no card required.{" "}
            <Link href="/pricing">Compare PKR plans</Link>
          </p>
        </MarketingIntro>

        <section
          className="script-example-card"
          aria-labelledby={`${spec.slug}-sample-heading`}
        >
          <header className="script-example-header">
            <h2 id={`${spec.slug}-sample-heading`}>{spec.sampleLabel}</h2>
          </header>
          <ol className="script-pair-list" role="list">
            {spec.sampleCues.map((cue) => (
              <li key={cue.time} className="script-pair-item">
                <span className="sample-time">{cue.time}</span>
                <div className="script-pair-lines">
                  <p className="script-line-urdu" lang="ur" dir="rtl">
                    {cue.urdu}
                  </p>
                  <p
                    className="script-line-latin"
                    lang={cue.secondaryLang}
                    dir="ltr"
                  >
                    {cue.secondary}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="script-example-footer">
            Edit sample cues and download UTF-8 SRT/VTT on the{" "}
            <Link href="/demo">interactive caption demo</Link>.
          </p>
        </section>
      </section>

      <section
        className="product-section"
        aria-labelledby={`${spec.slug}-workflow`}
      >
        <h2 id={`${spec.slug}-workflow`}>{spec.workflowHeading}</h2>
        <p>{spec.workflowIntro}</p>
        <ol className="product-points two-col" role="list">
          {spec.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              {step.body}
            </li>
          ))}
        </ol>
      </section>

      <section
        className="product-section"
        aria-labelledby={`${spec.slug}-table`}
      >
        <h2 id={`${spec.slug}-table`}>{spec.tableHeading}</h2>
        <p>{spec.tableIntro}</p>
        <div
          className="pricing-scroll"
          role="region"
          aria-label={spec.tableAria}
          tabIndex={0}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                {spec.tableColumns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {spec.tableRows.map(([rowHead, col2, col3]) => (
                <tr key={rowHead}>
                  <th scope="row">{rowHead}</th>
                  <td>{col2}</td>
                  <td>{col3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="product-section marketing-reading"
        aria-labelledby={`${spec.slug}-deepdive`}
      >
        <h2 id={`${spec.slug}-deepdive`}>{spec.deepDiveHeading}</h2>
        {spec.deepDiveBody}
      </section>

      <section
        className="product-section pricing-questions"
        aria-labelledby={`${spec.slug}-faq`}
      >
        <h2 id={`${spec.slug}-faq`}>{spec.faqHeading}</h2>
        <QuestionList questions={spec.faqs} openFirst />
        <div className="guide-link-row">
          {spec.relatedLinks.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="demo-next" aria-labelledby={`${spec.slug}-cta`}>
        <div>
          <h2 id={`${spec.slug}-cta`}>{spec.ctaTitle}</h2>
          <p>{spec.ctaCopy}</p>
        </div>
        <div className="product-actions">
          <StartFree />
          <Link href="/supported-formats" className="button secondary">
            Supported formats &amp; limits
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
