"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Upload, FileVideo, X, ShieldCheck, Languages, Type, Palette, SlidersHorizontal, Sparkles } from "lucide-react";
import { api, ApiError, mutation, explain } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import type {
  Defaults,
  CreatedProject,
  UploadPolicy,
  Usage,
} from "@/lib/contracts";
import { finishUpload } from "@/lib/upload";
import {
  outputLabel,
  initialDefaults,
  type Preset,
} from "@/components/output-options";
import { PageTitle, ErrorNotice } from "@/components/common";
import { WizardRail } from "@/components/wizard-steps";
import { CaptionChoiceStep } from "@/components/caption-choice-step";
export default function NewProject() {
  return (
    <Suspense
      fallback={
        <p className="loading" role="status">
          Loading upload options…
        </p>
      }
    >
      <NewProjectWizard />
    </Suspense>
  );
}
function NewProjectWizard() {
  const router = useRouter();
  const search = useSearchParams();
  // Step 2 survives a reload: the uploaded project id lives in the URL.
  const resumedProject = search.get("project");
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
    [setupError, setSetupError] = useState<unknown>(),
    [setupAttempt, setSetupAttempt] = useState(0),
    [rights, setRights] = useState(false),
    [error, setError] = useState(""),
    [oversizeUpgradeHint, setOversizeUpgradeHint] = useState(false),
    [busy, setBusy] = useState(false),
    [stage, setStage] = useState(""),
    [percent, setPercent] = useState(0),
    [created, setCreated] = useState<CreatedProject | null>(null);
  useEffect(() => {
    let live = true;
    setSetupError(undefined);
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
      .catch((e: unknown) => {
        if (live) setSetupError(e);
      });
    return () => {
      live = false;
    };
  }, [setupAttempt]);
  useEffect(() => () => control.current?.abort(), []);
  const needsSignIn =
    setupError instanceof ApiError && setupError.status === 401;
  const cap = policy?.plans.find((p) => p.slug === usage?.plan.slug);
  function choose(f: File | undefined) {
    if (!f) return;
    setError("");
    setOversizeUpgradeHint(false);
    if (created) {
      setError(
        "This upload has already started. Open the saved project before choosing another file.",
      );
      return;
    }
    if (cap && f.size > cap.maxUploadBytes) {
      const capLabel =
        cap.maxUploadBytes < 1024 ** 3
          ? `${Math.round(cap.maxUploadBytes / 1024 ** 2)} MiB`
          : `${(cap.maxUploadBytes / 1024 ** 3).toFixed(1)} GiB`;
      const canUpgradeSize =
        usage?.plan.slug === "free" || usage?.plan.slug === "starter";
      setOversizeUpgradeHint(canUpgradeSize);
      setError(
        canUpgradeSize
          ? `This file (${(f.size / 1024 ** 2).toFixed(0)} MiB) is above your ${usage?.plan.name} plan upload limit (${capLabel}). Upgrade your plan for up to 2 GiB uploads, or export a smaller M4A/MP3 audio bounce.`
          : `This file is above the ${capLabel} scanning limit. For very large recordings, export a smaller MP4 or a lightweight M4A/MP3 audio bounce to generate TXT, SRT, and VTT.`,
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
      trackEvent("project_upload_completed", {
        output_variant: options.outputVariant,
        file_kind: file.type.startsWith("video/") ? "video" : "audio",
        plan_slug: usage?.plan.slug ?? "unknown",
      });
      // Validation is asynchronous; step 2 waits for it while the customer
      // chooses captions on a preview of this upload.
      router.replace("/studio/new?project=" + project.project.id);
    } catch (e) {
      setError(
        controller.signal.aborted
          ? project
            ? "Upload stopped. Open the saved project to resume uploading."
            : "Upload stopped before the project was created."
          : explain(e),
      );
    } finally {
      setBusy(false);
    }
  }
  if (resumedProject)
    return (
      <div className="page">
        <PageTitle
          title="Set up your captions"
          description="Choose captions, font, style and options. The preview uses your own video."
        />
        {!ready ? (
          setupError ? (
            <ErrorNotice
              message={explain(setupError)}
              signIn={needsSignIn}
              retry={
                needsSignIn
                  ? undefined
                  : () => setSetupAttempt((value) => value + 1)
              }
            />
          ) : (
            <p className="loading" role="status">
              Loading caption options…
            </p>
          )
        ) : (
          <CaptionChoiceStep
            key={resumedProject}
            projectId={resumedProject}
            presets={presets}
            initial={options}
          />
        )}
      </div>
    );
  return (
    <div className="page">
      <PageTitle
        title="New upload"
        description="Upload your audio or video. Next you choose captions, font, style and options, then generate."
      />
      {!ready ? (
        setupError ? (
          <ErrorNotice
            message={explain(setupError)}
            signIn={needsSignIn}
            retry={
              needsSignIn
                ? undefined
                : () => setSetupAttempt((value) => value + 1)
            }
          />
        ) : (
          <p className="loading" role="status">
            Loading upload options…
          </p>
        )
      ) : (
        <div className="wizard-shell wizard-upload">
          <WizardRail current={0} steps={[
            { label: "Upload", detail: "", icon: Upload },
            { label: "Captions", detail: "", icon: Languages },
            { label: "Font", detail: "", icon: Type },
            { label: "Style", detail: "", icon: Palette },
            { label: "Options", detail: "", icon: SlidersHorizontal },
            { label: "Generate", detail: "", icon: Sparkles },
          ]} />
          <div className="upload-form wizard-card wizard-main">
            {error && (
              <div>
                <ErrorNotice message={error} />
                {oversizeUpgradeHint && (
                  <p className="field-help">
                    Need larger uploads up to 1 to 5 GiB and clean original-quality video?{" "}
                    <Link href="/studio/billing">
                      Compare Starter, Creator, and Studio in Billing
                    </Link>
                    .
                  </p>
                )}
              </div>
            )}
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
                  {file ? file.name : "Choose an audio or video file"}
                </strong>
                <span>
                  {file
                    ? `${(file.size / 1024 ** 2).toFixed(1)} MB, choose a different file`
                    : "Or drop it here to start your project."}
                </span>
              </button>
              <input
                ref={input}
                className="visually-hidden"
                type="file"
                aria-label="Choose audio or video"
                tabIndex={-1}
                accept=".wav,.flac,.mp3,.m4a,.mp4,.mov,audio/wav,audio/flac,audio/mpeg,audio/mp4,video/mp4,video/quicktime"
                onChange={(e) => {
                  choose(e.currentTarget.files?.[0]);
                  e.currentTarget.value = "";
                }}
              />
              {cap && (
                <p className="field-help">
                  Up to {(cap.maxUploadBytes / 1024 ** 3).toFixed(1)} GiB and{" "}
                  {Math.floor(cap.maxSourceSeconds / 60)} minutes per file.
                  Format and content are checked after upload.
                </p>
              )}
              <label className="field">
                Project name
                <input
                  required
                  maxLength={200}
                  value={title}
                  dir="auto"
                  disabled={busy || !!created}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </section>
            <section className="form-section">
              <h2>2. Confirm and upload</h2>
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
                  <progress
                    aria-label="File upload progress"
                    max={100}
                    value={percent}
                  />
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
                  {busy ? "Uploading…" : "Upload and continue"}
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
                    Resume in the project
                  </button>
                )}
              </div>
            </section>
          </div>
          <aside className="upload-aside wizard-card wizard-preview" aria-labelledby="upload-summary">
            <h2 id="upload-summary">Upload details</h2>
            <dl>
              <div>
                <dt>Recording</dt>
                <dd>{file ? <bdi>{file.name}</bdi> : "No file selected"}</dd>
              </div>
              <div>
                <dt>Default captions</dt>
                <dd>{outputLabel(options.outputVariant)}</dd>
              </div>
              {usage && (
                <div>
                  <dt>Plan</dt>
                  <dd>{usage.plan.name}</dd>
                </div>
              )}
            </dl>
            <Link className="text-button" href="/supported-formats">
              Check supported formats
            </Link>
            <div className="privacy-note">
              <ShieldCheck size={18} aria-hidden="true" />
              <p>
                Your media stays private. Automatic deletion follows your plan’s
                retention period.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
