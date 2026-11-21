import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Captions,
  FileText,
  Globe,
  Languages,
  Layers,
  PencilLine,
  Upload,
} from "lucide-react";
import { PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  QuestionList,
  StartFree,
} from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import { captionCues, captionTime } from "@/lib/caption-demo";
import {
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  publicMetadata,
} from "@/lib/seo";

const description =
  "Turn uploaded Urdu audio and video into editable English transcripts, English subtitles or bilingual Urdu-English captions. Export TXT, SRT, VTT or MP4.";

export const metadata: Metadata = publicMetadata({
  title: "Urdu Audio to English Text & Subtitles",
  description,
  path: "/urdu-audio-to-english-text",
});

const englishOutputQuestions = [
  {
    question:
      "How does Urdu-to-English output differ from Urdu transcription or Roman Urdu?",
    answer: (
      <p>
        <Link href="/urdu-transcription">Urdu transcription</Link> and{" "}
        <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link> keep the
        speaker’s original Urdu words. <strong>English</strong> output
        translates the spoken Urdu meaning into English text, while{" "}
        <strong>Urdu + English</strong> pairs each Urdu script line with its
        English translation in a stacked bilingual layout.
      </p>
    ),
  },
  {
    question:
      "Can I choose whether Urdu or English appears first in bilingual captions?",
    answer: (
      <p>
        Yes. When you select <strong>Urdu + English</strong> on the new-upload
        screen in Studio, you can set the <strong>First caption line</strong> to{" "}
        <strong>Urdu first</strong> or <strong>English first</strong>. Both
        lines are stacked together in timed captions and included in bilingual
        TXT exports.
      </p>
    ),
  },
  {
    question:
      "Does UrduSpeech translate English audio into Urdu, dub voices, or translate documents?",
    answer: (
      <p>
        No. UrduSpeech processes uploaded recordings with spoken Urdu and
        produces editable text transcripts, SRT and VTT subtitle files, and
        burned-in visual captions. It does not translate English-only audio into
        Urdu, translate pasted documents, generate synthetic voice dubbing, or
        perform real-time live interpretation.
      </p>
    ),
  },
  {
    question:
      "What should I review in an AI-translated English transcript or subtitle track?",
    answer: (
      <p>
        Automated translation can miss idioms, tone, regional expressions, or
        subject-specific terminology. Protected numbers, currencies, and
        identifiers are guarded against silent changes, and you should always
        review proper names, figures, and sentence meaning in Studio before
        publishing.
      </p>
    ),
  },
];

