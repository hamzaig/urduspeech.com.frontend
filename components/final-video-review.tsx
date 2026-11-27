"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";
import { api, explain, mutation } from "@/lib/api";
import type { DownloadGrant } from "@/lib/download";
import { fetchFinalVideo } from "@/lib/final-video";

type WebkitVideo = HTMLVideoElement & {
  webkitDisplayingFullscreen?: boolean;
  webkitExitFullscreen?: () => void;
};
const scores = ["Poor", "Fair", "Okay", "Good", "Excellent"];

export function FinalVideoReview({
  renderId,
  styleLabel,
  onClose,
}: {
  renderId: string;
  styleLabel: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<WebkitVideo>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const request = useRef<AbortController | null>(null);
  const promptChecked = useRef(false);
  const [attempt, setAttempt] = useState(0);
  const [src, setSrc] = useState("");
  const [loadError, setLoadError] = useState(false);
  const [percent, setPercent] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<
    "idle" | "form" | "skipped" | "sent" | "claim-error"
  >("idle");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!dialog.current?.open) dialog.current?.showModal();
    const controller = new AbortController();
    request.current = controller;
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let url = "";
    setSrc("");
    setPercent(null);
    setLoadError(false);
    async function load() {
      const grant = await api<DownloadGrant>(
        `/v1/renders/${renderId}/download-ticket`,
        {
          ...mutation("POST", {}),
          signal: controller.signal,
        },
      );
      const blob = await fetchFinalVideo(
        grant,
        controller.signal,
        (received, total) => {
          if (total && !controller.signal.aborted)
            setPercent(Math.round((100 * received) / total));
        },
      );
      if (controller.signal.aborted) return;
      url = URL.createObjectURL(blob);
      setSrc(url);
    }
    void load().catch(() => {
      if (!controller.signal.aborted) setLoadError(true);
    });
    return () => {
      controller.abort();
      if (url) URL.revokeObjectURL(url);
    };
  }, [renderId, attempt]);

  useEffect(() => {
    if (feedback === "form") heading.current?.focus();
  }, [feedback]);

  async function afterPlayback() {
    const signal = request.current?.signal;
    if (promptChecked.current || !signal || signal.aborted) return;
    promptChecked.current = true;
    let next: "form" | "claim-error";
    try {
      const result = await api<{ show: boolean }>(
        `/v1/renders/${renderId}/feedback-prompt`,
        {
          ...mutation("POST", {}),
          signal,
        },
      );
      if (!result.show) {
        if (!signal.aborted) setFeedback("skipped");
        return;
      }
      next = "form";
    } catch {
      // The server may have recorded the invitation before its reply was lost.
      next = "claim-error";
    }

    // Both the form and its manual fallback live outside the native video.
    const surface = dialog.current;
    const player = video.current;
    if (signal.aborted || !surface?.open) return;
    if (
      document.fullscreenElement &&
      surface.contains(document.fullscreenElement)
    ) {
      await document.exitFullscreen().catch(() => {});
    }
    if (player?.webkitDisplayingFullscreen) {
      try {
        player.webkitExitFullscreen?.();
      } catch {
        // Safari can leave native playback itself as the video ends.
      }
    }
    if (!signal.aborted && surface.open) setFeedback(next);
  }

  function skipFeedback() {
    setFeedback("skipped");
    setError("");
    requestAnimationFrame(() => video.current?.focus());
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const signal = request.current?.signal;
    if (rating === null || saving || !signal || signal.aborted) return;
    setSaving(true);
    setError("");
    try {
      await api<{ saved: true }>(`/v1/renders/${renderId}/feedback`, {
        ...mutation("POST", { rating, comment: comment.trim() || undefined }),
        // A submitted rating can finish even when the viewer leaves the page.
        keepalive: true,
        signal: AbortSignal.timeout?.(20000),
      });
      if (!signal.aborted) {
        setFeedback("sent");
        requestAnimationFrame(() => video.current?.focus());
      }
    } catch (e) {
      if (!signal.aborted) setError(explain(e));
    } finally {
      if (!signal.aborted) setSaving(false);
    }
  }

  return (
    <dialog
      ref={dialog}
      className="desk-dialog final-review"
      aria-labelledby="final-review-title"
      onClose={onClose}
      onCancel={(e) => {
        if (feedback === "form") {
          e.preventDefault();
          if (!saving) skipFeedback();
        }
      }}
    >
      <div className="dialog-title">
        <h2 id="final-review-title" ref={heading} tabIndex={-1}>
          {feedback === "form" ? "How was your final video?" : "Final video"}
        </h2>
        <button
          className="desk-menu"
          type="button"
          disabled={feedback === "form" && saving}
          aria-label={
            feedback === "form" ? "Dismiss feedback" : "Close final video"
          }
          onClick={() =>
            feedback === "form" ? skipFeedback() : dialog.current?.close()
          }
        >
          <X size={18} />
        </button>
      </div>
      <div hidden={feedback === "form"} className="final-playback">
        <p className="final-style">{styleLabel} · Downloadable MP4</p>
        {loadError ? (
          <div role="alert" className="final-load">
            <span>The final video could not be loaded.</span>
            <button
              className="secondary"
              type="button"
              onClick={() => setAttempt((a) => a + 1)}
            >
              Retry playback
            </button>
          </div>
        ) : src ? (
          <video
            ref={video}
            src={src}
            aria-label="Final captioned video"
            controls
            playsInline
            preload="metadata"
            onEnded={() => void afterPlayback()}
            onError={() => setLoadError(true)}
          />
        ) : (
          <div className="final-load" role="status">
            <span>
              Loading final video{percent !== null ? ` · ${percent}%` : "…"}
            </span>
            <progress
              aria-label="Final video loading"
              max={100}
              value={percent ?? undefined}
            />
          </div>
        )}
        {feedback === "sent" && (
          <p className="feedback-thanks" role="status">
            <Check size={16} /> Thanks for your feedback.
          </p>
        )}
        {feedback === "claim-error" && (
          <button
            className="text-button"
            type="button"
            onClick={() => setFeedback("form")}
          >
            Leave feedback
          </button>
        )}
      </div>
      {feedback === "form" && (
        <form
          onSubmit={submit}
          className="video-feedback-form"
          aria-busy={saving}
        >
          <fieldset disabled={saving}>
            <legend>Rate the finished video</legend>
            <div className="video-scores">
              {scores.map((label, index) => (
                <label key={label}>
                  <input
                    required
                    type="radio"
                    name="final-video-rating"
                    value={index + 1}
                    checked={rating === index + 1}
                    onChange={() => setRating(index + 1)}
                  />
                  <span>
                    <strong>{index + 1}</strong>
                    <small>{label}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label htmlFor="final-video-comment">
            Comments <span>(optional)</span>
          </label>
          <textarea
            id="final-video-comment"
            disabled={saving}
            maxLength={2000}
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {error && <p role="alert">{error}</p>}
          <div className="final-video-actions">
            <button type="submit" disabled={rating === null || saving}>
              {saving ? "Sending…" : "Send feedback"}
            </button>
            <button
              type="button"
              className="text-button"
              onClick={skipFeedback}
              disabled={saving}
            >
              Not now
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
