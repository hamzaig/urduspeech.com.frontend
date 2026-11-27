"use client";

import { memo, useEffect, useRef } from "react";
import { ChevronDown, Clock3, Play, Captions } from "lucide-react";
import type { Track } from "@/lib/contracts";
import { captionTime } from "@/lib/caption-edits";

type Cue = Track["content"]["cues"][number];

type LineProps = {
  variant: string;
  hasMedia: boolean;
  busy: boolean;
  onSelect: (cue: Cue, play: boolean) => void;
  onChange: (
    index: number,
    field: "text" | "startMs" | "endMs",
    value: string | number,
  ) => void;
};

const CaptionLine = memo(function CaptionLine({
  cue,
  index: i,
  active,
  variant,
  hasMedia,
  busy,
  onSelect,
  onChange,
}: LineProps & { cue: Cue; index: number; active: boolean }) {
  return (
    <li id={`caption-line-${cue.position}`} data-current={active || undefined}>
      <button
        className="line-play"
        type="button"
        aria-label={`${hasMedia ? "Play" : "Preview"} caption ${i + 1}`}
        onClick={() => onSelect(cue, true)}
      >
        {hasMedia ? (
          <Play size={13} aria-hidden="true" />
        ) : (
          <Captions size={14} aria-hidden="true" />
        )}
        <span>{i + 1}</span>
      </button>
      <div className="line-content">
        <textarea
          className="line-text"
          rows={Math.min(6, cue.text.split("\n").length)}
          dir="auto"
          lang={
            variant === "urdu" || /\p{Script=Arabic}/u.test(cue.text)
              ? "ur"
              : undefined
          }
          aria-label={`Caption ${i + 1}`}
          disabled={busy}
          maxLength={5000}
          value={cue.text}
          onFocus={() => onSelect(cue, false)}
          onChange={(event) => onChange(i, "text", event.target.value)}
        />
        <details className="line-timing">
          <summary
            aria-label={`Edit timing for caption ${i + 1}, ${cue.startMs / 1000} to ${cue.endMs / 1000} seconds`}
          >
            <Clock3 size={12} aria-hidden="true" />
            <span>
              {captionTime(cue.startMs, true)} – {captionTime(cue.endMs, true)}
            </span>
            <ChevronDown size={13} aria-hidden="true" />
          </summary>
          <div className="line-time-fields">
            {(["startMs", "endMs"] as const).map((field) => (
              <label key={field}>
                {field === "startMs" ? "Start (s)" : "End (s)"}
                <input
                  type="number"
                  step=".001"
                  min="0"
                  disabled={busy}
                  value={cue[field] / 1000}
                  onChange={(event) =>
                    onChange(
                      i,
                      field,
                      Math.round(Number(event.target.value) * 1000),
                    )
                  }
                />
              </label>
            ))}
          </div>
        </details>
        {cue.fallback && <small className="line-warning">Review timing</small>}
      </div>
    </li>
  );
});

export const ProjectCaptionLines = memo(function ProjectCaptionLines({
  cues,
  activePosition,
  playing,
  ...lineProps
}: LineProps & { cues: Cue[]; activePosition?: number; playing: boolean }) {
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const region = list.current;
    if (!playing || !region || region.contains(document.activeElement)) return;
    const row = region.querySelector<HTMLElement>("[data-current]");
    if (!row) return;
    const bounds = region.getBoundingClientRect(),
      line = row.getBoundingClientRect();
    if (line.top < bounds.top) region.scrollTop += line.top - bounds.top;
    else if (line.bottom > bounds.bottom)
      region.scrollTop += line.bottom - bounds.bottom;
  }, [activePosition, playing]);

  return (
    <ol
      className="caption-lines"
      aria-label="Caption lines"
      tabIndex={0}
      ref={list}
    >
      {cues.map((cue, i) => (
        <CaptionLine
          key={cue.position}
          cue={cue}
          index={i}
          active={cue.position === activePosition}
          {...lineProps}
        />
      ))}
    </ol>
  );
});
