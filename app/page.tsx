import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { CaptionExample } from "@/components/common";
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
    minutes: "10 minutes, once",
    media: "3 days",
    quality: "720p, UrduSpeech watermark",
  },
  {
    name: "Starter",
    price: "999",
    minutes: "60 minutes / month",
    media: "15 days",
    quality: "1080p, no watermark",
  },
  {
    name: "Creator",
    price: "2,499",
    minutes: "200 minutes / month",
    media: "30 days",
    quality: "1080p, no watermark",
  },
  {
    name: "Studio",
    price: "5,999",
    minutes: "500 minutes / month",
    media: "90 days",
    quality: "1080p, no watermark",
  },
];
export default function Home() {
  return (
    <div className="public-site">
      <PublicHeader />
      <main id="main">
        <section className="public-hero" aria-labelledby="hero-title">
          <div>
            <p className="hero-note">For the way Pakistan creates</p>
            <h1 id="hero-title">
              Your Urdu voice.
              <br />
              <span>Ready to be read.</span>
            </h1>
            <p className="hero-description">
              Turn your audio and video into editable transcripts and captions.
              Choose Urdu, Roman Urdu, English translation or bilingual
              captions. Keep your words, or let AI suggest corrections.
            </p>
            <Link className="button" href="/auth/register">
              Start with 10 free minutes{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <p className="hero-fineprint">
              A one-time free allowance. No card needed to start.
            </p>
          </div>
          <CaptionExample />
        </section>
        <section className="public-section" aria-labelledby="workflow-title">
          <div className="section-intro">
            <p className="hero-note">From upload to export</p>
            <h2 id="workflow-title">
              A caption workflow that stays in your hands.
            </h2>
          </div>
          <ol className="public-steps">
            <li>
              <span>01</span>
              <h3>Bring your recording</h3>
              <p>
                A reel, interview or longer video. Upload the original, then
                choose your caption output with examples.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Choose how AI helps</h3>
              <p>
                Use automatic corrections or review suggestions yourself. Save
                your choices for the next upload.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Make captions yours</h3>
              <p>
                Edit words and timing, choose a caption preset and preview it on
                your video.
              </p>
            </li>
            <li>
              <span>04</span>
              <h3>Export what you need</h3>
              <p>
                Download TXT, SRT or VTT, or render a video with captions
                embedded. Review the result before publishing.
              </p>
            </li>
          </ol>
        </section>
        <section
          className="public-section"
          id="pricing"
          aria-labelledby="pricing-title"
        >
          <div className="section-intro">
            <p className="hero-note">Plans in PKR</p>
            <h2 id="pricing-title">
              One minute of audio. One minute of video.
              <br />
              The same allowance.
            </h2>
            <p>
              Paid plans provide a monthly allowance. Your free minutes are a
              one-time trial. Unused monthly minutes do not roll over.
            </p>
          </div>
          <div
            className="pricing-scroll"
            role="region"
            aria-label="Plan comparison"
            tabIndex={0}
          >
            <table className="public-pricing">
              <caption className="sr-only">UrduSpeech launch plans</caption>
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">Price (PKR)</th>
                  <th scope="col">Transcription</th>
                  <th scope="col">Video exports</th>
                  <th scope="col">Media kept for</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.name}>
                    <th scope="row">{plan.name}</th>
                    <td className="public-price">
                      {plan.price}
                      {plan.name !== "Free" && <small> / month</small>}
                    </td>
                    <td>{plan.minutes}</td>
                    <td>{plan.quality}</td>
                    <td>{plan.media}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="public-footnote">
            Available payment methods appear in your workspace. Manual payments
            activate a paid period after verification. Download your media
            before its expiry; transcripts and subtitle files remain until you
            delete them.{" "}
            <Link href="/supported-formats">
              Check upload and export limits
            </Link>
            .
          </p>
          <Link className="button" href="/auth/register">
            Create your account <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
        <section className="public-closing" aria-labelledby="review-title">
          <Check size={28} aria-hidden="true" />
          <div>
            <h2 id="review-title">
              AI creates the draft. You decide what to publish.
            </h2>
            <p>
              Urdu speech, English names and background noise can affect
              transcription. Review names, numbers and timings before sharing
              your result.
            </p>
          </div>
          <Link href="/auth/register" className="text-button">
            Open your studio <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
