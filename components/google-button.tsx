"use client";
import { useEffect, useState } from "react";
import { api, explain, mutation } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";

/** Messages for the `error` codes the Google callback can return. */
export function googleErrorMessage(code: string | null) {
  switch (code) {
    case "access_denied":
      return "Google sign-in was cancelled. You can try again or use your email.";
    case "account_not_linked":
      return "An account with this email already exists but its email is not verified yet. Verify it from your inbox (or reset the password), then continue with Google.";
    case "email_not_found":
      return "Google did not share an email address for this account. Choose another Google account.";
    default:
      return "Google sign-in did not finish. Please try again.";
  }
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/**
 * "Continue with Google". Rendered only when the API reports Google sign-in as
 * configured; the browser then leaves for Google with a server-issued URL.
 */
export function GoogleButton({
  returnPath,
  source,
  onError,
}: {
  returnPath: string;
  source: "sign-in" | "register";
  onError: (message: string) => void;
}) {
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let live = true;
    api<{ google: boolean }>("/v1/auth/providers")
      .then((result) => {
        if (live) setEnabled(result.google);
      })
      .catch(() => {
        // Without a provider answer the email form remains the only option.
      });
    return () => {
      live = false;
    };
  }, []);

  if (!enabled) return null;

  async function start() {
    setBusy(true);
    try {
      if (source === "register")
        trackEvent("signup_started", { method: "google" });
      const { url } = await api<{ url: string }>(
        "/v1/auth/social/google",
        mutation("POST", { returnPath }),
      );
      window.location.assign(url);
    } catch (err) {
      onError(explain(err));
      setBusy(false);
    }
  }

  return (
    <div className="google-auth">
      <button
        type="button"
        className="google-button"
        onClick={start}
        disabled={busy}
      >
        <GoogleMark />
        <span>{busy ? "Opening Google…" : "Continue with Google"}</span>
      </button>
      <p className="google-auth-divider" aria-hidden="true">
        <span>or use your email</span>
      </p>
    </div>
  );
}
