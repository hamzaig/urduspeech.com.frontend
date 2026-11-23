import { test } from "node:test";
import assert from "node:assert/strict";
import {
  SAMPLE_AUDIT_SRT,
  analyzeUrduSubtitles,
  normalizeUrduLine,
  normalizeUrduSubtitles,
} from "../lib/urdu-subtitle-analyzer";

test("analyzeUrduSubtitles detects fast mobile cues, Arabic kaf/yeh, and Western punctuation in Urdu lines", () => {
  const report = analyzeUrduSubtitles(SAMPLE_AUDIT_SRT, "reels");
  assert.equal(report.cueCount, 3);
  assert.equal(report.urduCueCount, 2);
  assert.ok(report.fastCueCount >= 1);
  assert.ok(report.arabicKafTotal >= 4);
  assert.ok(report.latinPunctuationTotal >= 2);
  assert.ok(report.healthScore < 100);
});

test("normalizeUrduLine converts Arabic kaf/yeh and pure-Urdu punctuation while preserving English and URLs", () => {
  const urduOnly = normalizeUrduLine("آج ہم كیا كر رہے ہیں, ٹھيک ہے?");
  assert.equal(urduOnly.text, "آج ہم کیا کر رہے ہیں، ٹھیک ہے؟");
  assert.equal(urduOnly.arabicKafFixed, 2);
  assert.equal(urduOnly.arabicYehFixed, 1);
  assert.equal(urduOnly.punctuationFixed, 2);

  // Mixed Urdu + English line should normalize kaf/yeh but leave English punctuation untouched
  const mixed = normalizeUrduLine(
    "Visit https://urduspeech.com/?ref=1 for كیپشن",
  );
  assert.equal(mixed.text, "Visit https://urduspeech.com/?ref=1 for کیپشن");
  assert.equal(mixed.arabicKafFixed, 1);
  assert.equal(mixed.punctuationFixed, 0);
});

test("normalizeUrduSubtitles cleans an entire SRT file into valid WebVTT or SRT with zero remaining Arabic kaf/yeh", () => {
  const cleaned = normalizeUrduSubtitles(SAMPLE_AUDIT_SRT, "vtt");
  assert.ok(cleaned.normalizedText.startsWith("WEBVTT\n\n"));
  assert.ok(cleaned.totalFixes >= 6);

  const recheck = analyzeUrduSubtitles(cleaned.normalizedText, "youtube");
  assert.equal(recheck.arabicKafTotal, 0);
  assert.equal(recheck.arabicYehTotal, 0);
  assert.equal(recheck.latinPunctuationTotal, 0);
});
