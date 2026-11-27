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

/** Seconds on the player, with milliseconds when adjusting a caption boundary. */
export function captionTime(ms: number, precise = false) {
  const value = Math.max(0, Math.floor(ms));
  const minutes = Math.floor(value / 60000);
  const seconds = String(Math.floor(value / 1000) % 60).padStart(2, "0");
  const fraction = String(value % 1000)
    .padStart(3, "0")
    .replace(/0+$/, "");
  return `${minutes}:${seconds}${precise && fraction ? "." + fraction : ""}`;
}
