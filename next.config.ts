import type { NextConfig } from "next";

// Only this endpoint on the configured backend serves the completed MP4.
const upstream = process.env.BACKEND_ORIGIN;
const streamOrigin =
  upstream && URL.canParse(upstream) ? new URL(upstream) : null;
const finalVideoStream =
  streamOrigin?.protocol === "https:" &&
  !streamOrigin.username &&
  !streamOrigin.password &&
  !streamOrigin.port &&
  streamOrigin.pathname === "/" &&
  !streamOrigin.search &&
  !streamOrigin.hash
    ? new URL("/v1/downloads/stream", streamOrigin.origin).href
    : "";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https:",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // Studio previews stream the uploaded source from S3 via signed URLs.
  "media-src 'self' blob: https://*.amazonaws.com https://*.s3.amazonaws.com",
  `connect-src 'self' https://*.amazonaws.com https://*.s3.amazonaws.com ${finalVideoStream}`.trim(),
  "upgrade-insecure-requests",
].join("; ");

const NOINDEX_HEADERS = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
const IMMUTABLE_CACHE_HEADERS = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const config: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      { source: "/fonts/:path*", headers: IMMUTABLE_CACHE_HEADERS },
      { source: "/brand/:path*", headers: IMMUTABLE_CACHE_HEADERS },
      { source: "/images/:path*", headers: IMMUTABLE_CACHE_HEADERS },
      { source: "/og/:path*", headers: IMMUTABLE_CACHE_HEADERS },
      { source: "/auth/:path*", headers: NOINDEX_HEADERS },
      { source: "/studio", headers: NOINDEX_HEADERS },
      { source: "/studio/:path*", headers: NOINDEX_HEADERS },
      { source: "/deletion-status", headers: NOINDEX_HEADERS },
      { source: "/reset-password", headers: NOINDEX_HEADERS },
      { source: "/verify-email", headers: NOINDEX_HEADERS },
      { source: "/api/:path*", headers: NOINDEX_HEADERS },
    ];
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/urdu-transcription",
        permanent: true,
      },
      {
        source: "/transcription",
        destination: "/urdu-transcription",
        permanent: true,
      },
      {
        source: "/subtitling",
        destination: "/video-captions",
        permanent: true,
      },
      {
        source: "/translation",
        destination: "/urdu-audio-to-english-text",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/auth/login",
        destination: "/auth/sign-in",
        permanent: true,
      },
      {
        source: "/auth/signup",
        destination: "/auth/register",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/index.md",
        destination: "/api/md/home",
      },
      {
        source: "/guides/:slug.md",
        destination: "/api/md/guides/:slug",
      },
      {
        source: "/compare/:slug.md",
        destination: "/api/md/compare/:slug",
      },
      {
        source: "/alternatives/:slug.md",
        destination: "/api/md/alternatives/:slug",
      },
      {
        source:
          "/:page(about|methodology|security|pricing|supported-formats|urdu-transcription|video-captions|urdu-audio-to-roman-urdu|urdu-audio-to-english-text|faq|urdu-caption-glossary).md",
        destination: "/api/md/:page",
      },
    ];
  },
};

export default config;
