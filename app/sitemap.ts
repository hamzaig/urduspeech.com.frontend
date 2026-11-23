import type { MetadataRoute } from "next";
import { publicAlternatives } from "@/lib/public-alternatives";
import { publicComparisons } from "@/lib/public-comparisons";
import { publicDocuments } from "@/lib/public-documents";
import { publicGuides } from "@/lib/public-guides";
import { verticalSlugs } from "@/lib/public-verticals";
import { canonicalFor, SITE_URL } from "@/lib/seo";

const MARKETING_UPDATED = "2026-11-22";

export const publicMarketingPaths = [
  "/",
  "/urdu-transcription",
  "/video-captions",
  "/urdu-audio-to-roman-urdu",
  "/urdu-audio-to-english-text",
  "/demo",
  "/pricing",
  "/faq",
  "/contact",
  "/guides",
  "/about",
  "/methodology",
  "/security",
  "/compare",
  "/tools",
  "/tools/srt-to-vtt-converter",
  "/tools/urdu-subtitle-checker",
  "/tools/caption-plan-calculator",
  "/urdu-caption-glossary",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const marketingEntries: MetadataRoute.Sitemap = publicMarketingPaths.map(
    (path) => ({
      url: canonicalFor(path),
      lastModified: MARKETING_UPDATED,
    }),
  );

  const verticalEntries: MetadataRoute.Sitemap = verticalSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: MARKETING_UPDATED,
  }));

  const guideEntries: MetadataRoute.Sitemap = publicGuides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: guide.updated ?? MARKETING_UPDATED,
  }));

  const comparisonEntries: MetadataRoute.Sitemap = publicComparisons.map(
    (comparison) => ({
      url: `${SITE_URL}/compare/${comparison.slug}`,
      lastModified: comparison.updated ?? MARKETING_UPDATED,
    }),
  );

  const alternativeEntries: MetadataRoute.Sitemap = publicAlternatives.map(
    (alt) => ({
      url: `${SITE_URL}/alternatives/${alt.slug}`,
      lastModified: alt.updated ?? MARKETING_UPDATED,
    }),
  );

  const documentEntries: MetadataRoute.Sitemap = Object.entries(
    publicDocuments,
  ).map(([slug, doc]) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: doc.updatedIso.slice(0, 10),
  }));

  return [
    ...marketingEntries,
    ...verticalEntries,
    ...guideEntries,
    ...comparisonEntries,
    ...alternativeEntries,
    ...documentEntries,
  ];
}
