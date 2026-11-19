"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  Captions,
  Download,
  RotateCcw,
} from "lucide-react";
import sampleStill from "@/assets/studio-interview.webp";
import {
  captionCues,
  captionModes,
  captionTime,
  sampleCaptionStyles,
  sampleExport,
  type CaptionLanguage,
  type CaptionMode,
} from "@/lib/caption-demo";
import "./caption-studio-demo.css";

const languages = {
  urdu: { label: "Urdu", lang: "ur", dir: "rtl" },
  romanUrdu: { label: "Roman Urdu", lang: "ur-Latn", dir: "ltr" },
  english: { label: "English", lang: "en", dir: "ltr" },
} as const;

const bilingualLanguages = ["urdu", "english"] as const;
const formats = ["srt", "vtt", "txt"] as const;
type CueEdits = Partial<
  Record<number, Partial<Record<CaptionLanguage, string>>>
>;

export function CaptionStudioDemo({
  editable = false,
}: {
  editable?: boolean;
}) {
  const [mode, setMode] = useState<CaptionMode>("bilingual");
  const [selected, setSelected] = useState(1);
  const [styleIndex, setStyleIndex] = useState(0);
  const [edits, setEdits] = useState<CueEdits>({});
  const id = useId();
  const cue = captionCues[selected];
  const style = sampleCaptionStyles[styleIndex];
  const activeLanguages = mode === "bilingual" ? bilingualLanguages : [mode];
  const visibleFormats = editable ? formats : (["srt"] as const);

  function line(index: number, language: CaptionLanguage) {
    return edits[index]?.[language] ?? captionCues[index][language];
  }

  const exportLines = captionCues.map((_, index) =>
    activeLanguages
      .map((language) => line(index, language).trim())
      .filter(Boolean)
      .join("\n"),
  );
  const canDownload = exportLines.some(Boolean);

  function reset() {
    setMode("bilingual");
    setSelected(1);
    setStyleIndex(0);
    setEdits({});
  }

  return (
    <article
      id="caption-demo"
      className="caption-studio"
      data-editable={editable || undefined}
      aria-labelledby={id + "-title"}
      tabIndex={-1}
    >
      <div className="caption-studio-stage">
        <div className="caption-studio-monitor">
          <Image
            src={sampleStill}
            alt="A creator speaking into a microphone in a sunlit studio"
            fill
            preload
            sizes="(max-width: 800px) calc(100vw - 52px), (max-width: 1300px) 62vw, 800px"
            className="caption-studio-image"
          />
          <span className="caption-studio-frame-label">Sample frame</span>
          <div
            className="caption-studio-subtitles"
            aria-live={editable ? undefined : "polite"}
            style={{ color: style.color }}
          >
            {activeLanguages.map((language) => {
              const text = line(selected, language);
              return text.trim() ? (
                <span
                  key={language}
                  lang={languages[language].lang}
                  dir={languages[language].dir}
                  data-box={style.box || undefined}
                >
                  {text}
                </span>
              ) : null;
            })}
          </div>
        </div>
        <div className="caption-studio-timeline">
          <div>
            <strong>Timeline</strong>
            <span>
              {captionTime(cue.start)} / {captionTime(captionCues.at(-1)!.end)}
            </span>
          </div>
          <div role="group" aria-label="Preview cue">
            {captionCues.map(({ start, end }, index) => (
              <button
                key={start}
                aria-pressed={index === selected}
                type="button"
                onClick={() => setSelected(index)}
              >
                <span className="sr-only">Cue {index + 1}, </span>
                {captionTime(start)}–{captionTime(end)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="caption-studio-controls">
        <header>
          <span className="caption-studio-icon">
            <Captions size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <h2 id={id + "-title"}>
            {editable ? "Sample editor" : "Caption preview"}
          </h2>
        </header>
        <fieldset className="caption-studio-modes">
          <legend>Caption language</legend>
          <div>
            {captionModes.map(({ id: modeId, label }) => (
              <label key={modeId}>
                <input
                  className="sr-only"
                  type="radio"
                  name={id + "-language"}
                  checked={modeId === mode}
                  onChange={() => setMode(modeId)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {editable ? (
          <>
            <fieldset className="caption-studio-edit">
              <legend>Edit cue {selected + 1}</legend>
              {activeLanguages.map((language) => (
                <label key={language}>
                  <span>{languages[language].label}</span>
                  <input
                    type="text"
                    maxLength={120}
                    lang={languages[language].lang}
                    dir={languages[language].dir}
                    value={line(selected, language)}
                    onChange={(event) => {
                      const value = event.target.value;
                      setEdits((current) => ({
                        ...current,
                        [selected]: { ...current[selected], [language]: value },
                      }));
                    }}
                  />
                </label>
              ))}
            </fieldset>
            <fieldset className="caption-studio-styles">
              <legend>Preview style</legend>
              <div>
                {sampleCaptionStyles.map(({ name, color }, index) => (
                  <label key={name}>
                    <input
                      className="sr-only"
                      type="radio"
                      name={id + "-style"}
                      checked={styleIndex === index}
                      onChange={() => setStyleIndex(index)}
                    />
                    <span>
                      <b style={{ color }} aria-hidden="true">
                        Aa
                      </b>
                      {name}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <a className="caption-studio-back" href="#caption-demo">
              <ArrowUp size={16} aria-hidden="true" />
              View preview
            </a>
          </>
        ) : (
          <p className="caption-studio-description">
            Switch the language or select a moment on the timeline to see how
            your captions could look.
          </p>
        )}
        <div className="caption-studio-actions">
          {editable ? (
            <button type="button" className="text-button" onClick={reset}>
              <RotateCcw size={16} aria-hidden="true" />
              Reset sample
            </button>
          ) : (
            <Link href="/demo" className="button">
              Edit the sample <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          )}
          {canDownload ? (
            <div className="caption-studio-downloads">
              {visibleFormats.map((format) => {
                const text = sampleExport(format, exportLines);
                const type = format === "vtt" ? "text/vtt" : "text/plain";
                // URI encoding requires well-formed Unicode.
                const encoded = encodeURIComponent(
                  text.replace(/[\uD800-\uDFFF]/gu, "\uFFFD"),
                );
                return (
                  <a
                    key={format}
                    href={`data:${type};charset=utf-8,${encoded}`}
                    download={`urduspeech-${mode}.${format}`}
                    aria-label={`Download ${format.toUpperCase()}`}
                  >
                    <Download size={16} aria-hidden="true" />
                    {editable ? format.toUpperCase() : "Download SRT"}
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="caption-studio-description" role="status">
              Add a caption to download a file.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
