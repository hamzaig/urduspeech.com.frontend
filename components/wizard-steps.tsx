const STEPS = [
  "Upload",
  "Captions",
  "Font",
  "Style",
  "Options",
  "Generate",
] as const;

/** Three-step progress for the caption flow. `current` is 0-based. */
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
