import type { Track } from "./contracts";

type EditableCue = Pick<
  Track["content"]["cues"][number],
  "position" | "startMs" | "endMs" | "text"
>;

export function captionChanges(
  saved: readonly EditableCue[],
  edited: readonly EditableCue[],
): EditableCue[] {
  return edited
    .filter(({ text, startMs, endMs }, index) => {
      const original = saved[index];
      return (
        text !== original.text ||
        startMs !== original.startMs ||
        endMs !== original.endMs
      );
    })
    .map(({ position, text, startMs, endMs }) => ({
      position,
      text,
      startMs,
      endMs,
    }));
}
