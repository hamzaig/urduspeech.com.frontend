"use client";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type Ref,
} from "react";
import {
  Minus,
  Move,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Scaling,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { CaptionTemplate } from "@/components/caption-template";
import { PreviewCaptionLines } from "@/components/preview-caption-lines";
import type { CaptionFontChoice } from "@/lib/caption-fonts";
import {
  fitPreviewScale,
  layoutCaptionPreview,
  observeCaptionFrames,
  previewCueAt,
  previewOutputFrame,
  type PreviewCue,
  type PreviewFrame,
} from "@/lib/caption-preview";
import { StageFullscreenControl } from "@/components/stage-fullscreen";

/** Customer caption placement, mirrored by the API's `captionPlacement`. */
export type CaptionPlacement = { y: number; scale: number };

export const PLACEMENT_LIMITS = {
  minY: 0.08,
  maxY: 0.92,
  minScale: 0.7,
  maxScale: 1.5,
} as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const round = (value: number) => Math.round(value * 1000) / 1000;

/** Where the server draws a template when the customer has not moved it. */
export function defaultPlacement(
  template: CaptionTemplate | undefined,
  portrait: boolean,
): CaptionPlacement {
  const position = template?.style?.position ?? "bottom";
  return {
    y: position === "top" ? 0.16 : position === "middle" ? 0.5 : portrait ? 0.78 : 0.84,
    scale: 1,
  };
}

/**
 * A video (or audio) player with the caption drawn in the chosen template.
 * When `onPlacementChange` is given, the caption can be dragged up or down,
 * resized from its corner handle, or moved with the keyboard. The rendered
 * MP4 uses the same placement; this preview is an approximation of it.
 */
export function CaptionStage({
  src,
  audio = false,
  template,
  lines,
  time,
  cue,
  cues,
  playheadMs,
  outputFrame,
  maxRenderHeight = 720,
  placement,
  onPlacementChange,
  playerRef,
  onTimeUpdate,
  onError,
  onLoadedMetadata,
  label = "Uploaded recording",
  fonts,
  controls = true,
  coach = false,
}: {
  src: string;
  audio?: boolean;
  template: CaptionTemplate | undefined;
  /** Caption text lines for the current moment (empty hides the caption). */
  lines?: readonly string[];
  /** Progress of the two-second untimed wizard sample (0..1). */
  time?: number;
  cue?: Pick<PreviewCue, "startMs" | "endMs"> | null;
  /** The complete editable track lets playback select the cue on the presented frame. */
  cues?: readonly PreviewCue[];
  playheadMs?: number;
  /** Actual encoded dimensions take precedence over the plan's output cap. */
  outputFrame?: PreviewFrame | null;
  maxRenderHeight?: 720 | 1080 | 2160;
  placement: CaptionPlacement | null;
  onPlacementChange?: (next: CaptionPlacement) => void;
  playerRef?: Ref<HTMLMediaElement>;
  onTimeUpdate?: (ms: number) => void;
  onError?: () => void;
  onLoadedMetadata?: (media: HTMLMediaElement) => void;
  label?: string;
  /** Chosen caption fonts (ids from the catalog); defaults when absent. */
  fonts?: CaptionFontChoice | null;
  /** Native media controls; off when the page draws its own transport. */
  controls?: boolean;
  /** Point out that the caption can be dragged and resized until first use. */
  coach?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    mode: "move" | "resize";
    x: number;
    y: number;
    start: CaptionPlacement;
  } | null>(null);
  const [source, setSource] = useState<(PreviewFrame & { src: string }) | null>(
    null,
  );
  const [clock, setClock] = useState<{
    src: string;
    ms: number;
    paused: boolean;
  } | null>(null);
  const [touched, setTouched] = useState(false);
  const native = source?.src === src ? source : null;
  const encodedWidth = outputFrame?.width ?? 0;
  const encodedHeight = outputFrame?.height ?? 0;
  const size = useMemo(() => {
    if (encodedWidth > 0 && encodedHeight > 0)
      return { width: encodedWidth, height: encodedHeight };
    return native ? previewOutputFrame(native, maxRenderHeight) : null;
  }, [native, encodedWidth, encodedHeight, maxRenderHeight]);
  const display = native ?? size;
  const ratio = display ? display.width / display.height : null;
  const editable = !!onPlacementChange && !audio;

  const hasCaptions = !!template && !!(cues?.length || lines?.length);
  useEffect(() => {
    if (audio || !hasCaptions) return;
    const video = frame.current?.querySelector("video");
    if (!video) return;
    return observeCaptionFrames(video, (ms) => {
      const paused = video.paused;
      setClock((old) =>
        old?.src === src && old.ms === ms && old.paused === paused
          ? old
          : { src, ms, paused },
      );
    });
  }, [audio, src, hasCaptions]);

  const sample = clock?.src === src ? clock : null;
  const paused = sample?.paused ?? true;
  const mediaMs =
    sample && !sample.paused ? sample.ms : (playheadMs ?? sample?.ms ?? 0);
  const active = cues ? previewCueAt(cues, mediaMs) : undefined;
  // Retain the selected cue for placement while parked at zero. During
  // playback an empty interval in the track is also empty in the preview.
  const parked = paused && mediaMs === 0;
  const timing = active ?? (!cues || parked ? cue : null);
  const text =
    active?.text ?? (timing || !cues ? (lines?.join("\n") ?? "") : "");
  const sampleMs =
    paused && time !== undefined
      ? Math.max(0, Math.min(1999, time * 2000))
      : mediaMs % 2000;
  const shownMs = timing
    ? parked
      ? Math.max(mediaMs, timing.startMs)
      : mediaMs
    : sampleMs;
  const requestedScale = placement?.scale ?? 1;
  const singleCueText = cues?.length ? "" : text;
  const fittedScale = useMemo(
    () =>
      size && template && requestedScale > 1
        ? fitPreviewScale(
            size,
            template,
            fonts,
            requestedScale,
            cues?.length ? cues : [{ text: singleCueText }],
          )
        : requestedScale,
    [size, template, fonts, requestedScale, cues, singleCueText],
  );
  const requestedY = placement?.y;
  const layout = useMemo(
    () =>
      template && size && text
        ? layoutCaptionPreview({
            text,
            frame: size,
            template,
            fonts,
            placement:
              requestedY == null ? null : { y: requestedY, scale: fittedScale },
          })
        : null,
    [text, size, template, fonts, requestedY, fittedScale],
  );
  const current =
    layout && size
      ? {
          y: (layout.top + layout.blockHeight / 2) / size.height,
          scale: placement?.scale ?? 1,
        }
      : (placement ?? defaultPlacement(template, ratio !== null && ratio < 1));

  function update(next: CaptionPlacement) {
    onPlacementChange?.({
      y: round(clamp(next.y, PLACEMENT_LIMITS.minY, PLACEMENT_LIMITS.maxY)),
      scale: round(
        clamp(next.scale, PLACEMENT_LIMITS.minScale, PLACEMENT_LIMITS.maxScale),
      ),
    });
  }
  function begin(mode: "move" | "resize", event: PointerEvent<HTMLElement>) {
    if (!editable) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setTouched(true);
    drag.current = { mode, x: event.clientX, y: event.clientY, start: current };
  }
  function move(event: PointerEvent<HTMLElement>) {
    const active = drag.current,
      box = frame.current?.getBoundingClientRect();
    if (!active || !box) return;
    const dx = event.clientX - active.x,
      dy = event.clientY - active.y;
    if (active.mode === "move")
      update({ ...active.start, y: active.start.y + dy / box.height });
    else
      update({
        ...active.start,
        scale:
          active.start.scale +
          ((dx + dy) / Math.min(box.width, box.height)) * 1.6,
      });
  }
  function end() {
    drag.current = null;
  }
  function keys(event: KeyboardEvent<HTMLElement>) {
    const step = event.shiftKey ? 0.05 : 0.01;
    const actions: Record<string, CaptionPlacement> = {
      ArrowUp: { ...current, y: current.y - step },
      ArrowDown: { ...current, y: current.y + step },
      "+": { ...current, scale: current.scale + 0.05 },
      "=": { ...current, scale: current.scale + 0.05 },
      "-": { ...current, scale: current.scale - 0.05 },
    };
    const next = actions[event.key];
    if (!next) return;
    event.preventDefault();
    setTouched(true);
    update(next);
  }

  const Player = audio ? "audio" : "video";
  const frameStyle = {
    ...(ratio ? { ["--stage-ratio" as string]: String(ratio) } : {}),
  } as CSSProperties;
  const stage = (
    <div
      ref={frame}
      className={"caption-stage" + (audio ? " is-audio" : "")}
      style={frameStyle}
    >
      <Player
        key={src}
        ref={playerRef as Ref<HTMLVideoElement & HTMLAudioElement>}
        className="caption-stage-media"
        aria-label={label}
        src={src}
        controls={controls}
        preload="metadata"
        playsInline={!audio || undefined}
        onLoadedMetadata={(e) => {
          const media = e.currentTarget;
          if (
            media instanceof HTMLVideoElement &&
            media.videoWidth &&
            media.videoHeight
          )
            setSource({
              src,
              width: media.videoWidth,
              height: media.videoHeight,
            });
          onLoadedMetadata?.(media);
        }}
        onTimeUpdate={(e) => onTimeUpdate?.(e.currentTarget.currentTime * 1000)}
        onError={onError}
      />
      {!audio && template && size && layout && (
        <PreviewCaptionLines
          className={"caption-stage-caption" + (editable ? " is-editable" : "")}
          template={template}
          frame={size}
          layout={layout}
          startMs={timing?.startMs ?? 0}
          endMs={timing?.endMs ?? 2000}
          timeMs={shownMs}
          tabIndex={editable ? 0 : undefined}
          role={editable ? "group" : undefined}
          aria-label={
            editable
              ? "Caption position. Drag or use the arrow keys to move it; drag the corner or press plus and minus to resize."
              : undefined
          }
          onPointerDown={(e) => begin("move", e)}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          onKeyDown={editable ? keys : undefined}
        >
          {editable && coach && !touched && (
            <span className="caption-stage-coach" aria-hidden="true">
              <Move size={13} /> Drag to move
              <span className="caption-stage-coach-sep" />
              <Scaling size={13} /> Corner to resize
            </span>
          )}
          {editable && (
            <span
              className="caption-stage-handle"
              aria-hidden="true"
              onPointerDown={(e) => begin("resize", e)}
            />
          )}
        </PreviewCaptionLines>
      )}
    </div>
  );
  return audio ? stage : <div className="caption-stage-viewport">{stage}</div>;
}

/** Move/resize hint with Smaller, Bigger and Reset beside the stage. */
export function PlacementControls({
  placement,
  fallback,
  onChange,
  status,
}: {
  placement: CaptionPlacement | null;
  fallback: CaptionPlacement;
  onChange: (next: CaptionPlacement | null) => void;
  status?: string;
}) {
  const current = placement ?? fallback;
  const resize = (delta: number) =>
    onChange({
      ...current,
      scale: round(
        clamp(
          current.scale + delta,
          PLACEMENT_LIMITS.minScale,
          PLACEMENT_LIMITS.maxScale,
        ),
      ),
    });
  return (
    <div className="placement-controls">
      <ul className="placement-hints">
        <li>
          <span className="placement-hint-icon" aria-hidden="true">
            <Move size={15} />
          </span>
          <span>
            <strong>Move</strong> drag the caption up or down
          </span>
        </li>
        <li>
          <span className="placement-hint-icon" aria-hidden="true">
            <Scaling size={15} />
          </span>
          <span>
            <strong>Resize</strong> drag its corner, or use the buttons
          </span>
        </li>
      </ul>
      <div className="placement-buttons" role="group" aria-label="Caption size">
        <button
          type="button"
          className="placement-button"
          onClick={() => resize(-0.1)}
          disabled={current.scale <= PLACEMENT_LIMITS.minScale}
          aria-label="Smaller caption"
          title="Smaller"
        >
          <Minus size={16} aria-hidden="true" />
        </button>
        <output className="placement-size" aria-live="polite">
          {Math.round(current.scale * 100)}%
        </output>
        <button
          type="button"
          className="placement-button"
          onClick={() => resize(0.1)}
          disabled={current.scale >= PLACEMENT_LIMITS.maxScale}
          aria-label="Bigger caption"
          title="Bigger"
        >
          <Plus size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="placement-button placement-reset"
          onClick={() => onChange(null)}
          disabled={!placement}
          title="Reset position and size"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Reset
        </button>
      </div>
      {status && (
        <small className="placement-status" role="status">
          {status}
        </small>
      )}
    </div>
  );
}

const clock = (seconds: number) => {
  const s = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/**
 * Play, seek and mute for a stage drawn without native controls, so nothing
 * covers the caption the customer is placing. `media` is the stage's player.
 */
export function StageTransport({
  media,
  source,
  cues,
}: {
  media: RefObject<HTMLMediaElement | null>;
  /** Changes when the stage loads a different recording. */
  source: string;
  /** Draw the timed caption intervals beneath the project playhead. */
  cues?: readonly { startMs: number; endMs: number }[];
}) {
  const [playing, setPlaying] = useState(false),
    [muted, setMuted] = useState(false),
    [at, setAt] = useState(0),
    [length, setLength] = useState(0);
  useEffect(() => {
    const element = media.current;
    if (!element) return;
    const sync = () => {
      setPlaying(!element.paused);
      setMuted(element.muted);
      setAt(element.currentTime);
      setLength(Number.isFinite(element.duration) ? element.duration : 0);
    };
    const events = [
      "play",
      "pause",
      "timeupdate",
      "loadedmetadata",
      "volumechange",
      "ended",
    ];
    events.forEach((name) => element.addEventListener(name, sync));
    sync();
    return () =>
      events.forEach((name) => element.removeEventListener(name, sync));
  }, [media, source]);
  const intervals = useMemo(() => {
    if (!cues || !length) return "";
    const scale = 1 / length; // seconds x 1000 viewBox units / milliseconds
    return cues
      .map(({ startMs, endMs }) => {
        const x = Math.max(0, Math.min(1000, startMs * scale));
        const end = Math.max(x, Math.min(1000, endMs * scale));
        const gap = Math.min(2, (end - x) / 3);
        return `M${x.toFixed(2)} 6H${(end - gap).toFixed(2)}`;
      })
      .join(" ");
  }, [cues, length]);
  const seek = (
    <input
      type="range"
      className="stage-transport-seek"
      aria-label="Seek"
      aria-valuetext={`${clock(at)} of ${clock(length)}`}
      min={0}
      max={length || 1}
      step={0.05}
      value={Math.min(at, length || 1)}
      style={{ ["--seek" as string]: `${length ? (at / length) * 100 : 0}%` }}
      onChange={(e) => {
        const element = media.current;
        if (!element) return;
        const seconds = e.currentTarget.valueAsNumber;
        element.currentTime = seconds;
        setAt(seconds);
      }}
    />
  );
  return (
    <div className="stage-transport">
      <button
        type="button"
        className="stage-transport-button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={() => {
          const el = media.current;
          if (el?.paused) void el.play().catch(() => {});
          else el?.pause();
        }}
      >
        {playing ? (
          <Pause size={16} aria-hidden="true" />
        ) : (
          <Play size={16} aria-hidden="true" />
        )}
      </button>
      {cues?.length ? (
        <div className="project-scrubber">
          <svg
            viewBox="0 0 1000 12"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={intervals} />
          </svg>
          <i
            className="project-playhead"
            aria-hidden="true"
            style={{ left: `${length ? (at / length) * 100 : 0}%` }}
          />
          {seek}
        </div>
      ) : (
        seek
      )}
      <span className="stage-transport-time">
        {clock(at)} / {clock(length)}
      </span>
      <button
        type="button"
        className="stage-transport-button"
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={() => {
          const element = media.current;
          if (element) element.muted = !element.muted;
        }}
      >
        {muted ? (
          <VolumeX size={16} aria-hidden="true" />
        ) : (
          <Volume2 size={16} aria-hidden="true" />
        )}
      </button>
      <StageFullscreenControl media={media} />
    </div>
  );
}
