import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import creatorStill from "@/assets/short-video-demo.webp";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { GuideCards } from "@/components/guide-cards";
import { MarketingIntro } from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import { publicGuides } from "@/lib/public-guides";
import {
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildItemListJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

const title = "Creator Guides for Urdu Captions & Audio";
const description =
  "Practical workflows for captioning Urdu videos, converting voice notes, comparing Nastaliq vs Roman Urdu, and uploading SRT or VTT to YouTube.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/guides",
  ogImage: "guides",
});

export default function Guides() {
  const [featured, ...guides] = publicGuides;
  const path = "/guides" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      type: "CollectionPage",
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/guides.png",
      mainEntityId: `${SITE_URL}${path}#itemlist`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Creator guides", path },
    ]),
    buildItemListJsonLd({
      path,
      name: "UrduSpeech Creator Guides",
      items: publicGuides.map((guide) => ({
        name: guide.title,
        path: `/guides/${guide.slug}` as const,
        description: guide.summary,
      })),
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page guide-index">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Creator guides" }]}
      />
      <div className="guide-index-hero">
        <MarketingIntro title="Creator guides for Urdu audio and video">
          <p>
            End-to-end playbooks written by the UrduSpeech engineering and
            editorial team: prepare clean recordings, choose between Nastaliq
            Urdu, Roman Urdu, and English captions, handle WhatsApp voice notes,
            and ship UTF-8 SRT, VTT, or burned-in MP4 videos to YouTube,
            Instagram Reels, and TikTok.
          </p>
        </MarketingIntro>
        <Link className="guide-spotlight" href={`/guides/${featured.slug}`}>
          <Image
            src={creatorStill}
            alt="Creator speaking in Urdu with Nastaliq video caption style overlay"
            width={creatorStill.width}
            height={creatorStill.height}
            preload
            fetchPriority="high"
            placeholder="blur"
            sizes="(max-width: 760px) calc(100vw - 40px), 640px"
          />
          <span className="guide-spotlight-content">
            <span>
              <small>{featured.topic}</small>
              <strong>{featured.title}</strong>
            </span>
            <ArrowUpRight size={21} aria-hidden="true" />
          </span>
        </Link>
      </div>

      <section className="product-section" aria-labelledby="all-guides-heading">
        <h2 id="all-guides-heading">Step-by-step Urdu production playbooks</h2>
        <p>
          Every guide documents real Studio behavior, exact codec limits, and
          reproducible UTF-8 subtitle formatting, with no fabricated accuracy
          promises or hidden steps.
        </p>
        <GuideCards guides={guides} />
      </section>

      <section className="product-section" aria-labelledby="guides-workflows">
        <h2 id="guides-workflows">
          Explore Studio workflows &amp; creator tools
        </h2>
        <p>
          Jump straight to a dedicated workflow page, head-to-head comparison,
          or our free browser subtitle converter.
        </p>
        <div className="guide-link-row">
          <Link href="/urdu-transcription">
            Urdu speech to text &amp; audio transcription{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/video-captions">
            Urdu subtitle generator &amp; burned-in video captions{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/urdu-audio-to-roman-urdu">
            Convert Urdu audio to Roman Urdu text{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/urdu-audio-to-english-text">
            Translate Urdu audio to English text &amp; subtitles{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/urdu-captions-for-reels-tiktok">
            Urdu captions for Instagram Reels &amp; TikTok{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/bilingual-urdu-english-captions">
            Bilingual Urdu + English stacked captions{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/compare">
            Compare UrduSpeech vs CapCut, Descript &amp; Whisper{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/tools/srt-to-vtt-converter">
            Free browser SRT to WebVTT subtitle converter{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
