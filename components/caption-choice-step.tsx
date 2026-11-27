"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Film,
  Languages,
  LoaderCircle,
  Palette,
  SlidersHorizontal,
  Sparkles,
  Type,
  UploadCloud,
  Wand2,
} from "lucide-react";
import { api, ApiError, mutation, explain } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import type { Defaults, JobStatusV1 } from "@/lib/contracts";
import { variants, type Preset } from "@/components/output-options";
import {
  CaptionStage,
  PlacementControls,
  StageTransport,
  defaultPlacement,
  type CaptionPlacement,
} from "@/components/caption-stage";
import { TemplateBrowser } from "@/components/template-browser";
import { FontPicker } from "@/components/font-picker";
import { WizardRail, type RailStep } from "@/components/wizard-steps";
import { outputLabel } from "@/components/output-options";
import {
  CAPTION_FONTS,
  DEFAULT_FONTS,
  type CaptionFontChoice,
} from "@/lib/caption-fonts";
import { MediaReadiness } from "@/components/media-readiness";
import { ErrorNotice } from "@/components/common";

/** Sample captions shown on the customer's own video before generation. */
const SAMPLE = {
  urdu: "یہ آپ کے کیپشن کا نمونہ ہے",
  romanUrdu: "Yeh aap ke caption ka namoona hai",
  english: "This is how your captions will look",
} as const;

export function sampleLines(options: Defaults): string[] {
  if (options.outputVariant !== "bilingual")
    return [SAMPLE[options.outputVariant]];
  return options.bilingualOrder === "english-first"
    ? [SAMPLE.english, SAMPLE.urdu]
    : [SAMPLE.urdu, SAMPLE.english];
}

type Preview = { url: string; audio: boolean };

/** Poll the storage preview until the upload has been verified. */
export function useProjectPreview(projectId: string) {
  const [preview, setPreview] = useState<Preview | null>(null),
    [state, setState] = useState<"waiting" | "ready" | "expired" | "error">(
      "waiting",
    ),
    [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let live = true,
      timer: ReturnType<typeof setTimeout> | undefined;
    const load = async () => {
      try {
        const result = await api<{ url: string; kind: "video" | "audio" }>(
          `/v1/projects/${projectId}/preview`,
        );
        if (!live) return;
        setPreview({ url: result.url, audio: result.kind === "audio" });
        setState("ready");
      } catch (e) {
        if (!live) return;
        if (e instanceof ApiError && e.status === 409) {
          setState("waiting");
          timer = setTimeout(load, 3000);
        } else setState(e instanceof ApiError && e.status === 410 ? "expired" : "error");
      }
    };
    void load();
    return () => {
      live = false;
      if (timer) clearTimeout(timer);
    };
  }, [projectId, attempt]);
  return {
    preview,
    state,
    // A playback error usually means the signed URL lapsed: fetch a fresh one
    // twice, then report that this browser cannot play the recording.
    reload: () => {
      setPreview(null);
      if (attempt >= 2) {
        setState("error");
        return;
      }
      setState("waiting");
      setAttempt((n) => n + 1);
    },
  };
}

type Step = 1 | 2 | 3 | 4 | 5;

type Draft = {
  step: Step;
  options: Defaults;
  fonts: CaptionFontChoice;
  placement: CaptionPlacement | null;
};
const draftKey = (projectId: string) => `urduspeech-wizard:${projectId}`;
/** A saved wizard draft for this project, if this browser has one. */
function readDraft(projectId: string): Draft | null {
  try {
    const value = JSON.parse(
      window.localStorage.getItem(draftKey(projectId)) ?? "null",
    ) as Draft | null;
    if (!value || ![1, 2, 3, 4, 5].includes(value.step) || !value.options)
      return null;
    return value;
  } catch {
    return null;
  }
}
function writeDraft(projectId: string, draft: Draft) {
  try {
    window.localStorage.setItem(draftKey(projectId), JSON.stringify(draft));
  } catch {
    // Private mode or full storage: the wizard still works, just unsaved.
  }
}
function clearDraft(projectId: string) {
  try {
    window.localStorage.removeItem(draftKey(projectId));
  } catch {
    // Nothing to clear.
  }
}
const STEP_TITLES: Record<Step, { title: string; help: string }> = {
  1: { title: "Which captions?", help: "Choose the language and script for your captions." },
  2: { title: "Choose a font", help: "Pick how the letters look. The preview uses your choice." },
  3: { title: "Choose a style", help: "Pick a caption style. On the preview you can drag the caption to move it and drag its corner to resize it." },
  4: { title: "Caption options", help: "Both are on by default. You can switch them off." },
  5: { title: "Ready to generate", help: "Check your choices, then generate your captions." },
};

