import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Captions,
  Download,
  Languages,
  PencilLine,
} from "lucide-react";
import { CaptionStudioDemo } from "@/components/caption-studio-demo";
import { StartFree } from "@/components/marketing";
import { Breadcrumbs, PublicPage } from "@/components/public-site";
import { StructuredData } from "@/components/structured-data";
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

const title = "Interactive Urdu Caption Editor Demo";
const description =
  "Edit sample Urdu Nastaliq, Roman Urdu, English, and bilingual captions in your browser. Preview styles and download UTF-8 SRT, VTT, or TXT files.";

export const metadata: Metadata = publicMetadata({
  title,
  description,
  path: "/demo",
  ogImage: "captions",
});

export default function CaptionDemo() {
  const path = "/demo" as const;
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: `${title} | UrduSpeech`,
      description,
      path,
      primaryImage: "/og/captions.png",
      mainEntityId: `${SITE_URL}${path}#app`,
      dateModified: "2026-11-22",
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Interactive demo", path },
    ]),
    buildSoftwareApplicationJsonLd({
      name: "UrduSpeech Interactive Sample Caption Editor",
      description,
      path,
      isAccessibleForFree: true,
      includeOffers: false,
      featureList: [
        "Browser-based sample editor for Urdu Nastaliq, Roman Urdu, English, and stacked bilingual captions",
        "Instant Clean, Social highlight, and Boxed visual style preview",
        "Zero-signup UTF-8 SRT, WebVTT, and plain TXT sample file downloads",
      ],
    }),
  ]);

  return (
    <PublicPage mainClassName="public-container marketing-page demo-page">
      <StructuredData data={jsonLd} />
      <header className="page-hero">
        <Breadcrumbs
          items={[{ name: "Home", href: "/" }, { name: "Interactive demo" }]}
        />
        <div className="demo-intro marketing-intro">
          <h1>Try the Urdu caption editor</h1>
          <p>
            Pick a cue, edit Nastaliq or bilingual captions, and export SRT,
            VTT, or TXT.
          </p>
        </div>
      </header>
      <section
        className="demo-workbench-section"
        aria-label="Interactive caption workbench"
      >
        <CaptionStudioDemo editable />
        <div className="demo-help">
          <p>
            This browser sandbox uses illustrative sample cues so you can test
            RTL editing and subtitle export formatting immediately. Upload your
            own audio or video in Studio to transcribe real recordings and
            render captioned MP4 video.
          </p>
          <Link
            className="public-inline-link"
            href="/guides/subtitle-and-video-exports"
          >
            Compare TXT, SRT, VTT &amp; MP4 exports{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="product-section" aria-labelledby="demo-walkthrough">
        <h2 id="demo-walkthrough">What you can test in the sample editor</h2>
        <p>
          Every control in this sandbox mirrors how cues behave inside a real
          UrduSpeech Studio project, so you can verify right-to-left typography
          and export encoding before signing up.
        </p>
        <ul className="product-points two-col" role="list">
          <li>
            <Languages size={24} aria-hidden="true" />
            <h3>Switch between all four script variants</h3>
            <p>
              Toggle between right-to-left <strong>Urdu</strong> (rendered in
              Noto Nastaliq Urdu), left-to-right <strong>Roman Urdu</strong>,{" "}
              <strong>English</strong>, and stacked <strong>Bilingual</strong>{" "}
              lines to see how line length and vertical rhythm change over video
              footage.
            </p>
          </li>
          <li>
            <PencilLine size={24} aria-hidden="true" />
            <h3>Edit RTL Urdu and Latin text live</h3>
            <p>
              Type directly into the Urdu input (
              <code>dir=&quot;rtl&quot;</code>) or English/Roman Urdu input (
              <code>dir=&quot;ltr&quot;</code>) and watch the monitor frame
              update immediately. In full Studio, you also adjust cue start and
              end times in seconds alongside local playback of your original
              recording.
            </p>
          </li>
          <li>
            <Captions size={24} aria-hidden="true" />
            <h3>Preview Clean, Social highlight, and Boxed presets</h3>
            <p>
              Compare crisp white shadowed text, gold (<code>#FFD54F</code>)
              short-form emphasis, and dark-backed boxed captions over
              real-world warm lighting. Exact video rendering inside Studio
              applies safe-area checks so Nastaliq strokes never clip.
            </p>
          </li>
          <li>
            <Download size={24} aria-hidden="true" />
            <h3>Inspect real UTF-8 SRT, WebVTT, and TXT output</h3>
            <p>
              Download your edited cues as <code>.srt</code>, <code>.vtt</code>,
              or <code>.txt</code> and test importing them straight into YouTube
              Studio, Premiere Pro, DaVinci Resolve, or an HTML5 video player.
              Need to convert an existing subtitle file? Try our free{" "}
              <Link href="/tools/srt-to-vtt-converter">
                SRT to WebVTT converter
              </Link>
              .
            </p>
          </li>
        </ul>
      </section>

      <section className="product-section" aria-labelledby="demo-workflows">
        <h2 id="demo-workflows">Explore full Studio workflows</h2>
        <div className="guide-link-row">
          <Link href="/urdu-transcription">
            Urdu speech to text &amp; audio transcription{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/video-captions">
            Urdu subtitle generator &amp; burned-in MP4 captions{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/urdu-audio-to-roman-urdu">
            Convert Urdu audio to Roman Urdu text{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/urdu-audio-to-english-text">
            Translate Urdu audio to English &amp; bilingual captions{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/supported-formats">
            Check supported audio/video formats &amp; limits{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/pricing">
            Compare Free and monthly PKR plans{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="demo-next">
        <div>
          <h2>Ready to caption your own recording?</h2>
          <p>
            Upload audio or video to Studio to get an editable draft with
            timing. Your account starts with 10 free minutes, no card required.
          </p>
        </div>
        <StartFree />
      </div>
    </PublicPage>
  );
}
