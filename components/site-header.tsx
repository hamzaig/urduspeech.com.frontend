"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { StartFree } from "@/components/marketing";

const pages = [
  { href: "/video-captions", label: "Video captions" },
  { href: "/urdu-transcription", label: "Transcription" },
  { href: "/demo", label: "Demo" },
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) navigation.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="public-container site-header-inner">
        <Brand />
        <nav
          className="site-navigation"
          id="site-navigation"
          aria-label="Website navigation"
          data-open={open}
          ref={navigation}
        >
          {pages.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={pathname === href ? "page" : undefined}
              className={
                pathname?.startsWith(href + "/")
                  ? "site-nav-section"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
          <Link
            href="/auth/sign-in"
            className="site-mobile-sign-in"
            onClick={() => setOpen(false)}
          >
            Sign in
          </Link>
        </nav>
        <div className="site-header-actions">
          <Link
            href="/auth/sign-in"
            className="site-desktop-sign-in"
            aria-current={pathname === "/auth/sign-in" ? "page" : undefined}
          >
            Sign in
          </Link>
          <StartFree />
          <button
            className="site-menu-toggle"
            type="button"
            aria-controls="site-navigation"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            ref={toggle}
          >
            {open ? (
              <X size={21} aria-hidden="true" />
            ) : (
              <Menu size={21} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
