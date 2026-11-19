import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import creatorStill from "@/assets/short-video-demo.webp";
import { PublicPage } from "@/components/public-site";
import { GuideCards } from "@/components/guide-cards";
import { MarketingIntro } from "@/components/marketing";
import { publicGuides } from "@/lib/public-guides";

export const metadata: Metadata = {
  title: "Creator guides for Urdu video and audio",
  description:
    "Learn to caption Urdu videos, choose the right script and export transcripts or subtitle files from Studio.",
};

export default function Guides() {
  const [featured, ...guides] = publicGuides;
  return (
    <PublicPage mainClassName="public-container marketing-page guide-index">
      <div className="guide-index-hero">
        <MarketingIntro title="Creator guides">
          <p>
            Make your first Urdu captions, choose the right script and prepare
            files for the places you publish.
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
    </PublicPage>
  );
}
