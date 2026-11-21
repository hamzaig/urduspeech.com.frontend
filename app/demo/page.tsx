import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaptionStudioDemo } from "@/components/caption-studio-demo";
import { StartFree } from "@/components/marketing";
import { PublicPage } from "@/components/public-site";
import { publicMetadata } from "@/lib/seo";

export const metadata: Metadata = publicMetadata({
  title: "Try the Urdu caption editor",
  description:
    "Edit sample Urdu, Roman Urdu, English and bilingual captions in your browser. Preview a style and download your edits as SRT, VTT or TXT.",
  path: "/demo",
});

export default function CaptionDemo() {
  return (
    <PublicPage mainClassName="public-container marketing-page demo-page">
      <div className="demo-intro marketing-intro">
        <h1>Try the caption editor</h1>
        <p>
          Pick a line on the timeline and make it yours. Switch languages,
          preview styles and download your edits without an account.
        </p>
      </div>
      <CaptionStudioDemo editable />
      <div className="demo-help">
        <p>
          Download your edits as text or timed subtitles. Render styled video in
          Studio.
        </p>
        <Link
          className="public-inline-link"
          href="/guides/subtitle-and-video-exports"
        >
          Compare export formats <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="demo-next">
        <div>
          <h2>Ready to caption your own recording?</h2>
          <p>
            Upload audio or video to Studio to get an editable draft with
            timing. Your account starts with 10 free minutes.
          </p>
        </div>
        <StartFree />
      </div>
    </PublicPage>
  );
}
