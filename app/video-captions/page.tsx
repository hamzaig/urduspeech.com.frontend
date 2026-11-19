import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Captions, FileVideo, Globe } from "lucide-react";
import { CaptionStyleGallery } from "@/components/caption-style-gallery";
import { PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Urdu video captions and subtitles",
  description:
    "Edit Urdu subtitle text and timing, export SRT or VTT, or render a captioned MP4.",
};

export default function VideoCaptions() {
  return (
    <PublicPage mainClassName="public-container marketing-page">
      <section className="product-hero" aria-label="Video captions">
        <MarketingIntro title="Subtitles for Urdu videos">
          <p>
            Add captions to reels, interviews and longer videos. Review each
            line in Studio, then choose a style and export the file you need.
          </p>
          <StartFree />
        </MarketingIntro>
        <CaptionStyleGallery preload />
      </section>
      <section className="product-section" aria-labelledby="video-exports">
        <h2 id="video-exports">Caption files for your edit</h2>
        <ul className="product-points" role="list">
          <li>
            <Captions size={24} aria-hidden="true" />
            <h3>SRT subtitles</h3>
            <p>
              Import timed captions into an editor or publishing platform that
              accepts SRT.
            </p>
          </li>
          <li>
            <Globe size={24} aria-hidden="true" />
            <h3>VTT subtitles</h3>
            <p>
              Use a separate subtitle track in a compatible web video player.
            </p>
          </li>
          <li>
            <FileVideo size={24} aria-hidden="true" />
            <h3>Captioned MP4</h3>
            <p>
              Render a video with the captions on it so the text travels with
              the file.
            </p>
          </li>
        </ul>
        <div className="guide-link-row">
          <Link href="/guides/make-urdu-video-captions">
            Read the Urdu caption guide{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/supported-formats">
            Check supported formats and limits{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
