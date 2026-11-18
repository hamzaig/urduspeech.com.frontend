"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FileVideo, Upload, ArrowUpRight, AudioLines } from "lucide-react";
import { api, explain, minutes } from "@/lib/api";
import type { ProjectList, Usage } from "@/lib/contracts";
import {
  PageTitle,
  CaptionExample,
  ErrorNotice,
  UploadLink,
} from "@/components/common";
export default function Studio() {
  const [projects, setProjects] = useState<ProjectList | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let live = true;
    setLoading(true);
    setError("");
    Promise.all([
      api<ProjectList>(`/v1/projects?limit=10&offset=${offset}`),
      api<Usage>("/v1/usage"),
    ])
      .then(([p, u]) => {
        if (live) {
          setProjects(p);
          setUsage(u);
        }
      })
      .catch((e) => {
        if (live) setError(explain(e));
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [offset]);
  return (
    <div className="page">
      <PageTitle
        title="Make your words go further."
        description="Your Urdu audio. A transcript you can edit. Captions you can make your own."
        action={
          usage && (
            <Link className="usage-pill" href="/studio/billing">
              <AudioLines size={18} />
              <strong>{minutes(usage.remaining)}</strong> minutes left
            </Link>
          )
        }
      />
      <section className="welcome-grid">
        <div className="upload-intro">
          <div className="intro-symbol">
            <Upload size={26} />
          </div>
          <h2>
            Good content starts
            <br />
            with your voice.
          </h2>
          <p>
            Bring a reel, a podcast or a full-length video. Choose how your
            words look, then let AI prepare your transcript and captions.
          </p>
          <UploadLink />
          <div className="flow-hint">
            <span>Upload your media</span>
            <span>Choose your output</span>
            <span>Review & export</span>
          </div>
        </div>
        <CaptionExample />
      </section>
      <div className="section-heading">
        <div>
          <h2>My projects</h2>
          <p>Pick up where you left off.</p>
        </div>
        <Link href="/studio/new" className="text-button">
          New project <ArrowUpRight size={17} />
        </Link>
      </div>
      {error ? (
        <ErrorNotice message={error} />
      ) : loading ? (
        <p role="status" className="loading">
          Loading your projects…
        </p>
      ) : projects?.projects.length ? (
        <>
          <div className="project-table">
            <div className="table-head">
              <span>Project</span>
              <span>Output</span>
              <span>Created</span>
            </div>
            {projects.projects.map((p) => (
              <Link
                href={"/studio/projects/" + p.id}
                key={p.id}
                className="project-row"
              >
                <span>
                  <FileVideo size={21} />
                  <strong>{p.title}</strong>
                </span>
                <span>
                  {typeof p.settings.outputVariant === "string"
                    ? p.settings.outputVariant
                    : "Urdu"}
                </span>
                <time dateTime={p.createdAt}>
                  {new Date(p.createdAt).toLocaleDateString("en-PK")}
                </time>
              </Link>
            ))}
          </div>
          <div className="pager">
            <button
              className="secondary"
              disabled={offset === 0}
              onClick={() => setOffset(Math.max(0, offset - 10))}
            >
              Previous
            </button>
            <button
              className="secondary"
              disabled={projects.projects.length < 10}
              onClick={() => setOffset(offset + 10)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="empty-projects">
          <FileVideo size={28} />
          <div>
            <h3>Your first project belongs here.</h3>
            <p>Upload audio or video to start your transcript.</p>
          </div>
          <Link className="secondary button" href="/studio/new">
            Create a project
          </Link>
        </div>
      )}
      <div className="workspace-note">
        <span>Built around your workflow</span>
        <p>
          One allowance for audio and video. Urdu, Roman Urdu, English and
          bilingual outputs.
        </p>
      </div>
    </div>
  );
}
