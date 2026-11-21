import type { MetadataRoute } from "next";
import { publicDocuments } from "@/lib/public-documents";
import { publicGuides } from "@/lib/public-guides";
import { SITE_URL } from "@/lib/seo";

const MARKETING_UPDATED = "2026-11-21";
const POLICY_UPDATED = "2026-11-18";

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
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const marketingEntries: MetadataRoute.Sitemap = publicMarketingPaths.map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: MARKETING_UPDATED,
    }),
  );

  const guideEntries: MetadataRoute.Sitemap = publicGuides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: guide.updated ?? MARKETING_UPDATED,
  }));

  const documentEntries: MetadataRoute.Sitemap = Object.keys(
    publicDocuments,
  ).map((document) => ({
    url: `${SITE_URL}/${document}`,
    lastModified: POLICY_UPDATED,
  }));

  return [...marketingEntries, ...guideEntries, ...documentEntries];
}
