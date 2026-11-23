import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  QuestionList,
  StartFree,
  type QuestionItem,
} from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

const title = "Urdu Transcription & Subtitles FAQ";
const description =
  "Answers on supported audio and video codecs, WhatsApp voice notes, Nastaliq RTL rendering, Roman Urdu, PKR plans, retention, and account deletion.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/faq",
  ogImage: "default",
  markdownPath: "/faq.md",
});

const uploadFaq: readonly QuestionItem[] = [
  {
    question:
      "Can I upload WhatsApp .opus or .ogg voice messages directly to Studio?",
    answer: (
      <p>
        Not directly. WhatsApp exports voice messages as <code>.opus</code> or{" "}
        <code>.ogg</code>, while Studio validates and transcribes{" "}
        <strong>MP3, FLAC, PCM WAV, AAC M4A</strong> audio and{" "}
        <strong>MP4 or MOV</strong> video with an AAC speech track. Convert a
        saved WhatsApp voice note on your phone or computer to <code>.m4a</code>
        , <code>.mp3</code>, or <code>.wav</code> first, then upload it. See our{" "}
        <Link href="/urdu-voice-notes-to-text">
          Urdu voice notes to text workflow
        </Link>{" "}
        for exact steps.
      </p>
    ),
  },
  {
    question:
      "Does UrduSpeech accept YouTube links, live microphone recording, or Zoom bots?",
    answer: (
      <p>
        No. Studio only processes local audio and video files that you own or
        have permission to upload. It does not scrape YouTube URLs, join live
        meetings, or stream real-time microphone dictation. Export your finished
        recording or audio bounce first, then upload the local file.
      </p>
    ),
  },
  {
    question:
      "What happens if my MP4 or MOV video has multiple audio tracks or iPhone HDR color?",
    answer: (
      <p>
        If a video contains more than one audio stream, Studio’s{" "}
        <strong>Media check</strong> panel lets you pick the spoken-Urdu track
        before transcription begins. Properly tagged iPhone BT.2020 HLG or PQ
        HDR recordings are automatically tone-mapped to standard SDR BT.709 when
        rendering a captioned MP4. Check{" "}
        <Link href="/supported-formats">supported formats and limits</Link> for
        full codec details.
      </p>
    ),
  },
  {
    question:
      "Can UrduSpeech separate multiple speakers or read text on slides?",
    answer: (
      <p>
        No. UrduSpeech focuses on accurate single-stream speech recognition,
        script conversion, and timed captioning. It does not perform automatic
        speaker diarization (labeling Speaker 1 / Speaker 2), OCR of visual
        slides, or ripping existing embedded soft subtitles.
      </p>
    ),
  },
];

const scriptFaq: readonly QuestionItem[] = [
  {
    question:
      "How does UrduSpeech handle mixed Urdu and English (code-switching) speech?",
    answer: (
      <p>
        Everyday Pakistani creators frequently mix English nouns, brand names,
        and technical terms into spoken Urdu. Studio preserves spoken numbers,
        currencies, URLs, emails, and handles against silent reformatting and
        highlights uncertain edits as reviewable suggestions. Always review
        names, figures, and mixed phrases against your local audio preview
        before exporting.
      </p>
    ),
  },
  {
    question:
      "Why do Urdu captions break in other video editors, and how does Nastaliq rendering fix this?",
    answer: (
      <p>
        Many general-purpose video tools either substitute an Arabic Naskh font
        or reverse right-to-left characters and punctuation. UrduSpeech renders
        burned-in Urdu captions using <strong>Noto Nastaliq Urdu</strong> (with
        Inter for Latin characters and numbers), proper RTL shaping, generous
        vertical line spacing for stacked strokes, and verified safe-area
        margins so descenders and dots are not clipped. Read our{" "}
        <Link href="/methodology">AI and Nastaliq rendering methodology</Link>.
      </p>
    ),
  },
  {
    question: "What is the difference between Roman Urdu and English output?",
    answer: (
      <p>
        <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link> keeps your
        exact Urdu words and writes them in Latin letters (for example,{" "}
        <span lang="ur-Latn" dir="ltr">
          “Har kahani ki apni awaaz hoti hai.”
        </span>
        ). <Link href="/urdu-audio-to-english-text">English output</Link>{" "}
        translates the meaning into English sentences (“Every story has a voice
        of its own.”). Stacked{" "}
        <Link href="/bilingual-urdu-english-captions">Urdu + English</Link>{" "}
        places both scripts on the same cue in your chosen Urdu-first or
        English-first order.
      </p>
    ),
  },
  {
    question:
      "Can I disable AI text correction and keep the raw speech transcript?",
    answer: (
      <p>
        Yes. On the new-upload screen, you can toggle{" "}
        <strong>AI text correction</strong> off before processing begins to keep
        the unadjusted speech-recognition output. When enabled, conservative
        Urdu character normalization (such as standardizing Urdu{" "}
        <span lang="ur" dir="rtl">
          ک
        </span>{" "}
        and{" "}
        <span lang="ur" dir="rtl">
          ی
        </span>{" "}
        forms) runs automatically while uncertain wording changes appear as
        accept/reject proposals.
      </p>
    ),
  },
];

