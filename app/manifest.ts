import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Urdu Transcription & Video Captions`,
    short_name: SITE_NAME,
    description:
      "Turn spoken Urdu audio and video into editable Urdu Nastaliq, Roman Urdu, English, and bilingual transcripts and subtitles.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f4",
    theme_color: "#204d36",
    lang: "en",
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/urduspeech-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/urduspeech-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
