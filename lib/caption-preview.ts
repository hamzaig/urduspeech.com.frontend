import type { CaptionTemplate } from "../components/caption-template";
import {
  resolveCaptionFonts,
  type CaptionFontChoice,
  type CaptionFontOption,
} from "./caption-fonts";
import { previewFontMetrics } from "./caption-preview-font-metrics";

export type PreviewFrame = { width: number; height: number };
export type CaptionPreviewInput = {
  frame: PreviewFrame;
  template: CaptionTemplate;
  text: string;
  placement?: { y: number; scale: number } | null;
  fonts?: CaptionFontChoice | null;
};

/** videoWidth/videoHeight already describe the upright, square-pixel display. */
export function previewOutputFrame(
  { width, height }: PreviewFrame,
  tier: 720 | 1080 | 2160,
): PreviewFrame {
  const long = (tier * 16) / 9;
  const scale = Math.min(
    1,
    (width > height ? long : tier) / width,
    (height > width ? long : tier) / height,
    Math.sqrt((tier * long) / (width * height)),
  );
  return {
    width: Math.max(2, 2 * Math.floor((width * scale) / 2)),
    height: Math.max(2, 2 * Math.floor((height * scale) / 2)),
  };
}

const graphemes = new Intl.Segmenter("ur", { granularity: "grapheme" });
const count = (text: string) => [...graphemes.segment(text)].length;
const hasArabic = /\p{Script=Arabic}/u;
// generateAss explicitly switches just these runs to the Latin face in an Urdu line.
export const latinRun = /([A-Za-z0-9@._:/?=+%#&-]+)/;
export const hasUrduRun = /[^A-Za-z0-9@._:/?=+%#&-]/;

function wrap(
  text: string,
  fontSize: number,
  maxWidth: number,
  maxLines: number,
  maxHeight: number,
  lineHeight: number,
) {
  const paragraphs = text.split("\n");
  const proposed = paragraphs.map((line) => line.trim().replace(/ +/gu, " "));
  if (
    proposed.length > 1 &&
    proposed.length <= maxLines &&
    proposed.length * lineHeight <= maxHeight &&
    proposed.every((line) => line && count(line) <= 42)
  )
    return proposed;

  // Mirror captionLines' stable wrap proposal; a browser measuring actual glyph
  // widths here would choose different words for the next ASS event.
  const width = (line: string) => {
    let width = 0;
    for (const { segment } of graphemes.segment(line))
      width +=
        (segment === " " ? 0.32 : /[A-ZMW@]/u.test(segment) ? 0.95 : 0.8) *
        fontSize;
    return width;
  };
  const lines: string[] = [];
  for (const paragraph of paragraphs) {
    let line = "";
    for (const word of paragraph.split(/ +/u)) {
      const next = line ? line + " " + word : word;
      if (line && width(next) > maxWidth) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    lines.push(line);
  }
  // During editing an unexportable cue can still be shown in full.
  return lines;
}

function face(option: CaptionFontOption, em: number) {
  const [height, asc, desc] = previewFontMetrics[option.id];
  const size = (em * option.optical * height) / (asc + desc);
  // These are the two Semibold default instances in the pinned catalog.
  const weight = option.id === "poppins" || option.id === "archivo" ? 600 : 400;
  return {
    family: option.css,
    size,
    ascent: size * asc,
    descent: size * desc,
    weight,
  };
}

/** Geometry in output pixels, before scaling to the on-screen video rectangle.
 * Mirrors resolveLayout and the styled/legacy event anchors in generateAss. */
export function layoutCaptionPreview({
  frame: { width, height },
  template,
  text,
  placement,
  fonts,
}: CaptionPreviewInput) {
  const selected = resolveCaptionFonts(fonts);
  const style = template.style;
  const scale = placement?.scale ?? 1;
  const short = Math.min(width, height);
  let fontSize = Math.round(
    short * 0.042 * Math.min(1.6, (style?.sizeScale ?? 1) * scale),
  );
  const base = Math.round(short * 0.042 * Math.min(1, scale));
  while (fontSize > base) {
    const pad = Math.ceil(fontSize * Math.max(1, selected.urdu.optical) * 16);
    const w = width + pad * 2,
      h = height + pad * 2;
    if (w <= 8192 && h <= 8192 && w * h <= 32_000_000) break;
    fontSize--;
  }
  const safeX = Math.ceil(width * 0.07);
  const safeTop = Math.ceil(height * 0.08);
  const safeBottom =
    height - Math.ceil(height * (height > width ? 0.15 : 0.09));
  const lineHeight = Math.ceil(fontSize * 2.5);
  const source = style?.latinUppercase
    ? text.replace(/[a-z]+/g, (s) => s.toUpperCase())
    : text;
  const rows = wrap(
    source,
    fontSize,
    width - safeX * 2 - 2 * fontSize * 0.15,
    template.name === "bilingual-stacked" ? 4 : 2,
    safeBottom - safeTop,
    lineHeight,
  );
  const blockHeight = rows.length * lineHeight;
  const unit = fontSize * 0.06;
  const outline =
    style?.boxStyle === "line"
      ? Math.max(2, unit * style.outlineScale)
      : style?.outlineScale === 0
        ? 0
        : Math.max(1, unit * (style?.outlineScale ?? 1));
  const shadow = unit * (style?.shadowScale ?? 0);
  const blur = Math.round(((style?.glow ?? 0) * fontSize) / 100);
  const spread = outline + shadow + 3 * blur;
  const inset = style ? Math.ceil(spread) + 2 : Math.ceil(outline) + 1;
  const lowest = safeBottom - blockHeight;
  const boxPad = template.box && !style ? Math.ceil(fontSize * 0.5) : 0;
  let top = lowest;
  if (style) {
    const highest = safeTop + Math.ceil(lineHeight * 0.6 + spread);
    if (placement)
      top = Math.max(
        highest,
        Math.min(lowest, Math.round(placement.y * height - blockHeight / 2)),
      );
    else if (style.position === "top") top = highest;
    else if (style.position === "middle")
      top = Math.round((height - blockHeight) / 2);
  } else if (placement) {
    // Legacy ASS rounds and clamps the bottom edge.
    top =
      Math.max(
        safeTop + Math.ceil(lineHeight * 0.6) + blockHeight + boxPad,
        Math.min(
          safeBottom,
          Math.round(placement.y * height + blockHeight / 2),
        ),
      ) - blockHeight;
  }
  let firstWord = 0;
  const lines = rows.map((text, index) => {
    const words = text.split(" ");
    const line = {
      text,
      words,
      firstWord,
      urdu: hasArabic.test(text),
      anchorY: top + (index + 1) * lineHeight - inset,
    };
    firstWord += words.length;
    return line;
  });
  const bandPad = Math.ceil(fontSize * 0.25);
  const band =
    style?.boxStyle === "band"
      ? {
          top: Math.max(0, top - bandPad),
          bottom: Math.min(height, top + blockHeight + bandPad),
        }
      : boxPad
        ? { top: top - boxPad, bottom: top + blockHeight }
        : null;
  const latinFace = face(selected.latin, fontSize);
  const urduFace = face(selected.urdu, fontSize);
  // Keep the focus outline and handle around tall Nastaliq/boxed rows even
  // when a Word pop word grows. The editable rectangle stays still mid-cue.
  const maxWordScale = style?.animation === "karaoke" && style.highlightColor ? style.highlightScale : 1;
  let boundsTop = Math.min(top, band?.top ?? top);
  let boundsBottom = Math.max(top + blockHeight, band?.bottom ?? 0);
  for (const line of lines) {
    const metrics = line.urdu ? urduFace : latinFace;
    let rowHeight = metrics.ascent + metrics.descent;
    if (line.urdu && latinRun.test(line.text))
      rowHeight = Math.max(urduFace.ascent, latinFace.ascent) + Math.max(urduFace.descent, latinFace.descent);
    boundsTop = Math.min(boundsTop, line.anchorY - rowHeight * maxWordScale - spread);
    boundsBottom = Math.max(boundsBottom, line.anchorY + spread);
  }
  return { safeX, fontSize, top, blockHeight, lineHeight, outline, shadow, blur, lines, band,
    boundsTop: Math.max(0, boundsTop), boundsBottom: Math.min(height, boundsBottom),
    latin: latinFace, urdu: urduFace };
}

export type PreviewCue = { text: string; startMs: number; endMs: number };

type PreviewLine = ReturnType<typeof layoutCaptionPreview>["lines"][number];
export const assTimeMs = (ms: number) => Math.floor(ms / 10) * 10;

/** End-exclusive ASS event times. Word offsets continue across hard wraps. */
export function karaokeWordEnds(
  lines: PreviewLine[],
  startMs: number,
  endMs: number,
): number[] {
  const weights = lines.flatMap((line) =>
    line.words.map((word) => Math.max(1, count(word))),
  );
  const duration = endMs - startMs;
  if (duration < weights.length * 40) return [];
  const sum = weights.reduce((a, b) => a + b, 0);
  let at = startMs,
    acc = 0;
  return weights.map((weight, i) => {
    acc += weight;
    at =
      i === weights.length - 1
        ? endMs
        : Math.min(
            endMs,
            Math.max(
              at + 10,
              startMs + Math.round((duration * acc) / sum / 10) * 10,
            ),
          );
    return assTimeMs(at);
  });
}

export function spokenWord(ends: number[], startMs: number, timeMs: number) {
  return timeMs < assTimeMs(startMs)
    ? -1
    : ends.findIndex((end) => timeMs < end);
}

/** Tracks are in media order. Look up the frame without scanning a long track at video rate. */
export function previewCueAt<T extends PreviewCue>(
  cues: readonly T[],
  timeMs: number,
): T | undefined {
  let first = 0,
    last = cues.length;
  while (first < last) {
    const mid = Math.floor((first + last) / 2);
    if (timeMs >= assTimeMs(cues[mid].endMs)) first = mid + 1;
    else last = mid;
  }
  const cue = cues[first];
  if (cue && timeMs >= assTimeMs(cue.startMs)) return cue;
}

/** A stage-local clock. Stop requesting frames when the source is detached. */
export function observeCaptionFrames(
  video: HTMLVideoElement,
  onTime: (ms: number) => void,
) {
  const sync = () => onTime(Math.round(video.currentTime * 1000));
  let pending = 0;
  const presented = typeof video.requestVideoFrameCallback === "function";
  const next: VideoFrameRequestCallback = (_, frame) => {
    onTime(Math.round(frame.mediaTime * 1000));
    pending = video.requestVideoFrameCallback(next);
  };
  const tick = () => {
    sync();
    if (!video.paused && !video.ended) pending = requestAnimationFrame(tick);
  };
  const play = () => {
    sync();
    if (!presented) {
      cancelAnimationFrame(pending);
      tick();
    }
  };
  sync();
  if (presented) pending = video.requestVideoFrameCallback(next);
  else if (!video.paused) play();
  video.addEventListener("play", play);
  video.addEventListener("pause", sync);
  video.addEventListener("seeked", sync);
  video.addEventListener("loadedmetadata", sync);
  return () => {
    if (presented) video.cancelVideoFrameCallback(pending);
    else cancelAnimationFrame(pending);
    video.removeEventListener("play", play);
    video.removeEventListener("pause", sync);
    video.removeEventListener("seeked", sync);
    video.removeEventListener("loadedmetadata", sync);
  };
}
