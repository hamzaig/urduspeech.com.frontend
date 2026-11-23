"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  Captions,
  Check,
  Copy,
  Download,
  RotateCcw,
} from "lucide-react";
import sampleStill from "@/assets/studio-interview.webp";
import { trackEvent } from "@/lib/analytics";
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

type WebMcpNavigator = Navigator & {
  modelContext?: {
    registerTool?: (tool: {
      name: string;
      description: string;
      inputSchema: Record<string, unknown>;
      annotations?: { readOnlyHint?: boolean };
      execute: (input: {
        mode?: CaptionMode;
        format?: "srt" | "vtt" | "txt";
      }) => Promise<string>;
    }) => void;
    unregisterTool?: (name: string) => void;
  };
};

export function CaptionStudioDemo({
  editable = false,
  compact = false,
}: {
  editable?: boolean;
  compact?: boolean;
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

  useEffect(() => {
    if (!editable || typeof navigator === "undefined") return;
    const nav = navigator as WebMcpNavigator;
    const mc = nav.modelContext;
    if (!mc?.registerTool) return;
    const toolName = "export_sample_urdu_captions";
    try {
      mc.registerTool({
        name: toolName,
        description:
          "Generate sample Urdu, Roman Urdu, English, or bilingual captions in UTF-8 SRT, WebVTT, or plain TXT format from UrduSpeech's demo cues.",
        inputSchema: {
          type: "object",
          properties: {
            mode: {
              type: "string",
              enum: ["urdu", "romanUrdu", "english", "bilingual"],
              description: "Output script or translation mode",
            },
            format: {
              type: "string",
              enum: ["srt", "vtt", "txt"],
              description: "Export file format",
            },
          },
        },
        annotations: { readOnlyHint: true },
        execute: async (input) => {
          const requestedMode: CaptionMode =
            input?.mode &&
            ["urdu", "romanUrdu", "english", "bilingual"].includes(input.mode)
              ? input.mode
              : "bilingual";
          const requestedFormat =
            input?.format && ["srt", "vtt", "txt"].includes(input.format)
              ? input.format
              : "srt";
          const langs = captionOutputLanguages(requestedMode);
          const lines = captionCues.map((item) =>
            langs.map((l) => item[l]).join("\n"),
          );
          return sampleExport(requestedFormat, lines);
        },
      });
    } catch {
      // Ignore environments with incompatible WebMCP implementations.
    }
    return () => {
      try {
        mc.unregisterTool?.(toolName);
      } catch {
        // Ignore cleanup errors.
      }
    };
  }, [editable]);

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
      data-compact={compact || undefined}
      aria-labelledby={id + "-title"}
      tabIndex={-1}
    >
      <div className="caption-studio-stage">
        <div className="caption-studio-monitor">
          <Image
            src={sampleStill}
            alt="A creator speaking Urdu into a studio microphone with live Nastaliq and English captions overlaid"
            width={sampleStill.width}
            height={sampleStill.height}
            preload
            fetchPriority="high"
            placeholder="blur"
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
                {captionTime(start)} to {captionTime(end)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="caption-studio-controls">
        {!compact && (
          <header>
            <span className="caption-studio-icon">
              <Captions size={22} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h2 id={id + "-title"}>
              {editable ? "Sample editor" : "Caption preview"}
            </h2>
          </header>
        )}
        {compact && (
          <h2 id={id + "-title"} className="sr-only">
            Interactive Urdu caption preview
          </h2>
        )}
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
                    trackEvent("demo_mode_switched", {
                      mode: modeId,
                      editable,
                    });
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
                      onChange={() => {
                        setStyleIndex(index);
                        trackEvent("demo_style_changed", {
                          style: name.toLowerCase(),
                        });
                      }}
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
        ) : !compact ? (
          <p className="caption-studio-description">
            Switch the language or select a moment on the timeline to see how
            your captions could look.
          </p>
        ) : null}
        <div className="caption-studio-actions">
          {editable ? (
            <button type="button" className="text-button" onClick={reset}>
              <RotateCcw size={16} aria-hidden="true" />
              Reset sample
            </button>
          ) : compact ? (
            <Link href="/demo" className="public-inline-link">
              Open full editor
            </Link>
          ) : (
            <Link href="/demo" className="button">
              Edit the sample
            </Link>
          )}
          {canDownload ? (
            <div className="caption-studio-downloads">
              {visibleFormats.map((format) => {
                const text = sampleExport(format, exportLines);
                const type = format === "vtt" ? "text/vtt" : "text/plain";
                const encoded = encodeURIComponent(
                  text.replace(/[\uD800-\uDFFF]/gu, "\uFFFD"),
                );
                return (
                  <a
                    key={format}
                    href={`data:${type};charset=utf-8,${encoded}`}
                    download={`urduspeech-${mode}.${format}`}
                    aria-label={`Download ${format.toUpperCase()}`}
                    onClick={() =>
                      trackEvent("demo_export_downloaded", {
                        format,
                        mode,
                        editable,
                      })
                    }
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
      {!compact && (
        <section
          className="caption-studio-transcript"
          aria-labelledby={id + "-transcript-title"}
        >
          <header className="caption-transcript-heading">
            <h3 id={id + "-transcript-title"}>Parallel transcript</h3>
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
                  {captionTime(cue.start)} to {captionTime(cue.end)}
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
          <div className="sr-only">
            <table>
              <caption>
                Illustrative Urdu, Roman Urdu, and English caption cues
              </caption>
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Urdu</th>
                  <th scope="col">Roman Urdu</th>
                  <th scope="col">English</th>
                </tr>
              </thead>
              <tbody>
                {captionCues.map((item) => (
                  <tr key={item.start}>
                    <td>
                      {captionTime(item.start)} to {captionTime(item.end)}
                    </td>
                    <td lang="ur" dir="rtl">
                      {item.urdu}
                    </td>
                    <td lang="ur-Latn" dir="ltr">
                      {item.romanUrdu}
                    </td>
                    <td lang="en" dir="ltr">
                      {item.english}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </article>
  );
}
