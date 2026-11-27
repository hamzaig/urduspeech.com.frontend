import Link from "next/link";
import type { ReactNode } from "react";
import { AudioLines, Check, Circle, Clock, Play } from "lucide-react";
import type { JobStatusV1 } from "@/lib/contracts";

const milestones = [
  ["media", "Preparing audio"],
  ["timing", "Timing words"],
  ["canonical", "Transcribing speech"],
  ["correction", "Checking text"],
  ["variants", "Writing captions"],
  ["alignment", "Syncing captions"],
] as const;

const descriptions: Record<string, string> = {
  created: "Your recording is queued for processing.",
  upload_pending: "Waiting for the upload to finish.",
  uploaded: "Your recording is queued for processing.",
  validating: "Checking the recording before transcription.",
  quota_reserved: "Your recording is queued for audio preparation.",
  audio_preparing: "Preparing the audio track from your recording.",
  timing_transcribing: "Finding when each word is spoken.",
  canonical_transcribing: "Transcribing the words in your recording.",
  correcting: "Checking the text in your selected caption language.",
  aligning: "Matching each caption to the audio.",
  provider_retrying: "Waiting to retry. Processing will resume automatically.",
};

const activeMilestone: Record<string, string> = {
  audio_preparing: "media",
  timing_transcribing: "timing",
  canonical_transcribing: "canonical",
  correcting: "correction",
  aligning: "alignment",
};

export function GenerationPanel({
  job,
  mediaReady,
  busy,
  onStart,
  cancelAction,
}: {
  job: JobStatusV1 | null;
  mediaReady: boolean;
  busy: boolean;
  onStart: () => void;
  cancelAction: ReactNode;
}) {
  const stopped =
    !!job && ["failed", "cancelled", "validation_failed"].includes(job.state);
  const partial = job?.state === "partial_ready";
  const waiting = job?.freeQueueBusy && !stopped;
  const progress = !!job && !stopped && !partial;
  const done = new Set(job?.completedStages ?? []);
  if (job?.capabilities.timedCaptionsReady) done.add("alignment");
  const count = milestones.filter(([key]) => done.has(key)).length;
  const total = milestones.length;
  const writing =
    job?.state === "correcting" &&
    done.has("correction") &&
    !done.has("variants");
  const active =
    job && !waiting
      ? writing
        ? "variants"
        : activeMilestone[job.state]
      : null;

  let title = "Generating your captions";
  let detail = job
    ? (descriptions[job.state] ?? "Opening your project’s captions…")
    : "";
  if (!job) {
    title = "Ready to generate captions";
    detail = "Your recording has been checked.";
  } else if (stopped) {
    title =
      job.state === "cancelled"
        ? "Caption generation cancelled"
        : "Caption generation stopped";
    detail =
      job.errorCode?.replaceAll("_", " ").toLowerCase() ?? "You can try again.";
  } else if (partial) {
    title = "Transcript available";
    detail = "Some caption timings need review.";
  } else if (waiting) {
    title = "Your video is in the Free queue";
    detail =
      "Both Free workers are busy. Your video will start automatically when a slot opens.";
  } else if (writing) {
    detail = "Writing the captions in your selected format.";
  }
  return (
    <section className="generation-panel" aria-labelledby="generation-title">
      <div className="generation-heading">
        <span className="generation-symbol" aria-hidden="true">
          {waiting ? <Clock /> : <AudioLines />}
        </span>
        <div role="status" aria-atomic="true">
          <h2 id="generation-title">{title}</h2>
          <p>{detail}</p>
        </div>
      </div>
      {progress && (
        <div className="generation-progress">
          <div className="progress-count" aria-hidden="true">
            {count} of {total} stages complete
          </div>
          <progress
            value={count}
            max={total}
            aria-label="Caption generation progress"
            aria-valuetext={`${count} of ${total} stages complete`}
          />
          <ol
            className="generation-stages"
            aria-label="Caption generation stages"
          >
            {milestones.map(([key, label]) => {
              const complete = done.has(key);
              const current = key === active && !complete;
              return (
                <li
                  key={key}
                  data-complete={complete || undefined}
                  aria-current={current ? "step" : undefined}
                >
                  {complete ? (
                    <Check size={16} aria-hidden="true" />
                  ) : (
                    <Circle size={14} aria-hidden="true" />
                  )}
                  {label}
                  {complete && <span className="sr-only">, complete</span>}
                </li>
              );
            })}
          </ol>
        </div>
      )}
      {waiting && <Link href="/studio/billing">Compare paid plans</Link>}
      {mediaReady && (!job || stopped) && (
        <button onClick={onStart} disabled={busy}>
          <Play size={16} />
          {stopped ? "Try again" : "Generate captions"}
        </button>
      )}
      {job && (
        <div className="generation-footer">
          <details>
            <summary>Processing details</summary>
            <p>Status: {job.state.replaceAll("_", " ")}</p>
            <p>Support reference: {job.supportId}</p>
          </details>
          {cancelAction}
        </div>
      )}
    </section>
  );
}
