"use client";

import Image from "next/image";
import { useState } from "react";
import sampleStill from "@/assets/studio-interview.webp";
import {
  captionCues,
  captionLanguageMeta,
  captionModes,
  captionOutputLanguages,
  captionTime,
  type CaptionMode,
} from "@/lib/caption-demo";

const scriptName: Record<CaptionMode, string> = {
  urdu: "اردو",
  romanUrdu: "Roman Urdu",
  english: "English",
  bilingual: "اردو + English",
};

/**
 * The homepage's sample frame: one illustrative still captioned in four
 * scripts. Each script control is a print block; pressing it re-prints the
 * caption line by line, and an origin ticket names the script and cue time.
 */
export function StampHero() {
  const [mode, setMode] = useState<CaptionMode>("bilingual");
  const [cueIndex, setCueIndex] = useState(1);
  const [print, setPrint] = useState(0);
  const cue = captionCues[cueIndex]!;
  const languages = captionOutputLanguages(mode);

  return (
    <div className="stamp-hero">
      <figure className="stamp-frame">
        <Image
          src={sampleStill}
          alt="Illustrative sample: a creator speaking into a studio microphone"
          priority
          sizes="(max-width: 60rem) 100vw, 64rem"
          className="stamp-still"
        />
        <span className="stamp-sample">Sample frame</span>
        <span className="stamp-ticket" aria-hidden="true">
          <span lang={mode === "romanUrdu" || mode === "english" ? "en" : "ur"}>
            {scriptName[mode]}
          </span>
          <span>
            {captionTime(cue.start)}–{captionTime(cue.end)}
          </span>
        </span>
        <figcaption
          key={`${mode}-${cueIndex}-${print}`}
          className="stamp-caption"
          aria-live="polite"
        >
          {languages.map((language, line) => (
            <span
              key={language}
              lang={captionLanguageMeta[language].lang}
              dir={captionLanguageMeta[language].dir}
              className={`stamp-line stamp-line-${language}`}
              style={{ animationDelay: `${line * 140}ms` }}
            >
              {cue[language]}
            </span>
          ))}
        </figcaption>
      </figure>
      <div className="stamp-controls">
        <div
          className="stamp-blocks"
          role="radiogroup"
          aria-label="Caption script"
        >
          {captionModes.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={mode === id}
              className="stamp-block"
              onClick={() => {
                setMode(id);
                setPrint((count) => count + 1);
              }}
            >
              <span className="stamp-block-face" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="stamp-cues" role="group" aria-label="Sample cue">
          <span className="stamp-cues-label" aria-hidden="true">
            Cue
          </span>
          {captionCues.map((item, index) => (
            <button
              key={item.start}
              type="button"
              aria-pressed={cueIndex === index}
              className="stamp-cue"
              onClick={() => {
                setCueIndex(index);
                setPrint((count) => count + 1);
              }}
            >
              {captionTime(item.start)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
