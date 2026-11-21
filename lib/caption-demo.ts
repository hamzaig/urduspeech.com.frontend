export const captionModes = [
  { id: "urdu", label: "Urdu" },
  { id: "romanUrdu", label: "Roman Urdu" },
  { id: "english", label: "English" },
  { id: "bilingual", label: "Bilingual" },
] as const;

export type CaptionMode = (typeof captionModes)[number]["id"];
export type CaptionLanguage = Exclude<CaptionMode, "bilingual">;

export const captionLanguageMeta = {
  urdu: { label: "Urdu", lang: "ur", dir: "rtl" },
  romanUrdu: { label: "Roman Urdu", lang: "ur-Latn", dir: "ltr" },
  english: { label: "English", lang: "en", dir: "ltr" },
} as const;

const bilingualLanguages: readonly CaptionLanguage[] = ["urdu", "english"];

export function captionOutputLanguages(
  mode: CaptionMode,
): readonly CaptionLanguage[] {
  return mode === "bilingual" ? bilingualLanguages : [mode];
}

export const sampleCaptionStyles = [
  {
    name: "Clean",
    color: "#FFFFFF",
    box: false,
    description: "White text with a shadow.",
  },
  {
    name: "Social highlight",
    color: "#FFD54F",
    box: false,
    description: "Gold text for short videos.",
  },
  {
    name: "Boxed",
    color: "#FFFFFF",
    box: true,
    description: "A dark box behind the words.",
  },
] as const;

export const captionCues = [
  {
    start: 0,
    end: 4,
    urdu: "آج کچھ نیا بناتے ہیں۔",
    romanUrdu: "Aaj kuch naya banate hain.",
    english: "Let’s make something new today.",
  },
  {
    start: 4,
    end: 8,
    urdu: "ہر کہانی کی اپنی آواز ہوتی ہے۔",
    romanUrdu: "Har kahani ki apni awaaz hoti hai.",
    english: "Every story has a voice of its own.",
  },
  {
    start: 8,
    end: 12,
    urdu: "چلیں، شروع کرتے ہیں۔",
    romanUrdu: "Chalein, shuru karte hain.",
    english: "Let’s get started.",
  },
] as const;

type CaptionCue = (typeof captionCues)[number];

export function captionTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function captionText(cue: CaptionCue, mode: CaptionMode) {
  return mode === "bilingual" ? `${cue.urdu}\n${cue.english}` : cue[mode];
}

export function sampleExport(
  format: "srt" | "vtt" | "txt",
  lines: readonly string[],
) {
  const cues = captionCues
    .map(({ start, end }, index) => ({
      start,
      end,
      text: lines[index]?.trim() ?? "",
    }))
    .filter((cue) => cue.text);
  if (format === "txt") return cues.map((cue) => cue.text).join("\n\n") + "\n";

  const separator = format === "srt" ? "," : ".";
  const blocks = cues.map(({ start, end, text }, index) => {
    const timing = `00:${captionTime(start)}${separator}000 --> 00:${captionTime(end)}${separator}000`;
    if (format === "srt") return `${index + 1}\n${timing}\n${text}`;
    const escaped = text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    return `${timing}\n${escaped}`;
  });
  const header = format === "vtt" ? "WEBVTT\n\n" : "";
  return header + blocks.join("\n\n") + "\n";
}
