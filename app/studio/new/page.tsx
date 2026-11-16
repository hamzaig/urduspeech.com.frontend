"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileVideo, X, ShieldCheck } from "lucide-react";
import { api, mutation, explain } from "@/lib/api";
import type {
  Defaults,
  CreatedProject,
  UploadPolicy,
  Usage,
} from "@/lib/contracts";
import { finishUpload } from "@/lib/upload";
import {
  OutputOptions,
  initialDefaults,
  type Preset,
} from "@/components/output-options";
import { PageTitle, ErrorNotice, CaptionExample } from "@/components/common";
export default function NewProject() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const control = useRef<AbortController | null>(null);
  const createKey = useRef("");
  const [file, setFile] = useState<File | null>(null),
    [title, setTitle] = useState(""),
    [options, setOptions] = useState<Defaults>(initialDefaults),
    [presets, setPresets] = useState<Preset[]>([]),
    [policy, setPolicy] = useState<UploadPolicy | null>(null),
    [usage, setUsage] = useState<Usage | null>(null),
    [ready, setReady] = useState(false),
    [rights, setRights] = useState(false),
    [saveDefault, setSaveDefault] = useState(false),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [stage, setStage] = useState(""),
    [percent, setPercent] = useState(0),
    [created, setCreated] = useState<CreatedProject | null>(null);
  useEffect(() => {
    let live = true;
    Promise.all([
      api<Defaults>("/v1/me/defaults"),
      api<{ presets: Preset[] }>("/v1/caption-presets"),
      api<UploadPolicy>("/v1/public/upload-policy"),
      api<Usage>("/v1/usage"),
    ])
      .then(([d, p, l, u]) => {
        if (live) {
          setOptions(d);
          setPresets(p.presets);
          setPolicy(l);
          setUsage(u);
          setReady(true);
        }
      })
      .catch((e) => {
        if (live) setError(explain(e));
      });
    return () => {
      live = false;
      control.current?.abort();
    };
  }, []);
  const cap = policy?.plans.find((p) => p.slug === usage?.plan.slug);
  function choose(f: File | undefined) {
    if (!f) return;
    setError("");
    if (created) {
      setError(
        "This upload has already started. Open the saved project before choosing another file.",
      );
      return;
    }
    if (cap && f.size > cap.maxUploadBytes) {
      setError(
        `This file is above your upload limit (${(cap.maxUploadBytes / 1024 ** 3).toFixed(1)} GiB). Choose a smaller file.`,
      );
      return;
    }
    if (f.size === 0) {
      setError("Choose a file that contains audio or video.");
      return;
    }
    createKey.current = "";
    setFile(f);
    setTitle(f.name.replace(/\.[^.]+$/, ""));
  }
  async function start() {
    if (!file || !rights || !ready) return;
    setBusy(true);
    setError("");
    const controller = new AbortController();
    control.current = controller;
    let project = created;
    try {
      if (!project) {
        setStage("Creating your project…");
        createKey.current ||= crypto.randomUUID();
        project = await api<CreatedProject>("/v1/projects", {
          ...mutation(
            "POST",
            {
              filename: file.name,
              byteSize: file.size,
              contentType: file.type || "application/octet-stream",
              rightsConfirmed: true,
              title: title.trim(),
              settings: options,
            },
            createKey.current,
          ),
          signal: controller.signal,
        });
        setCreated(project);
      }
      setStage("Uploading your media…");
      await finishUpload(
        file,
        project.upload,
        (p) => setPercent(Math.floor((p.completed / p.total) * 100)),
        controller.signal,
      );
      setStage("Checking the completed upload…");
      if (saveDefault) await api("/v1/me/defaults", mutation("PATCH", options));
      // Validation is asynchronous; processing starts from the project screen once media is ready.
      router.push(
        "/studio/projects/" +
          project.project.id +
          "?upload=" +
          project.upload.id,
      );
    } catch (e) {
      setError(
        controller.signal.aborted
          ? "Upload stopped. Your project is saved. Open it to review or delete the incomplete upload."
          : explain(e),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="page">
      <PageTitle
        title="Start with your voice."
        description="Upload your media and choose the captions your audience will see."
      />
      <div className="new-grid">
        <div className="upload-form">
          {error && <ErrorNotice message={error} />}
          <section className="form-section">
            <h2>1. Add your audio or video</h2>
            <button
              className={"dropzone " + (file ? "has-file" : "")}
              disabled={busy || !!created}
              onClick={() => input.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (!busy && !created) choose(e.dataTransfer.files[0]);
              }}
            >
              <Upload size={30} />
              <strong>
                {file ? file.name : "Drop your file here, or choose a file"}
              </strong>
              <span>
                {file
                  ? `${(file.size / 1024 ** 2).toFixed(1)} MB`
                  : "Reels, podcasts and long-form videos are welcome."}
              </span>
            </button>
            <input
              ref={input}
              className="visually-hidden"
              type="file"
              aria-label="Choose audio or video"
              accept=".wav,.flac,.mp3,.m4a,.mp4,.mov,audio/wav,audio/flac,audio/mpeg,audio/mp4,video/mp4,video/quicktime"
              onChange={(e) => choose(e.target.files?.[0])}
            />
            {cap && (
              <p className="field-help">
                Up to {(cap.maxUploadBytes / 1024 ** 3).toFixed(1)} GiB and{" "}
                {Math.floor(cap.maxSourceSeconds / 60)} minutes per file. Format
                and content are checked after upload.
              </p>
            )}
            <label className="field">
              Project name
              <input
                required
                maxLength={200}
                value={title}
                disabled={busy || !!created}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </section>
          <section className="form-section">
            <h2>2. Make it yours</h2>
            <OutputOptions
              value={options}
              onChange={setOptions}
              presets={presets}
              disabled={busy || !!created}
            />
            <label className="check-row">
              <input
                type="checkbox"
                checked={saveDefault}
                disabled={busy}
                onChange={(e) => setSaveDefault(e.target.checked)}
              />
              Make these choices my defaults for future uploads
            </label>
          </section>
          <section className="form-section">
            <h2>3. Ready when you are</h2>
            <label className="check-row">
              <input
                type="checkbox"
                checked={rights}
                disabled={busy || !!created}
                onChange={(e) => setRights(e.target.checked)}
              />
              I have the rights and permission to process this media.
            </label>
            {busy && (
              <div className="upload-progress" role="status">
                <p>{stage}</p>
                <progress max={100} value={percent} />
                <span>{percent}% uploaded</span>
              </div>
            )}
            <div className="actions">
              <button
                disabled={
                  !ready ||
                  !file ||
                  !rights ||
                  !title.trim() ||
                  busy ||
                  !!created
                }
                onClick={start}
              >
                <FileVideo size={18} />
                {busy ? "Uploading…" : "Upload media"}
              </button>
              {busy && (
                <button
                  className="secondary"
                  onClick={() => control.current?.abort()}
                >
                  <X size={16} />
                  Stop upload
                </button>
              )}
              {created && !busy && (
                <button
                  className="secondary"
                  onClick={() =>
                    router.push(
                      "/studio/projects/" +
                        created.project.id +
                        "?upload=" +
                        created.upload.id,
                    )
                  }
                >
                  Open saved project
                </button>
              )}
            </div>
          </section>
        </div>
        <aside className="upload-aside">
          <CaptionExample
            preset={options.captionPresetVersionId ?? undefined}
          />
          <div className="privacy-note">
            <ShieldCheck size={20} />
            <p>
              Your media stays private. Automatic deletion follows your plan’s
              retention period.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
