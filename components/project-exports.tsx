"use client";

import {
  Captions,
  Check,
  Clapperboard,
  Download,
  FileText,
  LoaderCircle,
} from "lucide-react";
import { outputLabel } from "@/components/output-options";
import { explain, ApiError } from "@/lib/api";
import type { ExportFile, Render } from "@/lib/contracts";

type Props = {
  timingReady: boolean;
  durationMs: number;
  canPrepareFiles: boolean;
  render: Render | null;
  current: boolean;
  busy: boolean;
  dirty: boolean;
  videoBlock: string;
  files: ExportFile[];
  onEdit: () => void;
  onRender: () => void;
  onCancel: () => void;
  onFiles: () => void;
  download: (path: string) => void;
};

export function ProjectExports({
  timingReady,
  durationMs,
  canPrepareFiles,
  render,
  current,
  busy,
  dirty,
  videoBlock,
  files,
  onEdit,
  onRender,
  onCancel,
  onFiles,
  download,
}: Props) {
  const pending = render?.state === "pending" || render?.state === "rendering";
  const ready = current && render?.state === "completed";
  const percent =
    render && durationMs > 0 && render.progressMs > 0
      ? Math.min(99, Math.floor((100 * render.progressMs) / durationMs))
      : null;
  const expectedFormats = timingReady ? ["txt", "srt", "vtt"] : ["txt"];
  const missingFiles = expectedFormats.some(
    (format) =>
      !files.some(
        (file) =>
          file.format === format && file.state === "ready" && file.downloadPath,
      ),
  );
  const preparingFiles = files.some((f) => f.state === "pending");
  return (
    <div className="export-options">
      {dirty && (
        <div className="desk-prompt">
          Save your caption edits before exporting.{" "}
          <button type="button" className="text-button" onClick={onEdit}>
            Back to captions
          </button>
        </div>
      )}
      <section className="export-option" aria-labelledby="video-export-title">
        <div className="export-option-title">
          <span className="tool-icon">
            <Clapperboard size={19} />
          </span>
          <div>
            <h3 id="video-export-title">Video with captions</h3>
            <p>One MP4 with the styled captions embedded.</p>
          </div>
        </div>
        {pending ? (
          <div className="render-status">
            <span role="status">
              <LoaderCircle aria-hidden="true" size={15} />
              {current ? "Preparing MP4" : "Preparing a previous version"}
              {percent !== null && ` · ${percent}%`}
            </span>
            <progress
              aria-label="Video export progress"
              value={percent ?? undefined}
              max="100"
            />
            <button
              type="button"
              className="text-button"
              onClick={onCancel}
              disabled={busy}
            >
              Cancel video render
            </button>
          </div>
        ) : ready ? (
          <>
            <p className="file-ready">
              <Check size={15} aria-hidden="true" /> Ready to download
              {render.width > 0 &&
                render.height > 0 &&
                ` · ${render.width} × ${render.height}`}
              {render.watermark && " · Watermarked"}
            </p>
            <button
              type="button"
              onClick={() => download(`/v1/renders/${render.id}/download`)}
              disabled={busy || dirty}
            >
              <Download size={16} />
              Download MP4
            </button>
          </>
        ) : (
          <>
            {videoBlock && <p className="export-help">{videoBlock}</p>}
            {current && render?.state === "failed" && (
              <p className="export-help" role="status">
                {render.errorCode
                  ? explain(new ApiError(409, render.errorCode))
                  : "The video export failed. You can try again."}
              </p>
            )}
            {current && render?.state === "cancelled" && (
              <p className="export-help">
                Video export cancelled. Your captions are saved.
              </p>
            )}
            <button
              type="button"
              onClick={onRender}
              disabled={busy || dirty || !!videoBlock}
            >
              <Clapperboard size={16} />
              {current && render?.state === "failed"
                ? "Retry MP4 export"
                : "Create captioned MP4"}
            </button>
          </>
        )}
        {!current && render?.state === "completed" && (
          <button
            type="button"
            className="text-button"
            disabled={busy}
            onClick={() => download(`/v1/renders/${render.id}/download`)}
          >
            Download previous MP4
          </button>
        )}
      </section>
      <section className="export-option" aria-labelledby="text-export-title">
        <div className="export-option-title">
          <span className="tool-icon">
            <FileText size={19} />
          </span>
          <div>
            <h3 id="text-export-title">Subtitle files</h3>
            <p>
              {timingReady
                ? "Use SRT or VTT in another editor, or TXT for the words alone."
                : !canPrepareFiles
                  ? "Text downloads will appear here when the transcript is ready."
                  : "Download the words as plain text. SRT and VTT need caption timing."}
            </p>
          </div>
        </div>
        {files.length > 0 && (
          <ul className="export-files">
            {files.map((file) => (
              <li key={file.id}>
                <div>
                  <strong>{file.format.toUpperCase()}</strong>
                  <small>{outputLabel(file.variant)}</small>
                </div>
                {file.state === "ready" && file.downloadPath ? (
                  <button
                    type="button"
                    className="secondary"
                    disabled={busy || dirty}
                    aria-label={`Download ${file.format.toUpperCase()}`}
                    onClick={() => download(file.downloadPath!)}
                  >
                    <Download size={15} />
                    <span>Download</span>
                  </button>
                ) : (
                  <small role="status">
                    {file.state === "pending"
                      ? "Preparing…"
                      : file.state === "failed"
                        ? "Failed"
                        : file.state.replaceAll("_", " ")}
                  </small>
                )}
              </li>
            ))}
          </ul>
        )}
        {missingFiles && (
          <button
            className="secondary"
            type="button"
            disabled={busy || dirty || !canPrepareFiles || preparingFiles}
            onClick={onFiles}
          >
            <Captions size={16} />
            {preparingFiles ? "Preparing files…" : "Prepare subtitle files"}
          </button>
        )}
      </section>
    </div>
  );
}