export default function UrduAudioToEnglishText() {
  const jsonLd = [
    buildOrganizationJsonLd(),
    buildSoftwareApplicationJsonLd({
      name: "UrduSpeech — Urdu Audio to English Text & Subtitles",
      description,
      path: "/urdu-audio-to-english-text",
      featureList: [
        "Translate uploaded spoken Urdu audio and video into editable English text",
        "English-only or stacked bilingual (Urdu + English, Urdu-first or English-first) output",
        "Editable cue text and phrase-anchored timestamps in Studio",
        "Export UTF-8 TXT transcripts, SRT and VTT subtitles, or burned-in captioned MP4 video",
      ],
    }),
  ];

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <section
        className="product-hero"
        aria-label="Urdu audio to English text and subtitles"
      >
        <MarketingIntro title="Turn Urdu recordings into English text and subtitles">
          <p>
            Upload spoken Urdu audio or video in Studio and choose{" "}
            <strong>English</strong> or stacked <strong>Urdu + English</strong>{" "}
            output. UrduSpeech transcribes the Urdu speech, generates an
            editable English translation aligned to the recording’s phrases, and
            lets you export <strong>TXT</strong>, <strong>SRT</strong>,{" "}
            <strong>VTT</strong>, or a <strong>captioned MP4</strong>.
          </p>
          <div className="product-actions">
            <StartFree />
            <Link href="/demo" className="button secondary">
              Try the editor
            </Link>
          </div>
          <p className="free-note">
            One-time 10-minute free allowance · No card required · Free MP4
            renders up to 720p with watermark
          </p>
        </MarketingIntro>

        <section
          className="script-example-card"
          aria-labelledby="english-sample-heading"
        >
          <header className="script-example-header">
            <span className="script-example-badge">Illustrative sample</span>
            <h2 id="english-sample-heading">
              Spoken Urdu paired with English translation
            </h2>
          </header>
          <ol className="script-pair-list" role="list">
            {captionCues.map((cue) => (
              <li key={cue.start} className="script-pair-item">
                <span className="sample-time">
                  {captionTime(cue.start)}–{captionTime(cue.end)}
                </span>
                <div className="script-pair-lines">
                  <p className="script-line-urdu" lang="ur" dir="rtl">
                    {cue.urdu}
                  </p>
                  <p className="script-line-latin" lang="en" dir="ltr">
                    {cue.english}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="script-example-footer">
            Preview English-only and stacked bilingual captions on the{" "}
            <Link href="/demo">interactive caption demo</Link>.
          </p>
        </section>
      </section>

      <section
        className="product-section"
        aria-labelledby="translation-vs-transcription"
      >
        <h2 id="translation-vs-transcription">
          Transcription vs translation — and English-only vs bilingual output
        </h2>
        <p>
          Every English or bilingual project in UrduSpeech starts from the
          verified Urdu speech transcript so translations stay anchored to what
          was actually said in the recording.
        </p>
        <ul className="product-points" role="list">
          <li>
            <Globe size={24} aria-hidden="true" />
            <h3>English-only output</h3>
            <p>
              Renders spoken Urdu meaning in English sentences for international
              viewers, English articles, research summaries, or dedicated
              English SRT and VTT subtitle tracks.
            </p>
          </li>
          <li>
            <Layers size={24} aria-hidden="true" />
            <h3>Stacked bilingual (Urdu + English)</h3>
            <p>
              Displays the Urdu script line and the English translation together
              on each cue. Choose <strong>Urdu first</strong> or{" "}
              <strong>English first</strong> when creating the project;
              bilingual TXT exports include both ordered lines.
            </p>
          </li>
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>Need Urdu words instead?</h3>
            <p>
              If you want to keep the original Urdu vocabulary without
              translating into English, choose{" "}
              <Link href="/urdu-transcription">Urdu script</Link> or{" "}
              <Link href="/urdu-audio-to-roman-urdu">
                Roman Urdu in Latin letters
              </Link>
              .
            </p>
          </li>
        </ul>
      </section>

      <section
        className="product-section"
        aria-labelledby="urdu-to-english-workflow"
      >
        <h2 id="urdu-to-english-workflow">
          Recording-to-English workflow in Studio
        </h2>
        <ol className="product-points two-col" role="list">
          <li>
            <Upload size={24} aria-hidden="true" />
            <h3>1. Upload spoken Urdu audio or video</h3>
            <p>
              Select a local <strong>MP3</strong>, <strong>FLAC</strong>,{" "}
              <strong>PCM WAV</strong>, or <strong>AAC M4A</strong> audio file,
              or an <strong>MP4</strong> or <strong>MOV</strong> video with
              H.264/HEVC video and AAC speech audio (see{" "}
              <Link href="/supported-formats">
                supported formats and plan limits
              </Link>
              ).
            </p>
          </li>
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>2. Choose English or Urdu + English</h3>
            <p>
              Pick <strong>English</strong> for a single-language English track
              or <strong>Urdu + English</strong> for stacked bilingual captions.
              Protected numeric values, currencies, and identifiers are kept
              intact during transformation.
            </p>
          </li>
          <li>
            <PencilLine size={24} aria-hidden="true" />
            <h3>3. Review meaning, context, names, and timing</h3>
            <p>
              Check the English phrasing against your local media preview in
              Studio. Verify proper nouns, figures, and idioms, and adjust start
              and end timestamps in seconds—especially on bilingual cues where
              viewers read two lines.
            </p>
          </li>
          <li>
            <Captions size={24} aria-hidden="true" />
            <h3>4. Export TXT, SRT, VTT, or captioned MP4</h3>
            <p>
              Download plain-text <strong>TXT</strong> for written work, export
              UTF-8 <strong>SRT</strong> or <strong>VTT</strong> subtitle tracks
              (for example, to add an English track in{" "}
              <Link href="/guides/urdu-subtitles-for-youtube">
                YouTube Studio
              </Link>
              ), or render a{" "}
              <Link href="/video-captions">burned-in captioned MP4</Link>.
            </p>
          </li>
        </ol>
      </section>

      <section
        className="product-section"
        aria-labelledby="english-export-options"
      >
        <h2 id="english-export-options">
          Supported export files for English and bilingual projects
        </h2>
        <div
          className="pricing-scroll"
          role="region"
          aria-label="Export options for English and bilingual outputs"
          tabIndex={0}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">Format</th>
                <th scope="col">English-only output</th>
                <th scope="col">Bilingual (Urdu + English) output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">TXT (.txt)</th>
                <td>Plain-text English transcript without timestamps</td>
                <td>
                  Ordered Urdu script lines paired with their English
                  translation
                </td>
              </tr>
              <tr>
                <th scope="row">SRT (.srt) &amp; VTT (.vtt)</th>
                <td>Timed English subtitle cues in UTF-8</td>
                <td>
                  Timed two-line cues stacked in your chosen Urdu-first or
                  English-first order
                </td>
              </tr>
              <tr>
                <th scope="row">Captioned MP4 (.mp4)</th>
                <td>
                  Burned-in English captions rendered in Inter (Clean, Social
                  highlight, or Boxed)
                </td>
                <td>
                  Burned-in stacked Nastaliq Urdu + Inter English captions (720p
                  watermarked on Free; 1080p unwatermarked on{" "}
                  <Link href="/pricing">paid plans</Link>)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="product-section pricing-questions"
        aria-labelledby="urdu-to-english-faq"
      >
        <h2 id="urdu-to-english-faq">
          Urdu-to-English translation and subtitle questions
        </h2>
        <QuestionList questions={englishOutputQuestions} openFirst />
        <div className="guide-link-row">
          <Link href="/guides/urdu-roman-urdu-and-english">
            Compare Urdu script, Roman Urdu &amp; English{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/urdu-transcription">
            Need Urdu script transcripts? Urdu speech to text{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/urdu-audio-to-roman-urdu">
            Need Urdu words in Latin letters? Roman Urdu text{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/video-captions">
            Explore Urdu &amp; bilingual video captions{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="demo-next" aria-labelledby="english-cta">
        <div>
          <h2 id="english-cta">
            Translate your next Urdu recording into English text or subtitles
          </h2>
          <p>
            Start with a one-time 10-minute free allowance (no card required),
            or test English and bilingual cues in the browser demo.
          </p>
        </div>
        <div className="product-actions">
          <StartFree />
          <Link href="/demo" className="button secondary">
            Try the sample editor
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
