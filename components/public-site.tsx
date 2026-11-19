import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "@/components/brand";
import { SiteHeader } from "@/components/site-header";

const footerGroups = [
  {
    name: "Product",
    links: [
      { href: "/video-captions", label: "Video captions" },
      { href: "/urdu-transcription", label: "Transcription" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    name: "Resources",
    links: [
      { href: "/guides", label: "Creator guides" },
      { href: "/supported-formats", label: "Supported formats" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    name: "Policies",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/refunds", label: "Payments & refunds" },
      { href: "/delete-account", label: "Delete account" },
    ],
  },
];

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
          <div className="site-footer-layout">
            <div>
              <Brand />
              <p>Urdu transcription and captions for creators.</p>
            </div>
            <nav className="site-footer-nav" aria-label="Service information">
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
          </div>
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
  mainClassName,
}: {
  children: ReactNode;
  mainClassName?: string;
}) {
  return (
    <div className="public-site">
      <SiteHeader />
      <main id="main" className={mainClassName} tabIndex={-1}>
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}

export type DocumentSection = { title: string; body: ReactNode };

export function ReadingSections({
  sections,
}: {
  sections: readonly DocumentSection[];
}) {
  const chapters = sections.map((section) => ({
    ...section,
    id: section.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  }));

  return (
    <div className="reading-layout">
      <nav className="reading-nav" aria-label="On this page">
        <p>On this page</p>
        <ol role="list">
          {chapters.map(({ id, title }) => (
            <li key={id}>
              <a href={"#" + id}>{title}</a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="reading-content">
        {chapters.map(({ id, title, body }) => (
          <section key={id} id={id} aria-labelledby={id + "-heading"}>
            <h2 id={id + "-heading"}>{title}</h2>
            {body}
          </section>
        ))}
      </div>
    </div>
  );
}

export function PolicyPage({
  title,
  description,
  sections,
  updated,
}: {
  title: string;
  description: string;
  sections: readonly DocumentSection[];
  updated?: string;
}) {
  return (
    <PublicPage mainClassName="public-container policy-page">
      <h1>{title}</h1>
      {updated && <p className="policy-date">Updated {updated}</p>}
      <p className="policy-intro">{description}</p>
      <ReadingSections sections={sections} />
    </PublicPage>
  );
}
