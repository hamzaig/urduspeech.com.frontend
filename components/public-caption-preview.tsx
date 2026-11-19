"use client";

import { useState } from "react";
import { AudioLines, Captions } from "lucide-react";

const examples = [
  { id: "urdu", label: "Urdu" },
  { id: "romanUrdu", label: "Roman Urdu" },
  { id: "english", label: "English" },
  { id: "bilingual", label: "Bilingual" },
] as const;

export function PublicCaptionPreview() {
  const [output, setOutput] = useState<(typeof examples)[number]["id"]>("urdu");

  return (
    <figure className="sample">
      <figcaption>
        <Captions size={18} aria-hidden="true" /> Caption preview
      </figcaption>
      <div className="sample-stage">
        <AudioLines
          className="sample-wave"
          aria-hidden="true"
          strokeWidth={0.65}
        />
        <div className="sample-lines" aria-live="polite" aria-atomic="true">
          {(output === "urdu" || output === "bilingual") && (
            <p lang="ur" dir="rtl">
              آج کچھ نیا بناتے ہیں۔
            </p>
          )}
          {output === "romanUrdu" && <p>Aaj kuch naya banate hain.</p>}
          {(output === "english" || output === "bilingual") && (
            <p>Let’s make something new today.</p>
          )}
        </div>
      </div>
      <fieldset className="sample-options">
        <legend className="sr-only">Preview caption language</legend>
        {examples.map(({ id, label }) => (
          <label key={id}>
            <input
              className="sr-only"
              type="radio"
              name="sample-language"
              checked={id === output}
              onChange={() => setOutput(id)}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
    </figure>
  );
}
