"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { api, ApiError, mutation, explain } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import type { Defaults, JobStatusV1 } from "@/lib/contracts";
import { variants, type Preset } from "@/components/output-options";
import { TemplatePicker } from "@/components/caption-template";
import {
  CaptionStage,
  PlacementControls,
  defaultPlacement,
  type CaptionPlacement,
} from "@/components/caption-stage";
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

/**
 * Wizard step 2: choose the caption language and template while a sample
 * caption plays on the uploaded video; Next saves the choices and starts
 * caption generation.
 */
export function CaptionChoiceStep({
  projectId,
  presets,
  initial,
  planSlug,
}: {
  projectId: string;
  presets: Preset[];
  initial: Defaults;
  planSlug: string | undefined;
}) {
  const router = useRouter();
  const [options, setOptions] = useState<Defaults>(() => ({
    ...initial,
    captionPresetVersionId:
      initial.captionPresetVersionId ?? presets[0]?.id ?? null,
  }));
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
  const template = presets.find(
    ({ id }) => id === options.captionPresetVersionId,
  );
  const premiumOnFree =
    template?.tier === "premium" && (planSlug ?? "free") === "free";

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

  async function next() {
    setBusy(true);
    setError("");
    try {
      const settings = { ...options, captionPlacement: placement };
      await api(
        `/v1/projects/${projectId}`,
        mutation("PATCH", { settings }),
      );
      if (saveDefault) {
        const { captionPlacement: _ignored, ...defaults } = settings;
        void _ignored;
        await api("/v1/me/defaults", mutation("PATCH", defaults));
      }
      await api<JobStatusV1>(
        `/v1/projects/${projectId}/process`,
        mutation("POST", {}, processKey.current),
      );
      trackEvent("captions_generation_started", {
        output_variant: options.outputVariant,
        template: options.captionPresetVersionId ?? "default",
      });
      router.push(`/studio/projects/${projectId}?step=generate`);
    } catch (e) {
      setError(explain(e));
      setBusy(false);
    }
  }

  // Loop the sample's karaoke highlight over a two-second cycle.
  const cycle = (time % 2000) / 2000;
  return (
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
              placement={placement}
              onPlacementChange={setPlacement}
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
          Sample text shows the look. Your real captions appear after
          generation, and the MP4 follows this position and size.
        </small>
        <MediaReadiness projectId={projectId} onReady={setMediaReady} />
      </section>
      <section className="wizard-panel" aria-labelledby="wizard-options-title">
        <h2 id="wizard-options-title">Which captions?</h2>
        {error && <ErrorNotice message={error} />}
        <div className="variant-choices" role="radiogroup">
          {variants.map((v) => (
            <label className="variant-choice" key={v.id}>
              <input
                type="radio"
                name="wizard-variant"
                value={v.id}
                checked={options.outputVariant === v.id}
                disabled={busy}
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
              disabled={busy}
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
        <fieldset className="field template-field" disabled={busy}>
          <legend>Caption style</legend>
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
        <details className="wizard-more">
          <summary>More options</summary>
          <div className="toggle-list">
            <label className="toggle-row">
              <span>
                <strong>AI text correction</strong>
                <small>Suggest and safely apply text corrections.</small>
              </span>
              <input
                type="checkbox"
                role="switch"
                checked={options.correctionEnabled}
                disabled={busy}
                onChange={(e) => set("correctionEnabled", e.target.checked)}
              />
            </label>
            <label className="toggle-row">
              <span>
                <strong>Automatically embed captions</strong>
                <small>Create the captioned MP4 when captions are ready.</small>
              </span>
              <input
                type="checkbox"
                role="switch"
                checked={options.autoEmbed}
                disabled={busy}
                onChange={(e) => set("autoEmbed", e.target.checked)}
              />
            </label>
          </div>
          <label className="check-row">
            <input
              type="checkbox"
              checked={saveDefault}
              disabled={busy}
              onChange={(e) => setSaveDefault(e.target.checked)}
            />
            Make these choices my defaults for future uploads
          </label>
        </details>
        <div className="wizard-actions">
          <button onClick={next} disabled={busy || !mediaReady}>
            <Sparkles size={18} aria-hidden="true" />
            {busy
              ? "Starting…"
              : mediaReady
                ? "Next: generate captions"
                : "Checking your upload…"}
          </button>
        </div>
      </section>
    </div>
  );
}
