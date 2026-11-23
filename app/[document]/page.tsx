import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/public-site";
import { StructuredData } from "@/components/structured-data";
import {
  publicDocuments,
  type PublicDocumentKey,
} from "@/lib/public-documents";
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

type Params = { params: Promise<{ document: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(publicDocuments).map((document) => ({ document }));
}

function getDocument(name: string) {
  if (!Object.hasOwn(publicDocuments, name)) notFound();
  return publicDocuments[name as PublicDocumentKey];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { document: name } = await params;
  const document = getDocument(name);
  return publicMetadata({
    title: document.seoTitle,
    description: document.metaDescription,
    path: `/${name}`,
    ogType: document.isTechArticle ? "article" : "website",
    ogImage: document.ogImage,
    modifiedTime: document.isTechArticle ? document.updatedIso : undefined,
    markdownPath: document.markdownPath,
  });
}

export default async function Document({ params }: Params) {
  const { document: name } = await params;
  const document = getDocument(name);
  const path = `/${name}` as const;

  const nodes: Record<string, unknown>[] = [
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${document.seoTitle} | UrduSpeech`,
      description: document.metaDescription,
      path,
      primaryImage: `/og/${document.ogImage}.png`,
      dateModified: document.updatedIso,
      ...(document.isTechArticle
        ? { mainEntityId: `${SITE_URL}${path}#article` }
        : {}),
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: document.breadcrumbLabel, path },
    ]),
  ];

  if (document.isTechArticle) {
    nodes.push(
      buildEditorialTeamJsonLd(),
      buildArticleJsonLd({
        type: "TechArticle",
        headline: document.title,
        description: document.metaDescription,
        path,
        datePublished: "2026-11-18T00:00:00+05:00",
        dateModified: document.updatedIso,
        image: `/og/${document.ogImage}.png`,
        articleSection: "Technical documentation",
      }),
    );
  }

  return (
    <>
      <StructuredData data={buildGraphJsonLd(nodes)} />
      <PolicyPage
        title={document.title}
        description={document.description}
        sections={document.sections}
        updated={document.updated}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: document.breadcrumbLabel },
        ]}
      />
    </>
  );
}
