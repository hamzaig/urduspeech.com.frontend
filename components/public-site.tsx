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

const policyLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refunds", label: "Payments & refunds" },
];

const helpLinks = [
  { href: "/supported-formats", label: "Supported formats" },
  { href: "/contact", label: "Contact" },
];

const footerGroups = [
  { name: "Product", links: publicLinks.slice(0, 3) },
  { name: "Support", links: [publicLinks[3], ...helpLinks] },
  { name: "Policies", links: policyLinks },
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

export function PublicFooter({ intro }: { intro?: ReactNode }) {
  return (
    <footer
      className={
        intro ? "public-footer closing landing-footer" : "public-footer"
      }
    >
      <div className="public-container wrap">
        {intro}
        <div className="public-footer-info">
          {intro ? (
            <nav
              className="landing-footer-nav"
              aria-label="Service information"
            >
              <div>
                <Brand />
                <p>Urdu transcription and captions for creators.</p>
              </div>
              {footerGroups.map(({ name, links }) => (
                <div key={name}>
                  <h3>{name}</h3>
                  {links.map(({ href, label }) => (
                    <Link key={href} href={href}>
                      {label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          ) : (
            <div className="public-footer-top">
              <div>
                <Brand />
                <p>Urdu transcription and captions for creators.</p>
              </div>
              <nav aria-label="Service information">
                {[...policyLinks, ...helpLinks].map(({ href, label }) => (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
          <small>
            Operated by MoonSys Ltd. Prices are in Pakistani rupees.
          </small>
        </div>
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