/**
 * Wizard steps 2-6 after upload: captions -> font -> style -> options ->
 * generate. A sample caption plays on the uploaded video (streamed from S3)
 * in the current choices. Generate saves everything to the project and
 * starts processing; editing continues on the project page.
 */
export function CaptionChoiceStep({
  projectId,
  presets,
  initial,
}: {
  projectId: string;
  presets: Preset[];
  initial: Defaults;
}) {
  const router = useRouter();
  // Refreshing the page keeps the customer on the same step with the same
  // choices: the draft lives in this browser until captions are generated.
  const [draft] = useState(() => readDraft(projectId));
  const [showPreview, setShowPreview] = useState(false);
  const [step, setStep] = useState<Step>(draft?.step ?? 1);
  // AI correction and automatic MP4 are on by default in the wizard.
  const [options, setOptions] = useState<Defaults>(
    () =>
      draft?.options ?? {
        ...initial,
        correctionEnabled: true,
        autoEmbed: true,
        captionPresetVersionId:
          initial.captionPresetVersionId ?? presets[0]?.id ?? null,
      },
  );
  const [fonts, setFonts] = useState<CaptionFontChoice>(
    () => draft?.fonts ?? initial.captionFonts ?? {},
  );
  const [placement, setPlacement] = useState<CaptionPlacement | null>(() =>
    draft ? draft.placement : (initial.captionPlacement ?? null),
  );
  useEffect(() => {
    writeDraft(projectId, { step, options, fonts, placement });
  }, [projectId, step, options, fonts, placement]);
  const [mediaReady, setMediaReady] = useState(false),
    [saveDefault, setSaveDefault] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [time, setTime] = useState(0),
    [portrait, setPortrait] = useState(false);
  const processKey = useRef(crypto.randomUUID());
  const player = useRef<HTMLMediaElement | null>(null);
  const { preview, state, reload } = useProjectPreview(projectId);
  const template =
    presets.find(({ id }) => id === options.captionPresetVersionId) ??
    presets[0];

  function set<K extends keyof Defaults>(key: K, value: Defaults[K]) {
    setOptions((old) => {
      const next = { ...old, [key]: value };
      if (key === "outputVariant") {
        if (value === "bilingual") {
          next.bilingualOrder = old.bilingualOrder ?? "urdu-first";
          next.bilingualLayout = "stacked";
        } else {
          delete next.bilingualOrder;
          delete next.bilingualLayout;
        }
      }
      return next;
    });
  }

  async function generate() {
    setBusy(true);
    setError("");
    try {
      const settings = {
        ...options,
        captionFonts: Object.keys(fonts).length ? fonts : null,
        captionPlacement: placement,
      };
      await api(`/v1/projects/${projectId}`, mutation("PATCH", { settings }));
      if (saveDefault) {
        const { captionPlacement: _p, ...defaults } = settings;
        void _p;
        await api("/v1/me/defaults", mutation("PATCH", defaults));
      }
      await api<JobStatusV1>(
        `/v1/projects/${projectId}/process`,
        mutation("POST", {}, processKey.current),
      );
      trackEvent("captions_generation_started", {
        output_variant: options.outputVariant,
      });
      clearDraft(projectId);
      router.push(`/studio/projects/${projectId}?step=generate`);
    } catch (e) {
      setError(explain(e));
      setBusy(false);
    }
  }

  const fontLabel = (script: "urdu" | "latin") =>
    CAPTION_FONTS.find((f) => f.id === (fonts[script] ?? DEFAULT_FONTS[script]))
      ?.label ?? "";
  const usesUrdu = options.outputVariant === "urdu" || options.outputVariant === "bilingual";
  const usesLatin = options.outputVariant !== "urdu";
  const fontSummary = [usesUrdu && fontLabel("urdu"), usesLatin && fontLabel("latin")]
    .filter(Boolean)
    .join(" + ");
  const styleLabel = template?.label ?? template?.name ?? "Default";
  const rail: RailStep[] = [
    { label: "Upload", detail: "Done", icon: UploadCloud },
    { label: "Captions", detail: outputLabel(options.outputVariant), icon: Languages },
    { label: "Font", detail: fontSummary, icon: Type },
    { label: "Style", detail: styleLabel, icon: Palette },
    {
      label: "Options",
      detail: `AI fix ${options.correctionEnabled ? "on" : "off"} · MP4 ${options.autoEmbed ? "on" : "off"}`,
      icon: SlidersHorizontal,
    },
    { label: "Generate", detail: mediaReady ? "Ready to start" : "Checking upload…", icon: Sparkles },
  ];
  const StepIcon = rail[step]!.icon;
  // Loop the sample's karaoke highlight over a two-second cycle.
  const cycle = (time % 2000) / 2000;
  return (
    <div className="wizard-shell" data-show-preview={showPreview}>
      <button type="button" className="wizard-view-switch secondary" aria-expanded={showPreview} aria-controls="wizard-live-preview" onClick={() => setShowPreview(!showPreview)}>{showPreview ? "Back to choices" : "View sample on video"}</button>
      <WizardRail
        steps={rail}
        current={step}
        onSelect={(index) => index > 0 && setStep(index as Step)}
      />
      <section className="wizard-card wizard-main" aria-labelledby="wizard-options-title">
        <header className="wizard-head">
          <span className="wizard-head-icon" aria-hidden="true">
            <StepIcon size={20} />
          </span>
          <div>
            <h2 id="wizard-options-title">{STEP_TITLES[step].title}</h2>
            <p>{STEP_TITLES[step].help}</p>
          </div>
        </header>
        <div key={step} className="wizard-body">
          {error && <ErrorNotice message={error} />}
          {step === 1 && (
            <>
              <div className="variant-choices" role="radiogroup" aria-label="Captions">
                {variants.map((v) => (
                  <label className="variant-choice" key={v.id}>
                    <input
                      type="radio"
                      name="wizard-variant"
                      value={v.id}
                      checked={options.outputVariant === v.id}
                      onChange={() => set("outputVariant", v.id)}
                    />
                    <span className="variant-choice-text">
                      <strong>{v.label}</strong>
                      <small>{v.description}</small>
                    </span>
                    <span className="variant-choice-mark" aria-hidden="true">
                      <Check size={13} />
                    </span>
                  </label>
                ))}
              </div>
              {options.outputVariant === "bilingual" && (
                <div className="wizard-subchoice">
                  <span className="wizard-subchoice-label">First caption line</span>
                  <div className="segmented" role="radiogroup" aria-label="First caption line">
                    {(["urdu-first", "english-first"] as const).map((order) => (
                      <label key={order} className="segmented-option">
                        <input
                          type="radio"
                          name="wizard-order"
                          checked={(options.bilingualOrder ?? "urdu-first") === order}
                          onChange={() => set("bilingualOrder", order)}
                        />
                        <span>{order === "urdu-first" ? "Urdu first" : "English first"}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          {step === 2 && (
            <FontPicker
              variant={options.outputVariant}
              value={fonts}
              onChange={setFonts}
            />
          )}
          {step === 3 && (
            <fieldset className="field template-field">
              <legend className="visually-hidden">Caption style</legend>
              <TemplateBrowser
                templates={presets}
                value={options.captionPresetVersionId}
                onChange={(id) => id && set("captionPresetVersionId", id)}
                name="wizard-template"
              />
            </fieldset>
          )}
          {step === 4 && (
            <div className="toggle-list">
              <label className="toggle-row">
                <span className="toggle-icon" aria-hidden="true">
                  <Wand2 size={18} />
                </span>
                <span>
                  <strong>AI text correction</strong>
                  <small>Suggest and safely apply text corrections. You can review changes later.</small>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={options.correctionEnabled}
                  onChange={(e) => set("correctionEnabled", e.target.checked)}
                />
              </label>
              <label className="toggle-row">
                <span className="toggle-icon" aria-hidden="true">
                  <Film size={18} />
                </span>
                <span>
                  <strong>Automatically embed captions</strong>
                  <small>Create the captioned MP4 as soon as captions are ready.</small>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={options.autoEmbed}
                  onChange={(e) => set("autoEmbed", e.target.checked)}
                />
              </label>
            </div>
          )}
          {step === 5 && (
            <>
              <dl className="wizard-summary">
                {rail.slice(1, 5).map((item, index) => (
                  <div key={item.label}>
                    <dt>
                      <item.icon size={16} aria-hidden="true" />
                      {item.label}
                    </dt>
                    <dd>{item.detail}</dd>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => setStep((index + 1) as Step)}
                    >
                      Change
                    </button>
                  </div>
                ))}
              </dl>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={saveDefault}
                  disabled={busy}
                  onChange={(e) => setSaveDefault(e.target.checked)}
                />
                Make these choices my defaults for future uploads
              </label>
            </>
          )}
        </div>
        <MediaReadiness projectId={projectId} onReady={setMediaReady} />
        <footer className="wizard-foot">
          {step > 1 ? (
            <button
              className="secondary"
              disabled={busy}
              onClick={() => setStep((s) => (s - 1) as Step)}
            >
              <ArrowLeft size={16} aria-hidden="true" /> Back
            </button>
          ) : (
            <span />
          )}
          {step < 5 ? (
            <button onClick={() => setStep((s) => (s + 1) as Step)}>
              Next: {rail[step + 1]!.label} <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button onClick={generate} disabled={busy || !mediaReady}>
              {busy || !mediaReady ? (
                <LoaderCircle size={18} className="spin" aria-hidden="true" />
              ) : (
                <Sparkles size={18} aria-hidden="true" />
              )}
              {busy
                ? "Starting…"
                : mediaReady
                  ? "Generate captions"
                  : "Waiting for upload check…"}
            </button>
          )}
        </footer>
      </section>
      <aside id="wizard-live-preview" className="wizard-card wizard-preview" aria-labelledby="wizard-preview-title">
        <header className="wizard-preview-head">
          <h2 id="wizard-preview-title">Live preview</h2>
          <span className="wizard-pill">Sample text</span>
        </header>
        {preview ? (
          <>
            <CaptionStage
              src={preview.url}
              audio={preview.audio}
              template={template}
              lines={sampleLines(options)}
              time={cycle}
              fonts={fonts}
              placement={placement}
              onPlacementChange={setPlacement}
              playerRef={player}
              controls={preview.audio}
              coach
              onTimeUpdate={setTime}
              onError={reload}
              onLoadedMetadata={(media) =>
                setPortrait(
                  media instanceof HTMLVideoElement &&
                    media.videoHeight > media.videoWidth,
                )
              }
            />
            {!preview.audio && (
              <>
                <StageTransport media={player} source={preview.url} />
                <PlacementControls
                  placement={placement}
                  fallback={defaultPlacement(template, portrait)}
                  onChange={setPlacement}
                />
              </>
            )}
          </>
        ) : (
          <div className="wizard-stage-wait" role="status">
            {state === "expired"
              ? "This recording is no longer stored."
              : state === "error"
                ? "This browser could not play the recording. You can still continue; captions are generated on our servers."
                : "Getting your video ready for preview…"}
          </div>
        )}
        <p className="wizard-note">
          The MP4 uses the same font, style, position and size. Your real
          captions replace the sample text after generation.
        </p>
      </aside>
    </div>
  );
}
