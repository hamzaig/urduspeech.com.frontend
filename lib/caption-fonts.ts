/**
 * Mirror of the API's caption font catalog for previews. The files in
 * /fonts/captions are the same pinned OFL bytes the renderer uses.
 * `optical` matches the server's Urdu optical scale (Latin is 1).
 */
export type CaptionFontId = string;
export type FontCategory =
  | "Nastaliq"
  | "Naskh"
  | "Kufi"
  | "Sans"
  | "Serif"
  | "Display"
  | "Handwriting"
  | "Mono";
export type CaptionFontOption = {
  id: CaptionFontId;
  label: string;
  script: "urdu" | "latin";
  css: string;
  optical: number;
  note: string;
  category: FontCategory;
};
import { IMPORTED_CAPTION_FONTS } from "./caption-fonts-imported";

export const CAPTION_FONTS: readonly CaptionFontOption[] = [
  { id: "noto-nastaliq", label: "Noto Nastaliq", script: "urdu", css: "cap-noto-nastaliq", optical: 1.4, note: "Classic Nastaliq", category: "Nastaliq" },
  { id: "gulzar", label: "Gulzar", script: "urdu", css: "cap-gulzar", optical: 1.3, note: "Bold Nastaliq", category: "Nastaliq" },
  { id: "noto-naskh", label: "Naskh", script: "urdu", css: "cap-noto-naskh", optical: 1.15, note: "Clear and modern", category: "Naskh" },
  { id: "lateef", label: "Lateef", script: "urdu", css: "cap-lateef", optical: 1.35, note: "Soft Naskh", category: "Naskh" },
  { id: "inter", label: "Inter", script: "latin", css: "cap-inter", optical: 1, note: "Clean sans", category: "Sans" },
  { id: "poppins", label: "Poppins", script: "latin", css: "cap-poppins", optical: 1, note: "Round and bold", category: "Sans" },
  { id: "bebas-neue", label: "Bebas Neue", script: "latin", css: "cap-bebas-neue", optical: 1, note: "Tall headline caps", category: "Display" },
  { id: "playfair", label: "Playfair Display", script: "latin", css: "cap-playfair", optical: 1, note: "Elegant serif", category: "Serif" },
  ...IMPORTED_CAPTION_FONTS,
];
export const DEFAULT_FONTS = { urdu: "noto-nastaliq", latin: "inter" } as const;
export type CaptionFontChoice = { urdu?: string; latin?: string };

/** CSS custom properties that switch a caption preview to the chosen fonts. */
export function fontVars(choice: CaptionFontChoice | null | undefined) {
  const urdu =
    CAPTION_FONTS.find((f) => f.id === choice?.urdu && f.script === "urdu") ??
    CAPTION_FONTS.find((f) => f.id === DEFAULT_FONTS.urdu)!;
  const latin =
    CAPTION_FONTS.find((f) => f.id === choice?.latin && f.script === "latin") ??
    CAPTION_FONTS.find((f) => f.id === DEFAULT_FONTS.latin)!;
  return {
    "--cap-urdu": `"${urdu.css}"`,
    "--cap-latin": `"${latin.css}"`,
    // Server sizes Urdu at Latin x optical; previews used 1.4 for Nastaliq.
    "--cap-urdu-scale": String(urdu.optical / 1.4),
  } as Record<string, string>;
}
