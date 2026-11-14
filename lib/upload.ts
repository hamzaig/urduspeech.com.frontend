import { api, mutation } from "./api";
import type { CreatedProject } from "./contracts";
export type UploadProgress = { completed: number; total: number };
export async function uploadParts(
  file: Blob,
  upload: CreatedProject["upload"],
  progress: (p: UploadProgress) => void,
  signal?: AbortSignal,
  send: typeof fetch = fetch,
) {
  if (
    upload.byteSize !== file.size ||
    upload.partSize <= 0 ||
    upload.partCount !== Math.ceil(file.size / upload.partSize)
  )
    throw Error("UPLOAD_METADATA_INVALID");
  const parts: { partNumber: number; etag: string }[] = [];
  for (let number = 1; number <= upload.partCount; number++) {
    signal?.throwIfAborted();
    const signed = await api<{ url: string }>(
      `/v1/uploads/${upload.id}/parts/${number}/sign`,
      { ...mutation("POST", {}), signal },
    );
    const url = new URL(signed.url);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      !/^([a-z0-9.-]+\.)?s3[.-][a-z0-9-]+\.amazonaws\.com$/.test(url.hostname)
    )
      throw Error("UPLOAD_DESTINATION_INVALID");
    const response = await send(url, {
      method: "PUT",
      body: file.slice(
        (number - 1) * upload.partSize,
        number * upload.partSize,
      ),
      credentials: "omit",
      signal,
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) throw Error("UPLOAD_PART_FAILED");
    const etag = response.headers.get("etag");
    if (!etag) throw Error("UPLOAD_ETAG_MISSING");
    parts.push({ partNumber: number, etag });
    progress({
      completed: Math.min(number * upload.partSize, file.size),
      total: file.size,
    });
  }
  return parts;
}
