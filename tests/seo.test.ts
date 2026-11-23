import { test } from "node:test";
import assert from "node:assert/strict";
import robots, { PRIVATE_DISALLOW } from "../app/robots";
import sitemap, { publicMarketingPaths } from "../app/sitemap";
import { publicAlternatives } from "../lib/public-alternatives";
import { publicGuides } from "../lib/public-guides";
import { publicDocuments } from "../lib/public-documents";
import { publicComparisons } from "../lib/public-comparisons";
import { verticalSlugs } from "../lib/public-verticals";
import { URDU_GLOSSARY_TERMS } from "../lib/urdu-glossary";
import { PLANS } from "../lib/plans";
import { AUTH_MODES } from "../lib/auth-modes";
import {
  buildLlmsFullTxt,
  buildLlmsTxt,
  renderMarkdownMirror,
} from "../lib/markdown-mirrors";
import {
  SITE_URL,
  canonicalFor,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildDefinedTermSetJsonLd,
  buildGraphJsonLd,
  buildItemListJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "../lib/seo";

test("robots.txt configures search/AI groups, blocks bulk scrapers, disallows /auth/ and private routes, and emits Content-Signal", () => {
  const config = robots();
  assert.equal(config.sitemap, "https://urduspeech.com/sitemap.xml");
  assert.equal(config.host, SITE_URL);
  assert.ok(Array.isArray(config.rules));
  assert.ok(config.rules.length >= 4);

  const wildcard = config.rules.find((r) => r.userAgent === "*");
  assert.ok(wildcard);
  assert.equal(wildcard.allow, "/");
  assert.deepEqual(wildcard.disallow, PRIVATE_DISALLOW);
  assert.ok(PRIVATE_DISALLOW.includes("/auth/"));
  assert.ok(PRIVATE_DISALLOW.includes("/studio"));
  assert.equal(
    wildcard.other?.["Content-Signal"],
    "search=yes, ai-input=yes, ai-train=yes",
  );

  const blocked = config.rules.find(
    (r) => Array.isArray(r.userAgent) && r.userAgent.includes("Bytespider"),
  );
  assert.ok(blocked);
  assert.equal(blocked.disallow, "/");
  assert.equal(
    blocked.other?.["Content-Signal"],
    "search=no, ai-input=no, ai-train=no",
  );
});

test("sitemap includes all canonical public marketing, vertical, guide, comparison, tool, and policy routes and excludes private routes", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  for (const path of publicMarketingPaths) {
    assert.ok(
      urls.includes(canonicalFor(path)),
      `missing marketing path ${path}`,
    );
  }
  for (const slug of verticalSlugs) {
    assert.ok(urls.includes(`${SITE_URL}/${slug}`), `missing vertical ${slug}`);
  }
  for (const guide of publicGuides) {
    assert.ok(
      urls.includes(`${SITE_URL}/guides/${guide.slug}`),
      `missing guide ${guide.slug}`,
    );
  }
  for (const comparison of publicComparisons) {
    assert.ok(
      urls.includes(`${SITE_URL}/compare/${comparison.slug}`),
      `missing comparison ${comparison.slug}`,
    );
  }
  for (const alt of publicAlternatives) {
    assert.ok(
      urls.includes(`${SITE_URL}/alternatives/${alt.slug}`),
      `missing alternative ${alt.slug}`,
    );
  }
  for (const doc of Object.keys(publicDocuments)) {
    assert.ok(urls.includes(`${SITE_URL}/${doc}`), `missing document ${doc}`);
  }

  // Root URL matches canonical (no trailing slash mismatch)
  assert.ok(urls.includes("https://urduspeech.com"));
  assert.ok(!urls.includes("https://urduspeech.com/"));

  // Key high-intent routes exist
  assert.ok(urls.includes("https://urduspeech.com/about"));
  assert.ok(urls.includes("https://urduspeech.com/methodology"));
  assert.ok(urls.includes("https://urduspeech.com/security"));
  assert.ok(urls.includes("https://urduspeech.com/compare"));
  assert.ok(urls.includes("https://urduspeech.com/tools"));
  assert.ok(urls.includes("https://urduspeech.com/tools/srt-to-vtt-converter"));
  assert.ok(
    urls.includes("https://urduspeech.com/tools/urdu-subtitle-checker"),
  );
  assert.ok(
    urls.includes("https://urduspeech.com/tools/caption-plan-calculator"),
  );
  assert.ok(urls.includes("https://urduspeech.com/urdu-caption-glossary"));
  assert.ok(
    urls.includes(
      "https://urduspeech.com/alternatives/capcut-urdu-alternative",
    ),
  );
  assert.ok(
    urls.includes("https://urduspeech.com/urdu-captions-for-reels-tiktok"),
  );
  assert.ok(
    urls.includes("https://urduspeech.com/bilingual-urdu-english-captions"),
  );

  // Merged duplicate stays excluded
  assert.ok(!urls.includes("https://urduspeech.com/urdu-video-to-text"));

  // Private or auth routes must not appear in the sitemap
  for (const url of urls) {
    assert.ok(!url.includes("/studio"));
    assert.ok(!url.includes("/auth"));
    assert.ok(!url.includes("/api"));
    assert.ok(!url.includes("/deletion-status"));
    assert.ok(!url.includes("/reset-password"));
    assert.ok(!url.includes("/verify-email"));
  }
});

