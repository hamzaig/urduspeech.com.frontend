"use client";

import { useState } from "react";
import { Captions, ChevronRight, Copy, Check } from "lucide-react";

const outputs = [
  { id: "urdu", label: "Urdu" },
  { id: "romanUrdu", label: "Roman Urdu" },
  { id: "english", label: "English" },
  { id: "bilingual", label: "Bilingual" },
] as const;

const lines = [
  {
    time: "00:00",
    urdu: "آج کچھ نیا بناتے ہیں۔",
    romanUrdu: "Aaj kuch naya banate hain.",
    english: "Let’s make something new today.",
  },
  {
    time: "00:04",
    urdu: "ہر کہانی کی اپنی آواز ہوتی ہے۔",
    romanUrdu: "Har kahani ki apni awaaz hoti hai.",
    english: "Every story has a voice of its own.",
  },
  {
    time: "00:08",
    urdu: "چلیں، شروع کرتے ہیں۔",
    romanUrdu: "Chalein, shuru karte hain.",
    english: "Let’s get started.",
  },
];

export function PublicCaptionPreview() {
  const [output, setOutput] =
    useState<(typeof outputs)[number]["id"]>("bilingual");
  const [active, setActive] = useState(0);
  const [copyStatus, setCopyStatus] = useState("");
  const line = lines[active];
  const outputName = outputs.find(({ id }) => id === output)?.label;

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(
        output === "bilingual" ? line.urdu + "\n" + line.english : line[output],
      );
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
          {outputs.map(({ id, label }) => (
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
            {lines.map((item, index) => (
              <li key={item.time}>
                <button
                  type="button"
                  className="sample-line"
                  aria-pressed={index === active}
                  onClick={() => {
                    setActive(index);
                    setCopyStatus("");
                  }}
                >
                  <span className="sample-time">{item.time}</span>
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
              <span className="sample-time">{line.time}</span>{" "}
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
