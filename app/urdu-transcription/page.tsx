import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  FileVideo,
  Languages,
  Mic,
  PencilLine,
  SlidersHorizontal,
} from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  QuestionList,
  StartFree,
} from "@/components/marketing";
import { PublicCaptionPreview } from "@/components/public-caption-preview";
import { StructuredData } from "@/components/structured-data";
import { captionCues, captionTime } from "@/lib/caption-demo";
import {
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";

const title = "Urdu Speech to Text & Audio Transcription";
const description =
  "Convert uploaded Urdu audio and video into editable Nastaliq, Roman Urdu, or English transcripts. Review AI corrections and export UTF-8 TXT.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/urdu-transcription",
  ogImage: "transcription",
  markdownPath: "/urdu-transcription.md",
});

const transcriptionQuestions = [
  {
    question:
      "Does UrduSpeech transcribe uploaded files or live microphone dictation?",
    answer: (
      <p>
        UrduSpeech transcribes uploaded audio and video files in Studio. It is
        not a live voice-typing keyboard, browser dictation extension, or
        real-time streaming microphone tool. If you record a voice memo first,
        save it in a supported format and upload the file.
      </p>
    ),
  },
  {
    question: "What does AI text correction do, and can I turn it off?",
    answer: (
      <p>
        When <strong>AI text correction</strong> is enabled, UrduSpeech applies
        conservative Urdu character-form normalization and safe punctuation
        while keeping numeric values, currencies, URLs, emails, and handles
        protected. Uncertain spelling or wording changes appear as reviewable
        suggestions that you can accept or reject in Studio. You can switch AI
        text correction off before uploading to keep the unadjusted speech
        recognition text.
      </p>
    ),
  },
  {
    question:
      "How does the 10-minute free allowance work for audio and video files?",
    answer: (
      <p>
        Every account starts with a one-time 10-minute free allowance with no
        card required. Audio and video uploads share the same duration-based
        minute pool. On the Free plan, each uploaded recording can be up to 10
        minutes and 250 MiB, and captioned MP4 exports are up to 720p with a
        watermark. See <Link href="/pricing">plans and pricing</Link> for
        monthly plans.
      </p>
    ),
  },
  {
    question:
      "What should I review in an Urdu transcript before publishing or quoting?",
    answer: (
      <p>
        Always check proper names, regional terms, spoken numbers, dates,
        overlapping speech, noisy passages, and sentences that switch between
        Urdu and English. UrduSpeech does not perform speaker identification or
        automatic meeting summaries, so you decide the final wording in Studio.
      </p>
    ),
  },
];

