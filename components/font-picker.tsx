"use client";
import type { Defaults } from "@/lib/contracts";
import {
  CAPTION_FONTS,
  DEFAULT_FONTS,
  type CaptionFontChoice,
} from "@/lib/caption-fonts";

const SAMPLE = { urdu: "اپنی آواز", latin: "Apni awaaz" } as const;

/** Which scripts a caption output needs fonts for. */
export function scriptsFor(variant: Defaults["outputVariant"]) {
  return variant === "bilingual"
    ? (["urdu", "latin"] as const)
    : variant === "urdu"
      ? (["urdu"] as const)
      : (["latin"] as const);
}

/**
 * Font tiles for each script the chosen captions use (Urdu, English letters
 * or both). Each tile is drawn in its own font.
 */
export function FontPicker({
  variant,
  value,
  onChange,
  disabled,
}: {
  variant: Defaults["outputVariant"];
  value: CaptionFontChoice;
  onChange: (next: CaptionFontChoice) => void;
  disabled?: boolean;
}) {
  return (
    <div className="font-picker">
      {scriptsFor(variant).map((script) => {
        const selected = value[script] ?? DEFAULT_FONTS[script];
        return (
          <fieldset key={script} className="font-group" disabled={disabled}>
            <legend>{script === "urdu" ? "Urdu font" : "English letters font"}</legend>
            <div className="font-grid" role="radiogroup">
              {CAPTION_FONTS.filter((f) => f.script === script).map((font) => (
                <label key={font.id} className="font-option">
                  <input
                    type="radio"
                    name={`font-${script}`}
                    value={font.id}
                    checked={selected === font.id}
                    onChange={() => onChange({ ...value, [script]: font.id })}
                  />
                  <span
                    className="font-sample"
                    lang={script === "urdu" ? "ur" : "en"}
                    dir={script === "urdu" ? "rtl" : "ltr"}
                    style={{ fontFamily: `"${font.css}"` }}
                    aria-hidden="true"
                  >
                    {SAMPLE[script]}
                  </span>
                  <span className="font-name">
                    <strong>{font.label}</strong>
                    <small>{font.note}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
