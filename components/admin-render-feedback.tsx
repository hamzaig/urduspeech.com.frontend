"use client";

import { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import { ErrorNotice } from "@/components/common";
import { api } from "@/lib/api";
import type { RenderFeedbackPage } from "@/lib/contracts";

type FeedbackItem = RenderFeedbackPage["items"][number];
type FeedbackRequest = { cursor: string | null };
type FeedbackState = {
  page: RenderFeedbackPage | null;
  request: FeedbackRequest | null;
  error: string;
};
type FeedbackAction =
  | { type: "load"; cursor: string | null }
  | { type: "loaded"; request: FeedbackRequest; page: RenderFeedbackPage }
  | { type: "failed"; request: FeedbackRequest; message: string };

export const initialFeedbackState: FeedbackState = {
  page: null,
  request: { cursor: null },
  error: "",
};

function feedbackKey(item: FeedbackItem) {
  return `${item.renderId}:${item.userEmail}`;
}

export function fetchRenderFeedbackPage(
  cursor: string | null,
  signal: AbortSignal,
) {
  const params = new URLSearchParams({ limit: "25" });
  if (cursor !== null) params.set("cursor", cursor);
  return api<RenderFeedbackPage>(`/v1/admin/render-feedback?${params}`, {
    signal,
  });
}

export function reduceRenderFeedback(
  state: FeedbackState,
  action: FeedbackAction,
): FeedbackState {
  if (action.type === "load")
    return { ...state, request: { cursor: action.cursor }, error: "" };
  // Two refreshes use the same cursor but belong to different requests.
  if (action.request !== state.request) return state;
  if (action.type === "failed")
    return { ...state, request: null, error: action.message };

  const previous =
    action.request.cursor === null ? [] : (state.page?.items ?? []);
  const byReview = new Map(previous.map((item) => [feedbackKey(item), item]));
  for (const item of action.page.items) byReview.set(feedbackKey(item), item);
  return {
    page: { items: [...byReview.values()], nextCursor: action.page.nextCursor },
    request: null,
    error: "",
  };
}

const submissionTime = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

function FeedbackEntry({ item }: { item: FeedbackItem }) {
  return (
    <li>
      <div className="render-feedback-summary">
        <h3 dir="auto" tabIndex={-1}>
          {item.projectTitle}
        </h3>
        <span>
          Rating <strong>{item.rating} out of 5</strong>
        </span>
      </div>
      <dl>
        <div className="render-feedback-comment">
          <dt>Comment</dt>
          <dd dir="auto">
            {item.comment?.trim() ? item.comment : "No comment"}
          </dd>
        </div>
        <div>
          <dt>User</dt>
          <dd>{item.userEmail}</dd>
        </div>
        <div>
          <dt>Submitted</dt>
          <dd>
            <time dateTime={item.submittedAt}>
              {submissionTime.format(new Date(item.submittedAt))}
            </time>
          </dd>
        </div>
        <div>
          <dt>Project ID</dt>
          <dd>{item.projectId}</dd>
        </div>
        <div>
          <dt>Render ID</dt>
          <dd>{item.renderId}</dd>
        </div>
      </dl>
    </li>
  );
}

export function AdminRenderFeedback() {
  const [{ page, request, error }, dispatch] = useReducer(
    reduceRenderFeedback,
    initialFeedbackState,
  );
  const list = useRef<HTMLUListElement>(null);
  const moreButton = useRef<HTMLButtonElement>(null);
  const focusIndex = useRef<number | null>(null);

  useEffect(() => {
    if (!request) return;
    const controller = new AbortController();
    fetchRenderFeedbackPage(request.cursor, controller.signal).then(
      (page) => {
        if (controller.signal.aborted) return;
        focusIndex.current =
          request.cursor !== null &&
          document.activeElement === moreButton.current
            ? (list.current?.childElementCount ?? 0)
            : null;
        dispatch({ type: "loaded", request, page });
      },
      () => {
        if (!controller.signal.aborted)
          dispatch({
            type: "failed",
            request,
            message:
              request.cursor === null
                ? "Could not load render feedback. Try refreshing."
                : "Could not load more feedback. Try loading the next page again.",
          });
      },
    );
    return () => controller.abort();
  }, [request]);

  useLayoutEffect(() => {
    const index = focusIndex.current;
    if (index === null) return;
    focusIndex.current = null;
    const row = list.current?.children[index] ?? list.current?.lastElementChild;
    const target =
      row?.querySelector("h3") ?? document.getElementById("render-feedback");
    target?.focus();
  }, [page]);

  const items = page?.items ?? [];
  const nextCursor = page?.nextCursor ?? null;
  let status = "No render feedback yet.";
  if (request) {
    status =
      request.cursor !== null
        ? "Loading more feedback…"
        : "Loading render feedback…";
  } else if (items.length) {
    status = `${items.length} ${items.length === 1 ? "review" : "reviews"} shown.`;
  }

  return (
    <section
      id="render-feedback"
      className="operations-section"
      aria-labelledby="render-feedback-title"
      tabIndex={-1}
    >
      <div className="operations-heading">
        <div>
          <h2 id="render-feedback-title">Render feedback</h2>
          <p>Ratings and comments from creators about their final videos.</p>
        </div>
        <button
          type="button"
          className="secondary"
          onClick={() => dispatch({ type: "load", cursor: null })}
        >
          Refresh feedback
        </button>
      </div>
      {error ? <ErrorNotice message={error} /> : <p role="status">{status}</p>}
      {items.length > 0 && (
        <ul
          ref={list}
          className="render-feedback-list"
          role="list"
          aria-busy={request !== null}
        >
          {items.map((item) => (
            <FeedbackEntry key={feedbackKey(item)} item={item} />
          ))}
        </ul>
      )}
      {nextCursor !== null && (
        <button
          ref={moreButton}
          type="button"
          className="secondary"
          aria-disabled={request !== null}
          onClick={() => {
            if (!request) dispatch({ type: "load", cursor: nextCursor });
          }}
        >
          Load more feedback
        </button>
      )}
    </section>
  );
}
