import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { CaptionTemplate } from "../components/caption-template";
import { PreviewCaptionLines } from "../components/preview-caption-lines";
import {
  layoutCaptionPreview,
  previewOutputFrame,
  karaokeWordEnds,
  spokenWord,
  previewCueAt,
} from "../lib/caption-preview";

// ASS anchors, breaks and timestamps from renderVideo in urduspeech-golden:local.
const lineBox = {
  id: "line-box:1",
  name: "line-box",
  color: "#FFFFFF",
  box: false,
  style: {
    sizeScale: 1,
    bold: false,
    latinUppercase: false,
    outlineColor: "#111111",
    outlineScale: 3.2,
    shadowScale: 0,
    glow: 0,
    boxStyle: "line",
    boxColor: "#111111",
    boxAlpha: 48,
    position: "bottom",
    animation: "none",
    highlightColor: null,
    highlightScale: 1,
  },
} satisfies CaptionTemplate;
const wordPop = {
  ...lineBox,
  id: "word-pop:1",
  name: "word-pop",
  style: {
    ...lineBox.style,
    sizeScale: 1.14,
    bold: true,
    latinUppercase: true,
    outlineColor: "#000000",
    outlineScale: 2.6,
    boxStyle: "none",
    animation: "karaoke",
    highlightColor: "#FFD54F",
    highlightScale: 1.12,
  },
} satisfies CaptionTemplate;
const portrait = { width: 720, height: 1280 };
const landscape = { width: 1280, height: 720 };
const fonts = { latin: "poppins", urdu: "noto-nastaliq" };
const latin = "A short video with clear words";
const mixed = "میری آواز Live 2026\nA small update";
const input = { text: latin, template: lineBox, frame: portrait, fonts };

test("portrait Line box uses the MP4's breaks, outline, font em and bottom anchors", () => {
  const l = layoutCaptionPreview(input);
  assert.deepEqual(
    l.lines.map(({ text, anchorY }) => [text, anchorY]),
    [
      ["A short video with clear", 1005],
      ["words", 1080],
    ],
  );
  assert.equal(l.safeX, 51);
  assert.equal(l.lineHeight, 75);
  assert.ok(Math.abs(l.outline - 5.76) < 0.001);
  // ASS sizes are 42/105. Poppins and Nastaliq have different Win metrics.
  assert.ok(Math.abs(l.latin.size - 23.83655) < 0.001);
  assert.ok(Math.abs(l.urdu.size - 31.95374) < 0.001);
});

test("Word pop uppercases ASCII before wrapping and clamps a high landscape placement", () => {
  const portraitPop = layoutCaptionPreview({ ...input, template: wordPop });
  assert.deepEqual(
    portraitPop.lines.map(({ text, anchorY }) => [text, anchorY]),
    [
      ["A SHORT VIDEO WITH", 995],
      ["CLEAR WORDS", 1080],
    ],
  );
  const placed = layoutCaptionPreview({
    ...input,
    template: wordPop,
    text: mixed,
    frame: landscape,
    placement: { y: 0.08, scale: 1 },
  });
  assert.deepEqual(
    placed.lines.map(({ text, anchorY }) => [text, anchorY]),
    [
      ["میری آواز LIVE 2026", 192],
      ["A SMALL UPDATE", 277],
    ],
  );
  const low = layoutCaptionPreview({
    ...input,
    placement: { y: 0.92, scale: 1 },
  });
  assert.equal(low.lines.at(-1)?.anchorY, 1080);
});

test("bounded authored lines survive the estimator and stacked legacy cues keep four rows", () => {
  const text = "A line that would normally be wrapped here\n  دوسری   سطر";
  assert.deepEqual(
    layoutCaptionPreview({ ...input, text }).lines.map((l) => l.text),
    ["A line that would normally be wrapped here", "دوسری سطر"],
  );
  const stacked = layoutCaptionPreview({
    ...input,
    template: {
      id: "bilingual-stacked:1",
      name: "bilingual-stacked",
      color: "#FFFFFF",
      box: false,
    },
    text: "a\nb\nc\nd",
  });
  assert.deepEqual(
    stacked.lines.map((l) => l.anchorY),
    [860, 935, 1010, 1085],
  );
});

