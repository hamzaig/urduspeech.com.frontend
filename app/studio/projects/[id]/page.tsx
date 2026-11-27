"use client";
import { use, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Captions,
  Clock,
  Check,
  Ellipsis,
  Film,
  Music2,
  Palette,
  Maximize2,
  Minimize2,
  PanelTopClose,
  PanelTopOpen,
  X,
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
  templateLabel,
  templateFrame,
} from "@/components/caption-template";
import { ProjectCaptionLines } from "@/components/project-caption-lines";
import { ProjectExports } from "@/components/project-exports";
import { ProjectStyle } from "@/components/project-style";
import "./workspace.css";
import { MediaReadiness } from "@/components/media-readiness";
import {
  CaptionStage,
  StageTransport,
  type CaptionPlacement,
} from "@/components/caption-stage";
import { GenerationPanel } from "@/components/generation-panel";
import { WizardSteps } from "@/components/wizard-steps";
import type { CaptionFontChoice } from "@/lib/caption-fonts";
import { ResumeUpload } from "@/components/resume-upload";
type Cue = Track["content"]["cues"][number];
const terminal = ["completed", "failed", "cancelled"];
const settledJobs = [
  ...terminal,
  "ready_for_review",
  "partial_ready",
  "validation_failed",
  "deleting",
  "deleted",
];
const trackExpected = (job: JobStatusV1) =>
  job.capabilities.timedCaptionsReady ||
  ["ready_for_review", "render_pending", "rendering"].includes(job.state);
export default function ProjectEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <CaptionProject key={id} id={id} />;
}

