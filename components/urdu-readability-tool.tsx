"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  Download,
  RotateCcw,
  Sparkles,
  Upload,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  SAMPLE_AUDIT_SRT,
  analyzeUrduSubtitles,
  formatCueRange,
  normalizeUrduSubtitles,
  type ReadabilityPlatform,
} from "@/lib/urdu-subtitle-analyzer";

export function UrduReadabilityTool() {
  const [source, setSource] = useState(SAMPLE_AUDIT_SRT);
  const [platform, setPlatform] = useState<ReadabilityPlatform>("reels");
  const [filename, setFilename] = useState("urdu-subtitles-clean");
  const [statusNotice, setStatusNotice] = useState("");
  const [copied, setCopied] = useState(false);

  const report = useMemo(
    () => analyzeUrduSubtitles(source, platform),
    [source, platform],
  );

  const fixableUnicodeTotal =
    report.arabicKafTotal +
    report.arabicYehTotal +
    report.latinPunctuationTotal;

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || file.size > 5 * 1024 * 1024) return;
    const text = await file.text();
    setSource(text);
    setFilename(
      `${file.name.replace(/\.(srt|vtt|txt)$/i, "") || "subtitles"}-clean`,
    );
    setStatusNotice("");
    setCopied(false);
    trackEvent("free_tool_used", {
      tool_name: "urdu_subtitle_checker",
      action: "file_loaded",
      platform,
    });
  }

  function applyUnicodeFix() {
    const targetFormat = report.format === "vtt" ? "vtt" : "srt";
    const result = normalizeUrduSubtitles(source, targetFormat);
    if (result.totalFixes === 0) {
      setStatusNotice(
        "Your Urdu Unicode characters and punctuation are already clean.",
      );
      return;
    }
    setSource(result.normalizedText);
    setCopied(false);
    setStatusNotice(
      `Fixed ${result.totalFixes} issue(s): ${result.arabicKafFixed} Arabic kaf (ك → ک), ${result.arabicYehFixed} Arabic yeh (ي → ی), ${result.punctuationFixed} Urdu punctuation mark(s).`,
    );
    trackEvent("free_tool_used", {
      tool_name: "urdu_subtitle_checker",
      action: "unicode_normalized",
      fixes: result.totalFixes,
    });
  }

  function downloadFixed(ext: "srt" | "vtt") {
    const result = normalizeUrduSubtitles(source, ext);
    const content = result.normalizedText;
    if (!content) return;
    const mime =
      ext === "vtt" ? "text/vtt;charset=utf-8" : "text/plain;charset=utf-8";
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
    trackEvent("free_tool_used", {
      tool_name: "urdu_subtitle_checker",
      action: `download_${ext}`,
      cue_count: report.cueCount,
    });
  }

  async function copyCleaned() {
    const targetFormat = report.format === "vtt" ? "vtt" : "srt";
    const content = normalizeUrduSubtitles(source, targetFormat).normalizedText;
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      trackEvent("free_tool_used", {
        tool_name: "urdu_subtitle_checker",
        action: "copied_output",
      });
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="tool-shell" aria-labelledby="urdu-checker-tool-heading">
      <div className="tool-toolbar">
        <div>
          <h2 id="urdu-checker-tool-heading">
            Urdu subtitle readability &amp; Unicode fixer
          </h2>
          <p className="field-help">
            Runs locally in your browser with zero file uploads. Checks mobile
            and YouTube reading speed (CPS) and fixes Arabic kaf/yeh characters
            for clean Nastaliq shaping.
          </p>
        </div>
        <div className="tool-actions">
          <label className="button secondary">
            <Upload size={16} aria-hidden="true" />
            Open .srt or .vtt
            <input
              type="file"
              accept=".srt,.vtt,text/vtt,text/plain"
              className="sr-only"
              onChange={handleFileUpload}
            />
          </label>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setSource(SAMPLE_AUDIT_SRT);
              setFilename("urdu-subtitles-clean");
              setStatusNotice("");
              setCopied(false);
            }}
          >
            <RotateCcw size={15} aria-hidden="true" />
            Load sample with issues
          </button>
        </div>
      </div>

      <div
        className="tool-mode-group"
        role="group"
        aria-label="Target video platform pacing profile"
      >
        <button
          type="button"
          className="secondary"
          aria-pressed={platform === "reels"}
          onClick={() => {
            setPlatform("reels");
            trackEvent("free_tool_used", {
              tool_name: "urdu_subtitle_checker",
              action: "platform_reels",
            });
          }}
        >
          Reels, TikTok &amp; Shorts (≤17 Urdu CPS, ≤38 chars/line)
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={platform === "youtube"}
          onClick={() => {
            setPlatform("youtube");
            trackEvent("free_tool_used", {
              tool_name: "urdu_subtitle_checker",
              action: "platform_youtube",
            });
          }}
        >
          YouTube &amp; 16:9 Landscape (≤20 Urdu CPS, ≤46 chars/line)
        </button>
      </div>

      <div className="tool-stats" role="status" aria-live="polite">
        <span>
          Health score: <strong>{report.healthScore}/100</strong>
        </span>
        <span>
          Cues: <strong>{report.cueCount}</strong> ({report.urduCueCount} Urdu)
        </span>
        <span>
          Avg speed: <strong>{report.averageCps} CPS</strong> (
          {report.averageWpm} WPM)
        </span>
        <span>
          Too-fast cues: <strong>{report.fastCueCount}</strong>
        </span>
        <span>
          Arabic ك / ي issues:{" "}
          <strong>{report.arabicKafTotal + report.arabicYehTotal}</strong>
        </span>
        <span>
          Urdu punctuation fixes:{" "}
          <strong>{report.latinPunctuationTotal}</strong>
        </span>
      </div>

      {statusNotice && (
        <p className="tool-success-banner" role="status">
          <Check size={16} aria-hidden="true" /> {statusNotice}
        </p>
      )}

      <div className="tool-pane">
        <label htmlFor="urdu-checker-input">
          Paste or edit UTF-8 SRT / WebVTT cues
        </label>
        <textarea
          id="urdu-checker-input"
          className="tool-textarea"
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
            setStatusNotice("");
            setCopied(false);
          }}
          spellCheck={false}
        />
      </div>

      <div className="tool-actions">
        <button
          type="button"
          className="button"
          onClick={applyUnicodeFix}
          disabled={report.cueCount === 0 && !source.trim()}
        >
          <Sparkles size={16} aria-hidden="true" />
          {fixableUnicodeTotal > 0
            ? `Fix ${fixableUnicodeTotal} Urdu Unicode & punctuation issue(s)`
            : "Normalize Urdu Unicode (ک / ی)"}
        </button>
        <button
          type="button"
          className="button secondary"
          disabled={report.cueCount === 0}
          onClick={() => downloadFixed("srt")}
        >
          <Download size={16} aria-hidden="true" />
          Download clean .srt
        </button>
        <button
          type="button"
          className="button secondary"
          disabled={report.cueCount === 0}
          onClick={() => downloadFixed("vtt")}
        >
          <Download size={16} aria-hidden="true" />
          Download clean .vtt
        </button>
        <button
          type="button"
          className="text-button"
          disabled={!source.trim()}
          onClick={copyCleaned}
        >
          {copied ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
          {copied ? "Copied clean text" : "Copy clean subtitles"}
        </button>
      </div>

      {report.findings.length > 0 && (
        <div
          className="pricing-scroll"
          role="region"
          aria-label="Per-cue Urdu subtitle readability report"
          tabIndex={0}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">Cue</th>
                <th scope="col">Time</th>
                <th scope="col">Speed (CPS)</th>
                <th scope="col">Max line</th>
                <th scope="col">Status &amp; diagnostics</th>
              </tr>
            </thead>
            <tbody>
              {report.findings.slice(0, 40).map((item) => (
                <tr key={item.cueIndex}>
                  <th scope="row">#{item.cueIndex}</th>
                  <td>{formatCueRange(item.startMs, item.endMs)}</td>
                  <td>
                    <strong>{item.cps}</strong> CPS ({item.durationSec}s)
                  </td>
                  <td>{item.maxLineLength} chars</td>
                  <td>
                    {item.reasons.length === 0 ? (
                      <span className="cue-status-good">
                        Readable pacing &amp; clean Unicode
                      </span>
                    ) : (
                      <ul className="cue-issue-list">
                        {item.reasons.map((reason) => (
                          <li key={reason}>{reason}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
