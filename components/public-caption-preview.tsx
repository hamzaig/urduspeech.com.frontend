"use client";

import { useState } from "react";
import { Captions, ChevronRight, Copy, Check } from "lucide-react";
import {
  captionCues,
  captionModes,
  captionText,
  captionTime,
  type CaptionMode,
} from "@/lib/caption-demo";

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
          <Captions size={19} aria-hidden="true" /> Caption demo
        </h2>
        <fieldset className="sample-options">
          <legend className="sr-only">Caption language</legend>
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
              <span>{outputName} caption</span>
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
            {(output === "urdu" || output === "bilingual") && (
              <span lang="ur" dir="rtl">
                {line.urdu}
              </span>
            )}
            {output !== "urdu" && (
              <span>
                {output === "bilingual" ? line.english : line[output]}
              </span>
            )}
          </div>
          <p className="sample-copy-status" role="status">
            {copyStatus}
          </p>
        </div>
      </div>
    </section>
  );
}
