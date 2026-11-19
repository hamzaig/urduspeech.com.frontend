import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDownRight,
  ArrowRight,
  FileVideo,
  FileText,
  Captions,
} from "lucide-react";
import { PublicCaptionPreview } from "@/components/public-caption-preview";
import { PublicFooter, PublicHeader } from "@/components/public-site";

export const metadata: Metadata = {
  title: "Urdu transcripts and video captions",
  description:
    "Create editable Urdu and Roman Urdu captions, English translations and bilingual subtitles. Start with 10 free minutes. Plans in PKR.",
};

const plans = [
  {
    name: "Free",
    price: "0",
    minutes: 10,
    media: 3,
    quality: "720p with watermark",
  },
  {
    name: "Starter",
    price: "999",
    minutes: 60,
    media: 15,
    quality: "1080p without watermark",
  },
  {
    name: "Creator",
    price: "2,499",
    minutes: 200,
    media: 30,
    quality: "1080p without watermark",
  },
  {
    name: "Studio",
    price: "5,999",
    minutes: 500,
    media: 90,
    quality: "1080p without watermark",
  },
];

const steps = [
  {
    title: "Upload your recording",
    text: "Bring a reel, an interview, a podcast or a longer video. Pick how you want your Urdu speech to appear.",
  },
  {
    title: "Review words and timing",
    text: "AI prepares the draft. Correct names and numbers, adjust the timing and preview your captions against the original.",
  },
  {
    title: "Export for where you publish",
    text: "Take subtitle files into your editor or render a video with captions already on it.",
  },
];

export default function Home() {
  return (
    <div className="public-site">
      <PublicHeader />
      <main id="main">
        <section className="public-hero" aria-labelledby="hero-title">
          <div className="public-container">
            <div className="hero-intro">
              <h1 id="hero-title">
                Urdu captions,
                <br />
                <span>ready to edit.</span>
              </h1>
              <div className="hero-offer">
                <p>
                  Turn your audio or video into editable Urdu and Roman Urdu
                  captions, English translations or bilingual subtitles.
                </p>
                <Link className="button hero-action" href="/auth/register">
                  Start with 10 free minutes{" "}
                  <ArrowRight size={19} aria-hidden="true" />
                </Link>
                <small>No card needed. Free minutes are available once.</small>
              </div>
            </div>
            <PublicCaptionPreview />
          </div>
        </section>
        <section
          className="workflow-section public-container"
          id="workflow"
          aria-labelledby="workflow-title"
        >
          <div className="workflow-intro">
            <h2 id="workflow-title">From recording to finished captions.</h2>
            <Link href="/supported-formats" className="public-inline-link">
              Check supported formats{" "}
              <ArrowDownRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <ol className="public-steps" role="list">
            {steps.map(({ title, text }, index) => (
              <li key={title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="format-strip" aria-label="Export formats" role="list">
            <li>
              <FileText size={19} aria-hidden="true" /> <strong>TXT</strong>{" "}
              Transcript
            </li>
            <li>
              <Captions size={19} aria-hidden="true" />{" "}
              <strong>SRT / VTT</strong> Subtitles
            </li>
            <li>
              <FileVideo size={19} aria-hidden="true" /> <strong>MP4</strong>{" "}
              Captioned video
            </li>
          </ul>
        </section>
        <section
          className="pricing-section"
          id="pricing"
          aria-labelledby="pricing-title"
        >
          <div className="public-container">
            <div className="pricing-intro">
              <h2 id="pricing-title">Plans in PKR.</h2>
              <p>
                Audio and video share the same allowance. Unused monthly minutes
                do not roll over.
              </p>
            </div>
            <ul className="public-pricing" role="list">
              {plans.map((plan) => (
                <li key={plan.name}>
                  <h3>{plan.name}</h3>
                  <p className="public-price">
                    <span>PKR</span> {plan.price}
                  </p>
                  <p className="price-period">
                    {plan.price === "0" ? "One-time allowance" : "Per month"}
                  </p>
                  <dl>
                    <div>
                      <dt>Transcription</dt>
                      <dd>{plan.minutes} minutes</dd>
                    </div>
                    <div>
                      <dt>Video exports</dt>
                      <dd>{plan.quality}</dd>
                    </div>
                    <div>
                      <dt>Media retention</dt>
                      <dd>{plan.media} days</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
            <div className="pricing-footnote">
              <p>
                Available payment methods appear in Studio. Manual payments
                activate after verification. Download your media before it
                expires. Transcripts and subtitle files stay until you delete
                them.
              </p>
              <Link className="button secondary" href="/auth/register">
                Create your account <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
