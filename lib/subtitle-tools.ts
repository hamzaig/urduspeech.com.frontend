export type SubtitleFormat = "srt" | "vtt" | "unknown";
export type SubtitleExportTarget = "srt" | "vtt" | "txt";

export interface SubtitleCue {
  index: number;
  startMs: number;
  endMs: number;
  lines: string[];
  hasUrdu: boolean;
}

export interface SubtitleIssue {
  cueIndex: number;
  severity: "error" | "warning";
  message: string;
}

export interface ParsedSubtitles {
  format: SubtitleFormat;
  cues: SubtitleCue[];
  issues: SubtitleIssue[];
  urduCueCount: number;
  totalDurationMs: number;
}

const URDU_SCRIPT_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
const TIMESTAMP_LINE_RE =
  /^((?:\d{1,2}:)?\d{2}:\d{2}[.,]\d{1,3})\s*-->\s*((?:\d{1,2}:)?\d{2}:\d{2}[.,]\d{1,3})(?:\s+.*)?$/;

export const SAMPLE_URDU_SRT = `1
00:00:00,000 --> 00:00:03,800
آج ہم اردو ویڈیو کے لیے صاف کیپشن بنانا سیکھیں گے۔
Today we will learn how to create clean Urdu video captions.

2
00:00:04,000 --> 00:00:07,600
آپ ایک ہی فائل سے اردو، رومن اردو اور انگلش سب ٹائٹل نکال سکتے ہیں۔
You can generate Urdu, Roman Urdu, and English subtitles from one file.

3
00:00:07,900 --> 00:00:11,500
ایکسپورٹ سے پہلے نام، تاریخیں اور ٹائمنگ ضرور چیک کریں۔
Always review names, dates, and cue timing before exporting.
`;

export function containsUrduScript(text: string): boolean {
  return URDU_SCRIPT_RE.test(text);
}

export function parseTimestampToMs(raw: string): number | null {
  const normalized = raw.trim().replace(",", ".");
  const parts = normalized.split(":");
  if (parts.length !== 2 && parts.length !== 3) return null;

  const hours = parts.length === 3 ? Number(parts[0]) : 0;
  const minutes = Number(parts[parts.length - 2]);
  const secParts = parts[parts.length - 1].split(".");
  if (secParts.length !== 2) return null;

  const seconds = Number(secParts[0]);
  const millis = Number(secParts[1].padEnd(3, "0").slice(0, 3));

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    !Number.isInteger(seconds) ||
    !Number.isInteger(millis) ||
    hours < 0 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59 ||
    millis < 0 ||
    millis > 999
  ) {
    return null;
  }

  return ((hours * 60 + minutes) * 60 + seconds) * 1000 + millis;
}

