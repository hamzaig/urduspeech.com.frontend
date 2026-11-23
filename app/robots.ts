import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const PRIVATE_DISALLOW = [
  "/api/",
  "/studio",
  "/auth/",
  "/deletion-status",
  "/reset-password",
  "/verify-email",
];

const ALLOW_CONTENT_SIGNAL = {
  "Content-Signal": "search=yes, ai-input=yes, ai-train=yes",
};

const BLOCK_CONTENT_SIGNAL = {
  "Content-Signal": "search=no, ai-input=no, ai-train=no",
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
        ],
        allow: "/",
        disallow: PRIVATE_DISALLOW,
        other: ALLOW_CONTENT_SIGNAL,
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: PRIVATE_DISALLOW,
        other: ALLOW_CONTENT_SIGNAL,
      },
      {
        userAgent: ["Bytespider", "CCBot", "cohere-ai"],
        disallow: "/",
        other: BLOCK_CONTENT_SIGNAL,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_DISALLOW,
        other: ALLOW_CONTENT_SIGNAL,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
