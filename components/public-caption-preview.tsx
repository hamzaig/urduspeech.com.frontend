"use client";

import { useState } from "react";
import Image from "next/image";
import captionDemo from "@/assets/caption-demo.webp";
import { Captions, ChevronRight } from "lucide-react";

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
  const line = lines[active];
  const listOutput = output === "bilingual" ? "english" : output;

  return (
    <section
      className="sample"
      id="caption-demo"
      aria-labelledby="caption-demo-title"
    >
      <div className="sample-toolbar">
        <h2 id="caption-demo-title">
          <Captions size={20} aria-hidden="true" />
          Caption demo
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
                onChange={() => setOutput(id)}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
      </div>
      <div className="sample-body">
        <figure className="sample-frame">
          <Image
            src={captionDemo}
            alt=""
            fill
            unoptimized
            loading="eager"
            fetchPriority="high"
          />
          <div className="sample-lines" aria-live="polite" aria-atomic="true">
            {(output === "urdu" || output === "bilingual") && (
              <span lang="ur" dir="rtl">
                {line.urdu}
              </span>
            )}
            {output !== "urdu" && <span>{line[listOutput]}</span>}
          </div>
          <figcaption className="sample-frame-label">
            Illustrative frame
          </figcaption>
        </figure>
        <div className="sample-script">
          <h3>Caption lines</h3>
          <ol>
            {lines.map((item, index) => (
              <li key={item.time}>
                <button
                  type="button"
                  className="sample-line"
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                >
                  <span className="sample-time">{item.time}</span>
                  <span className="sample-line-copy">
                    {(output === "urdu" || output === "bilingual") && (
                      <span lang="ur" dir="rtl">
                        {item.urdu}
                      </span>
                    )}
                    {output !== "urdu" && <span>{item[listOutput]}</span>}
                  </span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
