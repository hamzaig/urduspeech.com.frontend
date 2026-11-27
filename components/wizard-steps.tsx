import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

const STEPS = [
  "Upload",
  "Captions",
  "Font",
  "Style",
  "Options",
  "Generate",
] as const;

/** Compact horizontal progress for the caption flow. `current` is 0-based. */
export function WizardSteps({ current }: { current: number }) {
  return (
    <ol className="wizard-steps" aria-label="Caption steps">
      {STEPS.map((label, index) => (
        <li
          key={label}
          data-state={index < current ? "done" : undefined}
          aria-current={index === current ? "step" : undefined}
        >
          {label}
        </li>
      ))}
    </ol>
  );
}

export type RailStep = {
  label: string;
  /** The current choice for this step, shown under its name. */
  detail: string;
  icon: LucideIcon;
};

/**
 * Vertical step list beside the wizard. Every step after upload can be
 * opened directly, because each one already has a sensible default.
 */
export function WizardRail({
  steps,
  current,
  onSelect,
}: {
  steps: readonly RailStep[];
  current: number;
  onSelect?: (index: number) => void;
}) {
  return (
    <nav className="wizard-rail" aria-label="Caption setup steps">
      <p className="wizard-rail-count">
        Step {current + 1} of {steps.length}
        <span className="wizard-rail-current"> · {steps[current]?.label}</span>
      </p>
      <div
        className="wizard-rail-bar"
        aria-hidden="true"
        style={{ ["--progress" as string]: String(current / (steps.length - 1)) }}
      />
      <ol>
        {steps.map(({ label, detail, icon: Icon }, index) => {
          const done = index < current,
            active = index === current,
            locked = index === 0 || !onSelect;
          return (
            <li key={label}>
              <button
                type="button"
                className="wizard-rail-item"
                data-state={active ? "active" : done ? "done" : "todo"}
                aria-current={active ? "step" : undefined}
                disabled={locked}
                onClick={() => onSelect?.(index)}
              >
                <span className="wizard-rail-icon" aria-hidden="true">
                  {done ? <Check size={16} /> : <Icon size={16} />}
                </span>
                <span className="wizard-rail-text">
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
