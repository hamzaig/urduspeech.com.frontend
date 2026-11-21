import { test } from "node:test";
import assert from "node:assert/strict";
import robots from "../app/robots";
import sitemap, { publicMarketingPaths } from "../app/sitemap";
import { publicGuides } from "../lib/public-guides";
import { publicDocuments } from "../lib/public-documents";
import {
  SITE_URL,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "../lib/seo";

test("robots.txt allows public crawling, disallows private routes, and references sitemap.xml", () => {
  const config = robots();
  assert.equal(config.sitemap, "https://urduspeech.com/sitemap.xml");
  assert.ok(!Array.isArray(config.rules));
  assert.equal(config.rules.userAgent, "*");
  assert.equal(config.rules.allow, "/");
  assert.deepEqual(config.rules.disallow, [
    "/api/",
    "/studio",
    "/deletion-status",
    "/reset-password",
    "/verify-email",
  ]);
});

test("sitemap includes all canonical public marketing, guide, and policy routes and excludes private routes", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  for (const path of publicMarketingPaths) {
    assert.ok(
      urls.includes(`${SITE_URL}${path}`),
      `missing marketing path ${path}`,
    );
  }
  for (const guide of publicGuides) {
    assert.ok(
      urls.includes(`${SITE_URL}/guides/${guide.slug}`),
      `missing guide ${guide.slug}`,
    );
  }
  for (const doc of Object.keys(publicDocuments)) {
    assert.ok(urls.includes(`${SITE_URL}/${doc}`), `missing document ${doc}`);
  }

  // Required new pages must be in the sitemap
  assert.ok(urls.includes("https://urduspeech.com/urdu-audio-to-roman-urdu"));
  assert.ok(urls.includes("https://urduspeech.com/urdu-audio-to-english-text"));
  assert.ok(urls.includes("https://urduspeech.com/guides/voice-notes-to-text"));
  assert.ok(
    urls.includes("https://urduspeech.com/guides/urdu-subtitles-for-youtube"),
  );

  // Conditional duplicate /urdu-video-to-text is merged into /urdu-transcription#video-to-text
  assert.ok(!urls.includes("https://urduspeech.com/urdu-video-to-text"));

  // Private or auth routes must not appear in the sitemap
  for (const url of urls) {
    assert.ok(!url.includes("/studio"));
    assert.ok(!url.includes("/auth"));
    assert.ok(!url.includes("/api"));
    assert.ok(!url.includes("/deletion-status"));
  }
});

test("publicMetadata builds self-canonical HTTPS URLs and Open Graph metadata", () => {
  const romanMeta = publicMetadata({
    title: "Urdu Audio to Roman Urdu Text",
    description: "Convert Urdu audio into Roman Urdu text.",
    path: "/urdu-audio-to-roman-urdu",
  });
  assert.equal(romanMeta.title, "Urdu Audio to Roman Urdu Text");
  assert.equal(
    romanMeta.alternates?.canonical,
    "https://urduspeech.com/urdu-audio-to-roman-urdu",
  );
  assert.equal(
    romanMeta.openGraph?.url,
    "https://urduspeech.com/urdu-audio-to-roman-urdu",
  );

  const guideMeta = publicMetadata({
    title: "How to convert Urdu voice notes to text",
    absoluteTitle: "Convert Urdu Voice Notes to Text | UrduSpeech Guide",
    description: "Guide description",
    path: "/guides/voice-notes-to-text",
    ogType: "article",
  });
  assert.deepEqual(guideMeta.title, {
    absolute: "Convert Urdu Voice Notes to Text | UrduSpeech Guide",
  });
  assert.equal(
    guideMeta.alternates?.canonical,
    "https://urduspeech.com/guides/voice-notes-to-text",
  );
});

test("JSON-LD builders produce truthful schema.org objects without fabricated ratings or offers", () => {
  const org = buildOrganizationJsonLd();
  assert.equal(org["@type"], "Organization");
  assert.equal(org.legalName, "MoonSys Ltd");

  const site = buildWebSiteJsonLd();
  assert.equal(site["@type"], "WebSite");
  assert.equal(site.url, SITE_URL);

  const app = buildSoftwareApplicationJsonLd({
    description: "Urdu speech-to-text and caption studio",
    path: "/urdu-transcription",
    featureList: ["Urdu transcription", "SRT/VTT exports"],
  });
  assert.equal(app["@type"], "WebApplication");
  assert.equal(app.url, "https://urduspeech.com/urdu-transcription");
  assert.ok(!("aggregateRating" in app));
  assert.ok(!("offers" in app));
  assert.ok(!("review" in app));

  const crumbs = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Creator guides", path: "/guides" },
    {
      name: "Convert Urdu voice notes to text",
      path: "/guides/voice-notes-to-text",
    },
  ]);
  assert.equal(crumbs["@type"], "BreadcrumbList");
  assert.equal(crumbs.itemListElement.length, 3);
  assert.equal(crumbs.itemListElement[0].item, "https://urduspeech.com");
  assert.equal(
    crumbs.itemListElement[2].item,
    "https://urduspeech.com/guides/voice-notes-to-text",
  );

  const article = buildArticleJsonLd({
    headline: "How to convert Urdu voice notes to text",
    description: "Practical guide",
    path: "/guides/voice-notes-to-text",
    datePublished: "2026-11-21",
    dateModified: "2026-11-21",
  });
  assert.equal(article["@type"], "Article");
  assert.equal(
    article.mainEntityOfPage,
    "https://urduspeech.com/guides/voice-notes-to-text",
  );
});
