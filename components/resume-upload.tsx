"use client";
import { useEffect, useRef, useState } from "react";
import { api, explain } from "@/lib/api";
import { finishUpload } from "@/lib/upload";
import type { UploadSession } from "@/lib/contracts";
import { ErrorNotice, Saved } from "./common";
export function ResumeUpload({
  uploadId,
  onComplete,
}: {
  uploadId: string;
  onComplete: () => Promise<void>;
}) {
  const [upload, setUpload] = useState<UploadSession | null>(null),
    [file, setFile] = useState<File | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [percent, setPercent] = useState(0),
    [done, setDone] = useState(false);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    let live = true;
    api<UploadSession>("/v1/uploads/" + uploadId)
      .then((value) => {
        if (live) setUpload(value);
      })
      .catch((e) => {
        if (live) setError(explain(e));
      });
    return () => {
      live = false;
      controller.current?.abort();
    };
  }, [uploadId]);
  async function resume() {
    if (!upload || !file) return;
    const owned = new AbortController();
    controller.current = owned;
    setBusy(true);
    setError("");
    try {
      await finishUpload(
        file,
        upload,
        (p) => setPercent(Math.floor((p.completed / p.total) * 100)),
        owned.signal,
      );
      setDone(true);
      await onComplete();
    } catch (e) {
      setError(
        owned.signal.aborted
          ? "Upload paused. Completed parts are saved."
          : explain(e),
      );
    } finally {
      setBusy(false);
    }
  }
  if (done)
    return (
      <Saved>
        Upload completed. Media validation will continue automatically.
      </Saved>
    );
  if (!upload) return error ? <ErrorNotice message={error} /> : null;
  if (!["uploading", "completing"].includes(upload.state)) return null;
  return (
    <section className="media-readiness">
      <h2>Finish your upload</h2>
      <p>
        This project has an incomplete upload. Choose the same original file (
        {(upload.byteSize / 1024 ** 2).toFixed(1)} MB). Completed parts are
        reused only when their bytes match. On another device, parts are safely
        uploaded again.
      </p>
      {error && <ErrorNotice message={error} />}
      <label className="field">
        Original audio or video
        <input
          type="file"
          accept="audio/*,video/*,.mkv,.m4a"
          disabled={busy}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <div className="actions">
        <button
          disabled={busy || !file || file.size !== upload.byteSize}
          onClick={resume}
        >
          {busy ? `Uploading ${percent}%…` : "Continue upload"}
        </button>
        {busy && (
          <button
            className="secondary"
            onClick={() => controller.current?.abort()}
          >
            Pause upload
          </button>
        )}
      </div>
      {file && file.size !== upload.byteSize && (
        <p role="alert">
          This file has a different size. Choose the original file.
        </p>
      )}
    </section>
  );
}
