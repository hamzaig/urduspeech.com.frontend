"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  Download,
  FileText,
  RotateCcw,
  Upload,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  SAMPLE_URDU_SRT,
  exportSubtitles,
  formatTimestamp,
  parseSubtitles,
  type SubtitleExportTarget,
} from "@/lib/subtitle-tools";

const TARGETS: readonly {
  id: SubtitleExportTarget;
  label: string;
  ext: string;
}[] = [
  { id: "vtt", label: "Convert to WebVTT (.vtt)", ext: "vtt" },
  { id: "srt", label: "Convert to SRT (.srt)", ext: "srt" },
  { id: "txt", label: "Extract plain text (.txt)", ext: "txt" },
];

export function SrtVttTool() {
  const [source, setSource] = useState(SAMPLE_URDU_SRT);
  const [target, setTarget] = useState<SubtitleExportTarget>("vtt");
  const [filename, setFilename] = useState("urduspeech-subtitles");
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => parseSubtitles(source), [source]);
  const output = useMemo(
    () => exportSubtitles(parsed.cues, target),
    [parsed.cues, target],
  );

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    const text = await file.text();
    setSource(text);
    setFilename(file.name.replace(/\.(srt|vtt|txt)$/i, "") || "subtitles");
    setCopied(false);
    trackEvent("free_tool_used", {
      tool_name: "srt_to_vtt_converter",
      action: "file_loaded",
    });
  }

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function downloadOutput() {
    if (!output) return;
    const mime =
      target === "vtt" ? "text/vtt;charset=utf-8" : "text/plain;charset=utf-8";
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.${target}`;
    link.click();
    URL.revokeObjectURL(url);
    trackEvent("free_tool_used", {
      tool_name: "srt_to_vtt_converter",
      action: `download_${target}`,
      cue_count: parsed.cues.length,
    });
  }

  return (
    <section className="tool-shell" aria-labelledby="srt-vtt-tool-heading">
      <div className="tool-toolbar">
        <div>
          <h2 id="srt-vtt-tool-heading">
            Browser UTF-8 subtitle converter &amp; validator
          </h2>
          <p className="field-help">
            Runs 100% locally in your browser, so your subtitle files are never
            uploaded to any server.
          </p>
        </div>
        <div className="tool-actions">
          <label className="button secondary">
            <Upload size={16} aria-hidden="true" />
            Open .srt or .vtt file
            <input
              type="file"
              accept=".srt,.vtt,text/vtt,text/plain"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setSource(SAMPLE_URDU_SRT);
              setFilename("urduspeech-subtitles");
              setCopied(false);
            }}
          >
            <RotateCcw size={15} aria-hidden="true" />
            Load Urdu sample
          </button>
        </div>
      </div>

      <div
        className="tool-mode-group"
        role="group"
        aria-label="Output subtitle format"
      >
        {TARGETS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="secondary"
            aria-pressed={target === item.id}
            onClick={() => {
              setTarget(item.id);
              setCopied(false);
            }}
          >
            <FileText size={15} aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="tool-stats" role="status" aria-live="polite">
        <span>
          Detected input: <strong>{parsed.format.toUpperCase()}</strong>
        </span>
        <span>
          Valid cues: <strong>{parsed.cues.length}</strong>
        </span>
        <span>
          Urdu RTL cues: <strong>{parsed.urduCueCount}</strong>
        </span>
        <span>
          Span:{" "}
          <strong>
            {parsed.totalDurationMs > 0
              ? formatTimestamp(parsed.totalDurationMs, "vtt")
              : "00:00:00.000"}
          </strong>
        </span>
        <span>
          Warnings / errors: <strong>{parsed.issues.length}</strong>
        </span>
      </div>

      {parsed.issues.length > 0 && (
        <ul className="tool-warning-list" role="alert">
          {parsed.issues.slice(0, 8).map((issue, idx) => (
            <li key={`${issue.cueIndex}-${idx}`}>
              <strong>
                {issue.severity === "error" ? "Error:" : "Check:"}
              </strong>{" "}
              {issue.message}
            </li>
          ))}
        </ul>
      )}

      <div className="tool-grid">
        <div className="tool-pane">
          <label htmlFor="subtitle-source-input">
            Paste SRT or WebVTT input (UTF-8)
          </label>
          <textarea
            id="subtitle-source-input"
            className="tool-textarea"
            value={source}
            onChange={(event) => {
              setSource(event.target.value);
              setCopied(false);
            }}
            spellCheck={false}
          />
        </div>
        <div className="tool-pane">
          <label htmlFor="subtitle-converted-output">
            Converted {target.toUpperCase()} output
          </label>
          <textarea
            id="subtitle-converted-output"
            className="tool-textarea"
            value={output}
            readOnly
            spellCheck={false}
          />
        </div>
      </div>

      <div className="tool-actions">
        <button
          type="button"
          className="button"
          disabled={!output}
          onClick={downloadOutput}
        >
          <Download size={16} aria-hidden="true" />
          Download .{target}
        </button>
        <button
          type="button"
          className="button secondary"
          disabled={!output}
          onClick={copyOutput}
        >
          {copied ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
          {copied ? "Copied output" : "Copy output"}
        </button>
      </div>
    </section>
  );
}
