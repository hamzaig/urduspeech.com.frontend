import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import captionDemo from "@/assets/caption-demo.webp";
import { PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Urdu video captions and subtitles",
  description:
    "Edit Urdu subtitle text and timing, export SRT or VTT, or render a captioned MP4.",
};

export default function VideoCaptions() {
  return (
    <PublicPage
      current="/video-captions"
      mainClassName="public-container marketing-page"
    >
      <section className="feature-opening" aria-label="Video captions">
        <MarketingIntro title="Captions for Urdu videos.">
          <p>
            Give viewers words they can follow. Review the text and timing for
            your reels, interviews and longer videos, then choose the export
            that fits your edit.
          </p>
          <StartFree />
        </MarketingIntro>
        <figure className="feature-frame">
          <Image
            src={captionDemo}
            alt=""
            unoptimized
            sizes="(max-width: 760px) 100vw, 560px"
          />
          <div className="feature-caption">
            <span lang="ur" dir="rtl">
              ہر کہانی کی اپنی آواز ہوتی ہے۔
            </span>
            <span>Every story has a voice of its own.</span>
          </div>
          <figcaption>Illustrative frame with bilingual captions</figcaption>
        </figure>
      </section>
      <section className="marketing-detail" aria-labelledby="video-exports">
        <h2 id="video-exports">Choose your export</h2>
        <ul className="marketing-list">
          <li>
            <strong>SRT</strong> for importing subtitles into an editor or
            upload platform that supports SRT files.
          </li>
          <li>
            <strong>VTT</strong> for compatible web video players.
          </li>
          <li>
            <strong>Captioned MP4</strong> when you want the subtitles visible
            in the exported video itself.
          </li>
        </ul>
        <Link className="public-inline-link" href="/supported-formats">
          Check supported video formats and limits
        </Link>
      </section>
    </PublicPage>
  );
}
