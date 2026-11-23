import type { Metadata } from "next";
import { PLANS } from "@/lib/plans";

export const SITE_URL = "https://urduspeech.com";
export const SITE_NAME = "UrduSpeech";
export const ORGANIZATION_NAME = "MoonSys Ltd";
export const SUPPORT_EMAIL = "notification@urduspeech.com";

export const OG_IMAGES = {
  default: {
    url: "/og/default.png",
    width: 1200,
    height: 630,
    alt: "UrduSpeech — AI Urdu captions, Nastaliq subtitles and transcripts studio",
  },
  transcription: {
    url: "/og/transcription.png",
    width: 1200,
    height: 630,
    alt: "UrduSpeech — Urdu speech to text and audio transcription in Nastaliq, Roman Urdu and English",
  },
  captions: {
    url: "/og/captions.png",
    width: 1200,
    height: 630,
    alt: "UrduSpeech — Urdu video captions, SRT and VTT subtitles and burned-in MP4 exports",
  },
  "roman-urdu": {
    url: "/og/roman-urdu.png",
    width: 1200,
    height: 630,
    alt: "UrduSpeech — Convert Urdu audio and video into Roman Urdu transcripts and captions",
  },
  english: {
    url: "/og/english.png",
    width: 1200,
    height: 630,
    alt: "UrduSpeech — Translate Urdu audio and video into English text and bilingual subtitles",
  },
  pricing: {
    url: "/og/pricing.png",
    width: 1200,
    height: 630,
    alt: "UrduSpeech — Pakistani rupee plans for Urdu transcription and 1080p video captions",
  },
  guides: {
    url: "/og/guides.png",
    width: 1200,
    height: 630,
    alt: "UrduSpeech — Creator guides for Urdu captions, voice notes, scripts and YouTube subtitles",
  },
  compare: {
    url: "/og/compare.png",
    width: 1200,
    height: 630,
    alt: "UrduSpeech — Side-by-side comparisons of Urdu transcription and captioning tools",
  },
  tools: {
    url: "/og/tools.png",
    width: 1200,
    height: 630,
    alt: "UrduSpeech — Free browser SRT to WebVTT converter and Urdu subtitle validator",
  },
  about: {
    url: "/og/about.png",
    width: 1200,
    height: 630,
    alt: "UrduSpeech by MoonSys Ltd — Automated AI Urdu caption studio, methodology and security",
  },
} as const;

export type OgImageKey = keyof typeof OG_IMAGES;

export function canonicalFor(path: `/${string}`) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function publicMetadata({
  title,
  absoluteTitle,
  description,
  path,
  ogType = "website",
  ogImage = "default",
  ogImageAlt,
  publishedTime,
  modifiedTime,
  markdownPath,
}: {
  title: string;
  absoluteTitle?: string;
  description: string;
  path: `/${string}`;
  ogType?: "website" | "article";
  ogImage?: OgImageKey;
  ogImageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  markdownPath?: `/${string}`;
}): Metadata {
  const canonicalUrl = canonicalFor(path);
  const displayTitle = absoluteTitle ?? `${title} | ${SITE_NAME}`;
  const asset = OG_IMAGES[ogImage];
  const imageUrl = `${SITE_URL}${asset.url}`;
  const imageAlt = ogImageAlt ?? asset.alt;

  const openGraphBase = {
    siteName: SITE_NAME,
    locale: "en_US",
    title: displayTitle,
    description,
    url: canonicalUrl,
    images: [
      {
        url: imageUrl,
        width: asset.width,
        height: asset.height,
        alt: imageAlt,
        type: "image/png",
      },
    ],
  };

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical: canonicalUrl,
      ...(markdownPath
        ? {
            types: {
              "text/markdown": `${SITE_URL}${markdownPath}`,
            },
          }
        : {}),
    },
    openGraph:
      ogType === "article"
        ? {
            ...openGraphBase,
            type: "article",
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            authors: [`${SITE_URL}/about`],
          }
        : {
            ...openGraphBase,
            type: "website",
          },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
}

export function buildGraphJsonLd(nodes: readonly Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map((node) => {
      const copy = { ...node };
      delete copy["@context"];
      return copy;
    }),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["UrduSpeech Studio", "UrduSpeech AI"],
    legalName: ORGANIZATION_NAME,
    url: SITE_URL,
    email: SUPPORT_EMAIL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/brand/urduspeech-logo.png`,
      contentUrl: `${SITE_URL}/brand/urduspeech-logo.png`,
      width: 512,
      height: 512,
      caption: "UrduSpeech logo",
    },
    image: {
      "@id": `${SITE_URL}/#logo`,
    },
    description:
      "Automated AI Urdu speech-to-text, Nastaliq subtitle, Roman Urdu transliteration, and burned-in MP4 captioning studio operated by MoonSys Ltd.",
    disambiguatingDescription:
      "UrduSpeech (urduspeech.com) is an automated browser-based AI Urdu transcription and video captioning web application operated by MoonSys Ltd. It is not a human transcription agency and is unrelated to the academic ASLP-lab/UrduSpeech speech corpus.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SUPPORT_EMAIL,
      url: `${SITE_URL}/contact`,
      availableLanguage: ["en", "ur"],
    },
    knowsAbout: [
      "Urdu speech recognition",
      "Nastaliq subtitle rendering",
      "Roman Urdu transliteration",
      "Urdu to English subtitle translation",
      "SRT and WebVTT caption formatting",
    ],
    knowsLanguage: ["en", "ur", "ur-Latn"],
    areaServed: ["PK", "GB", "US", "CA", "AE", "SA"],
    sameAs: ["https://moonsys.co"],
  };
}