const exportFaq: readonly QuestionItem[] = [
  {
    question:
      "Will exported SRT and VTT files work in YouTube Studio, Premiere Pro, CapCut, and DaVinci Resolve?",
    answer: (
      <p>
        Yes. Studio exports standard UTF-8 encoded <code>.srt</code> (numbered
        cues with comma milliseconds) and <code>.vtt</code> (<code>WEBVTT</code>{" "}
        header with period milliseconds) subtitle files with verified
        non-overlapping timestamps. Remember that external subtitle files rely
        on the target editor or player’s Urdu font support—if you want
        guaranteed Nastaliq typography on social feeds, export a burned-in{" "}
        <Link href="/video-captions">captioned MP4</Link> instead.
      </p>
    ),
  },
  {
    question:
      "Why is there a 256 MiB limit on burned-in MP4 renders, and what if my video is longer?",
    answer: (
      <p>
        Rendered captioned MP4 files have a 256 MiB operational safety limit to
        keep cloud rendering fast and reliable. If a long or high-bitrate video
        exceeds 256 MiB during MP4 rendering, your UTF-8 <strong>TXT</strong>,{" "}
        <strong>SRT</strong>, and <strong>VTT</strong> files remain fully
        downloadable so you can attach them directly in YouTube Studio or your
        local desktop editor.
      </p>
    ),
  },
  {
    question:
      "Can I convert an existing SRT file into WebVTT without creating an account?",
    answer: (
      <p>
        Yes. Use our free client-side{" "}
        <Link href="/tools/srt-to-vtt-converter">
          SRT to WebVTT converter and Urdu subtitle validator
        </Link>{" "}
        right in your browser—it runs locally with zero upload and checks for
        overlapping timestamps and Urdu RTL cues.
      </p>
    ),
  },
];

const billingPrivacyFaq: readonly QuestionItem[] = [
  {
    question:
      "How long does manual payment verification (bank transfer, JazzCash, Easypaisa, SadaPay, NayaPay) take?",
    answer: (
      <p>
        Manual Pakistani payments are reviewed against settlement records after
        you submit your transfer reference inside Studio Billing. Do not send a
        duplicate transfer while a submission is pending. Once approved, your
        monthly minutes activate immediately and do not auto-renew. See{" "}
        <Link href="/pricing">PKR pricing</Link> and{" "}
        <Link href="/refunds">payments and refunds</Link>.
      </p>
    ),
  },
  {
    question:
      "Does UrduSpeech train AI models on my uploaded recordings, or let human staff listen to them?",
    answer: (
      <p>
        No. Processing is automated (speech recognition, optional AI correction
        or translation, timing alignment, and caption rendering). UrduSpeech
        does not operate a human transcription service and does not train its
        own models on your audio or video. Source files are stored privately in
        AWS S3 (US East Ohio) and automatically expire after your plan’s 3, 15,
        30, or 90 day retention window. Read our{" "}
        <Link href="/security">security and media retention page</Link> and{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    ),
  },
  {
    question:
      "How do I permanently delete a project or my entire UrduSpeech account?",
    answer: (
      <p>
        You can delete individual projects inside Studio or request full account
        deletion from Studio Settings. Account access is revoked immediately and
        you receive a private deletion receipt to track content removal,
        subscription cleanup, and backup propagation. Follow the step-by-step
        instructions on{" "}
        <Link href="/delete-account">how to delete your account</Link>.
      </p>
    ),
  },
];

export default function Faq() {
  const path = "/faq" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/default.png",
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "FAQ", path },
    ]),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page marketing-reading">
      <StructuredData data={jsonLd} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
      <MarketingIntro title="Frequently asked questions">
        <p>
          Detailed answers on uploading Urdu audio and video, Nastaliq and Roman
          Urdu captions, subtitle exports for YouTube and NLEs, Pakistani rupee
          billing, and media privacy.
        </p>
      </MarketingIntro>
      <div className="faq-topics">
        <section aria-labelledby="faq-uploads">
          <h2 id="faq-uploads">Audio, video &amp; WhatsApp uploads</h2>
          <QuestionList questions={uploadFaq} openFirst />
        </section>
        <section aria-labelledby="faq-scripts">
          <h2 id="faq-scripts">Urdu script, Roman Urdu &amp; code-switching</h2>
          <QuestionList questions={scriptFaq} />
        </section>
        <section aria-labelledby="faq-exports">
          <h2 id="faq-exports">
            Subtitle exports, editor compatibility &amp; rendering
          </h2>
          <QuestionList questions={exportFaq} />
        </section>
        <section aria-labelledby="faq-billing">
          <h2 id="faq-billing">PKR billing, privacy &amp; data retention</h2>
          <QuestionList questions={billingPrivacyFaq} />
        </section>
      </div>

      <section className="demo-next" aria-labelledby="faq-cta">
        <div>
          <h2 id="faq-cta">Still have a question about your workflow?</h2>
          <p>
            Test caption editing directly in the browser demo or email our
            support team with your file format or billing question.
          </p>
        </div>
        <div className="product-actions">
          <StartFree />
          <Link href="/contact" className="button secondary">
            Contact support
          </Link>
        </div>
      </section>

      <div className="guide-link-row">
        <Link href="/guides">
          Read creator guides <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/compare">
          Compare UrduSpeech vs other tools{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/supported-formats">
          Supported formats &amp; limits{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/security">
          Security &amp; media retention{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </PublicPage>
  );
}
