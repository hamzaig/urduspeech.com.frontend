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
  useEffect(() => {
    let live = true;
    api<Session>("/v1/session")
      .then(async (s) => {
        if (live) setSession(s);
        const owner = await api<{ admin: boolean }>("/v1/admin/session").catch(
          () => ({ admin: false }),
        );
        if (live) setAdmin(owner.admin);
      })
      .catch((e) => {
        if (live && (!(e instanceof ApiError) || e.status !== 401))
          setError(explain(e));
      });
    return () => {
      live = false;
    };
  }, []);
  async function signOut() {
    try {
      await api("/v1/auth/sign-out", mutation("POST", {}));
      setSession(null);
      setAdmin(false);
      router.push("/auth/sign-in");
      router.refresh();
    } catch (e) {
      setError(explain(e));
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
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={"nav-link " + (path === href ? "active" : "")}
              aria-current={path === href ? "page" : undefined}
            >
              <Icon size={19} />
              {label}
            </Link>
          ))}
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
        <div className="sidebar-note">
          <AudioLines size={21} />
          <p>
            Your voice.
            <br />
            Ready to be read.
          </p>
          <small>Transcripts and captions for the way you create.</small>
        </div>
        <div className="sidebar-bottom">
          <span className="avatar">US</span>
          <div>
            <strong>Your workspace</strong>
            <small>{session ? "Signed in" : "Personal studio"}</small>
          </div>
        </div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <span>From spoken to shareable</span>
          {session ? (
            <button className="text-button" onClick={signOut}>
              <LogOut size={16} />
              Sign out
            </button>
          ) : (
            <Link href="/auth/sign-in" className="text-button">
              Sign in
            </Link>
          )}
        </header>
        {error && (
          <div role="status" className="service-notice">
            {error}
          </div>
        )}
        <main id="main">{children}</main>
        <footer className="studio-footer">
          <span>Made for Urdu-speaking creators.</span>
          <span>Audio and video use the same minute allowance.</span>
        </footer>
      </div>
    </div>
  );
}
