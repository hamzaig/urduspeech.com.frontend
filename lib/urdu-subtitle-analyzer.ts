import {
  exportSubtitles,
  formatTimestamp,
  parseSubtitles,
  type SubtitleCue,
  type SubtitleExportTarget,
} from "./subtitle-tools";

export type ReadabilityPlatform = "reels" | "youtube";

export interface CueReadabilityFinding {
  cueIndex: number;
  startMs: number;
  endMs: number;
  durationSec: number;
  charCount: number;
  wordCount: number;
  cps: number;
  wpm: number;
  maxLineLength: number;
  lineCount: number;
  hasUrdu: boolean;
  arabicKafCount: number;
  arabicYehCount: number;
  latinPunctuationInUrduCount: number;
  status: "good" | "warning" | "fast";
  reasons: string[];
}

export interface UrduSubtitleAuditReport {
  format: "srt" | "vtt" | "unknown";
  cueCount: number;
  urduCueCount: number;
  averageCps: number;
  maxCps: number;
  averageWpm: number;
  fastCueCount: number;
  longLineCueCount: number;
  arabicKafTotal: number;
  arabicYehTotal: number;
  latinPunctuationTotal: number;
  healthScore: number;
  findings: CueReadabilityFinding[];
  parseIssues: readonly {
    cueIndex: number;
    severity: "warning" | "error";
    message: string;
  }[];
  cues: SubtitleCue[];
}

export interface UrduNormalizationResult {
  normalizedText: string;
  arabicKafFixed: number;
  arabicYehFixed: number;
  punctuationFixed: number;
  totalFixes: number;
}

