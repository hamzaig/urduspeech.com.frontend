"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  calculateRecommendedPlan,
  type PlanCalculatorInput,
} from "@/lib/plan-calculator";

interface CreatorPreset {
  id: string;
  label: string;
  values: PlanCalculatorInput;
}

const PRESETS: readonly CreatorPreset[] = [
  {
    id: "reels",
    label: "Weekly Reels & TikTok",
    values: {
      shortClipsPerMonth: 16,
      avgShortMinutes: 1.5,
      longVideosPerMonth: 1,
      avgLongMinutes: 12,
      voiceNoteMinutesPerMonth: 5,
      needsClean1080p: true,
    },
  },
  {
    id: "youtube",
    label: "YouTube Creator",
    values: {
      shortClipsPerMonth: 12,
      avgShortMinutes: 1,
      longVideosPerMonth: 6,
      avgLongMinutes: 18,
      voiceNoteMinutesPerMonth: 10,
      needsClean1080p: true,
    },
  },
  {
    id: "podcast",
    label: "Urdu Podcaster",
    values: {
      shortClipsPerMonth: 16,
      avgShortMinutes: 1,
      longVideosPerMonth: 4,
      avgLongMinutes: 45,
      voiceNoteMinutesPerMonth: 0,
      needsClean1080p: true,
    },
  },
  {
    id: "agency",
    label: "Agency / Newsroom",
    values: {
      shortClipsPerMonth: 40,
      avgShortMinutes: 1.5,
      longVideosPerMonth: 10,
      avgLongMinutes: 35,
      voiceNoteMinutesPerMonth: 40,
      needsClean1080p: true,
    },
  },
];

export function PlanCalculator({
  heading = "Estimate your monthly minutes & best PKR plan",
  source = "pricing",
}: {
  heading?: string;
  source?: string;
}) {
  const [input, setInput] = useState<PlanCalculatorInput>(PRESETS[1].values);
  const [activePreset, setActivePreset] = useState<string>("youtube");

  const result = useMemo(() => calculateRecommendedPlan(input), [input]);

  function updateField<K extends keyof PlanCalculatorInput>(
    key: K,
    value: PlanCalculatorInput[K],
  ) {
    setActivePreset("custom");
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  function applyPreset(preset: CreatorPreset) {
    setActivePreset(preset.id);
    setInput(preset.values);
    trackEvent("pricing_calculator_interacted", {
      source,
      preset: preset.id,
      recommended_plan: calculateRecommendedPlan(preset.values).recommendedPlan
        .id,
    });
  }

  const plan = result.recommendedPlan;
  const registerHref =
    plan.id === "free"
      ? `/auth/register?source=${encodeURIComponent(source)}`
      : `/auth/register?plan=${plan.id}&source=${encodeURIComponent(source)}`;

  return (
    <section
      className="tool-shell plan-calculator"
      aria-labelledby="plan-calculator-heading"
    >
      <div className="tool-toolbar">
        <div>
          <h2 id="plan-calculator-heading" className="calc-heading">
            <Calculator size={20} aria-hidden="true" />
            {heading}
          </h2>
          <p className="field-help">
            Pick a creator schedule or dial in your monthly videos and voice
            notes to see your exact PKR cost per minute.
          </p>
        </div>
      </div>

      <div
        className="tool-mode-group"
        role="group"
        aria-label="Quick creator publishing presets"
      >
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="secondary"
            aria-pressed={activePreset === preset.id}
            onClick={() => applyPreset(preset)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="calc-layout">
        <div className="calc-inputs">
          <div className="calc-row">
            <label className="calc-field">
              <span>
                Short clips / month (Reels, TikTok, Shorts):{" "}
                <strong>{input.shortClipsPerMonth}</strong>
              </span>
              <input
                type="range"
                min={0}
                max={60}
                step={1}
                value={input.shortClipsPerMonth}
                onChange={(e) =>
                  updateField("shortClipsPerMonth", Number(e.target.value))
                }
              />
            </label>
            <label className="calc-field">
              <span>
                Avg short clip length:{" "}
                <strong>{input.avgShortMinutes} min</strong>
              </span>
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.5}
                value={input.avgShortMinutes}
                onChange={(e) =>
                  updateField("avgShortMinutes", Number(e.target.value))
                }
              />
            </label>
          </div>

          <div className="calc-row">
            <label className="calc-field">
              <span>
                Long videos / podcasts / month:{" "}
                <strong>{input.longVideosPerMonth}</strong>
              </span>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={input.longVideosPerMonth}
                onChange={(e) =>
                  updateField("longVideosPerMonth", Number(e.target.value))
                }
              />
            </label>
            <label className="calc-field">
              <span>
                Avg long recording length:{" "}
                <strong>{input.avgLongMinutes} min</strong>
              </span>
              <input
                type="range"
                min={5}
                max={240}
                step={5}
                value={input.avgLongMinutes}
                onChange={(e) =>
                  updateField("avgLongMinutes", Number(e.target.value))
                }
              />
            </label>
          </div>

          <div className="calc-row">
            <label className="calc-field">
              <span>
                Voice notes / interviews (total min/mo):{" "}
                <strong>{input.voiceNoteMinutesPerMonth} min</strong>
              </span>
              <input
                type="range"
                min={0}
                max={120}
                step={5}
                value={input.voiceNoteMinutesPerMonth}
                onChange={(e) =>
                  updateField(
                    "voiceNoteMinutesPerMonth",
                    Number(e.target.value),
                  )
                }
              />
            </label>
            <label className="check-row calc-checkbox">
              <input
                type="checkbox"
                checked={input.needsClean1080p}
                onChange={(e) =>
                  updateField("needsClean1080p", e.target.checked)
                }
              />
              <span>I need clean 1080p MP4 exports without watermark</span>
            </label>
          </div>
        </div>

        <aside
          className="calc-result"
          aria-live="polite"
          aria-label="Recommended UrduSpeech plan"
        >
          <h3>
            Recommended: {plan.name} (PKR {plan.priceDisplay}
            {plan.billingPeriod === "monthly" ? "/mo" : " once"})
          </h3>
          <dl className="calc-metrics">
            <div>
              <dt>Estimated usage</dt>
              <dd>{result.totalMonthlyMinutes} min / mo</dd>
            </div>
            <div>
              <dt>Included allowance</dt>
              <dd>{plan.minutes} min</dd>
            </div>
            <div>
              <dt>Plan rate</dt>
              <dd>
                {result.effectivePlanRatePkr === null
                  ? "Free (10 min)"
                  : `PKR ${result.effectivePlanRatePkr} / min`}
              </dd>
            </div>
            <div>
              <dt>Headroom left</dt>
              <dd>
                {result.exceedsStudioAllowance
                  ? `${result.totalMonthlyMinutes - plan.minutes} min over Studio`
                  : `${result.spareMinutes} min buffer`}
              </dd>
            </div>
          </dl>
          <ul className="calc-reasons" role="list">
            {result.reasons.map((reason) => (
              <li key={reason}>
                <Check size={15} aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
          <div className="calc-cta-group">
            <Link
              href={registerHref}
              className="button"
              onClick={() =>
                trackEvent("cta_clicked", {
                  location: `plan_calculator_${source}`,
                  recommended_plan: plan.id,
                  estimated_minutes: result.totalMonthlyMinutes,
                })
              }
            >
              Try 10 free min
            </Link>
            <small>
              Every account starts free (no card required). Upgrade to{" "}
              {plan.name} inside Studio Billing whenever ready.
            </small>
          </div>
        </aside>
      </div>
    </section>
  );
}
