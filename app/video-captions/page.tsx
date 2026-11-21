import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Captions,
  Clock,
  FileVideo,
  Globe,
  Languages,
  Sparkles,
} from "lucide-react";
import { CaptionStyleGallery } from "@/components/caption-style-gallery";
import { PublicPage } from "@/components/public-site";
import {
  MarketingIntro,
  QuestionList,
  StartFree,
} from "@/components/marketing";
import { StructuredData } from "@/components/structured-data";
import {
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  publicMetadata,
} from "@/lib/seo";

const description =
  "Generate timed Urdu subtitles and burned-in video captions. Edit words and timing in Studio, then export SRT, VTT or captioned MP4. Start with 10 free minutes.";

export const metadata: Metadata = publicMetadata({
  title: "Urdu Subtitle Generator & Video Captions",
  description,
  path: "/video-captions",
});

const videoCaptionQuestions = [
  {
    question:
      "What is the difference between an SRT/VTT subtitle file and a captioned MP4?",
    answer: (
      <p>
        <strong>SRT</strong> and <strong>VTT</strong> are separate UTF-8 text
        files containing caption lines and start/end timestamps; viewers or
        video editors use them as an external subtitle track whose font depends
        on the player. A <strong>captioned MP4</strong> permanently renders
        visible captions into the video picture (burned-in captions, not a
        selectable soft subtitle track) so Nastaliq shaping and your chosen
        preset look identical on every device.
      </p>
    ),
  },
  {
    question:
      "What are the Free and paid plan limits for captioned MP4 video exports?",
    answer: (
      <p>
        Every account includes a one-time 10-minute free allowance (no card
        required). On the Free plan, rendered captioned MP4 videos are up to
        720p (<code>1280×720</code> landscape or <code>720×1280</code> portrait)
        with a watermark. Paid plans (
        <Link href="/pricing">Starter, Creator, and Studio</Link>) render up to
        1080p without a watermark. Generated MP4 files currently have a 256 MiB
        operational safety limit, while TXT, SRT, and VTT files remain
        downloadable separately.
      </p>
    ),
  },
  {
    question:
      "Can I import an existing SRT file or convert SRT to VTT without uploading media?",
    answer: (
      <p>
        No. UrduSpeech generates transcripts and timed caption tracks from
        uploaded audio or video recordings in Studio. It does not offer
        standalone SRT-to-VTT file conversion or arbitrary external subtitle
        file import.
      </p>
    ),
  },
  {
    question: "How are bilingual Urdu and English video captions formatted?",
    answer: (
      <p>
        When you select <strong>Urdu + English</strong> in Studio, each caption
        cue stacks the Urdu script line and the English translation together.
        You can choose <strong>Urdu first</strong> or{" "}
        <strong>English first</strong> when setting up the project, and edit
        both lines or their start and end timestamps before exporting SRT, VTT,
        or a captioned MP4.
      </p>
    ),
  },
];

