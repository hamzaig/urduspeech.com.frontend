import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/components/brand";

const publicLinks = [
  { href: "/urdu-transcription", label: "Transcription" },
  { href: "/video-captions", label: "Captions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

function PublicHeader({ current }: { current?: string }) {
  return (
    <header className="public-header">
      <div className="public-container public-header-inner">
        <Brand />
        <nav aria-label="Website navigation">
          {publicLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={current === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          className="public-sign-in"
          href="/auth/sign-in"
          aria-current={current === "/auth/sign-in" ? "page" : undefined}
        >
          Sign in <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-container">
        <div className="public-footer-top">
          <div>
            <Brand />
            <p>Urdu transcription and captions for creators.</p>
          </div>
          <nav aria-label="Service information">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/refunds">Payments &amp; refunds</Link>
            <Link href="/supported-formats">Supported formats</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <small>Operated by MoonSys Ltd. Prices are in Pakistani rupees.</small>
      </div>
    </footer>
  );
}

export function PublicPage({
  children,
  current,
  mainClassName,
}: {
  children: ReactNode;
  current?: string;
  mainClassName?: string;
}) {
  return (
    <div className="public-site">
      <PublicHeader current={current} />
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}

export function PolicyPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <PublicPage mainClassName="public-container policy-page">
      <h1>{title}</h1>
      <p className="policy-date">Updated 18 November 2026</p>
      <p className="policy-intro">{description}</p>
      <div className="policy-content">{children}</div>
    </PublicPage>
  );
}
