import type { MetadataRoute } from "next";
import { publicDocuments } from "@/lib/public-documents";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/urdu-transcription",
    "/video-captions",
    "/pricing",
    "/faq",
    "/contact",
    ...Object.keys(publicDocuments).map((document) => "/" + document),
  ];
  return paths.map((path) => ({ url: "https://urduspeech.com" + path }));
}
