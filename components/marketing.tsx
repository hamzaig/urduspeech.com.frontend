import Link from "next/link";
import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { PLANS } from "@/lib/plans";

export type QuestionItem = {
  category?: string;
  question: string;
  answer: ReactNode;
};

export const commonQuestions: readonly QuestionItem[] = [
  {
    question: "Which caption languages can I choose?",
    answer: (
      <p>
        Start with spoken Urdu. Choose Urdu script (rendered in Noto Nastaliq
        Urdu), Roman Urdu (Latin script), English translation, or stacked
        bilingual Urdu and English (Urdu-first or English-first) for your
        output.
      </p>
    ),
  },
  {
    question:
      "Is UrduSpeech an automated AI tool or a human transcription agency?",
    answer: (
      <p>
        UrduSpeech is an automated, browser-based AI creator studio operated by{" "}
        <Link href="/about">MoonSys Ltd</Link>. It does not use human
        transcriptionists and does not train models on your uploaded recordings.
        You review, edit, and approve every transcript and caption track inside
        Studio before publishing.
      </p>
    ),
  },
  {
    question: "Can I change the transcript or caption timing?",
    answer: (
      <p>
        Yes. Review the AI draft in Studio alongside a local preview of your
        recording, correct names, numbers, or mixed Urdu-English phrases, accept
        or reject AI suggestions, and adjust cue start and end times in seconds
        before exporting.
      </p>
    ),
  },
  {
    category: "billing",
    question: "What can I try for free?",
    answer: (
      <p>
        You get a one-time 10-minute free allowance per account with no card
        required. Free uploads can be up to 10 minutes and 100 MiB, with full
        TXT, SRT, and VTT downloads plus captioned MP4 renders up to 720p with a
        watermark.
      </p>
    ),
  },
  {
    question: "What kinds of recordings can I upload?",
    answer: (
      <p>
        You can upload supported audio such as MP3, FLAC, PCM WAV or AAC M4A,
        and supported MP4 or MOV video with H.264/HEVC video and AAC speech
        audio. See the{" "}
        <Link href="/supported-formats">format and duration limits</Link> before
        uploading.
      </p>
    ),
  },
  {
    question: "What can I download?",
    answer: (
      <p>
        Download a plain UTF-8 text transcript (TXT). When timing is ready, you
        can export SRT or WebVTT (VTT) subtitles. Supported video projects can
        also render a burned-in captioned MP4 in Clean, Social highlight, or
        Boxed Nastaliq presets.
      </p>
    ),
  },
  {
    category: "billing",
    question: "Do audio and video use separate minutes?",
    answer: (
      <p>
        Both draw from the same duration-based allowance. Paid minutes are
        granted for each monthly plan period and unused minutes do not roll
        over. See <Link href="/pricing">plans and pricing</Link>.
      </p>
    ),
  },
  {
    category: "billing",
    question: "Which payment methods are supported in Pakistan?",
    answer: (
      <p>
        All plans are billed in Pakistani rupees (PKR). Depending on workspace
        configuration, Studio supports card checkout via Stripe as well as
        manual local verification via bank transfer, JazzCash, Easypaisa,
        SadaPay, and NayaPay. Available methods always appear inside Studio
        Billing before purchase.
      </p>
    ),
  },
  {
    category: "billing",
    question: "What happens when my recording expires?",
    answer: (
      <p>
        Download original media and rendered video before your plan’s 3, 15, 30,
        or 90 day retention period ends. Transcripts and subtitle files remain
        available until you delete the project or account. Read the{" "}
        <Link href="/privacy">privacy policy</Link> for details.
      </p>
    ),
  },
];

export function getBillingQuestions({
  includePricingLink = true,
}: { includePricingLink?: boolean } = {}): readonly QuestionItem[] {
  return commonQuestions
    .filter(({ category }) => category === "billing")
    .map((item) => {
      if (
        !includePricingLink &&
        item.question === "Do audio and video use separate minutes?"
      ) {
        return {
          ...item,
          answer: (
            <p>
              Both audio and video uploads draw from the same duration-based
              allowance. Paid minutes are granted for each monthly plan period
              and unused minutes do not roll over into the next period.
            </p>
          ),
        };
      }
      return item;
    });
}

export function StartFree({
  className,
  onClick,
  label = "Start free",
}: {
  className?: string;
  onClick?: () => void;
  label?: string;
} = {}) {
  return (
    <Link
      className={className ? `button ${className}` : "button"}
      href="/auth/register"
      onClick={onClick}
    >
      {label}
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

export function Plans({
  showStart = true,
  showCardCta = false,
}: {
  showStart?: boolean;
  showCardCta?: boolean;
}) {
  return (
    <>
      <ul className="public-pricing" role="list" aria-label="Plan comparison">
        {PLANS.map((plan) => {
          return (
            <li key={plan.id} data-recommended={plan.recommended || undefined}>
              <div className="plan-name">
                <h3>{plan.name}</h3>
                {plan.recommended && (
                  <span className="plan-badge">Recommended</span>
                )}
              </div>
              <p className="public-price">
                <span>PKR</span> {plan.priceDisplay}
              </p>
              <p className="price-period">
                {plan.pricePkr === 0
                  ? "One-time allowance"
                  : `Per month, about PKR ${(plan.pricePkr / plan.minutes).toFixed(1)} a minute`}
              </p>
              <dl>
                <div>
                  <dt>Transcription</dt>
                  <dd>{plan.minutes} minutes</dd>
                </div>
                <div>
                  <dt>Max file &amp; duration</dt>
                  <dd>
                    {plan.maxDurationMinutes} min, {plan.maxUploadLabel}
                  </dd>
                </div>
                <div>
                  <dt>Video exports</dt>
                  <dd>{plan.videoQuality}</dd>
                </div>
                <div>
                  <dt>Media retention</dt>
                  <dd>{plan.retentionDays} days</dd>
                </div>
              </dl>
              {showCardCta && (
                <Link
                  href={
                    plan.pricePkr === 0
                      ? "/auth/register?source=pricing_card"
                      : `/auth/register?plan=${plan.id}&source=pricing_card`
                  }
                  className={
                    plan.recommended
                      ? "button plan-cta"
                      : "button secondary plan-cta"
                  }
                >
                  {plan.pricePkr === 0 ? "Try free" : `Pick ${plan.name}`}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <div className="pricing-footnote">
        <p>
          Available payment methods (card checkout via Stripe and manual local
          verification via bank transfer, JazzCash, Easypaisa, SadaPay, and
          NayaPay) appear inside Studio Billing. Download original and rendered
          media before expiry.
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
  questions: readonly QuestionItem[];
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