export default function UrduTranscription() {
  const samplePlainTxt = captionCues.map((cue) => cue.urdu).join("\n");
  const path = "/urdu-transcription" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/transcription.png",
      mainEntityId: `${SITE_URL}${path}#app`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Urdu transcription", path },
    ]),
    buildSoftwareApplicationJsonLd({
      name: "UrduSpeech — Urdu Speech to Text & Audio Transcription",
      description,
      path,
      includeOffers: true,
      featureList: [
        "Uploaded Urdu audio and video speech-to-text transcription",
        "Editable Urdu Nastaliq, Roman Urdu, English translation, and bilingual output",
        "Optional AI text correction with reviewable accept/reject suggestions",
        "Plain-text UTF-8 TXT transcript and timed SRT/VTT subtitle exports",
      ],
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <section className="page-hero" aria-label="Urdu speech to text">
        <Breadcrumbs
          items={[{ name: "Home", href: "/" }, { name: "Urdu transcription" }]}
        />
        <div className="product-hero">
          <MarketingIntro title="Convert Urdu speech into editable text">
            <p>
              Upload spoken Urdu audio or video recordings to generate an
              editable transcript in Studio. Keep right-to-left Urdu script in
              Nastaliq, switch to{" "}
              <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link>, or
              translate into{" "}
              <Link href="/urdu-audio-to-english-text">English</Link>, then
              review the draft and export UTF-8 <strong>TXT</strong> or timed
              subtitles.
            </p>
            <div className="product-actions">
              <StartFree />
              <Link href="/demo" className="button secondary">
                Try the editor
              </Link>
            </div>
            <p className="free-note">
              One-time 10-minute free allowance per account, no card required.{" "}
              <Link href="/pricing">Compare PKR plans</Link>
            </p>
          </MarketingIntro>
          <PublicCaptionPreview />
        </div>
      </section>

      <section
        className="product-section"
        aria-labelledby="transcription-workflow"
      >
        <h2 id="transcription-workflow">From recording to transcript</h2>
        <p>
          Every uploaded audio or video recording follows the same verifiable
          workflow in Studio, so you can inspect the words before exporting.
        </p>
        <ol className="product-points two-col" role="list">
          <li>
            <Mic size={24} aria-hidden="true" />
            <h3>1. Upload supported audio or video</h3>
            <p>
              Choose a local <strong>MP3</strong>, <strong>FLAC</strong>,{" "}
              <strong>PCM WAV</strong>, or <strong>AAC M4A</strong> audio file,
              or an <strong>MP4</strong> or <strong>MOV</strong> video with
              H.264/HEVC video and an audible AAC speech track. Check{" "}
              <Link href="/supported-formats">
                supported formats and plan upload limits
              </Link>{" "}
              before starting.
            </p>
          </li>
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>2. Choose script and correction options</h3>
            <p>
              Select <strong>Urdu</strong> script,{" "}
              <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link>,{" "}
              <Link href="/urdu-audio-to-english-text">English</Link>, or
              stacked <strong>Urdu + English</strong>. Keep{" "}
              <strong>AI text correction</strong> on for conservative character
              and punctuation cleanup, or turn it off for raw recognition text.
            </p>
          </li>
          <li>
            <PencilLine size={24} aria-hidden="true" />
            <h3>3. Review names, numbers, and mixed phrases</h3>
            <p>
              Read the draft in Studio alongside a local preview of your
              recording. Check proper names, figures, unclear words, and spoken
              Urdu mixed with English terms, and accept or reject any flagged AI
              correction suggestions.
            </p>
          </li>
          <li>
            <FileText size={24} aria-hidden="true" />
            <h3>4. Export TXT or timed subtitle files</h3>
            <p>
              Download a clean UTF-8 <strong>TXT</strong> transcript as soon as
              text generation finishes, or adjust cue timestamps and export{" "}
              <Link href="/video-captions">
                SRT, VTT, or a burned-in captioned MP4
              </Link>
              .
            </p>
          </li>
        </ol>
      </section>

      <section
        className="product-section"
        aria-labelledby="ai-correction-and-review"
      >
        <h2 id="ai-correction-and-review">
          How AI text correction and human review work together
        </h2>
        <p>
          Spoken Urdu recordings often include background noise, code-switching
          with English words, and names or numbers that need an author’s eye.
          Studio separates automated cleanup from decisions only you can verify
          (read our full{" "}
          <Link href="/methodology">AI methodology and quality rules</Link>).
        </p>
        <ul className="product-points" role="list">
          <li>
            <SlidersHorizontal size={24} aria-hidden="true" />
            <h3>Conservative AI text correction</h3>
            <p>
              When enabled, AI correction normalizes equivalent Urdu character
              forms and punctuation while guarding numbers, currencies, URLs,
              emails, handles, and hashtags against silent changes.
            </p>
          </li>
          <li>
            <CheckCircle2 size={24} aria-hidden="true" />
            <h3>Accept or reject suggestions</h3>
            <p>
              Larger or uncertain wording proposals are shown with their{" "}
              <code>before</code> and <code>after</code> text and a reason in
              Studio, where you can accept or reject each change individually or
              turn automated correction off at upload time.
            </p>
          </li>
          <li>
            <PencilLine size={24} aria-hidden="true" />
            <h3>What always requires your check</h3>
            <p>
              Verify people’s names, place names, spoken figures, dates, and
              unclear audio before publishing. UrduSpeech does not identify
              separate speakers, generate meeting summaries, or guarantee
              error-free grammar.
            </p>
          </li>
        </ul>
      </section>

      <section
        id="video-to-text"
        className="product-section"
        aria-labelledby="video-to-text-heading"
      >
        <h2 id="video-to-text-heading">
          Transcribing Urdu video to plain text (MP4 &amp; MOV to TXT)
        </h2>
        <p>
          If you have an interview, lecture, or reel saved as a video file and
          need a readable written transcript rather than on-screen subtitles,
          upload the video through the exact same Studio workflow and export{" "}
          <strong>TXT</strong>.
        </p>
        <div className="code-comparison">
          <div className="code-sample">
            <h3>Timed video cues in Studio (example)</h3>
            <pre>
              <code>
                {captionCues.map((cue, index) => (
                  <span key={cue.start}>
                    {`${captionTime(cue.start)} to ${captionTime(cue.end)}\n`}
                    <span lang="ur" dir="rtl">
                      {cue.urdu}
                    </span>
                    {index < captionCues.length - 1 ? "\n" : ""}
                  </span>
                ))}
              </code>
            </pre>
          </div>
          <div className="code-sample">
            <h3>Exported UTF-8 TXT transcript (example)</h3>
            <pre lang="ur" dir="rtl" className="urdu-pre">
              <code>{samplePlainTxt}</code>
            </pre>
          </div>
        </div>
        <div
          className="pricing-scroll"
          role="region"
          aria-label="Video transcription scope and audio requirements"
          tabIndex={0}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">Capability</th>
                <th scope="col">How UrduSpeech handles it</th>
                <th scope="col">What to check</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Spoken-audio transcription from video</th>
                <td>
                  <strong>Supported:</strong> Extracts speech from an MP4 or MOV
                  file’s selected AAC audio track and turns it into editable
                  text.
                </td>
                <td>
                  If your video has multiple audio streams, pick the track with
                  spoken Urdu in Studio’s <strong>Media check</strong> panel.
                </td>
              </tr>
              <tr>
                <th scope="row">OCR of on-screen video text</th>
                <td>
                  <strong>Not performed:</strong> Visual text on slides, lower
                  thirds, or silent graphics is not read from video frames.
                </td>
                <td>
                  An audio-only transcription pipeline has no screen or OCR
                  input; add unsaid visual titles manually in the editor.
                </td>
              </tr>
              <tr>
                <th scope="row">Extracting existing soft subtitle streams</th>
                <td>
                  <strong>Not performed:</strong> Studio generates a fresh
                  transcript from the spoken audio rather than ripping embedded
                  subtitle tracks.
                </td>
                <td>
                  Use the exported <strong>TXT</strong> file for quotations,
                  articles, and research notes, or export{" "}
                  <Link href="/video-captions">SRT/VTT subtitles</Link>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="product-section"
        aria-labelledby="transcription-use-cases"
      >
        <h2 id="transcription-use-cases">
          Common Urdu audio and video transcription tasks
        </h2>
        <ul className="product-points two-col" role="list">
          <li>
            <Mic size={24} aria-hidden="true" />
            <h3>Interviews and reporting</h3>
            <p>
              Upload recorded Urdu interviews to review exact phrasing, verify
              names and figures against local playback, and copy verified
              quotations into articles.
            </p>
          </li>
          <li>
            <FileText size={24} aria-hidden="true" />
            <h3>Lectures, talks, and seminars</h3>
            <p>
              Turn classroom recordings and long-form talks (up to 60 to 360
              minutes on paid plans) into readable Urdu script, Roman Urdu
              notes, or English study text.
            </p>
          </li>
          <li>
            <FileVideo size={24} aria-hidden="true" />
            <h3>Podcasts and video episodes</h3>
            <p>
              Produce plain-text show notes in <strong>TXT</strong> alongside
              timed <strong>SRT</strong> or <strong>VTT</strong> files. See our{" "}
              <Link href="/urdu-podcast-transcription">
                Urdu podcast transcription workflow
              </Link>
              .
            </p>
          </li>
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>Saved voice notes and memos</h3>
            <p>
              Have a local voice recording on your phone or computer? Explore{" "}
              <Link href="/urdu-voice-notes-to-text">
                Urdu voice notes to text
              </Link>{" "}
              or read our{" "}
              <Link href="/guides/voice-notes-to-text">
                step-by-step voice notes guide
              </Link>
              .
            </p>
          </li>
        </ul>
      </section>

      <section
        className="product-section pricing-questions"
        aria-labelledby="transcription-faq"
      >
        <h2 id="transcription-faq">Urdu speech-to-text questions</h2>
        <QuestionList questions={transcriptionQuestions} openFirst />
        <div className="guide-link-row">
          <Link href="/urdu-audio-to-roman-urdu">
            Convert Urdu audio to Roman Urdu text{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/urdu-audio-to-english-text">
            Translate Urdu audio to English text &amp; subtitles{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/compare/urduspeech-vs-whisper">
            Compare UrduSpeech vs self-hosted Whisper{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/video-captions">
            Generate Urdu video subtitles &amp; burned-in captions{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="demo-next" aria-labelledby="transcription-cta">
        <div>
          <h2 id="transcription-cta">Start transcribing your Urdu recording</h2>
          <p>
            Create an account to get a one-time 10-minute free allowance (up to
            250 MiB per file, no card required), or test the interactive sample
            editor first.
          </p>
        </div>
        <div className="product-actions">
          <StartFree />
          <Link href="/supported-formats" className="button secondary">
            Supported formats &amp; limits
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
