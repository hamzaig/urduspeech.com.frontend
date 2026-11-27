import { downloadForm, type DownloadGrant } from "./download";

// Matches the renderer's largest supported MP4. The stream goes straight into
// a browser-managed Blob so seeking and replay do not need a second ticket.
const maxRenderBytes = 256 * 1024 * 1024;

export async function fetchFinalVideo(
  grant: DownloadGrant,
  signal: AbortSignal,
  onProgress: (received: number, total: number | null) => void,
  send: typeof fetch = fetch,
): Promise<Blob> {
  const { action, ticket, method } = downloadForm(grant);
  const response = await send(action, {
    method,
    body: new URLSearchParams({ ticket }),
    signal,
    credentials: "omit",
    mode: "cors",
    redirect: "error",
    cache: "no-store",
    referrerPolicy: "no-referrer",
  });
  const lengthHeader = response.headers.get("content-length");
  const total = lengthHeader === null ? null : Number(lengthHeader);
  if (
    !response.ok ||
    !response.body ||
    response.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
      "video/mp4" ||
    (total !== null &&
      (!Number.isSafeInteger(total) || total <= 0 || total > maxRenderBytes))
  ) {
    await response.body?.cancel();
    throw Error("FINAL_VIDEO_UNAVAILABLE");
  }
  let received = 0;
  let lastReported = 0;
  const stream = response.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        received += chunk.byteLength;
        if (received > (total ?? maxRenderBytes))
          throw Error("FINAL_VIDEO_INVALID_SIZE");
        if (received - lastReported >= 256 * 1024 || received === total) {
          onProgress(received, total);
          lastReported = received;
        }
        controller.enqueue(chunk);
      },
      flush() {
        if (!received || (total !== null && received !== total))
          throw Error("FINAL_VIDEO_INCOMPLETE");
        if (received !== lastReported) onProgress(received, total);
      },
    }),
    { signal },
  );
  return new Response(stream, {
    headers: { "Content-Type": "video/mp4" },
  }).blob();
}
