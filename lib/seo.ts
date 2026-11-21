import type { Metadata } from "next";
import sampleStill from "@/assets/studio-interview.webp";

export const SITE_URL = "https://urduspeech.com";
export const SITE_NAME = "UrduSpeech";
export const ORGANIZATION_NAME = "MoonSys Ltd";

export function publicMetadata({
  title,
  absoluteTitle,
  description,
  path,
  ogType = "website",
}: {
  title: string;
  absoluteTitle?: string;
  description: string;
  path: `/${string}`;
  ogType?: "website" | "article";
}): Metadata {
  const canonicalUrl = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const displayTitle = absoluteTitle ?? `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      title: displayTitle,
      description,
      url: canonicalUrl,
      images: [
        {
          url: sampleStill.src,
          width: sampleStill.width,
          height: sampleStill.height,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [sampleStill.src],
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: ORGANIZATION_NAME,
    url: SITE_URL,
    email: "notification@urduspeech.com",
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildSoftwareApplicationJsonLd({
  name = SITE_NAME,
  description,
  path,
  featureList,
}: {
  name?: string;
  description: string;
  path: `/${string}`;
  featureList: readonly string[];
}) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web browser",
    inLanguage: ["en", "ur"],
    description,
    featureList: [...featureList],
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: readonly { name: string; path: `/${string}` }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildArticleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: `/${string}`;
  datePublished: string;
  dateModified: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: "en",
    mainEntityOfPage: url,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}
