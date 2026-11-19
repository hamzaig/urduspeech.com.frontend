"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AudioLines,
  FolderOpen,
  Plus,
  SlidersHorizontal,
  Wallet,
  LogOut,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api, mutation, explain, ApiError } from "@/lib/api";
import type { Session } from "@/lib/contracts";
const links = [
  { href: "/studio", label: "My projects", icon: FolderOpen },
  { href: "/studio/new", label: "New upload", icon: Plus },
  { href: "/studio/billing", label: "Plan & minutes", icon: Wallet },
  { href: "/studio/settings", label: "My defaults", icon: SlidersHorizontal },
];
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  useEffect(() => {
    let live = true;
    api<Session>("/v1/session")
      .then(async (s) => {
        if (live) {
          setSession(s);
          setCheckingSession(false);
        }
        const owner = await api<{ admin: boolean }>("/v1/admin/session").catch(
          () => ({ admin: false }),
        );
        if (live) setAdmin(owner.admin);
      })
      .catch((e) => {
        if (live && (!(e instanceof ApiError) || e.status !== 401))
          setError(explain(e));
        if (live) setCheckingSession(false);
      });
    return () => {
      live = false;
    };
  }, []);
  async function signOut() {
    setSigningOut(true);
    setError("");
    try {
      await api("/v1/auth/sign-out", mutation("POST", {}));
      setSession(null);
      setAdmin(false);
      router.push("/auth/sign-in");
      router.refresh();
    } catch (e) {
      setError(explain(e));
    } finally {
      setSigningOut(false);
    }
  }
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/studio" aria-label="UrduSpeech studio">
          <span className="brand-mark">
            <AudioLines size={24} />
          </span>
          <span>
            Urdu<span className="brand-light">Speech</span>
            <small>Creator studio</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              path === href ||
              (href === "/studio" && path.startsWith("/studio/projects/"));
            return (
              <Link
                key={href}
                href={href}
                className={"nav-link " + (active ? "active" : "")}
                aria-current={
                  active ? (path === href ? "page" : "location") : undefined
                }
              >
                <Icon size={19} />
                {label}
              </Link>
            );
          })}
          {admin && (
            <Link
              href="/studio/admin"
              className={
                "nav-link " + (path === "/studio/admin" ? "active" : "")
              }
              aria-current={path === "/studio/admin" ? "page" : undefined}
            >
              <Settings size={19} />
              Operations
            </Link>
          )}
        </nav>
        <div className="workspace-account">
          {session ? (
            <button
              className="text-button"
              disabled={signingOut}
              onClick={signOut}
            >
              <LogOut size={16} aria-hidden="true" />
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          ) : !checkingSession ? (
            <Link href="/auth/sign-in" className="text-button">
              Sign in
            </Link>
          ) : null}
        </div>
      </aside>
      <div className="app-main">
        {error && (
          <div role="status" className="service-notice">
            {error}
          </div>
        )}
        <main id="main">{children}</main>
        <footer className="studio-footer">
          <span>
            <Link href="/privacy">Privacy</Link> ·{" "}
            <Link href="/terms">Terms</Link> ·{" "}
            <Link href="/refunds">Payments</Link> ·{" "}
            <Link href="/supported-formats">Formats</Link>
          </span>
        </footer>
      </div>
    </div>
  );
}
