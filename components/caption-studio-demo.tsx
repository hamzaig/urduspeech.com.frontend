"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Captions, Download } from "lucide-react";
import clipStill from "@/assets/caption-demo.webp";
import {
  captionCues,
  captionModes,
  captionTime,
  sampleSrtHref,
  type CaptionMode,
} from "@/lib/caption-demo";

export function CaptionStudioDemo() {
  const [mode, setMode] = useState<CaptionMode>("bilingual");
  const [selected, setSelected] = useState(1);
  const groupName = useId();
  const cue = captionCues[selected];

  return (
    <article
      id="caption-demo"
      className="caption-studio app-frame"
      aria-labelledby="caption-studio-title"
      tabIndex={-1}
    >
      <header className="caption-studio-bar">
        <div className="caption-studio-name" id="caption-studio-title">
          <Captions size={18} aria-hidden="true" />
          Caption demo
        </div>
        <a
          className="caption-studio-download"
          href={sampleSrtHref(mode)}
          download={`urduspeech-${mode}.srt`}
        >
          <Download size={16} aria-hidden="true" />
          Download SRT
        </a>
      </header>
      <div className="caption-studio-body">
        <div className="caption-studio-monitor" data-visual>
          <Image
            src={clipStill}
            alt=""
            width={clipStill.width}
            height={clipStill.height}
            preload
            sizes="(max-width: 960px) calc(100vw - 60px), 660px"
          />
          <div className="caption-studio-clock" aria-hidden="true">
            {captionTime(cue.start)} / {captionTime(captionCues[2].end)}
          </div>
          <div className="caption-studio-subtitles" aria-live="polite">
            {(mode === "urdu" || mode === "bilingual") && (
              <span lang="ur" dir="rtl">
                {cue.urdu}
              </span>
            )}
            {mode !== "urdu" && (
              <span lang={mode === "romanUrdu" ? "ur-Latn" : "en"}>
                {mode === "bilingual" ? cue.english : cue[mode]}
              </span>
            )}
          </div>
        </div>
        <div className="caption-studio-editor">
          <fieldset className="caption-studio-modes">
            <legend>Caption language</legend>
            <div>
              {captionModes.map(({ id, label }) => (
                <label key={id}>
                  <input
                    type="radio"
                    name={groupName}
                    checked={id === mode}
                    onChange={() => setMode(id)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="caption-studio-transcript">
            <p id="caption-studio-cues">Timeline</p>
            <ol aria-labelledby="caption-studio-cues" role="list">
              {captionCues.map((line, index) => (
                <li key={line.start}>
                  <button
                    aria-pressed={index === selected}
                    type="button"
                    onClick={() => setSelected(index)}
                  >
                    <span className="caption-studio-time">
                      {captionTime(line.start)}
                    </span>
                    <span className="sr-only" lang="ur" dir="rtl">
                      {line.urdu}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </article>
  );
}
