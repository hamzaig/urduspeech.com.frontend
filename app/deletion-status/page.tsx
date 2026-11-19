"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, explain } from "@/lib/api";
import {
  readDeletion,
  parseDeletion,
  rememberDeletion,
  deletionHeaders,
  downloadDeletionReceipt,
  type DeletionReceipt,
} from "@/lib/deletion";
import { PublicPage } from "@/components/public-site";
import { ErrorNotice, PageTitle } from "@/components/common";
interface Status {
  content: string;
  billingCleanup: string;
  backupCleanup: string;
  backupPropagationDeadline: string;
  errorCode: string | null;
}
export default function DeletionStatus() {
  const [receipt, setReceipt] = useState<DeletionReceipt | null>(null),
    [status, setStatus] = useState<Status | null>(null),
    [error, setError] = useState(""),
    [loaded, setLoaded] = useState(false),
    [busy, setBusy] = useState(false);
  async function check(value: DeletionReceipt) {
    setBusy(true);
    setError("");
    try {
      let current = value;
      if (!current.id) {
        const result = await api<{ id: string }>("/v1/account", {
          method: "DELETE",
          headers: deletionHeaders(current),
        });
        current = { ...current, id: result.id };
        rememberDeletion(current);
        setReceipt(current);
      }
      setStatus(
        await api<Status>("/v1/deletions/" + current.id, {
          headers: { "Deletion-Receipt": current.receipt },
        }),
      );
    } catch (e) {
      setError(explain(e));
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    const saved = readDeletion();
    setReceipt(saved);
    setLoaded(true);
    if (saved) void check(saved);
  }, []);
  return (
    <PublicPage mainClassName="public-container policy-page">
      <PageTitle
        title="Deletion status"
        description="Use your private deletion receipt to check progress after your account is signed out."
      />
      {error && <ErrorNotice message={error} />}{" "}
      {receipt ? (
        <>
          <p>
            Your project access was revoked when the request was accepted. Media
            deletion and billing cleanup are tracked separately.
          </p>
          {status && (
            <dl className="payment-details">
              <dt>Media and project content</dt>
              <dd>
                {status.content === "deleted"
                  ? "Deleted"
                  : "Deletion in progress"}
              </dd>
              <dt>Subscription cleanup</dt>
              <dd>{status.billingCleanup.replaceAll("_", " ")}</dd>
              <dt>Backup propagation</dt>
              <dd>
                {status.backupCleanup === "external_verification_required"
                  ? "Awaiting verification"
                  : status.backupCleanup.replaceAll("_", " ")}
              </dd>
              <dt>Backup propagation deadline</dt>
              <dd>
                {new Date(status.backupPropagationDeadline).toLocaleDateString(
                  "en-PK",
                )}
              </dd>
            </dl>
          )}
          <div className="actions">
            <button onClick={() => check(receipt)} disabled={busy}>
              {busy ? "Checking…" : "Refresh status"}
            </button>
            <button
              className="secondary"
              onClick={() => downloadDeletionReceipt(receipt)}
            >
              Save receipt
            </button>
          </div>
          <p className="field-help">
            Keep this receipt private. It permits status checks until its
            expiry.
          </p>
        </>
      ) : loaded ? (
        <p>
          No receipt is saved in this browser. Use the browser where you
          requested deletion.
        </p>
      ) : (
        <p role="status">Loading receipt…</p>
      )}
      <label className="field">
        Open a saved deletion receipt
        <input
          type="file"
          accept="application/json,.json"
          disabled={busy}
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            if (file.size > 4096) {
              setError("Choose a valid UrduSpeech deletion receipt.");
              return;
            }
            const saved = parseDeletion(await file.text());
            if (!saved) {
              setError("Choose a valid UrduSpeech deletion receipt.");
              return;
            }
            rememberDeletion(saved);
            setReceipt(saved);
            await check(saved);
          }}
        />
      </label>
      <p>
        <Link href="/auth/sign-in">Back to sign in</Link>
      </p>
    </PublicPage>
  );
}
