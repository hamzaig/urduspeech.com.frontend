"use client";
import { useEffect, useState } from "react";
import { api, mutation, explain } from "@/lib/api";
import type { Defaults } from "@/lib/contracts";
import { PageTitle, ErrorNotice, Saved } from "@/components/common";
import { OutputOptions, type Preset } from "@/components/output-options";
export default function Settings() {
  const [value, setValue] = useState<Defaults | null>(null),
    [presets, setPresets] = useState<Preset[]>([]),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [saved, setSaved] = useState(false),
    [confirm, setConfirm] = useState(""),
    [deletion, setDeletion] = useState(false);
  useEffect(() => {
    let live = true;
    Promise.all([
      api<Defaults>("/v1/me/defaults"),
      api<{ presets: Preset[] }>("/v1/caption-presets"),
    ])
      .then(([d, p]) => {
        if (live) {
          setValue(d);
          setPresets(p.presets);
        }
      })
      .catch((e) => {
        if (live) setError(explain(e));
      });
    return () => {
      live = false;
    };
  }, []);
  async function save() {
    if (!value) return;
    setBusy(true);
    setSaved(false);
    setError("");
    try {
      setValue(
        await api<Defaults>("/v1/me/defaults", mutation("PATCH", value)),
      );
      setSaved(true);
    } catch (e) {
      setError(explain(e));
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (confirm !== "DELETE") return;
    setBusy(true);
    setError("");
    try {
      await api("/v1/account", {
        method: "DELETE",
        headers: { "Idempotency-Key": crypto.randomUUID() },
      });
      setDeletion(true);
    } catch (e) {
      setError(explain(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="page narrow">
      <PageTitle
        title="Make it your default."
        description="Choose once. Change your choices for any upload."
      />
      {error && <ErrorNotice message={error} />}
      <section className="settings-panel">
        {value ? (
          <>
            <OutputOptions
              value={value}
              presets={presets}
              onChange={(v) => {
                setValue(v);
                setSaved(false);
              }}
              disabled={busy}
            />
            <button onClick={save} disabled={busy}>
              {busy ? "Saving…" : "Save my defaults"}
            </button>
            {saved && <Saved>Your defaults are saved.</Saved>}
          </>
        ) : (
          <p className="loading">
            {error ? "Your defaults could not load." : "Loading your defaults…"}
          </p>
        )}
      </section>
      <section className="danger-zone">
        <h2>Delete your account</h2>
        <p>
          This starts permanent deletion of your account and project media.
          Downloads will stop being available. Sign in again first if your
          session is no longer fresh.
        </p>
        {deletion ? (
          <Saved>
            Account deletion has been requested. You have been signed out.
          </Saved>
        ) : (
          <>
            <label className="field">
              Type DELETE to confirm
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="off"
              />
            </label>
            <button
              className="danger"
              onClick={remove}
              disabled={busy || confirm !== "DELETE"}
            >
              Delete my account
            </button>
          </>
        )}
      </section>
    </div>
  );
}
