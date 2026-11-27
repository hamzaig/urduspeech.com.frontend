import {
  Fragment,
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import {
  assTimeMs,
  hasUrduRun,
  karaokeWordEnds,
  latinRun,
  type layoutCaptionPreview,
  spokenWord,
  type CaptionPreviewInput,
} from "../lib/caption-preview";

type Props = Pick<CaptionPreviewInput, "frame" | "template"> &
  Omit<HTMLAttributes<HTMLDivElement>, "style"> & {
    layout: ReturnType<typeof layoutCaptionPreview>;
    /** Absolute times on the same media clock, in milliseconds. */
    startMs: number;
    endMs: number;
    timeMs: number;
  };

const boxColor = (hex: string, alpha: number) =>
  hex + (255 - alpha).toString(16).padStart(2, "0");
// CSS text strokes miter the corners of A/V/W. A ring of glyph masks follows
// libass's round outline without projecting spikes beyond the native ink.
function textShadow(
  radius: number,
  color: string,
  shadow: number,
  frameWidth: number,
) {
  const length = (n: number) => ((n * 100) / frameWidth).toFixed(5) + "cqw";
  const shadows: string[] = [];
  if (radius > 0) {
    for (const [r, count] of [
      [radius, 16],
      [radius * 0.45, 8],
    ]) {
      for (let i = 0; i < count; i++) {
        const angle = (2 * Math.PI * i) / count;
        shadows.push(
          length(r * Math.cos(angle)) +
            " " +
            length(r * Math.sin(angle)) +
            " 0 " +
            color,
        );
      }
    }
  }
  if (shadow) shadows.push(length(shadow) + " " + length(shadow) + " 0 #0009");
  return shadows.join(", ") || "none";
}

/** Place directly inside the size-query container that fits the source video.
 * The optional children are the stage's existing drag coaching/resize handle. */
export function PreviewCaptionLines({
  frame,
  template,
  layout,
  startMs,
  endMs,
  timeMs,
  className,
  children,
  ...events
}: Props) {
  const style = template.style;
  const karaoke = style?.animation === "karaoke" && !!style.highlightColor;
  const ends = useMemo(
    () => (karaoke ? karaokeWordEnds(layout.lines, startMs, endMs) : []),
    [layout, karaoke, startMs, endMs],
  );
  const shadows = useMemo(
    () =>
      textShadow(
        layout.outline,
        style?.outlineColor ?? "#000000",
        style?.boxStyle === "line" ? 0 : layout.shadow,
        frame.width,
      ),
    [layout, style, frame.width],
  );
  if (timeMs < assTimeMs(startMs) || timeMs >= assTimeMs(endMs)) return null;

  const active = spokenWord(ends, startMs, timeMs);
  const cq = (px: number) => (px * 100) / frame.width + "cqw";
  const elapsed = timeMs - assTimeMs(startMs);
  const opacity =
    style?.animation === "fade"
      ? Math.min(1, elapsed / 120, (assTimeMs(endMs) - timeMs) / 80)
      : 1;
  const entrance =
    style?.animation === "pop" ? 0.88 + 0.12 * Math.min(1, elapsed / 160) : 1;
  const highlightScale = Math.round((style?.highlightScale ?? 1) * 100) / 100;

  const captionStyle = {
    top: (100 * layout.boundsTop) / frame.height + "%",
    height:
      (100 * (layout.boundsBottom - layout.boundsTop)) / frame.height + "%",
    insetInline: (100 * layout.safeX) / frame.width + "%",
    fontSize: cq(layout.fontSize),
    color: template.color,
    "--preview-latin": '"' + layout.latin.family + '", "cap-inter", sans-serif',
    "--preview-urdu":
      '"' + layout.urdu.family + '", "cap-noto-nastaliq", serif',
    "--preview-latin-size": cq(layout.latin.size),
    "--preview-urdu-size": cq(layout.urdu.size),
    "--preview-latin-weight": layout.latin.weight,
    "--preview-urdu-weight": layout.urdu.weight,
    // libass only emboldens if the requested weight exceeds the face weight by
    // more than 150; the outline grows by 1/64 em without changing advances.
    "--preview-latin-bold":
      style?.bold && layout.latin.weight === 400 ? "0.015625em" : "0px",
    "--preview-urdu-bold":
      style?.bold && layout.urdu.weight === 400 ? "0.015625em" : "0px",
    "--preview-line-pad": cq(layout.outline + Math.round(layout.shadow)),
    "--preview-line-box":
      style?.boxStyle === "line"
        ? boxColor(style.boxColor, style.boxAlpha)
        : undefined,
    "--preview-highlight-scale": highlightScale,
    "--preview-highlight": style?.highlightColor,
    "--preview-opacity": opacity,
    "--preview-entrance": entrance,
    "--preview-shadow": shadows,
    "--preview-glow": layout.blur
      ? "drop-shadow(0 0 " + cq(layout.blur) + " " + style?.outlineColor + ")"
      : undefined,
  } as CSSProperties;

  return (
    <div
      {...events}
      className={"preview-caption" + (className ? " " + className : "")}
      style={captionStyle}
    >
      {layout.band && (
        <span
          className="preview-caption-band"
          aria-hidden="true"
          style={{
            top: cq(layout.band.top - layout.boundsTop),
            height: cq(layout.band.bottom - layout.band.top),
            background: style
              ? boxColor(style.boxColor, style.boxAlpha)
              : "#263238",
          }}
        />
      )}
      {layout.lines.map((line, row) => {
        const word = line.words[active - line.firstWord];
        const latinScale =
          word && (!line.urdu || latinRun.test(word)) ? highlightScale : 1;
        const urduScale = word && hasUrduRun.test(word) ? highlightScale : 1;
        const hasLatin = !line.urdu || latinRun.test(line.text);
        const ascent = Math.max(
          hasLatin ? layout.latin.ascent * latinScale : 0,
          line.urdu ? layout.urdu.ascent * urduScale : 0,
        );
        const descent = Math.max(
          hasLatin ? layout.latin.descent * latinScale : 0,
          line.urdu ? layout.urdu.descent * urduScale : 0,
        );
        return (
          <span
            className="preview-caption-line"
            data-preview-line=""
            key={row}
            dir="auto"
            lang={line.urdu ? "ur" : undefined}
            style={
              {
                bottom: cq(layout.boundsBottom - line.anchorY),
                height: cq(ascent + descent),
                "--preview-ascent": cq(ascent),
              } as CSSProperties
            }
          >
            {line.words.map((word, index) => {
              const runs = line.urdu
                ? word.split(latinRun).map((run, i) =>
                    i % 2 ? (
                      <span className="preview-caption-latin" key={i}>
                        {run}
                      </span>
                    ) : (
                      run
                    ),
                  )
                : word;
              return (
                <Fragment key={index}>
                  {index > 0 && " "}
                  {active === line.firstWord + index ? (
                    <span data-spoken="true">{runs}</span>
                  ) : (
                    runs
                  )}
                </Fragment>
              );
            })}
          </span>
        );
      })}
      {children}
    </div>
  );
}
