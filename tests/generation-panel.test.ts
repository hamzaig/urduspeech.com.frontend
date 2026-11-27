import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GenerationPanel } from "../components/generation-panel";
import type { JobStatusV1 } from "../lib/contracts";

function panel(
  state: string,
  completedStages: string[],
  freeQueueBusy = false,
) {
  const job: JobStatusV1 = {
    schemaVersion: "1",
    id: "j1",
    projectId: "p1",
    version: 2,
    etag: "v2",
    supportId: "ref1",
    state,
    completedStages,
    freeQueueBusy,
    retryAfterSeconds: 2,
    errorCode: null,
    retry: { attempt: 0, nextAttemptAt: null },
    capabilities: {
      canonicalText: false,
      correctionComplete: false,
      variantsReady: false,
      timingAvailable: false,
      exportsReady: false,
      txtReady: false,
      timedCaptionsReady: false,
      renderReady: false,
      canCancel: true,
    },
  };
  return renderToStaticMarkup(
    createElement(GenerationPanel, {
      job,
      mediaReady: true,
      busy: false,
      onStart() {},
      cancelAction: null,
    }),
  );
}

test("alignment remains a distinct, unfinished milestone after all five persisted stages", () => {
  const html = panel("aligning", [
    "media",
    "timing",
    "canonical",
    "correction",
    "variants",
  ]);
  assert.match(html, /5 of 6 stages complete/);
  assert.match(html, /aria-current="step"[^>]*>.*?Syncing captions/s);
  assert.equal((html.match(/data-complete="true"/g) ?? []).length, 5);
});

test("a full Free queue explains the wait without starting or advancing a milestone", () => {
  const html = panel("quota_reserved", [], true);
  assert.match(html, /0 of 6 stages complete/);
  assert.match(html, /Both Free workers are busy/);
  assert.match(html, /href="\/studio\/billing"/);
  assert.doesNotMatch(html, /aria-current="step"|>Generate captions</);
});

test("retry preserves completed stages and a stopped job offers a retry", () => {
  const waiting = panel("provider_retrying", ["media", "timing"]);
  assert.match(waiting, /2 of 6 stages complete/);
  assert.doesNotMatch(waiting, /aria-current="step"/);
  const failed = panel("failed", ["media"]);
  assert.match(failed, /Try again/);
  assert.doesNotMatch(failed, /<progress/);
});