export default function VideoCaptions() {
  const jsonLd = [
    buildOrganizationJsonLd(),
    buildSoftwareApplicationJsonLd({
      name: "UrduSpeech — Urdu Subtitle Generator & Video Captions",
      description,
      path: "/video-captions",
      featureList: [
        "Timed Urdu, Roman Urdu, English, and stacked bilingual subtitle generation",
        "Editable cue text and non-overlapping start/end timestamps in seconds",
        "UTF-8 SRT and WebVTT subtitle file exports",
        "Burned-in H.264 MP4 video rendering with Clean, Social highlight, and Boxed Nastaliq presets",
      ],
    }),
  ];

  return (
    <PublicPage mainClassName="public-container marketing-page">
      <StructuredData data={jsonLd} />
      <section className="product-hero" aria-label="Video captions">
        <MarketingIntro title="Generate Urdu subtitles and add captions to your videos">
          <p>
            Upload an MP4 or MOV video to generate timed subtitles in Urdu
            Nastaliq, <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link>,{" "}
            <Link href="/urdu-audio-to-english-text">English translation</Link>,
            or stacked bilingual output. Review every line and timestamp in
            Studio, then download <strong>SRT</strong> or <strong>VTT</strong>{" "}
            files or render a <strong>captioned MP4</strong>.
          </p>
          <div className="product-actions">
            <StartFree />
            <Link href="/demo" className="button secondary">
              Try the editor
            </Link>
          </div>
          <p className="free-note">
            10 free minutes once per account (no card required) · Free MP4
            exports up to 720p with watermark ·{" "}
            <Link href="/pricing">See 1080p unwatermarked plans</Link>
          </p>
        </MarketingIntro>
        <CaptionStyleGallery preload />
      </section>

      <section className="product-section" aria-labelledby="caption-workflow">
        <h2 id="caption-workflow">From uploaded video to timed captions</h2>
        <p>
          Prepare subtitles for short reels, interviews, podcasts, and YouTube
          videos in one Studio workflow.
        </p>
        <ol className="product-points two-col" role="list">
          <li>
            <FileVideo size={24} aria-hidden="true" />
            <h3>1. Upload your source video or audio</h3>
            <p>
              Add a local <strong>MP4</strong> or <strong>MOV</strong> file with
              H.264 or HEVC video and AAC speech audio (or upload an MP3, FLAC,
              WAV, or M4A audio file if you only need SRT/VTT subtitle files).
              For multi-track videos, pick the spoken-Urdu track during Studio’s
              media check.
            </p>
          </li>
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>2. Pick caption script and style preset</h3>
            <p>
              Choose <strong>Urdu</strong>,{" "}
              <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link>,{" "}
              <Link href="/urdu-audio-to-english-text">English</Link>, or{" "}
              <strong>Urdu + English</strong> (Urdu-first or English-first).
              Optionally turn on <strong>Automatically embed captions</strong>{" "}
              to queue an MP4 render as soon as captions are ready.
            </p>
          </li>
          <li>
            <Clock size={24} aria-hidden="true" />
            <h3>3. Review wording and cue timestamps</h3>
            <p>
              Inspect each numbered cue alongside a local preview of your
              recording. Check names, figures, and mixed Urdu/English phrases,
              and adjust start and end times in seconds so cues never overlap.
            </p>
          </li>
          <li>
            <Captions size={24} aria-hidden="true" />
            <h3>4. Export SRT, VTT, or captioned MP4</h3>
            <p>
              Download UTF-8 <strong>SRT</strong> or <strong>VTT</strong>{" "}
              subtitle tracks for editors and video platforms, or render a{" "}
              <strong>captioned MP4</strong> with visible text burned into the
              video picture.
            </p>
          </li>
        </ol>
      </section>

      <section
        className="product-section"
        aria-labelledby="compare-caption-exports"
      >
        <h2 id="compare-caption-exports">
          Choose between SRT, VTT, and burned-in captioned MP4
        </h2>
        <p>
          Use a separate subtitle file when the destination player or editor
          manages closed captions, or render a captioned MP4 when you want
          Nastaliq captions permanently visible inside the video frames.
        </p>
        <ul className="product-points" role="list">
          <li>
            <Captions size={24} aria-hidden="true" />
            <h3>SRT subtitles (.srt)</h3>
            <p>
              Numbered UTF-8 subtitle cues with comma-based millisecond
              timestamps (<code>00:00:04,000</code>). Ready for{" "}
              <Link href="/guides/urdu-subtitles-for-youtube">
                YouTube Studio subtitle uploads
              </Link>{" "}
              and non-linear editors such as Premiere Pro or DaVinci Resolve.
            </p>
          </li>
          <li>
            <Globe size={24} aria-hidden="true" />
            <h3>WebVTT subtitles (.vtt)</h3>
            <p>
              Standard UTF-8 <code>WEBVTT</code> tracks with period-based
              millisecond timestamps (<code>00:00:04.000</code>) and escaped
              markup, built for HTML5 <code>&lt;track&gt;</code> web video
              players.
            </p>
          </li>
          <li>
            <FileVideo size={24} aria-hidden="true" />
            <h3>Burned-in captioned MP4 (.mp4)</h3>
            <p>
              Renders visible captions directly into an H.264 MP4 video with AAC
              audio so the text travels with the picture on reels, shorts, and
              social feeds—without relying on a player’s built-in Urdu font.
            </p>
          </li>
        </ul>
        <div
          className="pricing-scroll"
          role="region"
          aria-label="Comparison of separate subtitle files versus burned-in MP4 captions"
          tabIndex={0}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">Export type</th>
                <th scope="col">How captions appear</th>
                <th scope="col">Typography &amp; RTL control</th>
                <th scope="col">Plan &amp; file conditions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">SRT &amp; VTT subtitle files</th>
                <td>
                  Separate timed text track that viewers or editors can toggle
                  on or off
                </td>
                <td>
                  Depends on the target video player, browser, or editing
                  software
                </td>
                <td>
                  Available on all plans once timing is ready; survives media
                  retention expiry
                </td>
              </tr>
              <tr>
                <th scope="row">Captioned MP4 video</th>
                <td>
                  Visible captions permanently burned into the video’s picture
                  (not a soft subtitle track)
                </td>
                <td>
                  Shaped with Noto Nastaliq Urdu &amp; Inter inside verified
                  safe-area margins
                </td>
                <td>
                  Free: up to 720p with watermark; Paid: up to 1080p without
                  watermark; 256 MiB output cap
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="product-section"
        aria-labelledby="styles-and-rendering"
      >
        <h2 id="styles-and-rendering">
          Caption styles, Nastaliq shaping, and video rendering boundaries
        </h2>
        <ul className="product-points" role="list">
          <li>
            <Sparkles size={24} aria-hidden="true" />
            <h3>Clean, Social highlight, and Boxed</h3>
            <p>
              Choose <strong>Clean</strong> for white text with a legible
              shadow, <strong>Social highlight</strong> for gold (
              <code>#FFD54F</code>) active-cue text on short-form videos, or{" "}
              <strong>Boxed</strong> for white text over a dark backing plate.
            </p>
          </li>
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>First-class Urdu Nastaliq &amp; RTL</h3>
            <p>
              Urdu captions render in Noto Nastaliq Urdu with right-to-left
              shaping and optical sizing balanced against Latin numbers and
              English words. Every cue is checked against safe-area edges so
              text is never silently clipped.
            </p>
          </li>
          <li>
            <FileVideo size={24} aria-hidden="true" />
            <h3>Orientation, HDR, and file limits</h3>
            <p>
              Landscape, portrait, and square videos keep their aspect ratio up
              to your plan’s 720p or 1080p tier. Properly tagged BT.2020 HLG or
              PQ HDR phone videos are tone-mapped to SDR BT.709 MP4. See{" "}
              <Link href="/supported-formats">
                supported formats and render limits
              </Link>{" "}
              for details.
            </p>
          </li>
        </ul>
      </section>

      <section
        className="product-section pricing-questions"
        aria-labelledby="video-captions-faq"
      >
        <h2 id="video-captions-faq">Urdu subtitle and caption questions</h2>
        <QuestionList questions={videoCaptionQuestions} openFirst />
        <div className="guide-link-row">
          <Link href="/guides/subtitle-and-video-exports">
            Guide: When to export TXT, SRT, VTT or MP4{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/guides/make-urdu-video-captions">
            Guide: How to make Urdu video captions{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/guides/urdu-subtitles-for-youtube">
            Guide: Add Urdu subtitles to YouTube videos{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/urdu-transcription">
            Need plain-text transcripts? Urdu speech to text{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="demo-next" aria-labelledby="video-captions-cta">
        <div>
          <h2 id="video-captions-cta">
            Caption your next Urdu video in Studio
          </h2>
          <p>
            Start with 10 free minutes (no card required), or test caption
            editing and SRT/VTT downloads in the browser demo.
          </p>
        </div>
        <div className="product-actions">
          <StartFree />
          <Link href="/pricing" className="button secondary">
            Compare plans &amp; 1080p exports
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