function CaptionProject({ id }: { id: string }) {
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
    [appearanceStatus, setAppearanceStatus] = useState<
      "saved" | "saving" | "error"
    >("saved"),
    [appearanceError, setAppearanceError] = useState(""),
    [appearanceRevision, setAppearanceRevision] = useState(0),
    [portrait, setPortrait] = useState(false);
  // Serialize appearance writes so a slower earlier PATCH cannot replace a later choice.
  const appearanceEdit = useRef(0);
  const appearanceQueue = useRef(Promise.resolve());
  const [priorPlacementRender, setPriorPlacementRender] = useState<
    string | undefined
  >();
  const [mediaReady, setMediaReady] = useState(false);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [tool, setTool] = useState<"captions" | "style">("captions");
  const [previewEnlarged, setPreviewEnlarged] = useState(false);
  const [previewCollapsed, setPreviewCollapsed] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const exportDialog = useRef<HTMLDialogElement>(null);
  const detailDialog = useRef<HTMLDialogElement>(null);
  const [mediaDimensions, setMediaDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
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
  async function load(selectLatestTrack = false) {
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
    if (!appearanceEdit.current) {
      const saved = p.settings.captionPlacement as
        CaptionPlacement | null | undefined;
      setPlacement(saved ?? null);
    }
    setTracks(t.tracks);
    setPresets(styles.presets);
    setUploadId(
      activity.uploads.find((upload) =>
        ["uploading", "completing"].includes(upload.state),
      )?.id ?? null,
    );
    const preferred =
      t.tracks.find(
        (entry) => entry.variant === (p.settings.outputVariant ?? "urdu"),
      ) ?? t.tracks[0];
    const latest = v.versions.at(-1);
    const [
      recoveredJob,
      recoveredRender,
      recoveredFiles,
      recoveredTranscript,
      initialTrack,
    ] = await Promise.all([
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
      latest ? api<Transcript>("/v1/transcripts/" + latest.id) : null,
      preferred && (!track || (selectLatestTrack && track.id !== preferred.id))
        ? api<Track>("/v1/caption-tracks/" + preferred.id)
        : null,
    ]);
    if (!alive.current) return;
    setTranscript(recoveredTranscript);
    if (initialTrack) {
      setTrack(initialTrack);
      setCues(initialTrack.content.cues);
    }
    setProject(p);
    setJob(recoveredJob);
    setRender(recoveredRender);
    setFiles(recoveredFiles);
    setPreset(
      (old) =>
        old ||
        (typeof p.settings.captionPresetVersionId === "string"
          ? p.settings.captionPresetVersionId
          : (styles.presets[0]?.id ?? "")),
    );
  }
  useEffect(() => {
    alive.current = true;
    try {
      setPriorPlacementRender(
        sessionStorage.getItem("urduspeech:placement-render:" + id) ??
          undefined,
      );
    } catch {}
    load().catch((e) => {
      if (alive.current) setError(explain(e));
    });
    return () => {
      alive.current = false;
    };
  }, [id]);
  useEffect(() => {
    if (
      !job ||
      (settledJobs.includes(job.state) && (track || !trackExpected(job)))
    )
      return;
    const timer = setTimeout(
      () => {
        api<JobStatusV1>("/v1/jobs/" + job.id)
          .then(async (j) => {
            if (!alive.current) return;
            if (
              (!track && trackExpected(j)) ||
              (!settledJobs.includes(job.state) &&
                settledJobs.includes(j.state))
            ) {
              await load(
                !settledJobs.includes(job.state) && !trackExpected(job),
              );
            } else {
              setJob(j);
            }
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
  }, [job, track?.id]);
  useEffect(() => {
    if (!files.some((f) => f.state === "pending")) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      Promise.all(
        files.map((f) =>
          f.state === "pending"
            ? api<ExportFile>("/v1/exports/" + f.id)
            : Promise.resolve(f),
        ),
      )
        .then((f) => {
          if (alive.current && !cancelled) setFiles(f);
        })
        .catch((e) => {
          if (alive.current && !cancelled) {
            setError(explain(e));
            setFiles((old) => [...old]);
          }
        });
    }, 2500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
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
  // Automatic embedding is enqueued after alignment. A ready caption track can
  // therefore arrive a few polls before the render exists.
  const expectAutoRender =
    project?.settings.autoEmbed === true &&
    !!track?.content.timingReady &&
    !track.parentTrackId &&
    track.content.variant === (project.settings.outputVariant ?? "urdu") &&
    !remoteMedia?.audio &&
    (render?.trackId !== track.id || render.presetVersionId !== preset);
  useEffect(() => {
    if (!expectAutoRender || !track) return;
    const trackId = track.id;
    const controller = new AbortController();
    const seen = new Set<string>();
    let timer: ReturnType<typeof setTimeout>;
    let delay = 2500;
    let polling = false;
    async function discover() {
      if (document.hidden || polling || controller.signal.aborted) return;
      clearTimeout(timer);
      polling = true;
      const options = { signal: controller.signal };
      try {
        const activity = await api<ProjectActivity>(
          `/v1/projects/${id}/activity`,
          options,
        );
        for (const item of activity.renders) {
          if (seen.has(item.id)) continue;
          const found = await api<Render>("/v1/renders/" + item.id, options);
          seen.add(item.id);
          if (found.trackId === trackId && found.presetVersionId === preset) {
            if (!controller.signal.aborted)
              setRender((old) => (old?.id === render?.id ? found : old));
            return;
          }
        }
      } catch {
        // A transient lookup failure leaves the editable track available.
      } finally {
        polling = false;
      }
      if (controller.signal.aborted) return;
      delay = Math.min(delay * 2, 60000);
      timer = setTimeout(discover, delay);
    }
    timer = setTimeout(discover, delay);
    document.addEventListener("visibilitychange", discover);
    return () => {
      controller.abort();
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", discover);
    };
  }, [id, expectAutoRender, track?.id, preset, render?.id]);

  useEffect(() => {
    function showLinkedPanel() {
      const hash = location.hash;
      if (hash === "#media-preview") setPreviewCollapsed(false);
      setExportOpen(hash === "#editor-exports");
      if (hash !== "#editor-exports")
        setTool(hash === "#caption-style" ? "style" : "captions");
    }
    showLinkedPanel();
    window.addEventListener("hashchange", showLinkedPanel);
    window.addEventListener("popstate", showLinkedPanel);
    return () => {
      window.removeEventListener("hashchange", showLinkedPanel);
      window.removeEventListener("popstate", showLinkedPanel);
    };
  }, [id]);

  function openTool(next: typeof tool) {
    setPreviewEnlarged(false);
    setTool(next);
    const fragment = { captions: "caption-editor", style: "caption-style" }[
      next
    ];
    if (location.hash !== "#" + fragment)
      window.history.replaceState(window.history.state, "", "#" + fragment);
  }

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
  useEffect(() => {
    if (!appearanceRevision) return;
    const revision = appearanceRevision;
    const timer = setTimeout(() => {
      appearanceQueue.current = appearanceQueue.current.then(async () => {
        if (!alive.current || appearanceEdit.current !== revision) return;
        try {
          const p = await api<Project>(
            "/v1/projects/" + id,
            mutation("PATCH", {
              settings: {
                captionPlacement: placement,
                captionPresetVersionId: preset,
              },
            }),
          );
          if (!alive.current || appearanceEdit.current !== revision) return;
          setProject(p);
          setAppearanceStatus("saved");
        } catch (e) {
          if (!alive.current || appearanceEdit.current !== revision) return;
          setAppearanceError(explain(e));
          setAppearanceStatus("error");
        }
      });
    }, 350);
    return () => clearTimeout(timer);
  }, [id, appearanceRevision, preset, placement]);

  function queueAppearanceSave() {
    setAppearanceStatus("saving");
    setAppearanceError("");
    setAppearanceRevision(++appearanceEdit.current);
  }
  function chooseStyle(next: string) {
    if (next === preset) return;
    setPreset(next);
    queueAppearanceSave();
  }
  function changePlacement(next: CaptionPlacement | null) {
    if (next?.y === placement?.y && next?.scale === placement?.scale) return;
    if (render && render.id !== priorPlacementRender) {
      setPriorPlacementRender(render.id);
      try {
        sessionStorage.setItem("urduspeech:placement-render:" + id, render.id);
      } catch {}
    }
    setPlacement(next);
    queueAppearanceSave();
  }
  useEffect(() => {
    if (!dirty && appearanceStatus === "saved") return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, appearanceStatus]);
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
  const updateCue = useCallback(
    (
      index: number,
      key: "text" | "startMs" | "endMs",
      value: string | number,
    ) => {
      setCues((old) =>
        old.map((c, i) =>
          i === index ? { ...c, [key]: value, granularity: "customer" } : c,
        ),
      );
      setDirty(true);
      setSaved("");
    },
    [],
  );
  async function switchTrack(next: string) {
    if (dirty && !window.confirm("Discard unsaved caption changes?")) return;
    await action(async () => {
      const t = await api<Track>("/v1/caption-tracks/" + next);
      setTrack(t);
      setCues(t.content.cues);
      setDirty(false);
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
          const reason = !c.text.trim()
            ? "Enter some text."
            : i > 0 && c.startMs < cues[i - 1].endMs
              ? "Its start time overlaps the previous line."
              : "Set its end after its start and within the recording.";
          setError(`Caption ${i + 1}: ${reason}`);
          const row = document.getElementById("caption-line-" + c.position);
          if (row && c.text.trim())
            row.querySelector("details")?.setAttribute("open", "");
          requestAnimationFrame(() =>
            (c.text.trim()
              ? row?.querySelector("input")
              : row?.querySelector("textarea")
            )?.focus(),
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
  const transcriptVariant =
    transcript?.variants.find(
      (variant) => variant.kind === project?.settings.outputVariant,
    ) ??
    transcript?.variants.find((variant) => variant.kind === "urdu") ??
    transcript?.variants[0];
  async function exports() {
    const sourceVersionId = track?.sourceVersionId ?? transcript?.id;
    const variant = track?.content.variant ?? transcriptVariant?.kind;
    if (!sourceVersionId || !variant) return;
    await action(async () => {
      const result = await api<{ exports: ExportFile[] }>(
        `/v1/projects/${id}/exports`,
        mutation(
          "POST",
          {
            sourceVersionId,
            variant,
            trackId: track?.id,
            formats: track?.content.timingReady
              ? ["txt", "srt", "vtt"]
              : ["txt"],
          },
          crypto.randomUUID(),
        ),
      );
      setFiles((old) => [
        ...old.filter(
          (f) =>
            !result.exports.some(
              (next) =>
                next.id === f.id ||
                (next.trackId === f.trackId &&
                  next.sourceVersionId === f.sourceVersionId &&
                  next.variant === f.variant &&
                  next.format === f.format),
            ),
        ),
        ...result.exports,
      ]);
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
      setDirty(false);
      setSaved(
        "Correction decision saved. Reload captions when derivation finishes.",
      );
    });
  }
  const selectCue = useCallback((cue: Cue, play: boolean) => {
    setPreviewPosition(cue.position);
    setTime(cue.startMs);
    const el = player.current;
    if (!el || el.readyState === 0) return;
    if (!play) el.pause();
    const at = Math.max(
      0,
      Math.min(
        cue.startMs / 1000,
        Number.isFinite(el.duration) ? el.duration : Infinity,
      ),
    );
    el.currentTime = at;
    setTime(at * 1000);
    if (play) void el.play().catch(() => {});
  }, []);
  const activeCue = cues.find((c) => time >= c.startMs && time < c.endMs);
  const playableMedia = previewState === "ready" ? remoteMedia : null;
  const activeTool = playableMedia?.audio ? "captions" : tool;
  const previewCue =
    cues.find(({ position }) => position === previewPosition) ?? cues[0];
  // The stage shows the cue under the playhead, or the selected/first cue
  // while paused at the start so its position can be adjusted.
  const stageCue =
    activeCue ?? (!playableMedia || time === 0 ? previewCue : undefined);
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
  const generating =
    !!job && !settledJobs.includes(job.state) && !trackExpected(job);
  const focusGeneration = generating || (!!job && trackExpected(job) && !track);
  const reviewing = !!(track || transcript) && !focusGeneration;
  useEffect(() => {
    const dialog = exportDialog.current;
    if (!reviewing || !dialog) return;
    if (exportOpen && !dialog.open) dialog.showModal();
    else if (!exportOpen && dialog.open) dialog.close();
  }, [reviewing, exportOpen]);
  const hasCurrentRender =
    !!track &&
    render?.trackId === track.id &&
    render.presetVersionId === preset &&
    render.id !== priorPlacementRender;
  const currentRender =
    hasCurrentRender && appearanceStatus === "saved" ? render : null;
  const visibleFiles = files.filter((file) =>
    track
      ? file.trackId === track.id
      : !file.trackId &&
        file.sourceVersionId === transcript?.id &&
        (!transcriptVariant || file.variant === transcriptVariant.kind),
  );
  const previewPreset = presets.find(({ id }) => id === preset);
  const videoBlock =
    appearanceStatus === "saving"
      ? "Saving your style and placement…"
      : appearanceStatus === "error"
        ? "Close Export and retry saving your style before creating the video."
        : playableMedia?.audio
          ? "This project contains audio only. You can download the subtitle files below."
          : previewState === "expired"
            ? "The source video has expired. Available downloads are listed here."
            : previewState === "pending"
              ? "Your upload is still being checked."
              : previewState === "loading"
                ? "Loading the source recording…"
                : !track?.content.timingReady
                  ? "The video needs timed captions before it can be exported."
                  : !previewPreset
                    ? "Choose a caption template in Style before exporting."
                    : "";
  const download = (path: string) => action(() => startDownload(path));
  const cancelAction = generating && job.capabilities.canCancel && (
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
  );
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
  const projectDetails = (
    <div className="project-status-bar">
      <details className="processing-panel" open={!job && !hasDraft}>
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
              {track &&
                !generating &&
                mediaReady &&
                !uploadId &&
                (!job || settledJobs.includes(job.state)) && (
                  <button onClick={process} disabled={busy || dirty}>
                    <Play size={16} />
                    Generate again
                  </button>
                )}
              {hasDraft && (
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
                  Save as defaults
                </button>
              )}
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
  );

  const deleteProject = (
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
  );
  const notices = (
    <>
      {error && (
        <ErrorNotice
          message={error}
          retry={project ? undefined : () => action(load)}
        />
      )}
      {saved && saved !== "Caption changes saved." && <Saved>{saved}</Saved>}
    </>
  );
  const back = (
    <Link
      className="desk-back"
      href="/studio"
      onNavigate={(event) => {
        if (
          (dirty || appearanceStatus !== "saved") &&
          !window.confirm("Leave with unsaved changes?")
        )
          event.preventDefault();
      }}
    >
      <ArrowLeft size={15} aria-hidden="true" />
      My projects
    </Link>
  );

  if (!project || !reviewing)
    return (
      <div className="page editor-page project-processing">
        {back}
        <PageTitle
          title={project ? <bdi>{project.title}</bdi> : "Your project"}
        />
        {notices}
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
            {!job && !hasDraft && <WizardSteps current={5} />}
            {(focusGeneration || job || (mediaReady && !uploadId)) && (
              <GenerationPanel
                job={job}
                cancelAction={cancelAction}
                mediaReady={mediaReady}
                busy={busy}
                onStart={process}
              />
            )}
            {!focusGeneration && (
              <>
                {projectDetails}
                {deleteProject}
              </>
            )}
          </>
        )}
      </div>
    );

  const tabs = [
    {
      id: "captions",
      label: "Captions",
      Icon: Captions,
      panel: "caption-editor",
    },
    { id: "style", label: "Style", Icon: Palette, panel: "caption-style" },
  ] as const;
  const fileReady = currentRender?.state === "completed";
  const filePending =
    currentRender?.state === "pending" || currentRender?.state === "rendering";
  const openExports = () => {
    setExportOpen(true);
    window.history.replaceState(window.history.state, "", "#editor-exports");
  };

  return (
    <div
      className="project-workspace"
      data-preview-collapsed={previewCollapsed || undefined}
    >
      <p className="sr-only" role="status">
        {track ? "Captions ready to edit." : "Transcript available."}
      </p>
      <header className="desk-header">
        <div className="desk-project">
          <div className="desk-breadcrumb">
            {back}
            <span aria-hidden="true">/</span>
            <span>Caption editor</span>
          </div>
          <div className="desk-project-title">
            <h1>
              <bdi>{project.title}</bdi>
            </h1>
          </div>
        </div>
        <div className="desk-header-actions">
          {filePending && (
            <span className="desk-save-state" role="status">
              <Clock size={14} />
              Preparing MP4
            </span>
          )}
          {fileReady && !dirty && (
            <span className="desk-save-state">
              <Check size={15} />
              MP4 ready
            </span>
          )}
          <button
            className="desk-primary"
            type="button"
            onClick={openExports}
            aria-haspopup="dialog"
          >
            <Download size={17} aria-hidden="true" />
            Export
          </button>
          <button
            className="desk-menu"
            type="button"
            aria-label="Project details"
            title="Project details"
            onClick={() => detailDialog.current?.showModal()}
          >
            <Ellipsis size={21} />
          </button>
        </div>
      </header>
      {notices}
      {appearanceStatus === "error" && (
        <div className="desk-prompt" role="alert">
          {appearanceError}{" "}
          <button
            type="button"
            className="text-button"
            onClick={queueAppearanceSave}
          >
            Retry saving style
          </button>
        </div>
      )}
      <div
        className="desk-layout"
        data-preview-large={previewEnlarged || undefined}
      >
        <div className="desk-tools">
          <nav className="desk-tabs" aria-label="Project workspace">
            {tabs
              .filter((tab) => tab.id === "captions" || !playableMedia?.audio)
              .map(({ id, label, Icon, panel }) => (
                <button
                  type="button"
                  key={id}
                  aria-pressed={activeTool === id}
                  aria-controls={panel}
                  onClick={() => openTool(id)}
                >
                  <Icon size={17} aria-hidden="true" />
                  {label}
                </button>
              ))}
          </nav>
          <section
            id="caption-editor"
            hidden={activeTool !== "captions"}
            className="desk-panel text-panel"
            aria-labelledby="text-panel-title"
          >
            <div className="panel-intro">
              <div className="panel-title">
                <h2 id="text-panel-title">
                  {track ? "Caption text" : "Transcript"}
                </h2>
                {track && (
                  <span className="line-count">
                    {cues.length} {cues.length === 1 ? "line" : "lines"}
                  </span>
                )}
              </div>
              {track && <p>Edit a line or select its time to adjust it.</p>}
            </div>
            {track && (
              <div className="track-toolbar">
                <label>
                  <span className="track-label">Caption track</span>
                  <span className="track-picker">
                    <select
                      aria-label="Caption track"
                      value={track.id}
                      disabled={busy}
                      onChange={(e) => switchTrack(e.target.value)}
                    >
                      {tracks.map((t) => (
                        <option key={t.id} value={t.id}>
                          {outputLabel(t.variant)} · v{t.version}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} aria-hidden="true" />
                  </span>
                </label>
                <button
                  type="button"
                  className={dirty ? "save-edits" : "save-edits secondary"}
                  aria-label="Save caption changes"
                  disabled={!dirty || busy}
                  onClick={save}
                >
                  <Save size={15} aria-hidden="true" />
                  Save edits
                </button>
              </div>
            )}
            {(dirty || saved === "Caption changes saved.") && (
              <small className="edit-feedback" role="status">
                {dirty ? "Unsaved caption edits" : saved}
              </small>
            )}
            {track && track.content.qa.defects.length > 0 && (
              <div className="desk-prompt">
                Check caption timing before exporting.{" "}
                {track.content.qa.defects
                  .map((v) => v.replaceAll("_", " "))
                  .join(", ")}
              </div>
            )}
            {track ? (
              <ProjectCaptionLines
                cues={cues}
                variant={track.content.variant}
                activePosition={
                  playableMedia ? stageCue?.position : previewCue?.position
                }
                playing={player.current?.paused === false}
                hasMedia={!!playableMedia}
                busy={busy}
                onChange={updateCue}
                onSelect={selectCue}
              />
            ) : (
              transcript && (
                <div className="desk-transcript" dir="auto">
                  {transcript.text}
                </div>
              )
            )}
            {transcript && transcript.corrections.length > 0 && (
              <details className="desk-corrections">
                <summary>
                  Suggested text corrections ({transcript.corrections.length})
                </summary>
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
              </details>
            )}
          </section>
          <section
            id="caption-style"
            hidden={activeTool !== "style"}
            className="desk-panel"
            aria-labelledby="style-panel-title"
          >
            <div className="panel-intro">
              <h2 id="style-panel-title">Caption style</h2>
              <p>Choose how captions will look in the finished video.</p>
            </div>
            {activeTool === "style" && (
              <ProjectStyle
                templates={presets}
                selected={previewPreset}
                placement={placement}
                portrait={portrait}
                canPosition={!!track && !!playableMedia && !playableMedia.audio}
                disabled={busy}
                onStyle={chooseStyle}
                onPlace={changePlacement}
              />
            )}
          </section>
        </div>
        <section
          className="desk-preview"
          id="media-preview"
          aria-labelledby="preview-title"
          onKeyDown={(event) => {
            if (event.key === "Escape" && previewEnlarged) {
              setPreviewEnlarged(false);
              event.currentTarget
                .querySelector<HTMLButtonElement>(".enlarge-preview")
                ?.focus();
            }
          }}
        >
          <header className="preview-heading">
            <h2 id="preview-title">
              {playableMedia?.audio ? <Music2 size={17} /> : <Film size={17} />}
              {playableMedia?.audio ? "Audio preview" : "Video preview"}
            </h2>
            {mediaDimensions && (
              <span className="source-size">
                {mediaDimensions.width} × {mediaDimensions.height}
              </span>
            )}
            <div className="preview-view-actions">
              <button
                type="button"
                className="enlarge-preview"
                aria-pressed={previewEnlarged}
                aria-label={
                  previewEnlarged ? "Back to editor" : "Enlarge preview"
                }
                onClick={() => {
                  setPreviewCollapsed(false);
                  setPreviewEnlarged(!previewEnlarged);
                }}
              >
                {previewEnlarged ? (
                  <Minimize2 size={16} />
                ) : (
                  <Maximize2 size={16} />
                )}
                <span>{previewEnlarged ? "Back to editor" : "Enlarge"}</span>
              </button>
              <button
                type="button"
                className="preview-toggle"
                aria-expanded={!previewCollapsed}
                aria-controls="preview-player"
                onClick={() => {
                  setPreviewCollapsed((v) => !v);
                  setPreviewEnlarged(false);
                }}
              >
                {previewCollapsed ? (
                  <PanelTopOpen size={16} />
                ) : (
                  <PanelTopClose size={16} />
                )}
                {previewCollapsed ? "Show" : "Hide"}
                <span className="sr-only"> preview</span>
              </button>
            </div>
          </header>
          <div className="preview-player" id="preview-player">
            <div className="preview-matte">
              {playableMedia ? (
                <CaptionStage
                  src={playableMedia.url}
                  audio={playableMedia.audio}
                  controls={playableMedia.audio}
                  template={previewPreset}
                  lines={stageCue ? stageCue.text.split("\n") : []}
                  time={stageProgress}
                  placement={placement}
                  fonts={
                    project?.settings.captionFonts as
                      CaptionFontChoice | null | undefined
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
                    if (media instanceof HTMLVideoElement && media.videoWidth)
                      setMediaDimensions({
                        width: media.videoWidth,
                        height: media.videoHeight,
                      });
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
              ) : (
                <div className="editor-player-frame preview-empty">
                  <div className="preview-placeholder" role="status">
                    <Film size={24} aria-hidden="true" />
                    {previewState === "loading" ? (
                      <small>Loading your recording…</small>
                    ) : previewState === "pending" ? (
                      <small>
                        Your recording will appear here once the upload
                        finishes.
                      </small>
                    ) : previewState === "expired" ? (
                      <small>
                        The original recording was removed after its retention
                        period. Captions and exports remain available.
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
                          <RefreshCw size={17} aria-hidden="true" /> Try again
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
            </div>
            {playableMedia && !playableMedia.audio && (
              <StageTransport
                media={player}
                source={playableMedia.url}
                cues={cues}
              />
            )}
            {!playableMedia?.audio && (
              <footer className="preview-footer">
                <div>
                  <Captions size={16} aria-hidden="true" />
                  <strong>
                    {previewPreset ? templateLabel(previewPreset) : "Captions"}
                  </strong>
                  {track && (
                    <span> · {outputLabel(track.content.variant)}</span>
                  )}
                </div>
                {appearanceStatus === "saving" ? (
                  <span role="status">Saving style…</span>
                ) : (
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => {
                      openTool("style");
                      requestAnimationFrame(() =>
                        document
                          .querySelector<HTMLButtonElement>(
                            '.desk-tabs button[aria-pressed="true"]',
                          )
                          ?.focus({ preventScroll: true }),
                      );
                    }}
                  >
                    <Palette size={14} />
                    Edit style
                  </button>
                )}
              </footer>
            )}
          </div>
        </section>
      </div>
      <dialog
        id="editor-exports"
        className="desk-dialog export-dialog"
        ref={exportDialog}
        aria-labelledby="export-panel-title"
        onClose={() => {
          setExportOpen(false);
          if (location.hash === "#editor-exports")
            window.history.replaceState(
              window.history.state,
              "",
              activeTool === "style" ? "#caption-style" : "#caption-editor",
            );
        }}
      >
        <div className="dialog-title">
          <h2 id="export-panel-title">Export project</h2>
          <form method="dialog">
            <button
              className="desk-menu"
              type="submit"
              aria-label="Close export"
            >
              <X size={18} />
            </button>
          </form>
        </div>
        {error && (
          <p role="alert" className="desk-prompt">
            {error}
          </p>
        )}
        <ProjectExports
          timingReady={track?.content.timingReady ?? false}
          durationMs={track?.content.mediaDurationMs ?? 0}
          canPrepareFiles={!!track || !!transcriptVariant}
          render={render}
          current={!!currentRender}
          busy={busy}
          dirty={dirty}
          videoBlock={videoBlock}
          files={visibleFiles}
          onEdit={() => {
            exportDialog.current?.close();
            openTool("captions");
            requestAnimationFrame(() =>
              document.querySelector<HTMLButtonElement>(".save-edits")?.focus(),
            );
          }}
          onRender={renderVideo}
          onFiles={exports}
          download={download}
          onCancel={() =>
            render &&
            action(async () =>
              setRender(
                await api<Render>(
                  "/v1/renders/" + render.id + "/cancel",
                  mutation("POST", {}, crypto.randomUUID()),
                ),
              ),
            )
          }
        />
      </dialog>
      <dialog
        className="desk-dialog"
        ref={detailDialog}
        aria-labelledby="detail-dialog-title"
        onClose={() => setRemove(false)}
      >
        <div className="dialog-title">
          <h2 id="detail-dialog-title">Project details</h2>
          <form method="dialog">
            <button
              type="submit"
              className="desk-menu"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>
          </form>
        </div>
        {projectDetails}
        {deleteProject}
      </dialog>
    </div>
  );
}
