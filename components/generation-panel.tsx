import Link from "next/link";
import { Play } from "lucide-react";
import type { JobStatusV1 } from "@/lib/contracts";

const STAGES = [
  ["media", "Preparing audio"],
  ["canonical", "Transcribing speech"],
  ["timing", "Timing words"],
  ["correction", "Checking text"],
  ["variants", "Writing captions"],
] as const;

const FAILED = ["failed", "cancelled", "validation_failed"];

/**
 * Wizard step 3 while captions are being generated: a progress bar driven by
 * the job's completed stages, or a start button when no job exists yet.
 */
export function GenerationPanel({
  job,
  mediaReady,
  busy,
  onStart,
}: {
  job: JobStatusV1 | null;
  mediaReady: boolean;
  busy: boolean;
  onStart: () => void;
}) {
  const done = new Set(job?.completedStages ?? []);
  const failed = !!job && FAILED.includes(job.state);
  const percent = !job
    ? 0
    : Math.min(96, 6 + Math.round((done.size / STAGES.length) * 90));
  const current = STAGES.find(([key]) => !done.has(key));
  return (
    <section className="generation-panel" aria-labelledby="generation-title">
      <h2 id="generation-title">
        {failed
          ? "Caption generation stopped"
          : job?.freeQueueBusy
            ? "Your video is in the Free queue"
            : job
            ? "Generating your captions"
            : "Ready to generate captions"}
      </h2>
      {failed ? (
        <p>
          {job.errorCode
            ? `Reason: ${job.errorCode.replaceAll("_", " ").toLowerCase()}.`
            : "Processing did not finish."}{" "}
          Support reference: {job.supportId}. You can try again.
        </p>
      ) : job?.freeQueueBusy ? (
        <div>
          <p role="status">Both Free workers are busy. Your video will start automatically when a slot opens. You can leave this page.</p>
          <Link href="/studio/billing">Compare paid plans for separate processing slots</Link>
        </div>
      ) : job ? (
        <>
          <p role="status">
            {current ? current[1] + "…" : "Finishing up…"} This usually takes
            about as long as your recording. You can leave this page.
          </p>
          <progress
            max={100}
            value={percent}
            aria-label="Caption generation progress"
          />
          <ol className="generation-stages">
            {STAGES.map(([key, label]) => (
              <li key={key} data-done={done.has(key) || undefined}>
                {label}
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p>
          {mediaReady
            ? "Your recording is checked. Start generating captions."
            : "We are checking your recording. This takes a moment after upload."}
        </p>
      )}
      {(!job || failed) && (
        <div className="wizard-actions">
          <button onClick={onStart} disabled={busy || !mediaReady}>
            <Play size={16} aria-hidden="true" />
            {failed ? "Try again" : "Generate captions"}
          </button>
        </div>
      )}
    </section>
  );
}
