"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Circle,
  FileVideo,
  Sparkles,
  Wallet,
} from "lucide-react";
import { api, ApiError, explain, minutes } from "@/lib/api";
import type { ProjectList, Usage } from "@/lib/contracts";
import { ErrorNotice, PageTitle, UploadLink } from "@/components/common";
import { outputLabel } from "@/components/output-options";

const pageSize = 10;

export default function Studio() {
  const [projects, setProjects] = useState<ProjectList | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    setLoading(true);
    setError(undefined);
    api<ProjectList>(`/v1/projects?limit=${pageSize}&offset=${offset}`)
      .then((result) => {
        if (live) setProjects(result);
      })
      .catch((err: unknown) => {
        if (live) setError(err);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [offset, attempt]);

  useEffect(() => {
    let live = true;
    api<Usage>("/v1/usage")
      .then((result) => {
        if (live) setUsage(result);
      })
      .catch(() => {
        // Project access is independent of the optional allowance summary.
      });
    return () => {
      live = false;
    };
  }, [attempt]);

  const needsSignIn = error instanceof ApiError && error.status === 401;
  const isPlanExpired = usage?.blockingReason === "PLAN_EXPIRED";
  const isLowMinutes =
    usage !== null && !isPlanExpired && usage.remaining <= 120;

  return (
    <div className="page studio-overview">
      <div className="studio-overview-summary" data-usage={!!usage}>
        <PageTitle
          title="Your Studio"
          description="Upload a recording or pick up a project to finish your captions."
          action={<UploadLink />}
        />
        {usage && (
          <Link className="workspace-usage" href="/studio/billing">
            <span className="workspace-usage-plan">
              <Wallet size={19} aria-hidden="true" />
              {usage.plan.name} plan
            </span>
            <span>
              <strong>{minutes(usage.remaining)}</strong> minutes left
            </span>
            {usage.allowance > 0 && (
              <meter
                min={0}
                max={usage.allowance}
                value={Math.min(usage.allowance, Math.max(0, usage.remaining))}
                aria-label="Share of transcription allowance remaining"
              />
            )}
            <span className="workspace-usage-link">
              Plan &amp; minutes <ArrowRight size={17} aria-hidden="true" />
            </span>
          </Link>
        )}
      </div>

      {(isPlanExpired || isLowMinutes) && usage && (
        <aside
          className="studio-upgrade-banner"
          aria-label="Plan allowance notice"
        >
          <div>
            <strong>
              {isPlanExpired
                ? "Your paid period has ended"
                : usage.remaining <= 0
                  ? `You have used your ${usage.plan.name} allowance`
                  : `Only ${minutes(usage.remaining)} minutes left on ${usage.plan.name}`}
            </strong>
            <p>
              {usage.plan.slug === "free"
                ? "Upgrade to Starter (PKR 999 for 60 min) or Creator (PKR 2,499 for 200 min) to unlock clean 1080p MP4 exports without watermarks and longer recordings. Existing TXT, SRT, and VTT transcripts remain downloadable."
                : "Renew or upgrade in Studio Billing via card checkout or local Pakistani transfer to continue transcribing new recordings."}
            </p>
          </div>
          <Link className="button" href="/studio/billing">
            View PKR plans <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </aside>
      )}

      <section aria-labelledby="project-list-title" className="project-list">
        <h2 id="project-list-title">My projects</h2>
        {error ? (
          <ErrorNotice
            message={explain(error)}
            signIn={needsSignIn}
            retry={
              needsSignIn ? undefined : () => setAttempt((value) => value + 1)
            }
          />
        ) : loading ? (
          <p role="status" className="loading">
            Loading your projects…
          </p>
        ) : projects?.projects.length ? (
          <div className="project-table">
            <div className="table-head" aria-hidden="true">
              <span>Project</span>
              <span>Output</span>
              <span>Created</span>
              <span />
            </div>
            {projects.projects.map((project) => (
              <Link
                href={`/studio/projects/${project.id}`}
                key={project.id}
                className="project-row"
              >
                <span>
                  <span className="project-icon">
                    <FileVideo size={19} aria-hidden="true" />
                  </span>
                  <strong>
                    <bdi>{project.title}</bdi>
                  </strong>
                </span>
                <span>
                  {outputLabel(project.settings.outputVariant ?? "urdu")}
                </span>
                <time dateTime={project.createdAt}>
                  {new Date(project.createdAt).toLocaleDateString("en-PK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <ChevronRight
                  className="project-chevron"
                  size={16}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        ) : offset > 0 ? (
          <div className="empty-projects project-empty">
            <span className="project-icon">
              <FileVideo size={25} aria-hidden="true" />
            </span>
            <div>
              <h3>No more projects</h3>
              <p>Go back to see earlier results.</p>
            </div>
          </div>
        ) : (
          <div className="studio-onboarding-card">
            <div className="studio-onboarding-header">
              <span className="studio-onboarding-badge">
                <Sparkles size={15} aria-hidden="true" />
                Quick start · 1 of 4 steps done (25%)
              </span>
              <h3>Create your first Urdu transcript or captioned video</h3>
              <p>
                Your account is ready with{" "}
                <strong>
                  {usage
                    ? `${minutes(usage.remaining)} minutes`
                    : "10 free minutes"}
                </strong>
                . Upload any MP3, M4A, WAV, FLAC, MP4, or MOV clip to try
                Nastaliq, Roman Urdu, English, or bilingual captions.
              </p>
            </div>
            <ol className="studio-checklist" role="list">
              <li className="done">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>
                  <strong>Account verified</strong> — workspace &amp; allowance
                  ready
                </span>
              </li>
              <li>
                <Circle size={18} aria-hidden="true" />
                <span>
                  <strong>Upload a recording</strong> — start with a 1 to 10
                  minute clip for fastest preview
                </span>
              </li>
              <li>
                <Circle size={18} aria-hidden="true" />
                <span>
                  <strong>Review words &amp; timing</strong> — accept or reject
                  AI suggestions alongside local playback
                </span>
              </li>
              <li>
                <Circle size={18} aria-hidden="true" />
                <span>
                  <strong>Export</strong> — download UTF-8 TXT, SRT, VTT, or a
                  burned-in Nastaliq MP4
                </span>
              </li>
            </ol>
            <div className="studio-onboarding-actions">
              <UploadLink />
              <Link className="public-inline-link" href="/supported-formats">
                Supported formats &amp; WhatsApp tips{" "}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link className="public-inline-link" href="/demo">
                Inspect sample demo first{" "}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
        {(offset > 0 || projects?.projects.length === pageSize) && (
          <div className="pager" aria-label="Project pages">
            <button
              className="secondary"
              disabled={loading || offset === 0}
              onClick={() => setOffset((value) => value - pageSize)}
            >
              Previous
            </button>
            <button
              className="secondary"
              disabled={
                loading || !!error || projects?.projects.length !== pageSize
              }
              onClick={() => setOffset((value) => value + pageSize)}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
