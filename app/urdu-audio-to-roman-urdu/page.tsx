import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Captions,
  FileText,
  FileVideo,
  Languages,
  PencilLine,
  Upload,
} from "lucide-react";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  QuestionList,
  StartFree,
} from "@/components/marketing";
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

const title = "Urdu Audio to Roman Urdu Text";
const description =
  "Convert uploaded Urdu audio and video into editable Roman Urdu transcripts and timed captions. Refine spellings and export TXT, SRT, VTT, or MP4.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/urdu-audio-to-roman-urdu",
  ogImage: "roman-urdu",
  markdownPath: "/urdu-audio-to-roman-urdu.md",
});

const romanUrduQuestions = [
  {
    question:
      "Does Roman Urdu translate my recording into English or keep Urdu words?",
    answer: (
      <p>
        Roman Urdu keeps your spoken Urdu words and phrasing intact and writes
        them in Latin letters (<code>A to Z</code>), for example,{" "}
        <span lang="ur-Latn" dir="ltr">
          “Aaj kuch naya banate hain.”
        </span>{" "}
        If you want the meaning translated into English sentences instead,
        choose <Link href="/urdu-audio-to-english-text">English output</Link> or
        stacked <strong>Urdu + English</strong>.
      </p>
    ),
  },
  {
    question: "Can I adjust Roman Urdu spellings and proper names in Studio?",
    answer: (
      <p>
        Yes. Because Roman Urdu does not have a single fixed spelling standard
        across all writers, every generated cue is editable in Studio. You can
        adjust word spellings, check people’s names, numbers, and mixed English
        terms, and save a new version before downloading TXT, SRT, VTT, or
        rendering a captioned MP4.
      </p>
    ),
  },
  {
    question:
      "Can I paste Urdu script text to convert it into Roman Urdu without an audio or video file?",
    answer: (
      <p>
        No. Roman Urdu in UrduSpeech is a recording-output option for uploaded
        audio (<strong>MP3, FLAC, PCM WAV, AAC M4A</strong>) and video (
        <strong>MP4, MOV</strong>) files in Studio. It is not a standalone
        pasted-text converter or Roman Urdu typing keyboard.
      </p>
    ),
  },
  {
    question: "What can I try for free with Roman Urdu output?",
    answer: (
      <p>
        Your account starts with a one-time 10-minute free allowance (no card
        required) shared across audio and video uploads up to 250 MiB per file.
        You can download Roman Urdu TXT transcripts and SRT or VTT subtitles, or
        render a captioned MP4 up to 720p with a watermark. See{" "}
        <Link href="/pricing">plans and pricing</Link> for 1080p unwatermarked
        video exports.
      </p>
    ),
  },
];