const URDU_SCRIPT_RE = /[\u0600-\u06FF]/;
const LATIN_LETTER_RE = /[A-Za-z]/;
const ARABIC_KAF_RE = /\u0643/g;
const ARABIC_YEH_RE = /[\u064A\u0649]/g;
const URL_OR_HANDLE_RE = /(https?:\/\/\S+|www\.\S+|@\w+|#\w+)/gi;

export const SAMPLE_AUDIT_SRT = `1
00:00:00,000 --> 00:00:02,100
آج ہم آپ كو بتائیں گے كہ اردو ویڈیو كیپشنز تیز رفتار ریلس میں كیوں پھٹ جاتے ہیں؟

2
00:00:02,200 --> 00:00:05,800
صحیح اردو یونیکوڈ ک اور ی استعمال کرنے سے نستعلیق لفظ صاف جڑتے ہیں, اور پڑھنا آسان ہوتا ہے?

3
00:00:06,000 --> 00:00:09,600
Clean Nastaliq pacing stays under 17 characters per second on mobile Reels.
`;

function countMatches(text: string, regex: RegExp): number {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function countLatinPunctuationInUrduLine(line: string): number {
  if (!URDU_SCRIPT_RE.test(line) || LATIN_LETTER_RE.test(line)) return 0;
  const withoutProtected = line.replace(URL_OR_HANDLE_RE, "");
  return countMatches(withoutProtected, /[?,]/g);
}

export function normalizeUrduLine(line: string): {
  text: string;
  arabicKafFixed: number;
  arabicYehFixed: number;
  punctuationFixed: number;
} {
  const arabicKafFixed = countMatches(line, ARABIC_KAF_RE);
  const arabicYehFixed = countMatches(line, ARABIC_YEH_RE);

  let next = line
    .replace(ARABIC_KAF_RE, "\u06A9")
    .replace(ARABIC_YEH_RE, "\u06CC");

  let punctuationFixed = 0;
  // Convert Western ? and , to Urdu ؟ and ، only on pure-Urdu lines (never touch English/URLs/numbers)
  if (URDU_SCRIPT_RE.test(next) && !LATIN_LETTER_RE.test(next)) {
    const protectedChunks: string[] = [];
    const masked = next.replace(URL_OR_HANDLE_RE, (match) => {
      const idx = protectedChunks.push(match) - 1;
      return `__PROT_${idx}__`;
    });

    const converted = masked
      .replace(/\?/g, () => {
        punctuationFixed += 1;
        return "\u061F";
      })
      .replace(/(?<!\d),(?!\d)/g, () => {
        punctuationFixed += 1;
        return "\u060C";
      });

    next = converted.replace(
      /__PROT_(\d+)__/g,
      (_, idx: string) => protectedChunks[Number(idx)] ?? "",
    );
  }

  return { text: next, arabicKafFixed, arabicYehFixed, punctuationFixed };
}

export function normalizeUrduSubtitles(
  raw: string,
  target: SubtitleExportTarget = "srt",
): UrduNormalizationResult {
  const parsed = parseSubtitles(raw);
  let arabicKafFixed = 0;
  let arabicYehFixed = 0;
  let punctuationFixed = 0;

  if (parsed.cues.length === 0) {
    const fixedLines = raw.split(/\r?\n/).map((line) => {
      const res = normalizeUrduLine(line);
      arabicKafFixed += res.arabicKafFixed;
      arabicYehFixed += res.arabicYehFixed;
      punctuationFixed += res.punctuationFixed;
      return res.text;
    });
    return {
      normalizedText: fixedLines.join("\n"),
      arabicKafFixed,
      arabicYehFixed,
      punctuationFixed,
      totalFixes: arabicKafFixed + arabicYehFixed + punctuationFixed,
    };
  }

  const fixedCues: SubtitleCue[] = parsed.cues.map((cue) => {
    const fixedLines = cue.lines.map((line) => {
      const res = normalizeUrduLine(line);
      arabicKafFixed += res.arabicKafFixed;
      arabicYehFixed += res.arabicYehFixed;
      punctuationFixed += res.punctuationFixed;
      return res.text;
    });
    return {
      ...cue,
      lines: fixedLines,
    };
  });

  return {
    normalizedText: exportSubtitles(fixedCues, target),
    arabicKafFixed,
    arabicYehFixed,
    punctuationFixed,
    totalFixes: arabicKafFixed + arabicYehFixed + punctuationFixed,
  };
}

export function analyzeUrduSubtitles(
  raw: string,
  platform: ReadabilityPlatform = "reels",
): UrduSubtitleAuditReport {
  const parsed = parseSubtitles(raw);
  const maxCpsUrdu = platform === "reels" ? 17 : 20;
  const maxCpsLatin = platform === "reels" ? 20 : 23;
  const maxLineChars = platform === "reels" ? 38 : 46;

  let cpsSum = 0;
  let maxCps = 0;
  let wpmSum = 0;
  let fastCueCount = 0;
  let longLineCueCount = 0;
  let arabicKafTotal = 0;
  let arabicYehTotal = 0;
  let latinPunctuationTotal = 0;

  const findings: CueReadabilityFinding[] = parsed.cues.map((cue) => {
    const durationMs = Math.max(100, cue.endMs - cue.startMs);
    const durationSec = durationMs / 1000;
    const lines = cue.lines;
    const joined = lines.join("\n");
    const compactChars = joined.replace(/\s+/g, " ").trim().length;
    const words = joined.trim().split(/\s+/).filter(Boolean).length;
    const cps = Number((compactChars / durationSec).toFixed(1));
    const wpm = Math.round((words / durationSec) * 60);
    const maxLineLength = Math.max(0, ...lines.map((l) => l.trim().length));
    const hasUrdu = cue.hasUrdu || URDU_SCRIPT_RE.test(joined);

    const arabicKafCount = countMatches(joined, ARABIC_KAF_RE);
    const arabicYehCount = countMatches(joined, ARABIC_YEH_RE);
    const latinPunctuationInUrduCount = lines.reduce(
      (sum, line) => sum + countLatinPunctuationInUrduLine(line),
      0,
    );

    arabicKafTotal += arabicKafCount;
    arabicYehTotal += arabicYehCount;
    latinPunctuationTotal += latinPunctuationInUrduCount;

    cpsSum += cps;
    if (cps > maxCps) maxCps = cps;
    wpmSum += wpm;

    const reasons: string[] = [];
    const cpsCeiling = hasUrdu ? maxCpsUrdu : maxCpsLatin;
    let status: "good" | "warning" | "fast" = "good";

    if (cps > cpsCeiling) {
      fastCueCount += 1;
      status = "fast";
      reasons.push(
        `Reading speed ${cps} chars/sec exceeds ${cpsCeiling} CPS ${platform === "reels" ? "for mobile Reels" : "for YouTube"}`,
      );
    }
    if (maxLineLength > maxLineChars) {
      longLineCueCount += 1;
      if (status === "good") status = "warning";
      reasons.push(
        `Line length ${maxLineLength} chars exceeds recommended ${maxLineChars} chars`,
      );
    }
    if (lines.length > 2) {
      if (status === "good") status = "warning";
      reasons.push(`${lines.length} stacked lines may crowd video safe areas`);
    }
    if (arabicKafCount > 0 || arabicYehCount > 0) {
      if (status === "good") status = "warning";
      reasons.push(
        `Contains Arabic Unicode (${arabicKafCount} ك, ${arabicYehCount} ي) instead of Urdu ک / ی`,
      );
    }
    if (latinPunctuationInUrduCount > 0) {
      if (status === "good") status = "warning";
      reasons.push(
        `Uses ${latinPunctuationInUrduCount} Western punctuation mark(s) inside an Urdu line`,
      );
    }

    return {
      cueIndex: cue.index,
      startMs: cue.startMs,
      endMs: cue.endMs,
      durationSec: Number(durationSec.toFixed(2)),
      charCount: compactChars,
      wordCount: words,
      cps,
      wpm,
      maxLineLength,
      lineCount: lines.length,
      hasUrdu,
      arabicKafCount,
      arabicYehCount,
      latinPunctuationInUrduCount,
      status,
      reasons,
    };
  });

  const cueCount = parsed.cues.length;
  const averageCps = cueCount > 0 ? Number((cpsSum / cueCount).toFixed(1)) : 0;
  const averageWpm = cueCount > 0 ? Math.round(wpmSum / cueCount) : 0;

  // Deterministic 0-100 health score based strictly on measurable subtitle defects
  let deductions = 0;
  if (cueCount > 0) {
    deductions += Math.min(35, Math.round((fastCueCount / cueCount) * 45));
    deductions += Math.min(20, Math.round((longLineCueCount / cueCount) * 25));
    deductions += Math.min(
      20,
      (arabicKafTotal + arabicYehTotal > 0 ? 10 : 0) +
        Math.min(10, arabicKafTotal + arabicYehTotal),
    );
    deductions += Math.min(10, latinPunctuationTotal * 3);
    deductions += Math.min(15, parsed.issues.length * 5);
  }
  const healthScore = cueCount === 0 ? 0 : Math.max(0, 100 - deductions);

  return {
    format: parsed.format,
    cueCount,
    urduCueCount: parsed.urduCueCount,
    averageCps,
    maxCps,
    averageWpm,
    fastCueCount,
    longLineCueCount,
    arabicKafTotal,
    arabicYehTotal,
    latinPunctuationTotal,
    healthScore,
    findings,
    parseIssues: parsed.issues,
    cues: parsed.cues,
  };
}

export function formatCueRange(startMs: number, endMs: number): string {
  return `${formatTimestamp(startMs, "vtt")} – ${formatTimestamp(endMs, "vtt")}`;
}
