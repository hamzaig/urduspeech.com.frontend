"use client";
import {
  useEffect,
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
import {
  TemplateLine,
  templateFrame,
  type CaptionTemplate,
} from "@/components/caption-template";
import { fontVars, type CaptionFontChoice } from "@/lib/caption-fonts";

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
  time = 0,
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
  lines: string[];
  /** Cue-relative progress (0..1) used to light karaoke words. */
  time?: number;
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
  const [ratio, setRatio] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const portrait = ratio !== null && ratio < 1;
  const current = placement ?? defaultPlacement(template, portrait);
  const editable = !!onPlacementChange && !audio;
  const sizeScale = template?.style?.sizeScale ?? 1;

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
  // The server sizes captions from the short frame side (4.2% x template x
  // customer scale); `cqmin` follows the same side of the preview frame.
  const captionStyle = {
    ...templateFrame(template ?? fallbackTemplate),
    ...fontVars(fonts),
    top: `${current.y * 100}%`,
    fontSize: `calc(${(0.042 * 1.21 * Math.min(1.6, sizeScale * current.scale)) / sizeScale} * 100cqmin)`,
  } as CSSProperties;

  return (
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
          if (media instanceof HTMLVideoElement && media.videoWidth)
            setRatio(media.videoWidth / media.videoHeight);
          onLoadedMetadata?.(media);
        }}
        onTimeUpdate={(e) => onTimeUpdate?.(e.currentTarget.currentTime * 1000)}
        onError={onError}
      />
      {!audio && lines.length > 0 && template && (
        <div
          className={
            "caption-stage-caption caption-fonts" +
            (editable ? " is-editable" : "")
          }
          data-band={template.style?.boxStyle === "band" || undefined}
          style={captionStyle}
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
          {lines.map((line, index) => (
            <TemplateLine
              key={index}
              template={template}
              text={line}
              highlight={Math.floor(time * line.split(" ").length)}
              dir="auto"
              lang={/\p{Script=Arabic}/u.test(line) ? "ur" : undefined}
            />
          ))}
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
              onPointerMove={move}
              onPointerUp={end}
              onPointerCancel={end}
            />
          )}
        </div>
      )}
    </div>
  );
}

const fallbackTemplate: CaptionTemplate = {
  id: "clean:1",
  name: "clean",
  color: "#FFFFFF",
  box: false,
};

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
}: {
  media: RefObject<HTMLMediaElement | null>;
  /** Changes when the stage loads a different recording. */
  source: string;
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
    const events = ["play", "pause", "timeupdate", "loadedmetadata", "volumechange", "ended"];
    events.forEach((name) => element.addEventListener(name, sync));
    sync();
    return () => events.forEach((name) => element.removeEventListener(name, sync));
  }, [media, source]);
  const element = media.current;
  return (
    <div className="stage-transport">
      <button
        type="button"
        className="stage-transport-button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={() => (element?.paused ? void element.play() : element?.pause())}
      >
        {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
      </button>
      <input
        type="range"
        className="stage-transport-seek"
        aria-label="Seek"
        min={0}
        max={length || 1}
        step={0.05}
        value={Math.min(at, length || 1)}
        style={{ ["--seek" as string]: `${length ? (at / length) * 100 : 0}%` }}
        onChange={(e) => {
          if (element) element.currentTime = Number(e.target.value);
        }}
      />
      <span className="stage-transport-time">
        {clock(at)} / {clock(length)}
      </span>
      <button
        type="button"
        className="stage-transport-button"
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={() => {
          if (element) element.muted = !element.muted;
        }}
      >
        {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
