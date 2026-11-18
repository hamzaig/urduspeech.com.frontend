"use client";
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Save, Download, RefreshCw } from "lucide-react";
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
import {
  PageTitle,
  ErrorNotice,
  CaptionExample,
  Saved,
} from "@/components/common";
import type { Preset } from "@/components/output-options";
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
    [localMedia, setLocalMedia] = useState(""),
    [time, setTime] = useState(0),
    [remove, setRemove] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const player = useRef<HTMLVideoElement>(null);
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
      if (localMedia) URL.revokeObjectURL(localMedia);
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
  return (
    <div className="page">
      <PageTitle
        title={project?.title ?? "Your project"}
        description="Review the words, adjust the timing and make your captions yours."
        action={
          <button
            className="secondary"
            disabled={busy || dirty}
            onClick={() => action(load)}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        }
      />
      {error && <ErrorNotice message={error} />}{" "}
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
          <MediaReadiness projectId={id} onReady={setMediaReady} />
          <section className="job-status">
            <span className="status-label">
              {job ? job.state.replaceAll("_", " ") : "Prepare your transcript"}
            </span>
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
                    setSaved("These project choices are now your defaults.");
                  })
                }
              >
                Make project choices my defaults
              </button>
            </div>
          </section>
          <div className="editor-grid">
            <section
              className="editor-content"
              aria-label="Transcript and caption editor"
            >
              <div className="editor-toolbar">
                <h2>{track ? "Caption timing" : "Transcript"}</h2>
                {tracks.length > 0 && (
                  <label className="inline-select">
                    Output
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
                          {t.variant} · version {t.version}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                {track && (
                  <button
                    className="secondary"
                    disabled={!dirty || busy}
                    onClick={save}
                  >
                    <Save size={16} />
                    Save changes
                  </button>
                )}
              </div>
              {track ? (
                <>
                  <p className="subtitle">
                    Times are in seconds. Changes create a new caption version.
                  </p>
                  {track.content.qa.defects.length > 0 && (
                    <p className="notice">
                      Timing needs attention:{" "}
                      {track.content.qa.defects.join(", ")}. Timed exports may
                      be unavailable.
                    </p>
                  )}
                  <div className="cue-list">
                    {cues.map((c, i) => (
                      <div className="cue" key={c.position}>
                        <div className="cue-meta">
                          <button
                            className="text-button"
                            aria-label={"Play caption " + (i + 1)}
                            onClick={() => {
                              if (player.current) {
                                player.current.currentTime = c.startMs / 1000;
                                player.current.play().catch(() => {});
                              }
                            }}
                          >
                            <Play size={13} />
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
                          aria-label={"Caption " + (i + 1)}
                          disabled={busy}
                          value={c.text}
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
                <div className="empty-projects">
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
            <aside className="editor-aside">
              <CaptionExample
                preset={preset || undefined}
                text={activeCue?.text ?? "Har lafz ko apni pehchaan dein."}
              />
              <h2>Media preview</h2>
              <p className="caption-note">
                Choose your original file for a local timing preview. This does
                not upload it again.
              </p>
              <label className="field">
                Original audio or video
                <input
                  type="file"
                  accept="audio/*,video/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setLocalMedia(URL.createObjectURL(f));
                  }}
                />
              </label>
              {localMedia && (
                <>
                  <video
                    ref={player}
                    className="local-player"
                    src={localMedia}
                    controls
                    onTimeUpdate={(e) =>
                      setTime(e.currentTarget.currentTime * 1000)
                    }
                  />
                  <p className="local-caption" dir="auto">
                    {activeCue?.text ?? "No caption at this time"}
                  </p>
                </>
              )}
              <label className="field">
                Caption style
                <select
                  value={preset}
                  onChange={(e) => setPreset(e.target.value)}
                >
                  {presets.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name.replaceAll("-", " ")}
                    </option>
                  ))}
                </select>
              </label>
              <h2>Export your work</h2>
              <p className="caption-note">
                Preview is approximate. The rendered video uses the exact
                caption fonts and layout.
              </p>
              <div className="actions">
                <button disabled={busy || dirty || !track} onClick={exports}>
                  <Download size={15} />
                  Prepare text & subtitles
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
                      Download {f.format.toUpperCase()} ({f.variant})
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
            </aside>
          </div>
          <section className="danger-zone">
            <h2>Delete this project</h2>
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
          </section>
        </>
      )}
    </div>
  );
}
