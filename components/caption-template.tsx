import type { CSSProperties } from "react";

/** Style fields of the extended caption template catalog (see the API). */
export type CaptionTemplateStyle = {
  sizeScale: number;
  bold: boolean;
  latinUppercase: boolean;
  outlineColor: string;
  outlineScale: number;
  shadowScale: number;
  glow: number;
  boxStyle: "none" | "band" | "line";
  boxColor: string;
  boxAlpha: number;
  position: "bottom" | "middle" | "top";
  animation: "none" | "fade" | "pop" | "karaoke";
  highlightColor: string | null;
  highlightScale: number;
};

export type CaptionTemplate = {
  id: string;
  name: string;
  label?: string;
  tier?: "free" | "premium";
  color: string;
  box: boolean;
  style?: CaptionTemplateStyle;
};

const alpha = (hex: string, assAlpha: number) => {
  const opacity = 1 - assAlpha / 255;
  return `color-mix(in srgb, ${hex} ${Math.round(opacity * 100)}%, transparent)`;
};

/** CSS approximation of a template; the server render is authoritative. */
export function templateStyle(template: CaptionTemplate): CSSProperties {
  const s = template.style;
  if (!s) {
    return {
      color: template.color,
      textShadow: "0 0.06em 0.12em rgba(0,0,0,.9)",
      ...(template.box
        ? { background: "#263238", padding: "0.15em 0.5em" }
        : {}),
    };
  }
  const stroke = 0.03 * s.outlineScale;
  const shadows: string[] = [];
  if (s.boxStyle !== "line" && s.outlineScale > 0) {
    for (const [x, y] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [0.7, 0.7],
      [-0.7, 0.7],
      [0.7, -0.7],
      [-0.7, -0.7],
    ])
      shadows.push(`${x * stroke}em ${y * stroke}em 0 ${s.outlineColor}`);
  }
  if (s.shadowScale > 0)
    shadows.push(
      `0 ${0.04 * s.shadowScale}em ${0.06 * s.shadowScale}em rgba(0,0,0,.75)`,
    );
  if (s.glow > 0)
    shadows.push(
      `0 0 ${0.08 * s.glow}em ${s.outlineColor}`,
      `0 0 ${0.04 * s.glow}em ${s.outlineColor}`,
    );
  return {
    color: template.color,
    fontWeight: s.bold ? 800 : 600,
    fontSize: `${s.sizeScale}em`,
    textTransform: s.latinUppercase ? "uppercase" : undefined,
    textShadow: shadows.join(", ") || undefined,
    ...(s.boxStyle === "line"
      ? {
          background: alpha(s.boxColor, s.boxAlpha),
          padding: "0.08em 0.4em",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }
      : {}),
  };
}

/** Frame-level treatment (band box and vertical placement). */
export function templateFrame(template: CaptionTemplate): CSSProperties {
  const s = template.style;
  return {
    justifyContent:
      s?.position === "top"
        ? "flex-start"
        : s?.position === "middle"
          ? "center"
          : "flex-end",
    ...(s?.boxStyle === "band"
      ? { ["--band" as string]: alpha(s.boxColor, s.boxAlpha) }
      : {}),
  };
}

/**
 * A caption line rendered in a template's look. In karaoke templates the
 * `highlight` word index is drawn in the highlight colour and size.
 */
export function TemplateLine({
  template,
  text,
  highlight,
  lang,
  dir,
}: {
  template: CaptionTemplate;
  text: string;
  highlight?: number;
  lang?: string;
  dir?: "rtl" | "ltr" | "auto";
}) {
  const s = template.style;
  const karaoke = s?.animation === "karaoke" && s.highlightColor;
  return (
    <span
      className="template-line"
      lang={lang}
      dir={dir}
      style={templateStyle(template)}
    >
      {karaoke
        ? text.split(" ").map((word, index) => (
            <span
              key={index}
              className={index === highlight ? "is-spoken" : undefined}
              style={
                index === highlight
                  ? {
                      color: s.highlightColor ?? undefined,
                      transform: `scale(${s.highlightScale})`,
                    }
                  : undefined
              }
            >
              {word}
              {index < text.split(" ").length - 1 ? " " : ""}
            </span>
          ))
        : text}
    </span>
  );
}

export function templateLabel(template: CaptionTemplate) {
  return template.label ?? template.name.replaceAll("-", " ");
}

/**
 * Template gallery: each option shows a live miniature of its look. Premium
 * templates carry a badge; paid plans render them, Free shows the limit.
 */
export function TemplatePicker({
  templates,
  value,
  onChange,
  name,
  defaultLabel,
  disabled,
}: {
  templates: readonly CaptionTemplate[];
  value: string | null;
  onChange: (id: string | null) => void;
  name: string;
  /** When set, an extra first option clears the choice (account default). */
  defaultLabel?: string;
  disabled?: boolean;
}) {
  return (
    <div className="template-grid" role="radiogroup">
      {defaultLabel && (
        <label className="template-option template-default">
          <input
            type="radio"
            name={name}
            checked={value === null}
            disabled={disabled}
            onChange={() => onChange(null)}
          />
          <span className="template-frame template-frame-plain">
            <span>Default</span>
          </span>
          <span className="template-name">{defaultLabel}</span>
        </label>
      )}
      {templates.map((template) => (
        <label key={template.id} className="template-option">
          <input
            type="radio"
            name={name}
            value={template.id}
            checked={template.id === value}
            disabled={disabled}
            onChange={() => onChange(template.id)}
          />
          <span
            className="template-frame"
            data-band={template.style?.boxStyle === "band" || undefined}
            style={templateFrame(template)}
            aria-hidden="true"
          >
            <TemplateLine
              template={template}
              text="اپنی آواز"
              lang="ur"
              dir="rtl"
              highlight={1}
            />
            <TemplateLine
              template={template}
              text="your voice"
              lang="en"
              highlight={1}
            />
          </span>
          <span className="template-name">
            {templateLabel(template)}
            {template.tier === "premium" && (
              <span className="template-badge">Premium</span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}
