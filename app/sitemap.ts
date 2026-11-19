import type { MetadataRoute } from "next";
import { publicDocuments } from "@/lib/public-documents";
import { publicGuides } from "@/lib/public-guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/demo",
    "/urdu-transcription",
    "/video-captions",
    "/pricing",
    "/faq",
    "/contact",
    "/guides",
    ...publicGuides.map(({ slug }) => `/guides/${slug}`),
    ...Object.keys(publicDocuments).map((document) => "/" + document),
  ];
  return paths.map((path) => ({ url: "https://urduspeech.com" + path }));
}