export default function UrduAudioToRomanUrdu() {
  const path = "/urdu-audio-to-roman-urdu" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/roman-urdu.png",
      mainEntityId: `${SITE_URL}${path}#app`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Roman Urdu text", path },
    ]),
    buildSoftwareApplicationJsonLd({
      name: "UrduSpeech — Urdu Audio to Roman Urdu Text & Subtitles",
      description,
      path,
      includeOffers: true,
      featureList: [
        "Convert uploaded spoken Urdu audio and video into editable Roman Urdu text",
        "Preserves Urdu words in Latin script with protected numbers and identifiers",
        "Editable Roman Urdu cue wording and start/end timestamps in Studio",
        "Export UTF-8 TXT transcripts, SRT and VTT subtitle files, or burned-in captioned MP4 video",
      ],
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Roman Urdu text" }]}
      />
      <section className="product-hero" aria-label="Urdu audio to Roman Urdu">
        <MarketingIntro title="Convert Urdu audio into Roman Urdu text">
          <p>
            Upload a spoken Urdu audio or video file and choose{" "}
            <strong>Roman Urdu</strong> in Studio to generate an editable
            transcript and timed captions written in Latin letters. Keep the
            speaker’s original Urdu words while making captions easy to read in
            Latin script across mobile feeds and left-to-right video editors.
          </p>
          <div className="product-actions">
            <StartFree />
            <Link href="/demo" className="button secondary">
              Try the editor
            </Link>
          </div>
          <p className="free-note">
            One-time 10-minute free allowance, no card required. Free MP4
            renders up to 720p with watermark.
          </p>
        </MarketingIntro>

        <section
          className="script-example-card"
          aria-labelledby="roman-urdu-sample-heading"
        >
          <header className="script-example-header">
            <h2 id="roman-urdu-sample-heading">
              Same spoken Urdu sentence in Urdu script and Roman Urdu
            </h2>
          </header>
          <ol className="script-pair-list" role="list">
            {captionCues.map((cue) => (
              <li key={cue.start} className="script-pair-item">
                <span className="sample-time">
                  {captionTime(cue.start)} to {captionTime(cue.end)}
                </span>
                <div className="script-pair-lines">
                  <p className="script-line-urdu" lang="ur" dir="rtl">
                    {cue.urdu}
                  </p>
                  <p className="script-line-latin" lang="ur-Latn" dir="ltr">
                    {cue.romanUrdu}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="script-example-footer">
            Switch between Urdu, Roman Urdu, English, and Bilingual on the{" "}
            <Link href="/demo">interactive caption demo</Link>.
          </p>
        </section>
      </section>

      <section
        className="product-section"
        aria-labelledby="what-roman-urdu-does"
      >
        <h2 id="what-roman-urdu-does">
          How Roman Urdu transliteration works in UrduSpeech
        </h2>
        <p>
          Roman Urdu changes the writing system from right-to-left Urdu script
          to left-to-right Latin letters while keeping the spoken Urdu words and
          sentence structure intact. It is ideal for audiences in Pakistan,
          India, the UAE, the UK, and North America who understand spoken Urdu
          fluently and read Latin-script subtitles quickly on phones.
        </p>
        <div
          className="pricing-scroll"
          role="region"
          aria-label="Comparison of Roman Urdu versus Urdu script and English translation"
          tabIndex={0}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">Output option</th>
                <th scope="col">Illustrative line</th>
                <th scope="col">How it handles spoken Urdu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Roman Urdu (Transliteration)</th>
                <td>
                  <span lang="ur-Latn" dir="ltr">
                    {captionCues[1].romanUrdu}
                  </span>
                </td>
                <td>
                  Keeps the spoken Urdu words and writes them in Latin letters (
                  <code>lang=&quot;ur-Latn&quot;</code>, left-to-right).
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <Link href="/urdu-transcription">
                    Urdu script (Transcription)
                  </Link>
                </th>
                <td>
                  <span lang="ur" dir="rtl">
                    {captionCues[1].urdu}
                  </span>
                </td>
                <td>
                  Writes the spoken Urdu words in right-to-left Urdu Nastaliq
                  script (<code>lang=&quot;ur&quot;</code>).
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <Link href="/urdu-audio-to-english-text">
                    English (Translation)
                  </Link>
                </th>
                <td>
                  <span lang="en" dir="ltr">
                    {captionCues[1].english}
                  </span>
                </td>
                <td>
                  Translates the spoken Urdu meaning into English sentences (
                  <code>lang=&quot;en&quot;</code>).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="product-section"
        aria-labelledby="roman-urdu-conventions"
      >
        <h2 id="roman-urdu-conventions">
          Handling everyday Roman Urdu spelling and Urdu-English code-switching
        </h2>
        <p>
          Real Pakistani podcasts, reels, and voice notes rarely use textbook
          Urdu alone. Speakers naturally mix English nouns and verbs into Urdu
          sentences, such as{" "}
          <span lang="ur-Latn" dir="ltr">
            “Aaj ke episode mein hum production workflow aur editing timeline
            discuss karenge.”
          </span>{" "}
          In Roman Urdu output, both Urdu phrases and borrowed English words
          flow left-to-right in a single direction, eliminating the awkward
          bidirectional punctuation flips that happen in generic subtitle tools.
        </p>
        <p>
          Because Roman Urdu has no single official orthography, keep a short
          channel glossary for recurring words when you review cues in Studio
          (for instance choosing consistently between <em>hai</em> vs{" "}
          <em>hy</em>, <em>aap</em> vs <em>ap</em>, or <em>nahin</em> vs{" "}
          <em>nahi</em>). Protected tokens such as prices (PKR 2,499), phone
          numbers, URLs, and <code>@handles</code> stay guarded from silent
          reformatting during processing.
        </p>
      </section>

      <section
        className="product-section"
        aria-labelledby="roman-urdu-workflow"
      >
        <h2 id="roman-urdu-workflow">
          How to generate and edit Roman Urdu in Studio
        </h2>
        <ol className="product-points two-col" role="list">
          <li>
            <Upload size={24} aria-hidden="true" />
            <h3>1. Upload your Urdu audio or video</h3>
            <p>
              Open <strong>New upload</strong> in Studio and choose an{" "}
              <strong>MP3</strong>, <strong>FLAC</strong>,{" "}
              <strong>PCM WAV</strong>, or <strong>AAC M4A</strong> audio file,
              or an <strong>MP4</strong> or <strong>MOV</strong> video (see{" "}
              <Link href="/supported-formats">
                supported formats and plan limits
              </Link>
              ).
            </p>
          </li>
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>2. Select Roman Urdu under caption options</h3>
            <p>
              Pick <strong>Roman Urdu</strong> as your output variant before
              uploading. You can keep <strong>AI text correction</strong> on or
              turn it off, and optionally save Roman Urdu as your default for
              future projects.
            </p>
          </li>
          <li>
            <PencilLine size={24} aria-hidden="true" />
            <h3>3. Review spelling preferences and names</h3>
            <p>
              Roman Urdu spelling varies in everyday writing (such as{" "}
              <em>awaaz</em> vs <em>awaz</em> or <em>chalein</em> vs{" "}
              <em>chalen</em>). Edit any cue in Studio to match your preferred
              spelling, verify proper names and numbers, and fine-tune start and
              end times.
            </p>
          </li>
          <li>
            <Captions size={24} aria-hidden="true" />
            <h3>4. Export TXT, SRT, VTT, or captioned MP4</h3>
            <p>
              Download a UTF-8 <strong>TXT</strong> transcript for scripts and
              notes, export timed <strong>SRT</strong> or <strong>VTT</strong>{" "}
              subtitle tracks, or render a{" "}
              <Link href="/video-captions">burned-in captioned MP4</Link> in
              Clean, Social highlight, or Boxed style.
            </p>
          </li>
        </ol>
      </section>

      <section
        className="product-section"
        aria-labelledby="roman-urdu-use-cases"
      >
        <h2 id="roman-urdu-use-cases">When creators use Roman Urdu output</h2>
        <ul className="product-points" role="list">
          <li>
            <FileVideo size={24} aria-hidden="true" />
            <h3>Reels, Shorts, and social clips</h3>
            <p>
              Add casual Latin-script Urdu captions to short videos for viewers
              who speak Urdu every day and scan Roman Urdu quickly on mobile
              feeds. See{" "}
              <Link href="/urdu-captions-for-reels-tiktok">
                Urdu captions for Reels and TikTok
              </Link>
              .
            </p>
          </li>
          <li>
            <FileText size={24} aria-hidden="true" />
            <h3>Production scripts and edit logs</h3>
            <p>
              Give video editors and producers a timestamped Roman Urdu SRT or
              TXT transcript when cutting interviews in timeline editors that do
              not handle right-to-left script well.
            </p>
          </li>
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>Voice notes and show notes</h3>
            <p>
              Turn saved local voice recordings into readable Roman Urdu text
              for team messages, quotes, or podcast episode notes. See{" "}
              <Link href="/urdu-voice-notes-to-text">
                Urdu voice notes to text
              </Link>
              .
            </p>
          </li>
        </ul>
      </section>

      <section
        className="product-section pricing-questions"
        aria-labelledby="roman-urdu-faq"
      >
        <h2 id="roman-urdu-faq">Roman Urdu transcription questions</h2>
        <QuestionList questions={romanUrduQuestions} openFirst />
        <div className="guide-link-row">
          <Link href="/guides/urdu-roman-urdu-and-english">
            Compare Urdu script, Roman Urdu &amp; English{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/urdu-transcription">
            Need Nastaliq Urdu script? Urdu speech to text{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/urdu-audio-to-english-text">
            Need English translation? Urdu audio to English text{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/video-captions">
            Export Roman Urdu SRT, VTT &amp; captioned MP4{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="demo-next" aria-labelledby="roman-urdu-cta">
        <div>
          <h2 id="roman-urdu-cta">
            Convert your first Urdu recording into Roman Urdu
          </h2>
          <p>
            Start with a one-time 10-minute free allowance (no card required),
            or preview Roman Urdu cues right now in the browser demo.
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
