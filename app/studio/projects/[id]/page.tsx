"use client";
import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Captions,
  ChevronDown,
  Play,
  Save,
  Download,
  RefreshCw,
} from "lucide-react";
import { api, mutation, explain, ApiError } from "@/lib/api";
import { captionChanges } from "@/lib/caption-edits";
import { startDownload } from "@/lib/download";
import type {
  Project,
  Track,
  TrackList,
  Transcript,
  TranscriptList,
  JobStatusV1,
  Render,
  ExportFile,
  ProjectActivity,
} from "@/lib/contracts";
import { PageTitle, ErrorNotice, Saved } from "@/components/common";
import { outputLabel, type Preset } from "@/components/output-options";
import {
  TemplateLine,
  TemplatePicker,
  templateFrame,
} from "@/components/caption-template";
import { MediaReadiness } from "@/components/media-readiness";
import {
  CaptionStage,
  PlacementControls,
  defaultPlacement,
  type CaptionPlacement,
} from "@/components/caption-stage";
import { GenerationPanel } from "@/components/generation-panel";
import { sampleLines } from "@/components/caption-choice-step";
import { initialDefaults } from "@/components/output-options";
import type { Defaults } from "@/lib/contracts";
import { WizardSteps } from "@/components/wizard-steps";
import type { CaptionFontChoice } from "@/lib/caption-fonts";
import { ResumeUpload } from "@/components/resume-upload";
type Cue = Track["content"]["cues"][number];
const terminal = ["completed", "failed", "cancelled"];
/** Project settings as caption defaults (for the sample shown pre-captions). */
function validDefaults(settings: Record<string, unknown>): Defaults {
  return { ...initialDefaults, ...(settings as Partial<Defaults>) };
}
const settledJobs = [...terminal, "ready_for_review", "partial_ready"];
export default function ProjectEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null),
    [tracks, setTracks] = useState<TrackList["tracks"]>([]),
    [track, setTrack] = useState<Track | null>(null),
    [cues, setCues] = useState<Cue[]>([]),
    [transcript, setTranscript] = useState<Transcript | null>(null),
    [job, setJob] = useState<JobStatusV1 | null>(null),
    [render, setRender] = useState<Render | null>(null),
    [presets, setPresets] = useState<Preset[]>([]),
    [preset, setPreset] = useState(""),
    [files, setFiles] = useState<ExportFile[]>([]),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [dirty, setDirty] = useState(false),
    [saved, setSaved] = useState(""),
    [remoteMedia, setRemoteMedia] = useState<{
      url: string;
      audio: boolean;
    } | null>(null),
    [previewState, setPreviewState] = useState<
      "loading" | "ready" | "pending" | "expired" | "error"
    >("loading"),
    [time, setTime] = useState(0),
    [remove, setRemove] = useState(false),
    [placement, setPlacement] = useState<CaptionPlacement | null>(null),
    [placementStatus, setPlacementStatus] = useState(""),
    [portrait, setPortrait] = useState(false);
  // Bumped on each customer drag/resize; a debounced PATCH saves the latest.
  const placementEdit = useRef(0);
  const [mediaReady, setMediaReady] = useState(false);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState<number | null>(null);
  const player = useRef<HTMLMediaElement>(null);
  // Resume point and retry budget when a signed storage URL lapses mid-session.
  const resumeAt = useRef(0);
  const previewRetries = useRef(0);
  const pendingCaptionSave = useRef<{
    trackId: string;
    etag: string;
    body: string;
    key: string;
  } | null>(null);
  const alive = useRef(true);
  async function load() {
    const [p, t, v, styles, activity] = await Promise.all([
      api<Project>("/v1/projects/" + id),
      api<TrackList>(`/v1/projects/${id}/caption-tracks`),
      api<TranscriptList>(`/v1/projects/${id}/transcripts`),
      api<{ presets: Preset[] }>("/v1/caption-presets"),
      api<ProjectActivity>(`/v1/projects/${id}/activity`),
    ]);
    if (!alive.current) return;
    // Before generation starts, the project is set up in the caption wizard
    // (it restores the customer's step and choices), not on this page.
    const uploaded = activity.uploads.length > 0,
      uploading = activity.uploads.some((upload) =>
        ["uploading", "completing"].includes(upload.state),
      );
    if (
      uploaded &&
      !uploading &&
      !activity.jobs.length &&
      !t.tracks.length &&
      !v.versions.length
    ) {
      router.replace(`/studio/new?project=${id}`);
      return;
    }
    if (!placementEdit.current) {
      const saved = p.settings.captionPlacement as
        | CaptionPlacement
        | null
        | undefined;
      setPlacement(saved ?? null);
    }
    setTracks(t.tracks);
    setPresets(styles.presets);
    setUploadId(
      activity.uploads.find((upload) =>
        ["uploading", "completing"].includes(upload.state),
      )?.id ?? null,
    );
    const [recoveredJob, recoveredRender, recoveredFiles] = await Promise.all([
      activity.jobs[0]
        ? api<JobStatusV1>("/v1/jobs/" + activity.jobs[0].id)
        : Promise.resolve(null),
      activity.renders[0]
        ? api<Render>("/v1/renders/" + activity.renders[0].id)
        : Promise.resolve(null),
      Promise.all(
        activity.exports.map((file) =>
          api<ExportFile>("/v1/exports/" + file.id),
        ),
      ),
    ]);
    if (!alive.current) return;
    setProject(p);
    setJob(recoveredJob);
    setRender(recoveredRender);
    const selectedTrackId = track?.id ?? t.tracks[0]?.id;
    setFiles(
      recoveredFiles.filter(
        (file) =>
          file.trackId === selectedTrackId ||
          (!file.trackId && file.sourceVersionId === v.versions.at(-1)?.id),
      ),
    );
    setPreset(
      (old) =>
        old ||
        (typeof p.settings.captionPresetVersionId === "string"
          ? p.settings.captionPresetVersionId
          : (styles.presets[0]?.id ?? "")),
    );
    const latest = v.versions.at(-1);
    if (latest)
      setTranscript(await api<Transcript>("/v1/transcripts/" + latest.id));
    if (t.tracks.length && !track) {
      const current = await api<Track>("/v1/caption-tracks/" + t.tracks[0].id);
      if (alive.current) {
        setTrack(current);
        setCues(current.content.cues);
      }
    }
  }
  useEffect(() => {
    alive.current = true;
    load().catch((e) => {
      if (alive.current) setError(explain(e));
    });
    return () => {
      alive.current = false;
    };
  }, [id]);
  useEffect(() => {
    if (!job || settledJobs.includes(job.state)) return;
    const timer = setTimeout(
      () => {
        api<JobStatusV1>("/v1/jobs/" + job.id)
          .then(async (j) => {
            if (!alive.current) return;
            setJob(j);
            if (settledJobs.includes(j.state)) await load();
          })
          .catch((e) => {
            if (alive.current) {
              setError(explain(e));
              setJob((old) => (old ? { ...old } : old));
            }
          });
      },
      Math.max(2000, Math.min(job.retryAfterSeconds * 1000, 30000)),
    );
    return () => clearTimeout(timer);
  }, [job]);
  useEffect(() => {
    if (!files.some((f) => f.state === "pending")) return;
    const timer = setTimeout(() => {
      Promise.all(
        files.map((f) =>
          f.state === "pending"
            ? api<ExportFile>("/v1/exports/" + f.id)
            : Promise.resolve(f),
        ),
      )
        .then((f) => {
          if (alive.current) setFiles(f);
        })
        .catch((e) => {
          if (alive.current) {
            setError(explain(e));
            setFiles((old) => [...old]);
          }
        });
    }, 2500);
    return () => clearTimeout(timer);
  }, [files]);
  useEffect(() => {
    if (!render || terminal.includes(render.state)) return;
    const timer = setTimeout(() => {
      api<Render>("/v1/renders/" + render.id)
        .then((r) => {
          if (alive.current) setRender(r);
        })
        .catch((e) => {
          if (alive.current) {
            setError(explain(e));
            setRender((old) => (old ? { ...old } : old));
          }
        });
    }, 3000);
    return () => clearTimeout(timer);
  }, [render]);
  // The editor always plays the uploaded source from storage (S3) through a
  // short-lived signed URL; no local copy of the recording is needed.
  async function loadPreview() {
    try {
      const preview = await api<{
        url: string;
        expiresIn: number;
        kind: "video" | "audio";
      }>(`/v1/projects/${id}/preview`);
      if (!alive.current) return;
      setRemoteMedia({ url: preview.url, audio: preview.kind === "audio" });
      setPreviewState("ready");
    } catch (e) {
      if (!alive.current) return;
      setRemoteMedia(null);
      setPreviewState(
        e instanceof ApiError && e.status === 410
          ? "expired"
          : e instanceof ApiError && e.status === 409
            ? "pending"
            : "error",
      );
    }
  }
  useEffect(() => {
    if (remoteMedia) return;
    void loadPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mediaReady]);
  // Save the caption position/size to the project; the next MP4 uses it.
  useEffect(() => {
    if (!placementEdit.current) return;
    const edit = placementEdit.current;
    setPlacementStatus("Saving position…");
    const timer = setTimeout(() => {
      api<Project>(
        "/v1/projects/" + id,
        mutation("PATCH", { settings: { captionPlacement: placement } }),
      )
        .then((p) => {
          if (!alive.current || edit !== placementEdit.current) return;
          setProject(p);
          setPlacementStatus(
            render
              ? "Position saved. Create the MP4 again to apply it."
              : "Position saved. Your MP4 will use it.",
          );
        })
        .catch((e) => {
          if (alive.current) setPlacementStatus(explain(e));
        });
    }, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement]);
  // Step 3 style choice: saved to the project so every later MP4 (including
  // automatic ones) uses it.
  function chooseStyle(next: string) {
    setPreset(next);
    setPlacementStatus("Saving style…");
    api<Project>(
      "/v1/projects/" + id,
      mutation("PATCH", { settings: { captionPresetVersionId: next } }),
    )
      .then((p) => {
        if (!alive.current) return;
        setProject(p);
        setPlacementStatus(
          render
            ? "Style saved. Create the MP4 again to apply it."
            : "Style saved.",
        );
      })
      .catch((e) => {
        if (alive.current) setPlacementStatus(explain(e));
      });
  }
  function changePlacement(next: CaptionPlacement | null) {
    placementEdit.current += 1;
    setPlacement(next);
  }
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  async function action(task: () => Promise<void>) {
    setBusy(true);
    setError("");
    setSaved("");
    try {
      await task();
    } catch (e) {
      setError(explain(e));
    } finally {
      setBusy(false);
    }
  }
  function updateCue(
    index: number,
    key: "text" | "startMs" | "endMs",
    value: string | number,
  ) {
    setCues((old) =>
      old.map((c, i) =>
        i === index ? { ...c, [key]: value, granularity: "customer" } : c,
      ),
    );
    setDirty(true);
  }
  async function switchTrack(next: string) {
    if (dirty && !window.confirm("Discard unsaved caption changes?")) return;
    await action(async () => {
      const t = await api<Track>("/v1/caption-tracks/" + next);
      setTrack(t);
      setCues(t.content.cues);
      setDirty(false);
      setFiles([]);
    });
  }
  async function save() {
    if (!track) return;
    await action(async () => {
      const changes = captionChanges(track.content.cues, cues);
      if (!changes.length) {
        setDirty(false);
        return;
      }
      for (let i = 0; i < cues.length; i++) {
        const c = cues[i];
        if (
          !c.text.trim() ||
          !Number.isInteger(c.startMs) ||
          !Number.isInteger(c.endMs) ||
          c.startMs < 0 ||
          c.endMs <= c.startMs ||
          c.endMs > track.content.mediaDurationMs ||
          (i > 0 && c.startMs < cues[i - 1].endMs)
        ) {
          setError(
            "Each caption needs text and a start/end time within the media duration. Captions cannot overlap.",
          );
          return;
        }
      }
      const body = JSON.stringify({ changes });
      const pending = pendingCaptionSave.current;
      const key =
        pending?.trackId === track.id &&
        pending.etag === track.etag &&
        pending.body === body
          ? pending.key
          : crypto.randomUUID();
      pendingCaptionSave.current = {
        trackId: track.id,
        etag: track.etag,
        body,
        key,
      };
      const t = await api<Track>("/v1/caption-tracks/" + track.id, {
        method: "PATCH",
        body,
        headers: {
          "If-Match": track.etag,
          "Idempotency-Key": key,
        },
      });
      pendingCaptionSave.current = null;
      setTrack(t);
      setCues(t.content.cues);
      setTracks((old) => [
        {
          id: t.id,
          sourceVersionId: t.sourceVersionId,
          version: t.version,
          parentTrackId: t.parentTrackId,
          variant: t.content.variant,
          timingReady: t.content.timingReady,
        },
        ...old.filter((entry) => entry.id !== t.id),
      ]);
      setDirty(false);
      setFiles([]);
      setSaved("Caption changes saved.");
    });
  }
  async function process() {
    await action(async () => {
      const j = await api<JobStatusV1>(
        `/v1/projects/${id}/process`,
        mutation("POST", {}, crypto.randomUUID()),
      );
      setJob(j);
    });
  }
  async function exports() {
    if (!track) return;
    await action(async () => {
      const result = await api<{ exports: ExportFile[] }>(
        `/v1/projects/${id}/exports`,
        mutation(
          "POST",
          {
            sourceVersionId: track.sourceVersionId,
            variant: track.content.variant,
            trackId: track.id,
            formats: track.content.timingReady
              ? ["txt", "srt", "vtt"]
              : ["txt"],
          },
          crypto.randomUUID(),
        ),
      );
      setFiles(result.exports);
    });
  }
  async function renderVideo() {
    if (!track || !preset) return;
    await action(async () => {
      setRender(
        await api<Render>(
          `/v1/projects/${id}/renders`,
          mutation(
            "POST",
            {
              sourceVersionId: track.sourceVersionId,
              trackId: track.id,
              presetVersionId: preset,
            },
            crypto.randomUUID(),
          ),
        ),
      );
    });
  }
  async function decision(
    correctionId: string,
    decision: "accepted" | "rejected",
  ) {
    if (!transcript) return;
    await action(async () => {
      const t = await api<Transcript>(
        `/v1/transcripts/${transcript.id}/corrections/${correctionId}/decisions`,
        {
          ...mutation("POST", { decision }),
          headers: {
            "If-Match": transcript.etag,
            "Idempotency-Key": crypto.randomUUID(),
          },
        },
      );
      setTranscript(t);
      setTrack(null);
      setCues([]);
      setFiles([]);
      setDirty(false);
      setSaved(
        "Correction decision saved. Reload captions when derivation finishes.",
      );
    });
  }
  const activeCue = cues.find((c) => time >= c.startMs && time < c.endMs);
  const playableMedia = previewState === "ready" ? remoteMedia : null;
  const previewCue = playableMedia
    ? activeCue
    : (cues.find(({ position }) => position === previewPosition) ?? cues[0]);
  // The stage shows the cue under the playhead, or the selected/first cue
  // while paused at the start so its position can be adjusted.
  const stageCue =
    activeCue ??
    (previewPosition !== null || time === 0
      ? (cues.find(({ position }) => position === previewPosition) ?? cues[0])
      : undefined);
  const stageProgress = stageCue
    ? Math.max(
        0,
        Math.min(
          0.999,
          (time - stageCue.startMs) /
            Math.max(1, stageCue.endMs - stageCue.startMs),
        ),
      )
    : 0;
  const generating = !!job && !settledJobs.includes(job.state);
  const previewPreset = presets.find(({ id }) => id === preset);
  const hasDraft = !!(track || transcript);
  const processingStatus =
    job?.state.replaceAll("_", " ") ??
    (track
      ? "Captions ready"
      : transcript
        ? "Transcript ready"
        : mediaReady
          ? "Ready to transcribe"
          : "Media check");
  return (
    <div className="page editor-page">
      <Link
        href="/studio"
        className="project-back"
        onNavigate={(event) => {
          if (dirty && !window.confirm("Discard unsaved caption changes?")) {
            event.preventDefault();
          }
        }}
      >
        <ArrowLeft size={16} aria-hidden="true" /> My projects
      </Link>
      <PageTitle
        title={project ? <bdi>{project.title}</bdi> : "Your project"}
        description={
          project && !hasDraft
            ? "Check your recording and start transcription."
            : undefined
        }
      />
      {error && (
        <ErrorNotice
          message={error}
          retry={project ? undefined : () => action(load)}
        />
      )}
      {saved && <Saved>{saved}</Saved>}{" "}
      {!project && !error && <p role="status">Loading your project…</p>}
      {project && (
        <>
          {uploadId && (
            <ResumeUpload
              key={uploadId}
              uploadId={uploadId}
              onComplete={load}
            />
          )}
          {!track && <WizardSteps current={5} />}
          {(!track || generating) && (job || (mediaReady && !uploadId)) && (
            <GenerationPanel
              job={job}
              mediaReady={mediaReady}
              busy={busy}
              onStart={process}
            />
          )}
          <div className="project-status-bar">
            <details className="processing-panel" open={!hasDraft}>
              <summary>
                <strong>Project status</strong>
                <span className="status-label" role="status">
                  {processingStatus}
                </span>
                <ChevronDown size={17} aria-hidden="true" />
              </summary>
              <div className="processing-grid">
                <MediaReadiness projectId={id} onReady={setMediaReady} />
                <section className="job-status" aria-label="Transcription">
                  <p>
                    {job
                      ? `Completed stages: ${job.completedStages.join(", ") || "Waiting to start"}`
                      : "Media is checked before processing. Start transcription once your upload has finished validation."}
                  </p>
                  {job?.errorCode && (
                    <p>
                      Processing stopped: {job.errorCode}. Support reference:{" "}
                      {job.supportId}.
                    </p>
                  )}
                  <div className="actions">
                    {track && !generating && mediaReady && !uploadId && (!job || settledJobs.includes(job.state)) && (
                    <button
                      onClick={process}
                      disabled={
                        busy ||
                        !mediaReady ||
                        (!!job && !settledJobs.includes(job.state))
                      }
                    >
                      <Play size={16} />
                      Start transcription
                    </button>
                    )}
                    {job?.capabilities.canCancel && (
                      <button
                        className="secondary"
                        disabled={busy}
                        onClick={() =>
                          (![
                            "created",
                            "upload_pending",
                            "uploaded",
                            "validating",
                            "quota_reserved",
                          ].includes(job.state) &&
                            !window.confirm(
                              "Processing has already started, so these minutes will still be used. Retrying this file later will not charge them again. Cancel processing?",
                            )) ||
                          action(async () =>
                            setJob(
                              await api<JobStatusV1>(
                                "/v1/jobs/" + job.id + "/cancel",
                                mutation("POST", {}, crypto.randomUUID()),
                              ),
                            ),
                          )
                        }
                      >
                        Cancel processing
                      </button>
                    )}
                    <button
                      className="text-button"
                      disabled={busy}
                      onClick={() =>
                        action(async () => {
                          await api(
                            `/v1/projects/${id}/make-default`,
                            mutation("POST", {}),
                          );
                          setSaved(
                            "These project choices are now your defaults.",
                          );
                        })
                      }
                    >
                      Save as defaults
                    </button>
                  </div>
                </section>
              </div>
            </details>
            <button
              className="secondary refresh-project"
              aria-label="Refresh project"
              disabled={busy || dirty}
              onClick={() => action(load)}
            >
              <RefreshCw size={16} aria-hidden="true" />
              <span>Refresh</span>
            </button>
          </div>
          <div className="editor-grid">
            <section
              className="editor-content"
              aria-labelledby="caption-editor-title"
            >
              <div className="editor-toolbar">
                <h2 id="caption-editor-title">
                  <Captions size={19} aria-hidden="true" />
                  {track ? "Caption editor" : "Transcript"}
                </h2>
                <div className="editor-shortcuts">
                  <a className="text-button editor-jump" href="#media-preview">
                    Preview
                  </a>
                  <a className="text-button" href="#editor-exports">
                    Exports
                  </a>
                </div>
              </div>
              <div className="editor-controls">
                {tracks.length > 0 && (
                  <label className="inline-select">
                    <span>Output</span>
                    <select
                      value={track?.id ?? ""}
                      onChange={(e) => switchTrack(e.target.value)}
                      disabled={busy}
                    >
                      <option value="" disabled>
                        Choose captions
                      </option>
                      {tracks.map((t) => (
                        <option key={t.id} value={t.id}>
                          {outputLabel(t.variant)} · version {t.version}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                {track && (
                  <div className="editor-save">
                    {dirty && <small role="status">Unsaved changes</small>}
                    <button
                      aria-label="Save caption changes"
                      disabled={!dirty || busy}
                      onClick={save}
                    >
                      <Save size={16} aria-hidden="true" />
                      Save
                    </button>
                  </div>
                )}
              </div>
              {track ? (
                <>
                  <p className="subtitle">
                    Times are in seconds. Saving creates a new version.
                  </p>
                  {track.content.qa.defects.length > 0 && (
                    <p className="notice">
                      Timing needs attention:{" "}
                      {track.content.qa.defects.join(", ")}. Timed exports may
                      be unavailable.
                    </p>
                  )}
                  <div
                    className="cue-list"
                    role="region"
                    aria-label="Caption lines"
                    tabIndex={0}
                  >
                    {cues.map((c, i) => (
                      <div
                        className={previewCue === c ? "cue cue-current" : "cue"}
                        key={c.position}
                      >
                        <div className="cue-meta">
                          <button
                            className="text-button"
                            aria-label={`${playableMedia ? "Play" : "Preview"} caption ${i + 1}`}
                            aria-pressed={
                              playableMedia ? undefined : previewCue === c
                            }
                            onClick={() => {
                              setPreviewPosition(c.position);
                              if (player.current) {
                                player.current.currentTime = c.startMs / 1000;
                                player.current.play().catch(() => {});
                              }
                            }}
                          >
                            {playableMedia ? (
                              <Play size={13} aria-hidden="true" />
                            ) : (
                              <Captions size={13} aria-hidden="true" />
                            )}
                            {i + 1}
                          </button>
                          <label>
                            Start
                            <input
                              className="time-input"
                              type="number"
                              step="0.001"
                              min={0}
                              disabled={busy}
                              value={c.startMs / 1000}
                              onChange={(e) =>
                                updateCue(
                                  i,
                                  "startMs",
                                  Math.round(Number(e.target.value) * 1000),
                                )
                              }
                            />
                          </label>
                          <label>
                            End
                            <input
                              className="time-input"
                              type="number"
                              step="0.001"
                              min={0}
                              disabled={busy}
                              value={c.endMs / 1000}
                              onChange={(e) =>
                                updateCue(
                                  i,
                                  "endMs",
                                  Math.round(Number(e.target.value) * 1000),
                                )
                              }
                            />
                          </label>
                          {c.fallback && <span>Review timing</span>}
                        </div>
                        <textarea
                          className="cue-text"
                          dir="auto"
                          lang={
                            track.content.variant === "urdu" ? "ur" : undefined
                          }
                          aria-label={"Caption " + (i + 1)}
                          disabled={busy}
                          value={c.text}
                          onFocus={() => setPreviewPosition(c.position)}
                          onChange={(e) => updateCue(i, "text", e.target.value)}
                          maxLength={5000}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : transcript ? (
                <div className="transcript-text" dir="auto">
                  {transcript.text}
                </div>
              ) : (
                <div className="editor-empty">
                  <Captions size={26} aria-hidden="true" />
                  <div>
                    <h3>Your words will appear here.</h3>
                    <p>Finish your upload, then start transcription.</p>
                  </div>
                </div>
              )}
              {transcript && transcript.corrections.length > 0 && (
                <section className="form-section">
                  <h2>AI corrections</h2>
                  {transcript.corrections.map((c) => (
                    <article className="correction" key={c.id}>
                      <p dir="auto">
                        <del>{c.before}</del> <ins>{c.after}</ins>
                      </p>
                      <p>{c.reason}</p>
                      <small>{c.status}</small>
                      <div className="actions">
                        <button
                          className="secondary"
                          disabled={busy || dirty || !transcript.isHead}
                          onClick={() => decision(c.id, "accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="secondary"
                          disabled={busy || dirty || !transcript.isHead}
                          onClick={() => decision(c.id, "rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    </article>
                  ))}
                </section>
              )}
            </section>
            <aside className="editor-aside" aria-label="Preview and export">
              <section
                id="media-preview"
                tabIndex={-1}
                className="editor-preview"
                aria-labelledby="media-preview-title"
              >
                <h2 id="media-preview-title">Media preview</h2>
                {!playableMedia && previewCue && (
                  <p className="sr-only" role="status">
                    Previewing caption {cues.indexOf(previewCue) + 1}.
                  </p>
                )}
                {playableMedia ? (
                  <>
                    <CaptionStage
                      src={playableMedia.url}
                      audio={playableMedia.audio}
                      template={previewPreset}
                      lines={
                        stageCue
                          ? stageCue.text.split("\n")
                          : !track && project
                            ? sampleLines(validDefaults(project.settings))
                            : []
                      }
                      time={stageProgress}
                      placement={placement}
                      fonts={
                        project?.settings.captionFonts as
                          | CaptionFontChoice
                          | null
                          | undefined
                      }
                      onPlacementChange={track ? changePlacement : undefined}
                      playerRef={(element: HTMLMediaElement | null) => {
                        player.current = element;
                      }}
                      onTimeUpdate={(ms) => {
                        previewRetries.current = 0;
                        setTime(ms);
                      }}
                      onLoadedMetadata={(media) => {
                        if (resumeAt.current)
                          media.currentTime = resumeAt.current / 1000;
                        resumeAt.current = 0;
                        setPortrait(
                          media instanceof HTMLVideoElement &&
                            media.videoHeight > media.videoWidth,
                        );
                      }}
                      onError={() => {
                        // A lapsed signed URL: fetch a fresh one and resume.
                        if (previewRetries.current < 2) {
                          previewRetries.current += 1;
                          resumeAt.current = time;
                          void loadPreview();
                        } else setPreviewState("error");
                      }}
                    />
                    {track && !playableMedia.audio && (
                      <PlacementControls
                        placement={placement}
                        fallback={defaultPlacement(previewPreset, portrait)}
                        onChange={changePlacement}
                        status={placementStatus}
                      />
                    )}
                  </>
                ) : (
                  <div className="editor-player-frame preview-empty">
                    <div className="preview-placeholder" role="status">
                      {previewState === "loading" ? (
                        <small>Loading your recording…</small>
                      ) : previewState === "pending" ? (
                        <small>
                          Your recording will appear here once the upload
                          finishes.
                        </small>
                      ) : previewState === "expired" ? (
                        <small>
                          The original recording was removed after its
                          retention period. Captions and exports remain
                          available.
                        </small>
                      ) : (
                        <>
                          <small>The recording could not be loaded.</small>
                          <button
                            className="secondary"
                            type="button"
                            onClick={() => {
                              previewRetries.current = 0;
                              setPreviewState("loading");
                              void loadPreview();
                            }}
                          >
                            <RefreshCw size={17} aria-hidden="true" /> Try
                            again
                          </button>
                        </>
                      )}
                    </div>
                    {previewCue && previewPreset && (
                      <div
                        className="local-caption template-overlay"
                        data-band={
                          previewPreset.style?.boxStyle === "band" || undefined
                        }
                        style={templateFrame(previewPreset)}
                      >
                        {previewCue.text.split("\n").map((line, index) => (
                          <TemplateLine
                            key={index}
                            template={previewPreset}
                            text={line}
                            dir="auto"
                            lang={
                              /\p{Script=Arabic}/u.test(line) ? "ur" : undefined
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <fieldset
                  className="editor-caption-presets"
                  disabled={busy}
                  aria-describedby="preset-preview-note"
                >
                  <legend>Caption style</legend>
                  <TemplatePicker
                    templates={presets}
                    value={preset || null}
                    onChange={(next) => next && chooseStyle(next)}
                    name="render-preset"
                    disabled={busy}
                  />
                  <small id="preset-preview-note">
                    {presets.length
                      ? "Preview is approximate; the MP4 uses the server template. Premium templates need a paid plan."
                      : "Caption styles are unavailable."}
                  </small>
                </fieldset>
              </section>
              <section
                className="editor-exports"
                id="editor-exports"
                tabIndex={-1}
                aria-labelledby="editor-exports-title"
              >
                <h2 id="editor-exports-title">Export</h2>
                {dirty && (
                  <p className="caption-note">
                    Save your changes before exporting.
                  </p>
                )}
                <div className="export-actions">
                  <button disabled={busy || dirty || !track} onClick={exports}>
                    <Download size={15} />
                    {track?.content.timingReady
                      ? "Prepare TXT, SRT & VTT"
                      : "Prepare transcript (TXT)"}
                  </button>
                  <button
                    className="secondary"
                    disabled={
                      busy ||
                      dirty ||
                      !track?.content.timingReady ||
                      !preset ||
                      (!!render && !terminal.includes(render.state))
                    }
                    onClick={renderVideo}
                  >
                    Render captioned MP4
                  </button>
                </div>
                {files.map((f) => (
                  <div key={f.id} className="actions">
                    {f.state === "ready" && f.downloadPath ? (
                      <button
                        className="button secondary"
                        disabled={busy || dirty}
                        onClick={() =>
                          action(() => startDownload(f.downloadPath!))
                        }
                      >
                        Download {f.format.toUpperCase()} (
                        {outputLabel(f.variant)})
                      </button>
                    ) : (
                      <span className="caption-note">
                        {f.format.toUpperCase()}: {f.state}
                        {f.errorCode ? " — " + f.errorCode : ""}
                      </span>
                    )}
                  </div>
                ))}
                {render && (
                  <div className="notice">
                    <p>Video render: {render.state}</p>
                    {render.state === "completed" ? (
                      <button
                        className="button secondary"
                        disabled={busy || dirty}
                        onClick={() =>
                          action(() =>
                            startDownload(
                              "/v1/renders/" + render.id + "/download",
                            ),
                          )
                        }
                      >
                        Download MP4
                      </button>
                    ) : (
                      !terminal.includes(render.state) && (
                        <button
                          className="text-button"
                          disabled={busy}
                          onClick={() =>
                            action(async () =>
                              setRender(
                                await api<Render>(
                                  "/v1/renders/" + render.id + "/cancel",
                                  mutation("POST", {}, crypto.randomUUID()),
                                ),
                              ),
                            )
                          }
                        >
                          Cancel render
                        </button>
                      )
                    )}
                    {render.errorCode && <p>{render.errorCode}</p>}
                  </div>
                )}
              </section>
            </aside>
          </div>
          <details className="danger-zone">
            <summary>Delete this project</summary>
            <p>Starts permanent deletion of this project and its media.</p>
            <label className="check-row">
              <input
                type="checkbox"
                checked={remove}
                onChange={(e) => setRemove(e.target.checked)}
              />
              I want to permanently delete this project.
            </label>
            <button
              className="danger"
              disabled={!remove || busy}
              onClick={() =>
                action(async () => {
                  await api("/v1/projects/" + id, {
                    method: "DELETE",
                    headers: { "Idempotency-Key": crypto.randomUUID() },
                  });
                  router.push("/studio");
                })
              }
            >
              Delete project
            </button>
          </details>
        </>
      )}
    </div>
  );
}