export function buildEditorialTeamJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/about#editorial-team`,
    name: "UrduSpeech Editorial & Engineering Team",
    url: `${SITE_URL}/about`,
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "UrduSpeech Studio",
    url: SITE_URL,
    description:
      "Browser-based AI studio for Urdu speech-to-text, Roman Urdu transliteration, English translation, SRT/VTT subtitles, and burned-in Nastaliq MP4 captions.",
    inLanguage: "en",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildWebPageJsonLd({
  type = "WebPage",
  name,
  description,
  path,
  datePublished,
  dateModified,
  primaryImage = "/og/default.png",
  hasBreadcrumb = true,
  aboutId,
  mainEntityId,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  name: string;
  description: string;
  path: `/${string}`;
  datePublished?: string;
  dateModified?: string;
  primaryImage?: string;
  hasBreadcrumb?: boolean;
  aboutId?: string;
  mainEntityId?: string;
}) {
  const url = canonicalFor(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    ...(hasBreadcrumb
      ? {
          breadcrumb: {
            "@id": `${url}#breadcrumb`,
          },
        }
      : {}),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: primaryImage.startsWith("http")
        ? primaryImage
        : `${SITE_URL}${primaryImage}`,
      width: 1200,
      height: 630,
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(aboutId ? { about: { "@id": aboutId } } : {}),
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };
}

export function buildPlanOffers() {
  return PLANS.map((plan) => ({
    "@type": "Offer",
    name: `${plan.name} Plan`,
    price: plan.pricePkr,
    priceCurrency: "PKR",
    availability: "https://schema.org/OnlineOnly",
    url: `${SITE_URL}/pricing`,
    description: plan.summary,
    ...(plan.billingPeriod === "monthly"
      ? {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.pricePkr,
            priceCurrency: "PKR",
            billingDuration: 1,
            unitCode: "MON",
          },
        }
      : {}),
  }));
}

export function buildSoftwareApplicationJsonLd({
  name = SITE_NAME,
  description,
  path,
  featureList,
  includeOffers = true,
  isAccessibleForFree,
  isCanonicalApp = false,
  screenshot = "/images/studio-interview.webp",
}: {
  name?: string;
  description: string;
  path: `/${string}`;
  featureList: readonly string[];
  includeOffers?: boolean;
  isAccessibleForFree?: boolean;
  isCanonicalApp?: boolean;
  screenshot?: string;
}) {
  const url = canonicalFor(path);
  const id =
    isCanonicalApp || path === "/" ? `${SITE_URL}/#software` : `${url}#app`;
  const app: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": id,
    name,
    url,
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Speech-to-Text and Video Subtitling",
    operatingSystem: "Any (Web Browser)",
    browserRequirements:
      "Requires a modern web browser with JavaScript enabled",
    inLanguage: ["en", "ur", "ur-Latn"],
    description,
    screenshot: screenshot.startsWith("http")
      ? screenshot
      : `${SITE_URL}${screenshot}`,
    softwareHelp: `${SITE_URL}/guides`,
    termsOfService: `${SITE_URL}/terms`,
    featureList: [...featureList],
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
  if (id !== `${SITE_URL}/#software`) {
    app.isPartOf = { "@id": `${SITE_URL}/#software` };
  }
  if (isAccessibleForFree !== undefined) {
    app.isAccessibleForFree = isAccessibleForFree;
  }
  if (includeOffers) {
    app.offers = buildPlanOffers();
  }
  return app;
}

export function buildBreadcrumbJsonLd(
  items: readonly { name: string; path: `/${string}` }[],
) {
  const last = items[items.length - 1];
  const lastUrl = last ? canonicalFor(last.path) : SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${lastUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalFor(item.path),
    })),
  };
}

export function buildArticleJsonLd({
  type = "Article",
  headline,
  description,
  path,
  datePublished,
  dateModified,
  image = "/og/guides.png",
  articleSection,
  wordCount,
}: {
  type?: "Article" | "TechArticle";
  headline: string;
  description: string;
  path: `/${string}`;
  datePublished: string;
  dateModified: string;
  image?: string;
  articleSection?: string;
  wordCount?: number;
}) {
  const url = canonicalFor(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#article`,
    headline,
    description,
    inLanguage: "en",
    mainEntityOfPage: {
      "@id": `${url}#webpage`,
    },
    url,
    image: [
      {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
        width: 1200,
        height: 630,
      },
    ],
    datePublished,
    dateModified,
    ...(articleSection ? { articleSection } : {}),
    ...(wordCount ? { wordCount } : {}),
    about: {
      "@id": `${SITE_URL}/#software`,
    },
    author: {
      "@id": `${SITE_URL}/about#editorial-team`,
      "@type": "Organization",
      name: "UrduSpeech Editorial & Engineering Team",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildItemListJsonLd({
  path,
  name,
  items,
}: {
  path: `/${string}`;
  name: string;
  items: readonly { name: string; path: `/${string}`; description?: string }[];
}) {
  const url = canonicalFor(path);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: canonicalFor(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function buildDefinedTermSetJsonLd({
  path,
  name,
  description,
  terms,
}: {
  path: `/${string}`;
  name: string;
  description: string;
  terms: readonly { id: string; term: string; definition: string }[];
}) {
  const url = canonicalFor(path);
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${url}#termset`,
    name,
    description,
    url,
    inLanguage: ["en", "ur"],
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    hasDefinedTerm: terms.map((item) => ({
      "@type": "DefinedTerm",
      "@id": `${url}#${item.id}`,
      name: item.term,
      description: item.definition,
      inDefinedTermSet: {
        "@id": `${url}#termset`,
      },
    })),
  };
}
