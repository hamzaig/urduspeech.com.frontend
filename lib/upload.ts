import { api, mutation } from "./api";
import type { CreatedProject, UploadSession } from "./contracts";
export type UploadProgress = { completed: number; total: number };
export type PartReceipt = {
  partNumber: number;
  size: number;
  etag: string;
  sha256: string;
};
export interface ReceiptStore {
  read(uploadId: string, part: number): PartReceipt | null;
  save(uploadId: string, receipt: PartReceipt): void;
}
export const browserReceipts: ReceiptStore = {
  read(uploadId, part) {
    try {
      const value = JSON.parse(
        sessionStorage.getItem(`urduspeech-part:${uploadId}:${part}`) ?? "null",
      );
      return value &&
        value.partNumber === part &&
        Number.isSafeInteger(value.size) &&
        typeof value.etag === "string" &&
        /^[a-f0-9]{64}$/.test(value.sha256)
        ? value
        : null;
    } catch {
      return null;
    }
  },
  save(uploadId, receipt) {
    try {
      sessionStorage.setItem(
        `urduspeech-part:${uploadId}:${receipt.partNumber}`,
        JSON.stringify(receipt),
      );
    } catch {
      /* Missing browser storage only requires reuploading that part next time. */
    }
  },
};
export async function uploadParts(
  file: Blob,
  upload: CreatedProject["upload"],
  progress: (p: UploadProgress) => void,
  signal?: AbortSignal,
  send: typeof fetch = fetch,
  resume?: { parts: UploadSession["parts"]; receipts: ReceiptStore },
) {
  if (
    upload.byteSize !== file.size ||
    !Number.isSafeInteger(upload.partSize) ||
    upload.partSize <= 0 ||
    upload.partSize > 64 * 1024 * 1024 ||
    upload.partCount !== Math.ceil(file.size / upload.partSize)
  )
    throw Error("UPLOAD_METADATA_INVALID");
  const parts: { partNumber: number; etag: string }[] = [];
  let completed = 0;
  for (let number = 1; number <= upload.partCount; number++) {
    signal?.throwIfAborted();
    const blob = file.slice(
      (number - 1) * upload.partSize,
      number * upload.partSize,
    );
    // Hash one bounded part, never a multi-GiB file in one arrayBuffer. A remote
    // ETag alone cannot establish that a reselected local file is identical.
    const sha256 = resume
      ? Array.from(
          new Uint8Array(
            await crypto.subtle.digest("SHA-256", await blob.arrayBuffer()),
          ),
          (byte) => byte.toString(16).padStart(2, "0"),
        ).join("")
      : undefined;
    signal?.throwIfAborted();
    const remote = resume?.parts.find((part) => part.partNumber === number),
      receipt = resume?.receipts.read(upload.id, number);
    if (
      remote &&
      receipt &&
      receipt.sha256 === sha256 &&
      receipt.etag === remote.etag &&
      receipt.size === blob.size &&
      remote.size === blob.size
    ) {
      parts.push({ partNumber: number, etag: remote.etag });
      completed += blob.size;
      progress({ completed, total: file.size });
      continue;
    }
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
      body: blob,
      credentials: "omit",
      signal,
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) throw Error("UPLOAD_PART_FAILED");
    const etag = response.headers.get("etag");
    if (!etag) throw Error("UPLOAD_ETAG_MISSING");
    parts.push({ partNumber: number, etag });
    if (resume && sha256)
      resume.receipts.save(upload.id, {
        partNumber: number,
        size: blob.size,
        etag,
        sha256,
      });
    completed += blob.size;
    progress({
      completed,
      total: file.size,
    });
  }
  return parts;
}
export async function finishUpload(
  file: Blob,
  upload: CreatedProject["upload"],
  progress: (p: UploadProgress) => void,
  signal?: AbortSignal,
  receipts: ReceiptStore = browserReceipts,
) {
  const current = await api<UploadSession>(`/v1/uploads/${upload.id}`, {
    signal,
  });
  if (current.byteSize !== file.size) throw Error("UPLOAD_METADATA_INVALID");
  if (["checksum_pending", "uploaded"].includes(current.state)) {
    progress({ completed: file.size, total: file.size });
    return current;
  }
  if (
    current.finalization &&
    ["uploading", "completing"].includes(current.state)
  ) {
    return api<CreatedProject["upload"]>(`/v1/uploads/${upload.id}/finalize`, {
      ...mutation(
        "POST",
        { parts: current.finalization.parts },
        current.finalization.operationKey,
      ),
      signal,
    });
  }
  if (current.state !== "uploading") throw Error("UPLOAD_NOT_RESUMABLE");
  const parts = await uploadParts(file, current, progress, signal, fetch, {
    parts: current.parts,
    receipts,
  });
  return api<CreatedProject["upload"]>(`/v1/uploads/${upload.id}/finalize`, {
    ...mutation("POST", { parts }, "finalize-" + upload.id),
    signal,
  });
}
