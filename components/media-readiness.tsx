"use client";
import { useEffect, useState } from "react";
import { api, ApiError, mutation, explain } from "@/lib/api";
type AudioStatus = {
  mediaId: string;
  requiredAction: "select_audio_track" | null;
  audioTracks: {
    index: number;
    language?: string;
    codec: string;
    channels: number;
  }[];
  selectedTrack: number | null;
};
export function MediaReadiness({
  projectId,
  onReady,
}: {
  projectId: string;
  onReady: (ready: boolean) => void;
}) {
  const [status, setStatus] = useState<AudioStatus | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [waiting, setWaiting] = useState(true);
  async function check() {
    setBusy(true);
    setError("");
    try {
      const result = await api<AudioStatus>(
        `/v1/projects/${projectId}/audio-tracks`,
      );
      setStatus(result);
      setWaiting(result.audioTracks.length === 0);
      onReady(result.audioTracks.length > 0 && result.requiredAction === null);
    } catch (e) {
      onReady(false);
      if (e instanceof ApiError && e.code === "SOURCE_NOT_VERIFIED") {
        setWaiting(true);
      } else setError(explain(e));
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    check();
  }, [projectId]);
  async function select(index: number) {
    if (!status) return;
    setBusy(true);
    setError("");
    try {
      await api(
        `/v1/projects/${projectId}/audio-track`,
        mutation(
          "POST",
          { mediaId: status.mediaId, trackIndex: index },
          crypto.randomUUID(),
        ),
      );
      await check();
    } catch (e) {
      setError(explain(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="media-readiness">
      <h3>Media check</h3>
      {error ? (
        <p role="alert">{error}</p>
      ) : waiting ? (
        <p>Checking your media. This may take a little time after upload.</p>
      ) : status?.requiredAction === "select_audio_track" ? (
        <label className="field">
          Choose the audio to transcribe
          <select
            disabled={busy}
            value={status.selectedTrack ?? ""}
            onChange={(e) => select(Number(e.target.value))}
          >
            <option value="" disabled>
              Choose an audio track
            </option>
            {status.audioTracks.map((t) => (
              <option value={t.index} key={t.index}>
                Track {t.index + 1}
                {t.language ? " — " + t.language : ""} · {t.channels} channel
                {t.channels === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p>Your media is ready for transcription.</p>
      )}
      <button className="text-button" disabled={busy} onClick={check}>
        {busy ? "Checking…" : "Check media again"}
      </button>
    </div>
  );
}
