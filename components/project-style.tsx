"use client";

import { Minus, Plus, RotateCcw, Move, ChevronDown } from "lucide-react";
import {
  defaultPlacement,
  PLACEMENT_LIMITS,
  type CaptionPlacement,
} from "@/components/caption-stage";
import {
  templateLabel,
  type CaptionTemplate,
} from "@/components/caption-template";
import { TemplateBrowser } from "@/components/template-browser";

export function ProjectStyle({
  templates,
  selected,
  placement,
  portrait,
  disabled,
  canPosition,
  onStyle,
  onPlace,
}: {
  templates: CaptionTemplate[];
  selected?: CaptionTemplate;
  placement: CaptionPlacement | null;
  portrait: boolean;
  disabled: boolean;
  canPosition: boolean;
  onStyle: (id: string) => void;
  onPlace: (placement: CaptionPlacement | null) => void;
}) {
  const current = placement ?? defaultPlacement(selected, portrait);
  const { minScale, maxScale } = PLACEMENT_LIMITS;
  function resize(step: number) {
    onPlace({
      ...current,
      scale: Math.max(
        minScale,
        Math.min(maxScale, Math.round((current.scale + step) * 100) / 100),
      ),
    });
  }
  return (
    <>
      {canPosition && (
        <details className="placement-disclosure">
          <summary>
            <Move size={16} aria-hidden="true" />
            <strong>Position &amp; size</strong>
            <span>{Math.round(current.scale * 100)}%</span>
            <ChevronDown size={15} />
          </summary>
          <fieldset className="appearance-controls" disabled={disabled}>
            <legend className="sr-only">Caption placement</legend>
            <div className="appearance-row">
              <span id="placement-label">Position</span>
              <div
                className="position-buttons"
                role="group"
                aria-labelledby="placement-label"
              >
                {(
                  [
                    ["Top", 0.16],
                    ["Center", 0.5],
                    ["Bottom", portrait ? 0.78 : 0.84],
                  ] as const
                ).map(([label, y]) => (
                  <button
                    type="button"
                    key={label}
                    aria-pressed={Math.abs(current.y - y) < 0.006}
                    onClick={() => onPlace({ ...current, y })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="appearance-row">
              <span id="size-label">Size</span>
              <div
                className="scale-buttons"
                role="group"
                aria-labelledby="size-label"
              >
                <button
                  type="button"
                  aria-label="Smaller caption"
                  disabled={current.scale <= minScale}
                  onClick={() => resize(-0.1)}
                >
                  <Minus size={15} />
                </button>
                <output>{Math.round(current.scale * 100)}%</output>
                <button
                  type="button"
                  aria-label="Bigger caption"
                  disabled={current.scale >= maxScale}
                  onClick={() => resize(0.1)}
                >
                  <Plus size={15} />
                </button>
              </div>
              <button
                type="button"
                className="text-button"
                disabled={!placement}
                onClick={() => onPlace(null)}
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
            <small>Drag the caption on the video for finer placement.</small>
          </fieldset>
        </details>
      )}
      <fieldset className="desk-templates" disabled={disabled}>
        <legend>Caption template</legend>
        {selected && (
          <p>
            Selected · <strong>{templateLabel(selected)}</strong>
          </p>
        )}
        {templates.length ? (
          <TemplateBrowser
            templates={templates}
            value={selected?.id ?? null}
            name="render-preset"
            onChange={(id) => id && onStyle(id)}
          />
        ) : (
          <p>Caption styles are unavailable.</p>
        )}
      </fieldset>
    </>
  );
}