test("use the even export dimensions for layout, including portrait and square sources", () => {
  assert.deepEqual(
    previewOutputFrame({ width: 1080, height: 1920 }, 720),
    portrait,
  );
  assert.deepEqual(previewOutputFrame({ width: 3840, height: 2160 }, 1080), {
    width: 1920,
    height: 1080,
  });
  assert.deepEqual(previewOutputFrame({ width: 641, height: 361 }, 720), {
    width: 640,
    height: 360,
  });
  assert.deepEqual(previewOutputFrame({ width: 1080, height: 1080 }, 720), {
    width: 720,
    height: 720,
  });
});

test("karaoke uses one grapheme-weighted, centisecond-quantized timeline over both rows", () => {
  const { lines } = layoutCaptionPreview({
    ...input,
    template: wordPop,
    text: mixed,
  });
  const ends = karaokeWordEnds(lines, 2013, 3887);
  assert.deepEqual(ends, [2280, 2550, 2810, 3080, 3150, 3480, 3880]);
  assert.deepEqual(
    [2009, 2010, 2279, 2280, 3120, 3480, 3879, 3880].map((t) =>
      spokenWord(ends, 2013, t),
    ),
    [-1, 0, 0, 1, 4, 6, 6, -1],
  );
  assert.deepEqual(karaokeWordEnds(lines, 1000, 1260), []);
  const vowelMarks = layoutCaptionPreview({ ...input, text: "اِس go" });
  assert.deepEqual(karaokeWordEnds(vowelMarks.lines, 0, 800), [400, 800]);
});

test("mixed Urdu/ASCII stays in logical order with the selected Latin face and only one spoken word", () => {
  const html = renderToStaticMarkup(
    createElement(PreviewCaptionLines, {
      frame: input.frame,
      template: wordPop,
      layout: layoutCaptionPreview({ ...input, template: wordPop, text: mixed }),
      startMs: 2013,
      endMs: 3887,
      timeMs: 3120,
    }),
  );
  assert.equal(html.match(/data-spoken=/g)?.length, 1);
  assert.match(html, /data-spoken="true"[^>]*>A<\/span>/);
  assert.match(html, /class="preview-caption-latin"[^>]*>LIVE<\/span>/);
  assert.match(html, /dir="auto"/);
  assert.equal(
    html.replace(/<[^>]+>/g, ""),
    "میری آواز LIVE 2026A SMALL UPDATE",
  );
});

test("the presented frame selects the same cue as ASS at snapped boundaries and in gaps", () => {
  const a = { startMs: 203, endMs: 1933, text: latin };
  const b = { startMs: 2013, endMs: 3887, text: mixed };
  const cues = [a, b];
  assert.deepEqual(
    [199, 200, 1929, 1930, 2009, 2010, 3879, 3880].map((t) =>
      previewCueAt(cues, t),
    ),
    [undefined, a, a, undefined, undefined, b, b, undefined],
  );
});

test("line boxes and legacy bands use their respective native block padding", () => {
  const extended = layoutCaptionPreview({
    ...input,
    text: "A short line",
    template: {
      ...lineBox,
      style: { ...lineBox.style, boxStyle: "band", position: "top" },
    },
  });
  assert.deepEqual(extended.band, { top: 146, bottom: 237 });
  const boxed = layoutCaptionPreview({
    ...input,
    text: "A short line",
    template: { id: "boxed:1", name: "boxed", box: true, color: "#FFFFFF" },
  });
  assert.deepEqual(boxed.band, { top: 998, bottom: 1088 });
});