test("publicMetadata builds self-canonical HTTPS URLs, branded 1200x630 PNG OG cards, and markdown alternates", () => {
  const romanMeta = publicMetadata({
    title: "Urdu Audio to Roman Urdu Text",
    description: "Convert Urdu audio into Roman Urdu text.",
    path: "/urdu-audio-to-roman-urdu",
    ogImage: "roman-urdu",
    markdownPath: "/urdu-audio-to-roman-urdu.md",
  });
  assert.equal(romanMeta.title, "Urdu Audio to Roman Urdu Text");
  assert.equal(
    romanMeta.alternates?.canonical,
    "https://urduspeech.com/urdu-audio-to-roman-urdu",
  );
  assert.equal(
    romanMeta.alternates?.types?.["text/markdown"],
    "https://urduspeech.com/urdu-audio-to-roman-urdu.md",
  );
  const ogImages = Array.isArray(romanMeta.openGraph?.images)
    ? romanMeta.openGraph.images
    : [];
  assert.equal(ogImages.length, 1);
  const firstImage = ogImages[0] as {
    url: string;
    width: number;
    height: number;
    alt: string;
    type: string;
  };
  assert.equal(firstImage.url, "https://urduspeech.com/og/roman-urdu.png");
  assert.equal(firstImage.width, 1200);
  assert.equal(firstImage.height, 630);
  assert.equal(firstImage.type, "image/png");
  assert.ok(firstImage.alt.length > 10);

  const guideMeta = publicMetadata({
    title: "How to convert Urdu voice notes to text",
    absoluteTitle: "Convert Urdu Voice Notes to Text | UrduSpeech Guide",
    description: "Guide description",
    path: "/guides/voice-notes-to-text",
    ogType: "article",
    ogImage: "guides",
    publishedTime: "2026-11-18T00:00:00+05:00",
    modifiedTime: "2026-11-22T00:00:00+05:00",
  });
  assert.deepEqual(guideMeta.title, {
    absolute: "Convert Urdu Voice Notes to Text | UrduSpeech Guide",
  });
  assert.equal(
    guideMeta.alternates?.canonical,
    "https://urduspeech.com/guides/voice-notes-to-text",
  );
});

