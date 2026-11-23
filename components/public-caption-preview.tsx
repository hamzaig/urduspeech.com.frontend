"use client";

import { useState } from "react";
import { Captions, ChevronRight, Copy, Check } from "lucide-react";
import {
  captionCues,
  captionLanguageMeta,
  captionModes,
  captionOutputLanguages,
  captionText,
  captionTime,
  type CaptionMode,
} from "@/lib/caption-demo";
import "../app/home.css";

export function PublicCaptionPreview() {
  const [output, setOutput] = useState<CaptionMode>("bilingual");
  const [active, setActive] = useState(0);
  const [copyStatus, setCopyStatus] = useState("");
  const line = captionCues[active];
  const outputName = captionModes.find(({ id }) => id === output)?.label;

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(captionText(line, output));
      setCopyStatus("Caption copied.");
    } catch {
      setCopyStatus("Couldn’t copy. You can select the caption text.");
    }
  }

  return (
    <section
      className="sample"
      id="caption-demo"
      aria-labelledby="caption-demo-title"
    >
      <div className="sample-toolbar">
        <h2 id="caption-demo-title">
          <Captions size={19} aria-hidden="true" /> Transcript demo
        </h2>
        <fieldset className="sample-options">
          <legend className="sr-only">Transcript language</legend>
          {captionModes.map(({ id, label }) => (
            <label key={id}>
              <input
                className="sr-only"
                type="radio"
                name="sample-language"
                checked={id === output}
                onChange={() => {
                  setOutput(id);
                  setCopyStatus("");
                }}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
      </div>
      <div className="sample-body">
        <div className="sample-script">
          <h3>Urdu sample</h3>
          <ol role="list">
            {captionCues.map((item, index) => (
              <li key={item.start}>
                <button
                  type="button"
                  className="sample-line"
                  aria-pressed={index === active}
                  onClick={() => {
                    setActive(index);
                    setCopyStatus("");
                  }}
                >
                  <span className="sample-time">{captionTime(item.start)}</span>
                  <span lang="ur" dir="rtl">
                    {item.urdu}
                  </span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="sample-output">
          <div className="sample-output-meta">
            <span>
              <span className="sample-time">{captionTime(line.start)}</span>{" "}
              <span>{outputName} transcript</span>
            </span>
            <button type="button" onClick={copyCaption} className="sample-copy">
              {copyStatus === "Caption copied." ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                <Copy size={15} aria-hidden="true" />
              )}
              Copy text
            </button>
          </div>
          <div className="sample-lines" aria-live="polite" aria-atomic="true">
            {captionOutputLanguages(output).map((language) => (
              <span
                key={language}
                lang={captionLanguageMeta[language].lang}
                dir={captionLanguageMeta[language].dir}
              >
                {line[language]}
              </span>
            ))}
          </div>
          <p className="sample-copy-status" role="status">
            {copyStatus}
          </p>
        </div>
      </div>
      <div className="sr-only">
        <table>
          <caption>
            Sample Urdu, Roman Urdu, and English transcript cues
          </caption>
          <thead>
            <tr>
              <th scope="col">Timestamp</th>
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
  );
}
