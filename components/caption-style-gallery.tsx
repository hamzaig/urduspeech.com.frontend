"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import creatorStill from "@/assets/short-video-demo.webp";
import { captionCues, sampleCaptionStyles } from "@/lib/caption-demo";

export function CaptionStyleGallery({
  preload = false,
}: {
  preload?: boolean;
}) {
  const [styleIndex, setStyleIndex] = useState(0);
  const style = sampleCaptionStyles[styleIndex];

  return (
    <div className="caption-style-gallery app-frame">
      <div className="caption-style-stage" data-visual>
        <Image
          src={creatorStill}
          alt=""
          width={creatorStill.width}
          height={creatorStill.height}
          sizes="(max-width: 760px) calc(100vw - 40px), 720px"
          preload={preload}
        />
        <div className="caption-style-text">
          <span
            lang="ur"
            dir="rtl"
            data-box={style.box}
            style={{ color: style.color }}
          >
            {captionCues[0].urdu}
          </span>
        </div>
      </div>
      <div
        className="caption-style-options"
        role="group"
        aria-label="Caption style"
      >
        {sampleCaptionStyles.map((example, index) => (
          <button
            key={example.name}
            type="button"
            aria-pressed={index === styleIndex}
            onClick={() => setStyleIndex(index)}
          >
            <span className="caption-style-swatch" aria-hidden="true">
              <span style={{ color: example.color }} data-box={example.box}>
                Aa
              </span>
            </span>
            <span className="caption-style-label">
              <strong>{example.name}</strong>
              <small>{example.description}</small>
            </span>
            {index === styleIndex && <Check size={18} aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
}
