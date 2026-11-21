"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  Captions,
  Check,
  Copy,
  Download,
  RotateCcw,
} from "lucide-react";
import sampleStill from "@/assets/studio-interview.webp";
import {
  captionCues,
  captionLanguageMeta,
  captionModes,
  captionOutputLanguages,
  captionTime,
  sampleCaptionStyles,
  sampleExport,
  type CaptionLanguage,
  type CaptionMode,
} from "@/lib/caption-demo";
import "./caption-studio-demo.css";

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
  const [copyStatus, setCopyStatus] = useState("");
  const id = useId();
  const cue = captionCues[selected];
  const style = sampleCaptionStyles[styleIndex];
  const activeLanguages = captionOutputLanguages(mode);
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
  const outputName = captionModes.find(({ id }) => id === mode)?.label;

  function selectCue(index: number) {
    setSelected(index);
    setCopyStatus("");
  }

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(exportLines[selected]);
      setCopyStatus("Caption copied.");
    } catch {
      setCopyStatus("Couldn’t copy. You can select the caption text.");
    }
  }

  function reset() {
    setMode("bilingual");
    setSelected(1);
    setStyleIndex(0);
    setEdits({});
    setCopyStatus("");
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
            style={{ color: style.color }}
          >
            {activeLanguages.map((language) => {
              const text = line(selected, language);
              return text.trim() ? (
                <span
                  key={language}
                  lang={captionLanguageMeta[language].lang}
                  dir={captionLanguageMeta[language].dir}
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
                onClick={() => selectCue(index)}
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
                  onChange={() => {
                    setMode(modeId);
                    setCopyStatus("");
                  }}
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
                  <span>{captionLanguageMeta[language].label}</span>
                  <input
                    type="text"
                    maxLength={120}
                    lang={captionLanguageMeta[language].lang}
                    dir={captionLanguageMeta[language].dir}
                    value={line(selected, language)}
                    onChange={(event) => {
                      const value = event.target.value;
                      setCopyStatus("");
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
      <section
        className="caption-studio-transcript"
        aria-labelledby={id + "-transcript-title"}
      >
        <header className="caption-transcript-heading">
          <div>
            <p>Parallel transcript</p>
            <h3 id={id + "-transcript-title"}>Read every word</h3>
          </div>
          <button
            type="button"
            className="caption-transcript-copy"
            onClick={copyCaption}
            disabled={!exportLines[selected]}
          >
            {copyStatus === "Caption copied." ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <Copy size={16} aria-hidden="true" />
            )}
            {copyStatus === "Caption copied." ? "Copied" : "Copy text"}
          </button>
        </header>
        <div className="caption-transcript-body">
          <div className="caption-transcript-source">
            <p>Urdu source cues</p>
            <ol role="list">
              {captionCues.map((item, index) => (
                <li key={item.start}>
                  <button
                    type="button"
                    aria-pressed={index === selected}
                    onClick={() => selectCue(index)}
                  >
                    <span className="caption-transcript-time">
                      {captionTime(item.start)}
                    </span>
                    <span lang="ur" dir="rtl">
                      {line(index, "urdu")}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="caption-transcript-output">
            <div className="caption-transcript-meta">
              <span>{outputName} output</span>
              <span className="caption-transcript-time">
                {captionTime(cue.start)}–{captionTime(cue.end)}
              </span>
            </div>
            <div
              className="caption-transcript-lines"
              aria-live={editable ? undefined : "polite"}
              aria-atomic={editable ? undefined : "true"}
            >
              {activeLanguages.map((language) => {
                const text = line(selected, language);
                return text.trim() ? (
                  <span
                    key={language}
                    lang={captionLanguageMeta[language].lang}
                    dir={captionLanguageMeta[language].dir}
                  >
                    {text}
                  </span>
                ) : null;
              })}
            </div>
            <p className="caption-transcript-status" role="status">
              {copyStatus}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
