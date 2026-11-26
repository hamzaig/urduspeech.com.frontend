"use client";
import { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import type { Defaults } from "@/lib/contracts";
import {
  CAPTION_FONTS,
  DEFAULT_FONTS,
  type CaptionFontChoice,
} from "@/lib/caption-fonts";

const SAMPLE = { urdu: "اپنی آواز", latin: "Awaaz" } as const;
type Script = "urdu" | "latin";

/** Which scripts a caption output needs fonts for. */
export function scriptsFor(variant: Defaults["outputVariant"]) {
  return variant === "bilingual"
    ? (["urdu", "latin"] as const)
    : variant === "urdu"
      ? (["urdu"] as const)
      : (["latin"] as const);
}

const SCRIPT_LABEL: Record<Script, string> = {
  urdu: "Urdu font",
  latin: "English letters font",
};

/**
 * Searchable font tiles, one tab per script the chosen captions use (Urdu,
 * English letters or both). Each tile is drawn in its own font; tiles off
 * screen are not rendered, so their font files are fetched only on demand.
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
  const scripts = scriptsFor(variant);
  const [tab, setTab] = useState<Script>(scripts[0]);
  const script: Script = scripts.includes(tab as never) ? tab : scripts[0];
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState<string>("All");
  const fonts = useMemo(
    () => CAPTION_FONTS.filter((f) => f.script === script),
    [script],
  );
  const categories = useMemo(
    () => ["All", ...new Set(fonts.map((f) => f.category))],
    [fonts],
  );
  const needle = query.trim().toLowerCase();
  const shown = fonts.filter(
    (f) =>
      (category === "All" || f.category === category) &&
      (!needle ||
        f.label.toLowerCase().includes(needle) ||
        f.note.toLowerCase().includes(needle) ||
        f.category.toLowerCase().includes(needle)),
  );
  const selected = value[script] ?? DEFAULT_FONTS[script];
  const selectedLabel = (s: Script) =>
    CAPTION_FONTS.find((f) => f.id === (value[s] ?? DEFAULT_FONTS[s]))?.label;

  return (
    <div className="font-picker">
      {scripts.length > 1 && (
        <div className="font-tabs" role="tablist" aria-label="Caption script">
          {scripts.map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={s === script}
              className="font-tab"
              onClick={() => {
                setTab(s);
                setCategory("All");
              }}
            >
              <span>{SCRIPT_LABEL[s]}</span>
              <small>{selectedLabel(s)}</small>
            </button>
          ))}
        </div>
      )}
      <div className="font-tools">
        <label className="font-search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={query}
            placeholder={`Search ${fonts.length} fonts`}
            aria-label="Search fonts"
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        {categories.length > 2 && (
          <div className="font-chips" role="group" aria-label="Font type">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className="font-chip"
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
      <fieldset className="font-group" disabled={disabled}>
        <legend className="visually-hidden">{SCRIPT_LABEL[script]}</legend>
        {shown.length === 0 ? (
          <p className="font-empty">No font matches “{query}”.</p>
        ) : (
          <div className="font-grid" role="radiogroup">
            {shown.map((font) => (
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
                  style={{
                    fontFamily: `"${font.css}"`,
                    ["--optical" as string]: String(font.optical),
                  }}
                  aria-hidden="true"
                >
                  {SAMPLE[script]}
                </span>
                <span className="font-name">
                  <strong>{font.label}</strong>
                  <small>{font.note}</small>
                </span>
                {selected === font.id && (
                  <span className="font-check" aria-hidden="true">
                    <Check size={13} />
                  </span>
                )}
              </label>
            ))}
          </div>
        )}
      </fieldset>
    </div>
  );
}
