"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { api, ApiError, mutation, explain } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import type { Defaults, JobStatusV1 } from "@/lib/contracts";
import { variants, type Preset } from "@/components/output-options";
import {
  CaptionStage,
  PlacementControls,
  defaultPlacement,
  type CaptionPlacement,
} from "@/components/caption-stage";
import { TemplatePicker } from "@/components/caption-template";
import { FontPicker } from "@/components/font-picker";
import { WizardSteps } from "@/components/wizard-steps";
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
const STEP_TITLES: Record<Step, { title: string; help: string }> = {
  1: { title: "Which captions?", help: "Choose the language and script for your captions." },
  2: { title: "Choose a font", help: "Pick how the letters look. The preview uses your choice." },
  3: { title: "Choose a style", help: "Pick a caption style. Drag the caption on the video to move it; drag its corner to resize." },
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
  const [step, setStep] = useState<Step>(1);
  // AI correction and automatic MP4 are on by default in the wizard.
  const [options, setOptions] = useState<Defaults>(() => ({
    ...initial,
    correctionEnabled: true,
    autoEmbed: true,
    captionPresetVersionId:
      initial.captionPresetVersionId ?? presets[0]?.id ?? null,
  }));
  const [fonts, setFonts] = useState<CaptionFontChoice>(
    () => initial.captionFonts ?? {},
  );
  const [placement, setPlacement] = useState<CaptionPlacement | null>(
    initial.captionPlacement ?? null,
  );
  const [mediaReady, setMediaReady] = useState(false),
    [saveDefault, setSaveDefault] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [time, setTime] = useState(0),
    [portrait, setPortrait] = useState(false);
  const processKey = useRef(crypto.randomUUID());
  const { preview, state, reload } = useProjectPreview(projectId);
  const template =
    presets.find(({ id }) => id === options.captionPresetVersionId) ??
    presets[0];
  const premiumOnFree = template?.tier === "premium";

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
  // Loop the sample's karaoke highlight over a two-second cycle.
  const cycle = (time % 2000) / 2000;
  return (
    <>
      <WizardSteps current={step} />
      <div className="wizard-layout">
        <section className="wizard-panel" aria-labelledby="wizard-preview-title">
          <h2 id="wizard-preview-title">Preview on your video</h2>
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
                onPlacementChange={step === 3 ? setPlacement : undefined}
                onTimeUpdate={setTime}
                onError={reload}
                onLoadedMetadata={(media) =>
                  setPortrait(
                    media instanceof HTMLVideoElement &&
                      media.videoHeight > media.videoWidth,
                  )
                }
              />
              {step === 3 && !preview.audio && (
                <PlacementControls
                  placement={placement}
                  fallback={defaultPlacement(template, portrait)}
                  onChange={setPlacement}
                />
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
          <small className="field-help">
            Sample text shows your choices. Your real captions appear after
            generation, and the MP4 uses the same font, style, position and
            size.
          </small>
          <MediaReadiness projectId={projectId} onReady={setMediaReady} />
        </section>
        <section className="wizard-panel" aria-labelledby="wizard-options-title">
          <h2 id="wizard-options-title">{STEP_TITLES[step].title}</h2>
          <p className="field-help">{STEP_TITLES[step].help}</p>
          {error && <ErrorNotice message={error} />}
          {step === 1 && (
            <>
              <div className="variant-choices" role="radiogroup">
                {variants.map((v) => (
                  <label className="variant-choice" key={v.id}>
                    <input
                      type="radio"
                      name="wizard-variant"
                      value={v.id}
                      checked={options.outputVariant === v.id}
                      onChange={() => set("outputVariant", v.id)}
                    />
                    <strong>{v.label}</strong>
                    <small>{v.description}</small>
                  </label>
                ))}
              </div>
              {options.outputVariant === "bilingual" && (
                <label className="field">
                  First caption line
                  <select
                    value={options.bilingualOrder ?? "urdu-first"}
                    onChange={(e) =>
                      set(
                        "bilingualOrder",
                        e.target.value as Defaults["bilingualOrder"],
                      )
                    }
                  >
                    <option value="urdu-first">Urdu first</option>
                    <option value="english-first">English first</option>
                  </select>
                </label>
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
              <TemplatePicker
                templates={presets}
                value={options.captionPresetVersionId}
                onChange={(id) => id && set("captionPresetVersionId", id)}
                name="wizard-template"
              />
              {premiumOnFree && (
                <small className="field-help">
                  Premium style: captions and SRT/VTT work on every plan; the
                  captioned MP4 with this style needs a paid plan.
                </small>
              )}
            </fieldset>
          )}
          {step === 4 && (
            <div className="toggle-list">
              <label className="toggle-row">
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
                <div>
                  <dt>Captions</dt>
                  <dd>{outputLabel(options.outputVariant)}</dd>
                </div>
                <div>
                  <dt>Font</dt>
                  <dd>
                    {[usesUrdu && fontLabel("urdu"), usesLatin && fontLabel("latin")]
                      .filter(Boolean)
                      .join(" + ")}
                  </dd>
                </div>
                <div>
                  <dt>Style</dt>
                  <dd>{template?.label ?? template?.name ?? "Default"}</dd>
                </div>
                <div>
                  <dt>AI text correction</dt>
                  <dd>{options.correctionEnabled ? "On" : "Off"}</dd>
                </div>
                <div>
                  <dt>Automatic MP4</dt>
                  <dd>{options.autoEmbed ? "On" : "Off"}</dd>
                </div>
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
          <div className="wizard-actions">
            {step > 1 && (
              <button
                className="secondary"
                disabled={busy}
                onClick={() => setStep((s) => (s - 1) as Step)}
              >
                <ArrowLeft size={16} aria-hidden="true" /> Back
              </button>
            )}
            {step < 5 ? (
              <button onClick={() => setStep((s) => (s + 1) as Step)}>
                Next <ArrowRight size={16} aria-hidden="true" />
              </button>
            ) : (
              <button onClick={generate} disabled={busy || !mediaReady}>
                <Sparkles size={18} aria-hidden="true" />
                {busy
                  ? "Starting…"
                  : mediaReady
                    ? "Generate captions"
                    : "Checking your upload…"}
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
