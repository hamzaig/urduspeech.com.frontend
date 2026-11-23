import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "@/components/brand";
import { SiteHeader } from "@/components/site-header";

const footerGroups = [
  {
    name: "Product",
    links: [
      { href: "/urdu-transcription", label: "Urdu transcription" },
      { href: "/video-captions", label: "Video captions" },
      { href: "/urdu-audio-to-roman-urdu", label: "Roman Urdu text" },
      { href: "/urdu-audio-to-english-text", label: "English translation" },
      { href: "/demo", label: "Interactive demo" },
      { href: "/pricing", label: "PKR pricing" },
      { href: "/supported-formats", label: "Supported formats" },
    ],
  },
  {
    name: "Use Cases & Tools",
    links: [
      {
        href: "/urdu-captions-for-reels-tiktok",
        label: "Reels & TikTok captions",
      },
      { href: "/youtube-urdu-subtitles", label: "YouTube Urdu subtitles" },
      {
        href: "/bilingual-urdu-english-captions",
        label: "Bilingual Urdu + English",
      },
      { href: "/urdu-voice-notes-to-text", label: "Voice notes to text" },
      {
        href: "/urdu-podcast-transcription",
        label: "Podcast transcription",
      },
      {
        href: "/srt-vtt-urdu-subtitle-generator",
        label: "SRT & VTT generator",
      },
      { href: "/tools", label: "All free tools" },
      {
        href: "/tools/srt-to-vtt-converter",
        label: "SRT to VTT converter",
      },
      {
        href: "/tools/urdu-subtitle-checker",
        label: "Urdu subtitle checker",
      },
      {
        href: "/tools/caption-plan-calculator",
        label: "PKR plan calculator",
      },
    ],
  },
  {
    name: "Guides & Compare",
    links: [
      { href: "/guides", label: "Creator guides" },
      { href: "/urdu-caption-glossary", label: "Urdu caption glossary" },
      { href: "/guides/make-urdu-video-captions", label: "Caption workflow" },
      {
        href: "/guides/urdu-roman-urdu-and-english",
        label: "Script comparison",
      },
      { href: "/compare", label: "Compare tools" },
      { href: "/compare/urduspeech-vs-capcut", label: "UrduSpeech vs CapCut" },
      {
        href: "/alternatives/capcut-urdu-alternative",
        label: "CapCut Urdu alternative",
      },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    name: "Company & Policies",
    links: [
      { href: "/about", label: "About UrduSpeech" },
      { href: "/methodology", label: "AI methodology" },
      { href: "/security", label: "Security & retention" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
      { href: "/refunds", label: "Payments & refunds" },
      { href: "/delete-account", label: "Delete account" },
      { href: "/contact", label: "Contact support" },
    ],
  },
];

export function PublicFooter({ intro }: { intro?: ReactNode }) {
  return (
    <footer
      className={intro ? "public-footer landing-footer" : "public-footer"}
    >
      <div className="public-container">
        {intro}
        <div className="public-footer-info">
          <div className="site-footer-layout">
            <div>
              <Brand />
              <p>
                Automated AI Urdu transcription, Nastaliq subtitles, and video
                captioning studio for creators.
              </p>
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
            Operated by MoonSys Ltd. Automated AI creator studio (not a human
            transcription agency). Prices are in Pakistani rupees (PKR).
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

export function Breadcrumbs({
  items,
}: {
  items: readonly { name: string; href?: string }[];
}) {
  return (
    <nav className="guide-breadcrumbs" aria-label="Breadcrumb">
      <ol role="list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} aria-current={isLast ? "page" : undefined}>
              {isLast || !item.href ? (
                item.name
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PolicyPage({
  title,
  description,
  sections,
  updated,
  breadcrumbs,
}: {
  title: string;
  description: string;
  sections: readonly DocumentSection[];
  updated?: string;
  breadcrumbs?: readonly { name: string; href?: string }[];
}) {
  return (
    <PublicPage mainClassName="public-container policy-page">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <h1>{title}</h1>
      {updated && <p className="policy-date">Updated {updated}</p>}
      <p className="policy-intro">{description}</p>
      <ReadingSections sections={sections} />
    </PublicPage>
  );
}
