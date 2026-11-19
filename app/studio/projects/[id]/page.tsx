"use client";
import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Captions,
  ChevronDown,
  FolderOpen,
  Play,
  Save,
  Download,
  RefreshCw,
} from "lucide-react";
import { api, mutation, explain } from "@/lib/api";
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
import { MediaReadiness } from "@/components/media-readiness";
import { ResumeUpload } from "@/components/resume-upload";
type Cue = Track["content"]["cues"][number];
const terminal = ["completed", "failed", "cancelled"];
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
    [localMedia, setLocalMedia] = useState<{
      url: string;
      name: string;
      audio: boolean;
    } | null>(null),
    [previewError, setPreviewError] = useState(false),
    [time, setTime] = useState(0),
    [remove, setRemove] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState<number | null>(null);
  const player = useRef<HTMLMediaElement>(null);
  const previewInput = useRef<HTMLInputElement>(null);
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
    setProject(p);
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
  useEffect(
    () => () => {
      if (localMedia) URL.revokeObjectURL(localMedia.url);
    },
    [localMedia],
  );
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
  const playableMedia = previewError ? null : localMedia;
  const previewCue = playableMedia
    ? activeCue
    : (cues.find(({ position }) => position === previewPosition) ?? cues[0]);
  const PreviewPlayer = localMedia?.audio ? "audio" : "video";
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
                    {job?.capabilities.canCancel && (
                      <button
                        className="secondary"
                        disabled={busy}
                        onClick={() =>
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
                      Make project choices my defaults
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
                <div
                  className={
                    "editor-player-frame " +
                    (playableMedia
                      ? playableMedia.audio
                        ? "audio-preview"
                        : ""
                      : "preview-empty")
                  }
                >
                  {playableMedia ? (
                    <PreviewPlayer
                      key={playableMedia.url}
                      ref={(element: HTMLMediaElement | null) => {
                        player.current = element;
                      }}
                      className="local-player"
                      aria-label={playableMedia.name}
                      src={playableMedia.url}
                      controls
                      playsInline={!playableMedia.audio || undefined}
                      onError={() => setPreviewError(true)}
                      onTimeUpdate={(e) =>
                        setTime(e.currentTarget.currentTime * 1000)
                      }
                    />
                  ) : (
                    <div className="preview-placeholder">
                      <button
                        className="secondary"
                        type="button"
                        onClick={() => previewInput.current?.click()}
                      >
                        <FolderOpen size={17} aria-hidden="true" /> Choose
                        original recording
                      </button>
                      <small>Preview stays on this device.</small>
                    </div>
                  )}
                  {previewCue && (
                    <div
                      className={
                        previewPreset?.box
                          ? "local-caption boxed"
                          : "local-caption"
                      }
                    >
                      <p
                        lang={
                          track?.content.variant === "urdu" ? "ur" : undefined
                        }
                        dir="auto"
                        style={{ color: previewPreset?.color }}
                      >
                        {previewCue.text}
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={previewInput}
                  className="visually-hidden"
                  type="file"
                  aria-label="Original audio or video"
                  tabIndex={-1}
                  accept="audio/*,video/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    e.currentTarget.value = "";
                    if (!file) return;
                    setPreviewError(false);
                    setTime(0);
                    setLocalMedia({
                      url: URL.createObjectURL(file),
                      name: file.name,
                      audio: file.type.startsWith("audio/"),
                    });
                  }}
                />
                {playableMedia && (
                  <div className="preview-file">
                    <small>
                      <bdi>{playableMedia.name}</bdi>
                    </small>
                    <button
                      className="text-button"
                      type="button"
                      onClick={() => previewInput.current?.click()}
                    >
                      Change recording
                    </button>
                  </div>
                )}
                {previewError && (
                  <p className="notice" role="status">
                    This browser could not play the selected file. Try a
                    compatible copy of the recording.
                  </p>
                )}
                <fieldset
                  className="editor-caption-presets"
                  disabled={busy}
                  aria-describedby="preset-preview-note"
                >
                  <legend>Caption style</legend>
                  <div className="editor-preset-grid">
                    {presets.map((p) => (
                      <label key={p.id} className="editor-preset">
                        <input
                          type="radio"
                          name="render-preset"
                          value={p.id}
                          checked={p.id === preset}
                          onChange={() => setPreset(p.id)}
                        />
                        <span
                          className="editor-preset-sample"
                          aria-hidden="true"
                        >
                          <span
                            lang="ur"
                            dir="rtl"
                            style={{ color: p.color }}
                            data-box={p.box}
                          >
                            آواز
                          </span>
                        </span>
                        <strong>{p.name.replaceAll("-", " ")}</strong>
                      </label>
                    ))}
                  </div>
                  <small id="preset-preview-note">
                    {presets.length
                      ? "Style preview is approximate."
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
