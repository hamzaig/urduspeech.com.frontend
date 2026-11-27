import Link from "next/link";
import type { ReactNode } from "react";
import { AudioLines, Check, Play } from "lucide-react";
import type { JobStatusV1 } from "@/lib/contracts";

const stages: Record<string, [string, string]> = {
  created: [
    "Preparing your recording",
    "Your recording is queued for processing.",
  ],
  uploaded: [
    "Preparing your recording",
    "Checking the source for caption generation.",
  ],
  validating: [
    "Checking your recording",
    "Verifying the media before transcription.",
  ],
  audio_preparing: [
    "Preparing audio",
    "Preparing the selected audio track for transcription.",
  ],
  timing_transcribing: [
    "Timing the speech",
    "Finding when each word is spoken.",
  ],
  canonical_transcribing: [
    "Transcribing speech",
    "Writing the words from your recording.",
  ],
  correcting: [
    "Checking your captions",
    "Preparing the text in your selected caption format.",
  ],
  aligning: [
    "Matching captions to your audio",
    "Your captions are written. We’re syncing each line with the recording.",
  ],
  provider_retrying: [
    "Waiting to retry",
    "Processing will resume automatically.",
  ],
  partial_ready: [
    "Your transcript is available",
    "Open the transcript below to review the available text.",
  ],
};

export function GenerationPanel({
  job,
  mediaReady,
  busy,
  onStart,
  reviewReady,
  renderState,
  cancelAction,
}: {
  job: JobStatusV1 | null;
  mediaReady: boolean;
  busy: boolean;
  onStart: () => void;
  reviewReady: boolean;
  renderState?: string;
  cancelAction: ReactNode;
}) {
  const stopped =
    !!job && ["failed", "cancelled", "validation_failed"].includes(job.state);
  const waiting = job?.freeQueueBusy && !stopped && !reviewReady;
  const [title, detail] = reviewReady
    ? [
        "Your captions are ready",
        renderState === "completed"
          ? "Your captioned MP4 is also ready to download."
          : renderState && !["failed", "cancelled"].includes(renderState)
            ? "Your MP4 is being prepared. You can review your captions now."
            : "Review the text and timing in your caption editor.",
      ]
    : stopped
      ? [
          job.state === "cancelled"
            ? "Caption generation cancelled"
            : "Caption generation stopped",
          job.errorCode?.replaceAll("_", " ").toLowerCase() ??
            "You can try again.",
        ]
      : waiting
        ? [
            "Your video is in the Free queue",
            "Both Free workers are busy. Your video will start automatically when a slot opens.",
          ]
        : job
          ? (stages[job.state] ?? [
              "Preparing your captions",
              "You can leave this page and return to your project later.",
            ])
          : [
              "Ready to generate captions",
              "Your recording is checked and ready.",
            ];
  return (
    <section
      className="generation-panel generation-focus"
      aria-labelledby="generation-title"
    >
      <div className="generation-symbol" aria-hidden="true">
        {reviewReady ? <Check /> : <AudioLines />}
      </div>
      <div role="status">
        <h2 id="generation-title">{title}</h2>
        <p>{detail}</p>
      </div>
      {waiting && <Link href="/studio/billing">Compare paid plans</Link>}
      {reviewReady && (
        <a className="button" href="#caption-editor-title">
          Review captions
        </a>
      )}
      {mediaReady && !reviewReady && (!job || stopped) && (
        <button onClick={onStart} disabled={busy}>
          <Play size={16} />
          {stopped ? "Try again" : "Generate captions"}
        </button>
      )}
      {job && (
        <details>
          <summary>Processing details</summary>
          <p>Status: {job.state.replaceAll("_", " ")}</p>
          <p>Support reference: {job.supportId}</p>
        </details>
      )}
      {cancelAction}
    </section>
  );
}
