"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { StartFree } from "@/components/marketing";
import { ThemeToggle } from "@/components/theme-toggle";
import { getNavCurrent } from "@/lib/public-a11y";

const pages = [
  { href: "/video-captions", label: "Video captions" },
  { href: "/urdu-transcription", label: "Transcription" },
  { href: "/demo", label: "Demo" },
  { href: "/guides", label: "Guides" },
  { href: "/compare", label: "Compare" },
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
          {pages.map(({ href, label }) => {
            const current = getNavCurrent(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={current}
                className={
                  current === "location" ? "site-nav-section" : undefined
                }
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/auth/sign-in"
            className="site-mobile-sign-in"
            aria-current={pathname === "/auth/sign-in" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Sign in
          </Link>
          <StartFree
            className="site-mobile-start-free"
            onClick={() => setOpen(false)}
          />
        </nav>
        <div className="site-header-actions">
          {/* Language switch between the English and Urdu homepages. */}
          {pathname === "/ur" ? (
            <Link href="/" className="site-language" lang="en" hrefLang="en">
              English
            </Link>
          ) : (
            <Link
              href="/ur"
              className="site-language"
              lang="ur"
              hrefLang="ur"
              aria-label="اردو میں دیکھیں"
            >
              اردو
            </Link>
          )}
          <Link
            href="/auth/sign-in"
            className="site-desktop-sign-in"
            aria-current={pathname === "/auth/sign-in" ? "page" : undefined}
          >
            Sign in
          </Link>
          <ThemeToggle />
          <StartFree className="site-header-start-free" />
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
