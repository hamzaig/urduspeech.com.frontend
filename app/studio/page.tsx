"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronRight, FileVideo, Wallet } from "lucide-react";
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
        ) : (
          <div className="empty-projects project-empty">
            <span className="project-icon">
              <FileVideo size={25} aria-hidden="true" />
            </span>
            <div>
              <h3>{offset ? "No more projects" : "No projects yet"}</h3>
              <p>
                {offset
                  ? "Go back to see earlier results."
                  : "Upload audio or video to create your first transcript and captions."}
              </p>
              {offset === 0 && (
                <Link
                  className="public-inline-link"
                  href="/guides/make-urdu-video-captions"
                >
                  Read the caption guide{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
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
