const STEPS = ["Upload", "Captions & style", "Generate & edit"] as const;

/** Three-step progress for the caption flow. `current` is 0-based. */
export function WizardSteps({ current }: { current: 0 | 1 | 2 }) {
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
