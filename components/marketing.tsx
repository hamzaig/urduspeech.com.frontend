import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Plus } from "lucide-react";

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

export const commonQuestions = [
  {
    question: "Which caption languages can I choose?",
    answer: (
      <p>
        Start with spoken Urdu. Choose Urdu script, Roman Urdu, English
        translation, or bilingual Urdu and English for your output.
      </p>
    ),
  },
  {
    question: "Can I change the transcript or caption timing?",
    answer: (
      <p>
        Yes. Review the AI draft in Studio, correct the text, and adjust caption
        start and end times. Save those edits before exporting.
      </p>
    ),
  },
  {
    category: "billing",
    question: "What can I try for free?",
    answer: (
      <p>
        You get 10 minutes of transcription once per account. No card is
        required. Captioned video exports on the free plan are up to 720p with a
        watermark.
      </p>
    ),
  },
  {
    question: "What kinds of recordings can I upload?",
    answer: (
      <p>
        You can upload supported audio such as MP3, FLAC, PCM WAV or AAC M4A,
        and supported MP4 or MOV video. See the{" "}
        <Link href="/supported-formats">format and duration limits</Link> before
        uploading.
      </p>
    ),
  },
  {
    question: "What can I download?",
    answer: (
      <p>
        Download a plain text transcript (TXT). When timing is ready, you can
        export SRT or VTT subtitles. Supported video projects can also render a
        captioned MP4.
      </p>
    ),
  },
  {
    category: "billing",
    question: "Do audio and video use separate minutes?",
    answer: (
      <p>
        Both draw from the same duration-based allowance. Paid minutes are
        granted for each plan period and unused minutes do not roll over. See{" "}
        <Link href="/pricing">plans and pricing</Link>.
      </p>
    ),
  },
  {
    category: "billing",
    question: "What happens when my recording expires?",
    answer: (
      <p>
        Download original media and rendered video before the plan’s retention
        period ends. Transcripts and subtitle files stay until you delete the
        project or account. Read the <Link href="/privacy">privacy policy</Link>{" "}
        for details.
      </p>
    ),
  },
];

export function StartFree() {
  return (
    <Link className="button" href="/auth/register">
      Start free <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}

export function MarketingIntro({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="marketing-intro">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export function Plans({ showStart = true }: { showStart?: boolean }) {
  return (
    <>
      <ul className="public-pricing" role="list" aria-label="Plan comparison">
        {plans.map(({ name, price, minutes, media, quality }) => (
          <li key={name}>
            <h3>{name}</h3>
            <p className="public-price">
              <span>PKR</span> {price}
            </p>
            <p className="price-period">
              {price === "0" ? "One-time allowance" : "Per month"}
            </p>
            <dl>
              <div>
                <dt>Transcription</dt>
                <dd>{minutes} minutes</dd>
              </div>
              <div>
                <dt>Video exports</dt>
                <dd>{quality}</dd>
              </div>
              <div>
                <dt>Media retention</dt>
                <dd>{media} days</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <div className="pricing-footnote">
        <p>
          Available payment methods appear in Studio. Manual payments activate
          after verification. Download your media before it expires.
        </p>
        {showStart && <StartFree />}
      </div>
    </>
  );
}

export function QuestionList({
  questions,
  openFirst = false,
}: {
  questions: typeof commonQuestions;
  openFirst?: boolean;
}) {
  return (
    <div className="question-list">
      {questions.map(({ question, answer }, index) => (
        <details
          key={question}
          open={openFirst && index === 0 ? true : undefined}
        >
          <summary>
            {question}
            <Plus size={18} aria-hidden="true" />
          </summary>
          {answer}
        </details>
      ))}
    </div>
  );
}
