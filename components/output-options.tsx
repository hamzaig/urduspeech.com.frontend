"use client";
import {
  TemplatePicker,
  type CaptionTemplate,
} from "@/components/caption-template";
import type { Defaults } from "@/lib/contracts";
export const initialDefaults: Defaults = {
  outputVariant: "urdu",
  correctionEnabled: true,
  autoEmbed: false,
  captionPresetVersionId: null,
  bilingualOrder: "urdu-first",
  bilingualLayout: "stacked",
};
export const variants = [
  {
    id: "urdu",
    label: "Urdu",
    example:
      "\u0622\u062c \u06a9\u0686\u06be \u0646\u06cc\u0627 \u0628\u0646\u0627\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4",
    description: "Keep your words in Urdu script.",
  },
  {
    id: "romanUrdu",
    label: "Roman Urdu",
    example: "Aaj kuch naya banate hain.",
    description: "Urdu words, written in English letters.",
  },
  {
    id: "english",
    label: "English",
    example: "Let’s make something new today.",
    description: "Translate your speech into English.",
  },
  {
    id: "bilingual",
    label: "Urdu + English",
    example: "Two languages, stacked together.",
    description: "Urdu script with an English translation.",
  },
] as const;
export function outputLabel(variant: unknown) {
  return (
    variants.find(({ id }) => id === variant)?.label ??
    (typeof variant === "string" && variant ? variant : "Unknown output")
  );
}

export type Preset = CaptionTemplate;
export function OutputOptions({
  value,
  onChange,
  presets = [],
  disabled = false,
}: {
  value: Defaults;
  onChange: (v: Defaults) => void;
  presets?: Preset[];
  disabled?: boolean;
}) {
  function update<K extends keyof Defaults>(key: K, v: Defaults[K]) {
    onChange({ ...value, [key]: v });
  }
  return (
    <fieldset className="options-fieldset" disabled={disabled}>
      <legend>Choose your caption output</legend>
      <div className="output-options">
        {variants.map((v) => (
          <label
            className={
              "output-choice " +
              (value.outputVariant === v.id ? "selected" : "")
            }
            key={v.id}
          >
            <input
              type="radio"
              name="outputVariant"
              value={v.id}
              checked={value.outputVariant === v.id}
              onChange={() => update("outputVariant", v.id)}
            />
            <strong>{v.label}</strong>
            <span
              className="output-example"
              dir="auto"
              lang={v.id === "urdu" ? "ur" : undefined}
            >
              {v.example}
            </span>
            <small>{v.description}</small>
          </label>
        ))}
      </div>
      {value.outputVariant === "bilingual" && (
        <label className="field">
          First caption line
          <select
            value={value.bilingualOrder ?? "urdu-first"}
            onChange={(e) =>
              update(
                "bilingualOrder",
                e.target.value as Defaults["bilingualOrder"],
              )
            }
          >
            <option value="urdu-first">Urdu first</option>
            <option value="english-first">English first</option>
          </select>
        </label>
      )}
      <div className="toggle-list">
        <label className="toggle-row">
          <span>
            <strong>AI text correction</strong>
            <small>
              Let AI suggest and safely apply text corrections. You can review
              changes later.
            </small>
          </span>
          <input
            type="checkbox"
            role="switch"
            checked={value.correctionEnabled}
            onChange={(e) => update("correctionEnabled", e.target.checked)}
          />
        </label>
        <label className="toggle-row">
          <span>
            <strong>Automatically embed captions</strong>
            <small>
              For videos, create a captioned MP4 when captions are ready.
            </small>
          </span>
          <input
            type="checkbox"
            role="switch"
            checked={value.autoEmbed}
            onChange={(e) => update("autoEmbed", e.target.checked)}
          />
        </label>
      </div>
      <fieldset className="field template-field">
        <legend>Caption template</legend>
        <TemplatePicker
          templates={presets}
          value={value.captionPresetVersionId}
          onChange={(id) => update("captionPresetVersionId", id)}
          name="caption-template"
          defaultLabel="Account default"
        />
        <small>
          Previews are approximate; the rendered MP4 uses the server template.
          Premium templates need a paid plan.
        </small>
      </fieldset>
    </fieldset>
  );
}
