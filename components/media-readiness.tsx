"use client";
import { useEffect, useRef, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { api, ApiError, mutation, explain } from "@/lib/api";
type AudioStatus = {
  mediaId: string;
  requiredAction: "select_audio_track" | null;
  audioTracks: {
    index: number;
    language?: string;
    codec: string;
    channels: number;
  }[];
  selectedTrack: number | null;
};

/** How often to ask again while the upload is still being checked. */
const POLL_MS = 3000;
/** After this long, stop polling and offer a manual retry. */
const GIVE_UP_MS = 15 * 60 * 1000;

type Phase = "verifying" | "reading" | "choose" | "ready" | "error" | "stalled";

/**
 * Shows the server-side checks that run after an upload (safety and format
 * check, then reading the audio tracks) with a live progress bar, and keeps
 * asking until the media is ready. Reports readiness through `onReady`.
 */
export function MediaReadiness({
  projectId,
  onReady,
}: {
  projectId: string;
  onReady: (ready: boolean) => void;
}) {
  const [status, setStatus] = useState<AudioStatus | null>(null),
    [phase, setPhase] = useState<Phase>("verifying"),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [elapsed, setElapsed] = useState(0),
    [attempt, setAttempt] = useState(0);
  const started = useRef(Date.now());
  const report = useRef(onReady);
  report.current = onReady;

  useEffect(() => {
    let live = true,
      timer: ReturnType<typeof setTimeout> | undefined;
    started.current = Date.now();
    const again = () => {
      if (Date.now() - started.current > GIVE_UP_MS) setPhase("stalled");
      else timer = setTimeout(check, POLL_MS);
    };
    async function check() {
      try {
        const result = await api<AudioStatus>(
          `/v1/projects/${projectId}/audio-tracks`,
        );
        if (!live) return;
        setStatus(result);
        setError("");
        if (result.audioTracks.length === 0) {
          setPhase("reading");
          report.current(false);
          again();
        } else if (result.requiredAction === "select_audio_track") {
          setPhase("choose");
          report.current(false);
        } else {
          setPhase("ready");
          report.current(true);
        }
      } catch (e) {
        if (!live) return;
        report.current(false);
        if (e instanceof ApiError && e.code === "SOURCE_NOT_VERIFIED") {
          setPhase("verifying");
          again();
        } else {
          setPhase("error");
          setError(explain(e));
        }
      }
    }
    void check();
    return () => {
      live = false;
      if (timer) clearTimeout(timer);
    };
  }, [projectId, attempt]);

  const working = phase === "verifying" || phase === "reading";
  useEffect(() => {
    if (!working) return;
    const tick = setInterval(
      () => setElapsed(Math.floor((Date.now() - started.current) / 1000)),
      1000,
    );
    return () => clearInterval(tick);
  }, [working]);

  async function select(index: number) {
    if (!status) return;
    setBusy(true);
    setError("");
    try {
      await api(
        `/v1/projects/${projectId}/audio-track`,
        mutation(
          "POST",
          { mediaId: status.mediaId, trackIndex: index },
          crypto.randomUUID(),
        ),
      );
      setAttempt((n) => n + 1);
    } catch (e) {
      setError(explain(e));
    } finally {
      setBusy(false);
    }
  }

  const stages = [
    { label: "Upload received", done: true },
    { label: "Safety and format check", done: phase !== "verifying" && phase !== "error" && phase !== "stalled" },
    { label: "Audio ready", done: phase === "ready" },
  ];
  const current = stages.findIndex((s) => !s.done);
  return (
    <div className="media-readiness" data-phase={phase}>
      <div className="media-readiness-head">
        <strong>
          {phase === "ready"
            ? "Your upload is ready"
            : phase === "choose"
              ? "Choose the audio to transcribe"
              : phase === "error"
                ? "We could not check your upload"
                : phase === "stalled"
                  ? "This is taking longer than usual"
                  : "Checking your upload"}
        </strong>
        {working && (
          <span className="media-readiness-time" aria-hidden="true">
            {elapsed}s
          </span>
        )}
      </div>
      {working && (
        <div
          className="media-readiness-bar"
          role="progressbar"
          aria-label="Checking your upload"
          aria-valuemin={0}
          aria-valuemax={3}
          aria-valuenow={current}
          aria-valuetext={stages[current]?.label}
        />
      )}
      <ol className="media-readiness-stages">
        {stages.map((stage, index) => (
          <li
            key={stage.label}
            data-state={
              stage.done ? "done" : index === current && working ? "active" : "todo"
            }
          >
            <span aria-hidden="true">
              {stage.done ? (
                <Check size={14} />
              ) : index === current && working ? (
                <LoaderCircle size={14} className="spin" />
              ) : null}
            </span>
            {stage.label}
          </li>
        ))}
      </ol>
      {working && (
        <p className="media-readiness-note">
          Usually under a minute. Keep choosing your captions meanwhile.
        </p>
      )}
      {phase === "choose" && status && (
        <label className="field">
          Your file has more than one audio track
          <select
            disabled={busy}
            value={status.selectedTrack ?? ""}
            onChange={(e) => select(Number(e.target.value))}
          >
            <option value="" disabled>
              Choose an audio track
            </option>
            {status.audioTracks.map((t) => (
              <option value={t.index} key={t.index}>
                Track {t.index + 1}
                {t.language ? " — " + t.language : ""} · {t.channels} channel
                {t.channels === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </label>
      )}
      {error && <p role="alert">{error}</p>}
      {(phase === "error" || phase === "stalled") && (
        <button
          className="text-button"
          onClick={() => {
            setPhase("verifying");
            setElapsed(0);
            setAttempt((n) => n + 1);
          }}
        >
          Check again
        </button>
      )}
    </div>
  );
}
