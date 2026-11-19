"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { StartFree } from "@/components/marketing";

const anchors = [
  { href: "#workflow", label: "How it works" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#pricing", label: "Pricing" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) navigation.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <header
      className="nav landing-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="public-container landing-header-inner">
        <Brand />
        <nav
          className="landing-nav"
          id="landing-navigation"
          aria-label="Website navigation"
          data-open={open}
          ref={navigation}
        >
          {anchors.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <Link href="/auth/sign-in" className="landing-mobile-sign-in">
            Sign in
          </Link>
        </nav>
        <div className="landing-header-actions">
          <Link href="/auth/sign-in" className="landing-desktop-sign-in">
            Sign in
          </Link>
          <StartFree />
          <button
            className="landing-menu-toggle"
            type="button"
            aria-controls="landing-navigation"
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
