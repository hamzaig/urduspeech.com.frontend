"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AudioLines, FileVideo } from "lucide-react";
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
    <div className="page">
      <PageTitle
        title="My projects"
        description="Open an existing project to edit captions or download your exports."
        action={<UploadLink />}
      />
      {usage && (
        <Link className="usage-pill" href="/studio/billing">
          <AudioLines size={17} aria-hidden="true" />
          <strong>{minutes(usage.remaining)}</strong> minutes left
        </Link>
      )}
      <section aria-label="Project list" className="project-list">
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
            </div>
            {projects.projects.map((project) => (
              <Link
                href={`/studio/projects/${project.id}`}
                key={project.id}
                className="project-row"
              >
                <span>
                  <FileVideo size={20} aria-hidden="true" />
                  <strong dir="auto">{project.title}</strong>
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
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-projects">
            <FileVideo size={28} aria-hidden="true" />
            <div>
              <h2>{offset ? "No more projects" : "No projects yet"}</h2>
              <p>
                {offset
                  ? "Go back to see earlier results."
                  : "Upload audio or video to create your first transcript and captions."}
              </p>
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
