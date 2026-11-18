"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="auth-wrap">
      <h1>This page could not load</h1>
      <p>Try loading it again. Your saved projects remain in your account.</p>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
