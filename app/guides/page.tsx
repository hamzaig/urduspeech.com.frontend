import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import creatorStill from "@/assets/short-video-demo.webp";
import { PublicPage } from "@/components/public-site";
import { GuideCards } from "@/components/guide-cards";
import { MarketingIntro } from "@/components/marketing";
import { publicGuides } from "@/lib/public-guides";
import { publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "Creator guides for Urdu video and audio",
  description:
    "Learn to caption Urdu videos, convert voice notes to text, choose between Urdu script, Roman Urdu and English, and export TXT, SRT, VTT or MP4 files.",
  path: "/guides",
});

export default function Guides() {
  const [featured, ...guides] = publicGuides;
  return (
    <PublicPage mainClassName="public-container marketing-page guide-index">
      <div className="guide-index-hero">
        <MarketingIntro title="Creator guides">
          <p>
            Make your first Urdu captions, convert saved voice notes to text,
            choose the right script or translation, and prepare files for the
            places you publish.
          </p>
        </MarketingIntro>
        <Link className="guide-spotlight" href={`/guides/${featured.slug}`}>
          <Image
            src={creatorStill}
            alt=""
            width={creatorStill.width}
            height={creatorStill.height}
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
      <GuideCards guides={guides} />
      <section className="product-section" aria-labelledby="guides-workflows">
        <h2 id="guides-workflows">Explore UrduSpeech workflows</h2>
        <p>
          Go directly to the product page for the output or file format you want
          to create in Studio.
        </p>
        <div className="guide-link-row">
          <Link href="/urdu-transcription">
            Urdu speech to text &amp; audio transcription{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/video-captions">
            Urdu subtitle generator &amp; video captions{" "}
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
        </div>
      </section>
    </PublicPage>
  );
}
