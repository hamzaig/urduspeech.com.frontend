"use client";
import { use, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AudioLines } from "lucide-react";
import { api, mutation, explain } from "@/lib/api";
import { ErrorNotice, Saved } from "@/components/common";
const modes = {
  "sign-in": {
    title: "Welcome back.",
    description: "Sign in to your creator studio.",
    button: "Sign in",
  },
  register: {
    title: "Your voice, a little further.",
    description: "Create your UrduSpeech account.",
    button: "Create account",
  },
  "forgot-password": {
    title: "Reset your password.",
    description: "We’ll email you a link to choose a new password.",
    button: "Send reset link",
  },
  "reset-password": {
    title: "Choose a new password.",
    description: "Use at least 12 characters.",
    button: "Save new password",
  },
  "verify-email": {
    title: "Verify your email.",
    description: "Confirm your email address to activate your account.",
    button: "Verify email",
  },
};
export default function Auth({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = use(params);
  const config = modes[mode as keyof typeof modes];
  const router = useRouter();
  const query = useSearchParams();
  const [error, setError] = useState(""),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  if (!config)
    return (
      <div className="auth-wrap">
        <h1>Page not found</h1>
        <Link href="/auth/sign-in">Sign in</Link>
      </div>
    );
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const data = new FormData(e.currentTarget);
    let body: Record<string, string> = {};
    if (["sign-in", "register", "forgot-password"].includes(mode))
      body.email = String(data.get("email"));
    if (["sign-in", "register"].includes(mode))
      body.password = String(data.get("password"));
    if (mode === "register") body.name = String(data.get("name"));
    if (["verify-email", "reset-password"].includes(mode)) {
      const token = query.get("token");
      if (!token) {
        setError(
          "This link is incomplete. Open the full link from your email.",
        );
        setBusy(false);
        return;
      }
      body.token = token;
    }
    if (mode === "reset-password")
      body.newPassword = String(data.get("password"));
    try {
      await api("/v1/auth/" + mode, mutation("POST", body));
      if (mode === "sign-in") {
        router.push("/studio");
        router.refresh();
      } else
        setMessage(
          mode === "register"
            ? "Check your inbox to verify your email before signing in."
            : mode === "forgot-password"
              ? "If an account exists for that email, a reset link will arrive shortly."
              : "Saved. You can now sign in.",
        );
    } catch (err) {
      setError(explain(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="auth-wrap" id="main">
      <Link className="brand" href="/studio">
        <span className="brand-mark">
          <AudioLines size={24} />
        </span>
        <span>
          Urdu<span className="brand-light">Speech</span>
        </span>
      </Link>
      <h1>{config.title}</h1>
      <p>{config.description}</p>
      {error && <ErrorNotice message={error} />}
      <form onSubmit={submit}>
        {mode === "register" && (
          <label className="field">
            Your name
            <input
              name="name"
              autoComplete="name"
              required
              minLength={1}
              maxLength={120}
            />
          </label>
        )}
        {["sign-in", "register", "forgot-password"].includes(mode) && (
          <label className="field">
            Email address
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={254}
            />
          </label>
        )}
        {["sign-in", "register", "reset-password"].includes(mode) && (
          <label className="field">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={mode === "sign-in" ? 1 : 12}
              maxLength={128}
              autoComplete={
                mode === "sign-in" ? "current-password" : "new-password"
              }
            />
            {mode !== "sign-in" && <small>At least 12 characters.</small>}
          </label>
        )}
        <button disabled={busy || !!message}>
          {busy ? "Please wait…" : config.button}
        </button>
      </form>
      {message && <Saved>{message}</Saved>}
      <div className="auth-links">
        <Link href={mode === "sign-in" ? "/auth/register" : "/auth/sign-in"}>
          {mode === "sign-in" ? "Create an account" : "Sign in instead"}
        </Link>
        {mode === "sign-in" && (
          <Link href="/auth/forgot-password">Forgot password?</Link>
        )}
      </div>
      <Link className="auth-back" href="/studio">
        Back to the studio
      </Link>
    </main>
  );
}
