"use client";

import { PublicPage } from "@/components/public-site";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <PublicPage mainClassName="account-page">
      <div className="public-container account-compact">
        <section className="account-panel">
          <h1>This page could not load</h1>
          <p>
            Try loading it again. Your saved projects remain in your account.
          </p>
          <button className="button" onClick={reset}>
            Try again
          </button>
        </section>
      </div>
    </PublicPage>
  );
}
