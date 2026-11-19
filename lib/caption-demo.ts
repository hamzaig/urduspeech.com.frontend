export const captionModes = [
  { id: "urdu", label: "Urdu" },
  { id: "romanUrdu", label: "Roman Urdu" },
  { id: "english", label: "English" },
  { id: "bilingual", label: "Bilingual" },
] as const;

export type CaptionMode = (typeof captionModes)[number]["id"];

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

export function sampleSrt(mode: CaptionMode) {
  return (
    captionCues
      .map(
        (cue, index) =>
          `${index + 1}\n00:${captionTime(cue.start)},000 --> 00:${captionTime(cue.end)},000\n${captionText(cue, mode)}`,
      )
      .join("\n\n") + "\n"
  );
}

export function sampleSrtHref(mode: CaptionMode) {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(sampleSrt(mode))}`;
}
