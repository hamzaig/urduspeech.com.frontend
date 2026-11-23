import { test } from "node:test";
import assert from "node:assert/strict";
import {
  SAMPLE_URDU_SRT,
  containsUrduScript,
  detectSubtitleFormat,
  exportSubtitles,
  formatTimestamp,
  parseSubtitles,
  parseTimestampToMs,
} from "../lib/subtitle-tools";

test("parses standard UTF-8 Urdu SRT and exports valid WebVTT and plain TXT", () => {
  assert.equal(detectSubtitleFormat(SAMPLE_URDU_SRT), "srt");
  const parsed = parseSubtitles(SAMPLE_URDU_SRT);
  assert.equal(parsed.cues.length, 3);
  assert.equal(parsed.urduCueCount, 3);
  assert.equal(parsed.issues.length, 0);
  assert.ok(containsUrduScript(parsed.cues[0].lines[0]));

  const vtt = exportSubtitles(parsed.cues, "vtt");
  assert.ok(vtt.startsWith("WEBVTT\n\n"));
  assert.ok(vtt.includes("00:00:00.000 --> 00:00:03.800"));
  assert.ok(vtt.includes("آج ہم اردو ویڈیو"));

  const txt = exportSubtitles(parsed.cues, "txt");
  assert.ok(!txt.includes("-->"));
  assert.ok(txt.includes("Today we will learn"));
});

test("parses WebVTT with BOM, NOTE blocks, and short MM:SS.mmm timestamps into valid SRT", () => {
  const vtt = `\uFEFFWEBVTT

NOTE UrduSpeech test comment

00:01.250 --> 00:04.500
آواز & <کیپشن>

00:05.000 --> 00:08.100
Test cue
`;
  assert.equal(detectSubtitleFormat(vtt), "vtt");
  const parsed = parseSubtitles(vtt);
  assert.equal(parsed.cues.length, 2);
  assert.equal(parsed.cues[0].startMs, 1250);
  assert.equal(parsed.cues[0].endMs, 4500);

  const srt = exportSubtitles(parsed.cues, "srt");
  assert.ok(srt.includes("1\n00:00:01,250 --> 00:00:04,500\n"));
  assert.ok(srt.includes("2\n00:00:05,000 --> 00:00:08,100\n"));

  const reExportedVtt = exportSubtitles(parsed.cues, "vtt");
  assert.ok(reExportedVtt.includes("آواز &amp; &lt;کیپشن&gt;"));
});

test("flags overlapping cues, inverted timestamps, and short flashes", () => {
  const broken = `1
00:00:05,000 --> 00:00:03,000
Inverted cue

2
00:00:02,500 --> 00:00:02,800
Too short & overlapping
`;
  const parsed = parseSubtitles(broken);
  assert.ok(parsed.issues.some((i) => i.severity === "error"));
  assert.ok(parsed.issues.some((i) => i.message.includes("before cue 1 ends")));
  assert.ok(parsed.issues.some((i) => i.message.includes("300 ms")));

  assert.equal(parseTimestampToMs("01:02:03,456"), 3_723_456);
  assert.equal(formatTimestamp(3_723_456, "srt"), "01:02:03,456");
  assert.equal(formatTimestamp(3_723_456, "vtt"), "01:02:03.456");
  assert.equal(parseTimestampToMs("bad"), null);
});