export function formatTimestamp(ms: number, target: "srt" | "vtt"): string {
  const clamped = Math.max(0, Math.round(ms));
  const hours = Math.floor(clamped / 3_600_000);
  const minutes = Math.floor((clamped % 3_600_000) / 60_000);
  const seconds = Math.floor((clamped % 60_000) / 1000);
  const millis = clamped % 1000;
  const sep = target === "srt" ? "," : ".";
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}${sep}${String(millis).padStart(3, "0")}`;
}

export function detectSubtitleFormat(input: string): SubtitleFormat {
  const cleaned = input.replace(/^\uFEFF/, "").trimStart();
  if (!cleaned) return "unknown";
  if (/^WEBVTT(?:\s|$)/m.test(cleaned)) return "vtt";
  if (/\d{2}:\d{2}:\d{2},\d{3}\s*-->/.test(cleaned)) return "srt";
  if (/\d{2}:\d{2}:\d{2}\.\d{3}\s*-->/.test(cleaned)) return "vtt";
  return "unknown";
}

export function parseSubtitles(input: string): ParsedSubtitles {
  const format = detectSubtitleFormat(input);
  const normalized = input.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  const blocks = normalized.split(/\n{2,}/);

  const cues: SubtitleCue[] = [];
  const issues: SubtitleIssue[] = [];

  for (const rawBlock of blocks) {
    const trimmed = rawBlock.trim();
    if (!trimmed) continue;
    if (
      /^WEBVTT(?:\s|$)/.test(trimmed) ||
      /^NOTE(?:\s|$)/.test(trimmed) ||
      /^STYLE(?:\s|$)/.test(trimmed) ||
      /^REGION(?:\s|$)/.test(trimmed)
    ) {
      continue;
    }

    const rawLines = trimmed.split("\n");
    const timingLineIndex = rawLines.findIndex((line) =>
      TIMESTAMP_LINE_RE.test(line.trim()),
    );
    if (timingLineIndex === -1) continue;

    const match = rawLines[timingLineIndex].trim().match(TIMESTAMP_LINE_RE);
    if (!match) continue;

    const startMs = parseTimestampToMs(match[1]);
    const endMs = parseTimestampToMs(match[2]);
    const cueIndex = cues.length + 1;

    if (startMs === null || endMs === null) {
      issues.push({
        cueIndex,
        severity: "error",
        message: `Cue ${cueIndex} has an invalid timestamp: "${rawLines[timingLineIndex].trim()}".`,
      });
      continue;
    }

    const textLines = rawLines
      .slice(timingLineIndex + 1)
      .map((line) => line.trimEnd())
      .filter((line) => line.trim().length > 0);

    if (textLines.length === 0) {
      issues.push({
        cueIndex,
        severity: "warning",
        message: `Cue ${cueIndex} has timestamps but no caption text.`,
      });
    }

    if (endMs <= startMs) {
      issues.push({
        cueIndex,
        severity: "error",
        message: `Cue ${cueIndex} ends at or before its start time (${formatTimestamp(startMs, "vtt")} → ${formatTimestamp(endMs, "vtt")}).`,
      });
    } else if (endMs - startMs < 500) {
      issues.push({
        cueIndex,
        severity: "warning",
        message: `Cue ${cueIndex} lasts only ${endMs - startMs} ms, which may flash too fast for viewers to read.`,
      });
    }

    const prev = cues[cues.length - 1];
    if (prev && startMs < prev.endMs) {
      issues.push({
        cueIndex,
        severity: "warning",
        message: `Cue ${cueIndex} starts at ${formatTimestamp(startMs, "vtt")} before cue ${prev.index} ends (${formatTimestamp(prev.endMs, "vtt")}).`,
      });
    }

    const combinedText = textLines.join("\n");
    const hasUrdu = containsUrduScript(combinedText);
    const maxLineLength = Math.max(0, ...textLines.map((line) => line.length));
    if (maxLineLength > 84) {
      issues.push({
        cueIndex,
        severity: "warning",
        message: `Cue ${cueIndex} contains a line with ${maxLineLength} characters (consider splitting lines under 42–60 characters for mobile readability).`,
      });
    }

    cues.push({
      index: cueIndex,
      startMs,
      endMs,
      lines: textLines,
      hasUrdu,
    });
  }

  const urduCueCount = cues.filter((cue) => cue.hasUrdu).length;
  const totalDurationMs =
    cues.length > 0 ? Math.max(...cues.map((cue) => cue.endMs)) : 0;

  return { format, cues, issues, urduCueCount, totalDurationMs };
}

function escapeVttText(line: string): string {
  return line
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function exportSubtitles(
  cues: readonly SubtitleCue[],
  target: SubtitleExportTarget,
): string {
  if (cues.length === 0) return "";
  if (target === "txt") {
    return cues.map((cue) => cue.lines.join("\n")).join("\n\n") + "\n";
  }
  if (target === "srt") {
    return (
      cues
        .map(
          (cue, idx) =>
            `${idx + 1}\n${formatTimestamp(cue.startMs, "srt")} --> ${formatTimestamp(cue.endMs, "srt")}\n${cue.lines.join("\n")}`,
        )
        .join("\n\n") + "\n"
    );
  }
  return (
    "WEBVTT\n\n" +
    cues
      .map(
        (cue) =>
          `${formatTimestamp(cue.startMs, "vtt")} --> ${formatTimestamp(cue.endMs, "vtt")}\n${cue.lines.map(escapeVttText).join("\n")}`,
      )
      .join("\n\n") +
    "\n"
  );
}
