import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  AdminRenderFeedback,
  fetchRenderFeedbackPage,
  initialFeedbackState,
  reduceRenderFeedback,
} from "../components/admin-render-feedback";

function review(renderId: string, userEmail = "ali@example.test") {
  return {
    renderId,
    projectId: "project-1",
    projectTitle: "Interview",
    userEmail,
    rating: 4,
    comment: null,
    submittedAt: "2026-11-27T10:31:00Z",
  };
}

function receive(
  state: typeof initialFeedbackState,
  items: ReturnType<typeof review>[],
  nextCursor: string | null,
) {
  assert.ok(state.request);
  return reduceRenderFeedback(state, {
    type: "loaded",
    request: state.request,
    page: { items, nextCursor },
  });
}

test("the named feedback region announces its initial load and offers refresh", () => {
  const html = renderToStaticMarkup(createElement(AdminRenderFeedback));
  assert.match(html, /<section[^>]*aria-labelledby="render-feedback-title"/);
  assert.match(html, /<h2 id="render-feedback-title">Render feedback<\/h2>/);
  assert.match(html, /role="status"[^>]*>Loading render feedback/);
  assert.match(html, /<button[^>]*>Refresh feedback<\/button>/);
  assert.doesNotMatch(html, /No render feedback|Load more feedback/);
});

test("reads 25 submissions by GET and passes an opaque next cursor intact", async (t) => {
  const queries: Record<string, string>[] = [];
  const signal = new AbortController().signal;
  t.mock.method(
    globalThis,
    "fetch",
    async (path: string, init: RequestInit) => {
      const url = new URL(path, "http://localhost");
      assert.equal(init.method ?? "GET", "GET");
      assert.equal(init.signal, signal);
      assert.equal(url.pathname, "/api/backend/v1/admin/render-feedback");
      queries.push(Object.fromEntries(url.searchParams));
      return Response.json({ items: [], nextCursor: null });
    },
  );
  const cursor = "a+ b/?&=#%";
  await fetchRenderFeedbackPage(null, signal);
  await fetchRenderFeedbackPage(cursor, signal);
  assert.deepEqual(queries, [{ limit: "25" }, { limit: "25", cursor }]);
});

test("overlapping pages keep both reviewers of one render and stop at the last cursor", () => {
  const ali = review("render-1");
  const sana = review("render-1", "sana@example.test");
  const older = review("render-2");
  const first = receive(initialFeedbackState, [ali], "next");
  const next = reduceRenderFeedback(first, { type: "load", cursor: "next" });
  const last = receive(next, [ali, sana, older], null);
  assert.deepEqual(last.page, { items: [ali, sana, older], nextCursor: null });
});

test("a failed next page keeps the rows and cursor available for retry", () => {
  const first = receive(initialFeedbackState, [review("render-1")], "next");
  const next = reduceRenderFeedback(first, { type: "load", cursor: "next" });
  assert.ok(next.request);
  const failed = reduceRenderFeedback(next, {
    type: "failed",
    request: next.request,
    message: "Could not load more feedback.",
  });
  assert.deepEqual(failed.page, first.page);
  assert.equal(failed.request, null);
  assert.ok(failed.error);

  const retry = reduceRenderFeedback(failed, { type: "load", cursor: "next" });
  assert.equal(retry.error, "");
  assert.deepEqual(receive(retry, [review("render-2")], null).page?.items, [
    review("render-1"),
    review("render-2"),
  ]);
});

test("refresh replaces the whole list and ignores a superseded page or refresh", () => {
  const first = receive(initialFeedbackState, [review("old")], "next");
  const next = reduceRenderFeedback(first, { type: "load", cursor: "next" });
  const refresh = reduceRenderFeedback(next, { type: "load", cursor: null });
  const latest = reduceRenderFeedback(refresh, { type: "load", cursor: null });
  assert.ok(next.request);
  assert.ok(refresh.request);
  const stalePage = {
    type: "loaded" as const,
    request: next.request,
    page: { items: [review("stale")], nextCursor: "stale-cursor" },
  };
  const staleRefresh = {
    type: "failed" as const,
    request: refresh.request,
    message: "Stale error",
  };
  assert.deepEqual(reduceRenderFeedback(latest, stalePage), latest);
  assert.deepEqual(reduceRenderFeedback(latest, staleRefresh), latest);

  const empty = receive(latest, [], null);
  assert.deepEqual(empty.page, { items: [], nextCursor: null });
  assert.deepEqual(reduceRenderFeedback(empty, stalePage), empty);
  assert.deepEqual(reduceRenderFeedback(empty, staleRefresh), empty);
});