test("JSON-LD @graph builders emit unified schema.org nodes with real PKR offers and zero fabricated ratings or deprecated types", () => {
  const org = buildOrganizationJsonLd();
  assert.equal(org["@type"], "Organization");
  assert.equal(org.legalName, "MoonSys Ltd");
  assert.equal(
    org.logo.url,
    "https://urduspeech.com/brand/urduspeech-logo.png",
  );
  assert.ok(org.disambiguatingDescription.includes("ASLP-lab/UrduSpeech"));

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
  assert.ok(!("review" in app));
  assert.ok(Array.isArray(app.offers));
  assert.equal((app.offers as unknown[]).length, PLANS.length);
  assert.equal(
    (app.offers as { priceCurrency: string }[])[0].priceCurrency,
    "PKR",
  );

  const crumbs = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Creator guides", path: "/guides" },
    {
      name: "Convert Urdu voice notes to text",
      path: "/guides/voice-notes-to-text",
    },
  ]);
  assert.equal(crumbs["@type"], "BreadcrumbList");
  assert.equal(
    crumbs["@id"],
    "https://urduspeech.com/guides/voice-notes-to-text#breadcrumb",
  );
  assert.equal(crumbs.itemListElement.length, 3);

  const article = buildArticleJsonLd({
    headline: "How to convert Urdu voice notes to text",
    description: "Practical guide",
    path: "/guides/voice-notes-to-text",
    datePublished: "2026-11-18T00:00:00+05:00",
    dateModified: "2026-11-22T00:00:00+05:00",
  });
  assert.equal(article["@type"], "Article");
  assert.deepEqual(article.mainEntityOfPage, {
    "@id": "https://urduspeech.com/guides/voice-notes-to-text#webpage",
  });
  assert.ok(Array.isArray(article.image) && article.image.length === 1);

  const graph = buildGraphJsonLd([
    org,
    site,
    buildWebPageJsonLd({
      name: "Test page",
      description: "Desc",
      path: "/guides",
    }),
    buildItemListJsonLd({
      path: "/guides",
      name: "Guides",
      items: [{ name: "Guide 1", path: "/guides/voice-notes-to-text" }],
    }),
    crumbs,
    article,
  ]);
  assert.equal(graph["@context"], "https://schema.org");
  assert.equal(graph["@graph"].length, 6);
  for (const node of graph["@graph"]) {
    assert.ok(!("@context" in node));
    assert.notEqual(node["@type"], "HowTo");
    assert.notEqual(node["@type"], "FAQPage");
  }
});

test("llms.txt, llms-full.txt, and markdown mirrors return truthful agent-ready digests", () => {
  const llms = buildLlmsTxt();
  assert.ok(llms.startsWith("# UrduSpeech\n"));
  assert.ok(llms.includes("MoonSys Ltd"));
  assert.ok(llms.includes("ASLP-lab/UrduSpeech"));
  assert.ok(llms.includes("https://urduspeech.com/llms-full.txt"));

  const full = buildLlmsFullTxt();
  assert.ok(full.includes("PKR 2,499"));
  assert.ok(full.includes("256 MiB"));
  assert.ok(full.includes("Noto Nastaliq Urdu"));

  const guideMd = renderMarkdownMirror(["guides", "make-urdu-video-captions"]);
  assert.ok(guideMd?.includes("# How to make Urdu video captions"));

  const glossarySet = buildDefinedTermSetJsonLd({
    path: "/urdu-caption-glossary",
    name: "Urdu Glossary",
    description: "Glossary desc",
    terms: URDU_GLOSSARY_TERMS,
  });
  assert.equal(glossarySet["@type"], "DefinedTermSet");
  assert.equal(glossarySet.hasDefinedTerm.length, URDU_GLOSSARY_TERMS.length);

  const compareMd = renderMarkdownMirror(["compare", "urduspeech-vs-capcut"]);
  assert.ok(compareMd?.includes("CapCut"));

  const altMd = renderMarkdownMirror([
    "alternatives",
    "capcut-urdu-alternative",
  ]);
  assert.ok(altMd?.includes("CapCut"));

  const glossaryMd = renderMarkdownMirror(["urdu-caption-glossary"]);
  assert.ok(glossaryMd?.includes("Nastaliq vs Naskh"));

  assert.equal(renderMarkdownMirror(["nonexistent-route"]), null);
});

test("AUTH_MODES exposes all 5 valid auth modes in a server-safe module", () => {
  assert.deepEqual(Object.keys(AUTH_MODES), [
    "sign-in",
    "register",
    "forgot-password",
    "reset-password",
    "verify-email",
  ]);
});
