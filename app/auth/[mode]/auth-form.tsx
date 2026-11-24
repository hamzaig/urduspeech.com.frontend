"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { api, mutation, explain } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { PLANS } from "@/lib/plans";
import { PublicPage } from "@/components/public-site";
import { ErrorNotice, Saved } from "@/components/common";
import { GoogleButton, googleErrorMessage } from "@/components/google-button";
import preview from "@/assets/caption-demo.webp";
import { captionCues } from "@/lib/caption-demo";
import { AUTH_MODES, type AuthMode } from "@/lib/auth-modes";

const COMMON_EMAIL_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.co": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outllok.com": "outlook.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "icloud.con": "icloud.com",
};

function detectEmailSuggestion(rawEmail: string): string | null {
  const trimmed = rawEmail.trim();
  const atIndex = trimmed.lastIndexOf("@");
  if (atIndex <= 0) return null;
  const local = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex + 1).toLowerCase();
  const fixed = COMMON_EMAIL_TYPOS[domain];
  return fixed ? `${local}@${fixed}` : null;
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const config = AUTH_MODES[mode];
  const router = useRouter();
  const query = useSearchParams();
  const startedRef = useRef(false);

  // A failed Google round trip lands back on sign-in with ?oauth=failed&error=…
  const oauthError =
    mode === "sign-in" && query.get("oauth") === "failed"
      ? googleErrorMessage(query.get("error"))
      : "";
  const [error, setError] = useState(oauthError),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const requestedPlanId = query.get("plan")?.toLowerCase();
  const selectedPlan =
    mode === "register" && requestedPlanId
      ? PLANS.find((p) => p.id === requestedPlanId && p.id !== "free")
      : undefined;

  const emailSuggestion =
    mode === "register" || mode === "sign-in"
      ? detectEmailSuggestion(emailValue)
      : null;

  const needsLongPassword = mode === "register" || mode === "reset-password";
  const passwordLength = passwordValue.length;
  const passwordReady = passwordLength >= 12;

  function markSignupStarted() {
    if (mode !== "register" || startedRef.current) return;
    startedRef.current = true;
    trackEvent("signup_started", {
      selected_plan: selectedPlan?.id ?? "free",
      source: query.get("source") ?? "direct",
    });
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const data = new FormData(e.currentTarget);
    const body: Record<string, string> = {};
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
        trackEvent("login_completed", { method: "password" });
        router.push(
          query.get("next") === "/studio/admin" ? "/studio/admin" : "/studio",
        );
        router.refresh();
      } else {
        if (mode === "register") {
          // Only fire confirmed conversion AFTER the register API succeeds.
          trackEvent("signup_completed", {
            selected_plan: selectedPlan?.id ?? "free",
            source: query.get("source") ?? "direct",
          });
        }
        setMessage(
          mode === "register"
            ? "Verification link sent. Open your inbox (or check Spam/Promotions if it takes more than 2 minutes) to activate your 10 free minutes."
            : mode === "forgot-password"
              ? "If an account exists for that email, a reset link will arrive shortly."
              : "Saved. You can now sign in.",
        );
      }
    } catch (err) {
      setError(explain(err));
    } finally {
      setBusy(false);
    }
  }

  const showPreview = mode === "sign-in" || mode === "register";
  return (
    <PublicPage mainClassName="account-page">
      <div
        className={
          showPreview
            ? "public-container account-layout"
            : "public-container account-compact"
        }
      >
        <section className="account-panel" aria-labelledby="account-title">
          <h1 id="account-title">{config.title}</h1>
          <p>{config.description}</p>
          {selectedPlan && (
            <p className="auth-plan-pill" role="status">
              Interested in <strong>{selectedPlan.name}</strong> (PKR{" "}
              {selectedPlan.priceDisplay}/mo) — your account still starts with
              10 free minutes first, with no card required.
            </p>
          )}
          {error && <ErrorNotice message={error} />}
          {(mode === "sign-in" || mode === "register") && !message && (
            <GoogleButton
              source={mode}
              returnPath={
                query.get("next") === "/studio/admin"
                  ? "/studio/admin"
                  : "/studio"
              }
              onError={setError}
            />
          )}
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
                  onFocus={markSignupStarted}
                />
              </label>
            )}
            {["sign-in", "register", "forgot-password"].includes(mode) && (
              <div className="field">
                <label htmlFor="auth-email">Email address</label>
                <input
                  id="auth-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  value={emailValue}
                  onFocus={markSignupStarted}
                  onChange={(event) => setEmailValue(event.target.value)}
                />
                {emailSuggestion && (
                  <small className="auth-typo-hint">
                    Did you mean{" "}
                    <button
                      type="button"
                      className="text-button auth-typo-button"
                      onClick={() => setEmailValue(emailSuggestion)}
                    >
                      {emailSuggestion}
                    </button>
                    ?
                  </small>
                )}
              </div>
            )}
            {["sign-in", "register", "reset-password"].includes(mode) && (
              <div className="field">
                <label htmlFor="auth-password">Password</label>
                <div className="password-field">
                  <input
                    id="auth-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={mode === "sign-in" ? 1 : 12}
                    maxLength={128}
                    value={passwordValue}
                    onFocus={markSignupStarted}
                    onChange={(event) => setPasswordValue(event.target.value)}
                    aria-describedby={
                      needsLongPassword ? "password-hint" : undefined
                    }
                    autoComplete={
                      mode === "sign-in" ? "current-password" : "new-password"
                    }
                  />
                  <button
                    type="button"
                    className="text-button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} aria-hidden="true" />
                    ) : (
                      <Eye size={18} aria-hidden="true" />
                    )}
                  </button>
                </div>
                {needsLongPassword && (
                  <small
                    id="password-hint"
                    className={
                      passwordReady
                        ? "auth-password-meter ready"
                        : "auth-password-meter"
                    }
                  >
                    {passwordReady ? (
                      <>
                        <Check size={14} aria-hidden="true" /> 12+ characters
                        met ({passwordLength})
                      </>
                    ) : (
                      `At least 12 characters (${passwordLength}/12)`
                    )}
                  </small>
                )}
              </div>
            )}
            <button className="button" disabled={busy || !!message}>
              {busy ? "Please wait…" : config.button}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>
          {mode === "register" && !message && (
            <ul className="auth-trust-list" role="list">
              <li>
                <Check size={14} aria-hidden="true" /> 10 free minutes included
              </li>
              <li>
                <Check size={14} aria-hidden="true" /> No card required
              </li>
              <li>
                <ShieldCheck size={14} aria-hidden="true" /> Automated &amp;
                zero model training
              </li>
            </ul>
          )}
          {message && (
            <div className="auth-post-register">
              <Saved>{message}</Saved>
              {mode === "register" && (
                <p className="field-help">
                  While you check your email, you can explore the{" "}
                  <Link href="/demo">interactive Nastaliq caption demo</Link> or
                  review{" "}
                  <Link href="/supported-formats">supported file formats</Link>.
                </p>
              )}
            </div>
          )}
          <div className="auth-links">
            <Link
              href={mode === "sign-in" ? "/auth/register" : "/auth/sign-in"}
            >
              {mode === "sign-in" ? "Create an account" : "Sign in instead"}
            </Link>
            {mode === "sign-in" && (
              <Link href="/auth/forgot-password">Forgot password?</Link>
            )}
          </div>
        </section>
        {showPreview && (
          <aside
            className="account-preview"
            aria-label="UrduSpeech Studio preview"
          >
            <div className="account-preview-frame">
              <Image
                src={preview}
                width={preview.width}
                height={preview.height}
                alt="UrduSpeech Studio bilingual caption preview over video frame"
                sizes="(max-width: 760px) 100vw, 500px"
              />
              <div className="account-preview-caption">
                <span lang="ur" dir="rtl">
                  {captionCues[1].urdu}
                </span>
                <span>{captionCues[1].english}</span>
              </div>
            </div>
            <p>
              <strong>UrduSpeech Studio</strong>
              <br />
              Review Urdu Nastaliq, Roman Urdu, and English captions alongside
              local playback before exporting UTF-8 TXT, SRT, VTT, or MP4.
            </p>
          </aside>
        )}
      </div>
    </PublicPage>
  );
}
