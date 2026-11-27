import test from "node:test";
import assert from "node:assert/strict";
import { createElement, type ComponentProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ProjectExports } from "../components/project-exports";
import type { Render } from "../lib/contracts";

const render: Render = {
  schemaVersion: "1",
  id: "render1",
  projectId: "p1",
  trackId: "track1",
  sourceVersionId: "v1",
  presetVersionId: "word-pop:1",
  state: "completed",
  progressMs: 0,
  width: 404,
  height: 720,
  watermark: true,
  errorCode: null,
};

function options(overrides: Partial<ComponentProps<typeof ProjectExports>>) {
  return renderToStaticMarkup(
    createElement(ProjectExports, {
      render: null,
      durationMs: 8000,
      canPrepareFiles: true,
      timingReady: true,
      current: false,
      busy: false,
      dirty: false,
      videoBlock: "",
      files: [],
      onEdit() {},
      onRender() {},
      onCancel() {},
      onFiles() {},
      download() {},
      ...overrides,
    }),
  );
}

test("the selected render downloads directly even after its source expires", () => {
  const html = options({ render, current: true, videoBlock: "Source expired" });
  assert.match(html, /Download MP4/);
  assert.match(html, /404 × 720/);
  assert.doesNotMatch(html, /Create captioned MP4|Download previous MP4/);
});

test("a changed caption track or appearance keeps the previous video distinct", () => {
  const html = options({ render, current: false });
  assert.match(html, /Create captioned MP4/);
  assert.match(html, /Download previous MP4/);
  assert.doesNotMatch(html, /Ready to download/);
});

test("pending video only shows a percentage when the encoder reports progress", () => {
  const pending = { ...render, state: "rendering" } as const;
  const progress = (progressMs: number) =>
    options({ render: { ...pending, progressMs }, current: true }).match(
      /<progress[^>]*>/,
    )?.[0] ?? "";
  assert.match(progress(0), /aria-label="Video export progress"/);
  assert.doesNotMatch(progress(0), /value=/);
  assert.match(progress(2000), /value="25"/);
});

test("transcript-only projects can prepare TXT and keep video export unavailable", () => {
  const html = options({
    timingReady: false,
    videoBlock: "The video needs timed captions.",
  });
  assert.match(html, /SRT and VTT need caption timing/);
  assert.match(html, /disabled=""[^>]*>[^]*?Create captioned MP4/);
  assert.match(
    html,
    /<button class="secondary" type="button">[^]*?Prepare subtitle files/,
  );
});

test("a ready TXT does not hide the action to prepare missing timed formats", () => {
  const html = options({
    files: [
      {
        id: "file1",
        sourceVersionId: "v1",
        trackId: "track1",
        format: "txt",
        variant: "urdu",
        state: "ready",
        errorCode: null,
        downloadPath: "/v1/exports/file1/download",
      },
    ],
  });
  assert.match(html, /Download TXT/);
  assert.match(html, /Prepare subtitle files/);
});
