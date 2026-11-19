import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-site";
import { MarketingIntro, StartFree } from "@/components/marketing";
import { PublicCaptionPreview } from "@/components/public-caption-preview";

export const metadata: Metadata = {
  title: "Urdu transcription for audio and video",
  description:
    "Turn Urdu recordings into editable transcripts in Urdu script, Roman Urdu, English or bilingual output.",
};

export default function UrduTranscription() {
  return (
    <PublicPage
      current="/urdu-transcription"
      mainClassName="public-container marketing-page"
    >
      <MarketingIntro title="Urdu recordings into editable text.">
        <p>
          Transcribe interviews, podcasts or voice recordings. Review the words
          in Studio, then take the transcript into your notes, articles or show
          notes.
        </p>
        <StartFree />
      </MarketingIntro>
      <PublicCaptionPreview />
      <section
        className="marketing-detail"
        aria-labelledby="transcription-workflow"
      >
        <h2 id="transcription-workflow">From recording to transcript</h2>
        <ol className="marketing-list">
          <li>
            <strong>Choose the output.</strong> Keep Urdu script, switch to
            Roman Urdu, translate to English or keep both languages together.
          </li>
          <li>
            <strong>Review the draft.</strong> Check names, numbers and words
            that are hard to hear. You can turn automated corrections off.
          </li>
          <li>
            <strong>Download the text.</strong> Export TXT when the transcript
            is ready. If you need timed subtitles,{" "}
            <Link href="/video-captions">explore video captions</Link>.
          </li>
        </ol>
      </section>
    </PublicPage>
  );
}
