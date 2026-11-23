import { test } from "node:test";
import assert from "node:assert/strict";
import {
  classifyAiReferrer,
  parseAttributionFromUrl,
  sanitizeProps,
} from "../lib/analytics";

test("classifyAiReferrer identifies major AI answer engines and ignores unrelated hosts", () => {
  assert.equal(classifyAiReferrer("chatgpt.com"), "chatgpt");
  assert.equal(classifyAiReferrer("www.perplexity.ai"), "perplexity");
  assert.equal(classifyAiReferrer("claude.ai"), "claude");
  assert.equal(classifyAiReferrer("gemini.google.com"), "gemini");
  assert.equal(classifyAiReferrer("copilot.microsoft.com"), "copilot");
  assert.equal(classifyAiReferrer("google.com"), undefined);
  assert.equal(classifyAiReferrer(""), undefined);
});

test("parseAttributionFromUrl captures UTM params and AI assistant referrer cleanly", () => {
  const snapshot = parseAttributionFromUrl(
    "?utm_source=youtube&utm_medium=video&utm_campaign=reels_launch&ignored=123",
    "https://www.perplexity.ai/search/urdu-captions",
    "/pricing?utm_source=youtube",
  );
  assert.equal(snapshot.utm_source, "youtube");
  assert.equal(snapshot.utm_medium, "video");
  assert.equal(snapshot.utm_campaign, "reels_launch");
  assert.equal(snapshot.landing_path, "/pricing");
  assert.equal(snapshot.referrer_host, "www.perplexity.ai");
  assert.equal(snapshot.ai_assistant, "perplexity");

  const selfRef = parseAttributionFromUrl(
    "",
    "https://urduspeech.com/demo",
    "/pricing",
  );
  assert.equal(selfRef.referrer_host, undefined);
  assert.equal(selfRef.ai_assistant, undefined);
});

test("sanitizeProps blocks PII keys, email-like values, and non-finite numbers", () => {
  const clean = sanitizeProps({
    email: "creator@example.com",
    name: "Bilal",
    token: "secret-jwt",
    claimedReference: "TXN-991",
    plan_slug: "creator",
    estimated_minutes: 140,
    bad_number: Number.NaN,
    accidental_email: "hidden@gmail.com",
    editable: true,
  });

  assert.deepEqual(clean, {
    plan_slug: "creator",
    estimated_minutes: 140,
    editable: true,
  });
});
