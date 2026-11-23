import Link from "next/link";
import type { ReactNode } from "react";
import type { QuestionItem } from "@/components/marketing";

export type AlternativeSlug =
  | "capcut-urdu-alternative"
  | "veed-urdu-alternative"
  | "descript-urdu-alternative";

export interface AlternativeSpec {
  slug: AlternativeSlug;
  competitor: string;
  title: string;
  seoTitle: string;
  description: string;
  summary: string;
  asOfDate: string;
  updated: string;
  updatedIso: string;
  displayUpdated: string;
  wordCount: number;
  whyCreatorsSwitch: readonly { title: string; detail: string }[];
  keepCompetitorFor: readonly string[];
  migrationSteps: readonly { step: string; detail: string }[];
  quickMatrix: readonly {
    factor: string;
    urduSpeech: string;
    competitor: string;
  }[];
  relatedCompareSlug: string;
  bodySection: { title: string; body: ReactNode };
  faqs: readonly QuestionItem[];
}

export const publicAlternatives: readonly AlternativeSpec[] = [
  {
    slug: "capcut-urdu-alternative",
    competitor: "CapCut",
    title: "CapCut alternative for Urdu Nastaliq & Roman Urdu captions",
    seoTitle: "CapCut Alternative for Urdu Captions & Nastaliq MP4",
    description:
      "Switch your Urdu captioning step from CapCut to Noto Nastaliq Urdu, Roman Urdu, bilingual Urdu + English subtitles, and PKR monthly plans.",
    summary:
      "Keep CapCut for cutting footage and B-roll, and move your Urdu captioning step to a browser studio built for Noto Nastaliq Urdu, Roman Urdu, bilingual tracks, and transparent PKR plans.",
    asOfDate: "November 2026",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 720,
    whyCreatorsSwitch: [
      {
        title: "Real Noto Nastaliq Urdu without manual font fixes",
        detail:
          "General caption apps frequently fall back to cramped Naskh or clip Nastaliq descenders in 9:16 Reels. UrduSpeech pairs Noto Nastaliq Urdu with Inter inside verified safe-area margins automatically.",
      },
      {
        title: "Roman Urdu and stacked Urdu + English from one upload",
        detail:
          "Generate Urdu script, Roman Urdu (ur-Latn), English translation, or stacked bilingual captions from the same spoken Urdu recording instead of re-typing captions manually.",
      },
      {
        title: "Predictable PKR plans with Pakistani local payment rails",
        detail:
          "Start with 10 free minutes (no card required), then pay PKR 999 to 5,999/month via Stripe or local manual Pakistani transfers (bank transfer, JazzCash, Easypaisa, SadaPay, NayaPay) when enabled.",
      },
      {
        title: "Protected numbers, handles, and UTF-8 SRT/VTT exports",
        detail:
          "Conservative AI normalization cleans Arabic/Urdu character mismatches (ک and ی) while guarding prices, dates, URLs, and @handles, with clean UTF-8 SRT exports you can still import into CapCut desktop.",
      },
    ],
    keepCompetitorFor: [
      "Trimming raw clips, jump cuts, color grading, speed ramps, and B-roll overlays.",
      "Adding background music, sound effects, stickers, and animated transitions.",
      "Offline mobile editing before you export your clean H.264/AAC master.",
    ],
    migrationSteps: [
      {
        step: "Export your clean cut from CapCut",
        detail:
          "Finish trimming, audio leveling, and B-roll inside CapCut, then export a 1080p MP4 (H.264 video + AAC speech audio) without burned-in captions.",
      },
      {
        step: "Upload to UrduSpeech Studio (10 free minutes)",
        detail:
          "Open Studio in your desktop or mobile browser, drop your MP4, and choose Urdu Nastaliq, Roman Urdu, English, or stacked Urdu + English.",
      },
      {
        step: "Review names and cue timing against local playback",
        detail:
          "Check brand names, accept or reject conservative AI suggestions, and nudge timestamps with zero extra upload wait.",
      },
      {
        step: "Export burned-in MP4 or bring UTF-8 SRT back",
        detail:
          "Render a ready-to-post 1080p MP4 (Clean, Social highlight #FFD54F, or Boxed) or export UTF-8 .srt for YouTube Studio and desktop NLEs.",
      },
    ],
    quickMatrix: [
      {
        factor: "Nastaliq RTL typography",
        urduSpeech:
          "Built-in Noto Nastaliq Urdu + Inter with safe-area padding",
        competitor: "Manual font installation and RTL checks often required",
      },
      {
        factor: "Roman Urdu (ur-Latn)",
        urduSpeech: "Native output mode across TXT, SRT, VTT, and MP4",
        competitor: "No dedicated spoken-Urdu-to-Roman-Urdu workflow",
      },
      {
        factor: "iPhone HDR color safety",
        urduSpeech: "Automatic BT.2020 HLG/PQ to SDR BT.709 tone-mapping",
        competitor: "Managed manually in project color-space settings",
      },
      {
        factor: "Pricing in Pakistan",
        urduSpeech: "10 free min, then PKR 999 / 2,499 / 5,999 per month",
        competitor: "USD / app-store Pro tiers",
      },
    ],
    relatedCompareSlug: "urduspeech-vs-capcut",
    bodySection: {
      title: "Why pairing CapCut + UrduSpeech beats fighting Urdu fonts",
      body: (
        <p>
          Most Pakistani Reels and TikTok creators do not abandon CapCut for
          video editing. They move only the captioning bottleneck out of CapCut.
          Cutting footage in CapCut and rendering captions in{" "}
          <Link href="/video-captions">UrduSpeech Studio</Link> keeps your fast
          editing timeline while giving every reel legible Nastaliq or{" "}
          <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link> typography,
          clean UTF-8 subtitles, and zero HDR washout.
        </p>
      ),
    },
    faqs: [
      {
        question: "Will my paid MP4 export have a watermark?",
        answer: (
          <p>
            No. Paid plans (Starter PKR 999, Creator PKR 2,499, Studio PKR
            5,999) export clean 1080p MP4 video without any watermark. Only the
            10-minute Free trial adds a watermark at up to 720p.
          </p>
        ),
      },
      {
        question: "Can I still export SRT files for CapCut desktop?",
        answer: (
          <p>
            Yes. Every project includes unlimited UTF-8 <code>.srt</code>,{" "}
            <code>.vtt</code>, and <code>.txt</code> exports that work with
            CapCut desktop, Premiere Pro, DaVinci Resolve, and YouTube Studio.
          </p>
        ),
      },
    ],
  },
  {
    slug: "veed-urdu-alternative",
    competitor: "VEED.io",
    title: "VEED.io alternative for Urdu subtitles & PKR billing",
    seoTitle: "VEED.io Alternative for Urdu Subtitles & PKR Plans",
    description:
      "Compare a dedicated Urdu Nastaliq, Roman Urdu, and bilingual caption studio priced in Pakistani rupees against USD browser video suites.",
    summary:
      "Stop paying USD suite prices for stock avatars and templates you rarely open when your actual need is clean Nastaliq Urdu, Roman Urdu, bilingual captions, and reliable PKR billing.",
    asOfDate: "November 2026",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 680,
    whyCreatorsSwitch: [
      {
        title: "Local PKR pricing instead of volatile USD subscriptions",
        detail:
          "VEED.io bills in USD (typically $19 to $49+/mo depending on billing cycle as of November 2026). UrduSpeech publishes fixed Pakistani rupee tiers starting at PKR 999/month for 60 minutes.",
      },
      {
        title: "First-class Noto Nastaliq Urdu & Roman Urdu support",
        detail:
          "Instead of generic browser caption layers tuned for Latin alphabets, UrduSpeech shapes RTL Nastaliq properly and includes a dedicated spoken-Urdu-to-Roman-Urdu output mode.",
      },
      {
        title: "Transparent retention ceilings and zero model training",
        detail:
          "Every plan states its exact media retention window (3, 15, 30, or 90 days), publishes every sub-processor, never trains models on your uploads, and provides self-service deletion receipts.",
      },
      {
        title: "Local Pakistani manual payment verification",
        detail:
          "Creators without international dollar cards can activate monthly plans via Bank transfer, JazzCash, Easypaisa, SadaPay, or NayaPay when enabled inside Studio Billing.",
      },
    ],
    keepCompetitorFor: [
      "Browser-based stock B-roll, AI avatars, and screen recording in one cloud workspace.",
      "Multi-language video production across dozens of non-Urdu European or Asian languages.",
      "Multi-layer timeline compositing and animated social templates directly in the browser.",
    ],
    migrationSteps: [
      {
        step: "Export any existing UTF-8 SRT/VTT files",
        detail:
          "Download existing subtitle files from your current workspace; you can also convert or check them free in our browser tools.",
      },
      {
        step: "Test one real Urdu clip in UrduSpeech (10 free min)",
        detail:
          "Upload a finished MP4, MOV, MP3, or M4A recording up to 10 minutes (250 MiB) with no card required.",
      },
      {
        step: "Pick your script preset and save defaults",
        detail:
          "Select Urdu Nastaliq, Roman Urdu, English, or stacked Urdu + English and save your preference in Studio for future uploads.",
      },
      {
        step: "Pick Starter, Creator, or Studio in PKR",
        detail:
          "Use our PKR plan calculator to match your monthly minutes (60, 200, or 500 min) and pay in rupees with Stripe or local manual transfer.",
      },
    ],
    quickMatrix: [
      {
        factor: "Pricing currency",
        urduSpeech: "PKR 999 / 2,499 / 5,999 per month (fixed PKR)",
        competitor: "USD subscriptions billed on international cards",
      },
      {
        factor: "Roman Urdu pipeline",
        urduSpeech: "Built-in Roman Urdu (ur-Latn) text, SRT, VTT, and MP4",
        competitor: "Not offered as a dedicated spoken-Urdu-to-Roman-Urdu mode",
      },
      {
        factor: "Urdu Unicode cleanup",
        urduSpeech: "Conservative AI normalization (ک / ی) with review cards",
        competitor: "Standard manual subtitle text editing",
      },
      {
        factor: "Export independence",
        urduSpeech:
          "Unlimited UTF-8 TXT, SRT, VTT plus 1080p MP4 on paid tiers",
        competitor: "Feature caps and watermark removal vary by USD plan",
      },
    ],
    relatedCompareSlug: "urduspeech-vs-veed",
    bodySection: {
      title: "Focused Urdu accuracy at a fraction of USD suite costs",
      body: (
        <p>
          If your workflow revolves around Urdu YouTube videos, podcasts, or
          bilingual Reels, paying for a broad USD video-editing suite often
          means subsidizing features you never open. Use our{" "}
          <Link href="/tools/caption-plan-calculator">PKR plan calculator</Link>{" "}
          to compare your exact monthly minute budget against Starter, Creator,
          and Studio, or read our full{" "}
          <Link href="/compare/urduspeech-vs-veed">
            UrduSpeech vs VEED.io breakdown
          </Link>
          .
        </p>
      ),
    },
    faqs: [
      {
        question: "Are unused monthly minutes rolled over?",
        answer: (
          <p>
            No. Monthly minutes apply to the active plan period and reset each
            billing cycle. You can pick Starter (60 min), Creator (200 min), or
            Studio (500 min) based on your typical monthly publishing volume.
          </p>
        ),
      },
      {
        question: "Do I lose my transcripts when media retention expires?",
        answer: (
          <p>
            No. Original uploaded media and rendered MP4 videos expire after 3
            to 90 days depending on plan, while your UTF-8 transcripts and
            SRT/VTT tracks remain downloadable until you delete the project or
            account.
          </p>
        ),
      },
    ],
  },
  {
    slug: "descript-urdu-alternative",
    competitor: "Descript",
    title: "Descript alternative for Urdu podcasts & interviews",
    seoTitle: "Descript Alternative for Urdu Podcasts & Interviews",
    description:
      "Transcribe long Urdu podcasts and interviews up to 6 hours into Nastaliq, Roman Urdu, English show notes, SRT/VTT, and MP4 clips in PKR.",
    summary:
      "Descript leads for English text-based podcast editing; UrduSpeech is purpose-built when your episodes are recorded in Urdu or mixed Urdu-English and need Nastaliq, Roman Urdu, or English subtitles in PKR.",
    asOfDate: "November 2026",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 700,
    whyCreatorsSwitch: [
      {
        title: "Built around spoken Urdu and Urdu-English code-switching",
        detail:
          "Pakistani podcasts naturally mix Urdu sentences with English tech, finance, and business vocabulary. UrduSpeech preserves Latin terms cleanly alongside Noto Nastaliq Urdu.",
      },
      {
        title: "Long-form episode support up to 3 to 6 hours",
        detail:
          "Creator supports single recordings up to 180 minutes (3 hours) and Studio supports up to 360 minutes (6 hours), under the <2 GiB scan cap.",
      },
      {
        title: "Urdu show notes + English subtitles from one master file",
        detail:
          "Export clean UTF-8 TXT show notes, YouTube SRT/VTT closed captions, and stacked bilingual promo clips without managing separate translation pipelines.",
      },
      {
        title: "Fixed PKR plans instead of USD seat pricing",
        detail:
          "Creator (PKR 2,499/mo for 200 minutes) and Studio (PKR 5,999/mo for 500 minutes) avoid international card FX markups and support Pakistani local payment verification.",
      },
    ],
    keepCompetitorFor: [
      "English-language shows where you edit audio and video timelines by deleting transcript words.",
      "Built-in multi-speaker diarization labels, filler-word removal, and AI Studio Sound denoising.",
      "Collaborative multi-editor cloud video editing in USD workspaces.",
    ],
    migrationSteps: [
      {
        step: "Master and cut your episode in your DAW or NLE first",
        detail:
          "Because UrduSpeech does not cut audio timelines or perform speaker diarization, finish noise cleanup and episode cuts in Audacity, Premiere, Resolve, or Descript first.",
      },
      {
        step: "Export clean AAC M4A / MP3 audio or 1080p MP4 video",
        detail:
          "For 2-to-6-hour episodes where raw 4K video exceeds 2 GiB, export a lightweight M4A/MP3 audio master for fast transcription and YouTube SRT/VTT generation.",
      },
      {
        step: "Choose Urdu, Roman Urdu, English, or bilingual output",
        detail:
          "Generate show-note TXT files and timed SRT/VTT tracks in Studio, then verify guest names and numbers with conservative AI review cards.",
      },
      {
        step: "Render vertical Nastaliq promo clips for Reels & Shorts",
        detail:
          "Upload 60-to-90-second episode highlights to render burned-in 1080p Nastaliq or bilingual MP4 clips for social distribution.",
      },
    ],
    quickMatrix: [
      {
        factor: "Spoken Urdu & Nastaliq focus",
        urduSpeech: "Native Urdu Nastaliq, Roman Urdu, and stacked bilingual",
        competitor: "English-first text-based editor",
      },
      {
        factor: "Speaker diarization & timeline cutting",
        urduSpeech: "Not offered (transcription & caption studio only)",
        competitor: "Built-in speaker labeling and text-based timeline cuts",
      },
      {
        factor: "Max single episode length",
        urduSpeech: "180 min (Creator) / 360 min (Studio)",
        competitor: "Plan-based cloud transcription hour tiers",
      },
      {
        factor: "Billing currency",
        urduSpeech: "PKR 999 / 2,499 / 5,999 per month",
        competitor: "USD per-editor subscriptions",
      },
    ],
    relatedCompareSlug: "urduspeech-vs-descript",
    bodySection: {
      title: "Honest division of labor for Urdu podcast teams",
      body: (
        <p>
          We never pretend UrduSpeech is a multi-track DAW. Keep your preferred
          audio editor for EQ, noise reduction, and cutting pauses. Once the
          episode master is locked, bring it to{" "}
          <Link href="/urdu-podcast-transcription">
            UrduSpeech podcast transcription
          </Link>{" "}
          for fast Urdu/English transcripts, YouTube SRT/VTT subtitles, and
          Nastaliq promo clips. See the complete{" "}
          <Link href="/compare/urduspeech-vs-descript">
            UrduSpeech vs Descript comparison
          </Link>
          .
        </p>
      ),
    },
    faqs: [
      {
        question:
          "Does UrduSpeech label multiple podcast speakers automatically?",
        answer: (
          <p>
            No. UrduSpeech produces single-stream transcripts and timed caption
            cues without automatic speaker diarization. You can edit speaker
            prefixes manually in the browser cue editor before exporting TXT,
            SRT, or VTT.
          </p>
        ),
      },
      {
        question: "What if my full 4K podcast video is larger than 2 GiB?",
        answer: (
          <p>
            Upload a compressed 1080p MP4 or an audio-only M4A/MP3 bounce (which
            is typically 40 to 120 MiB for a 2-hour show) to generate your UTF-8
            TXT, SRT, and VTT files cleanly, then attach the SRT directly in
            YouTube Studio or your video editor.
          </p>
        ),
      },
    ],
  },
];

export function getAlternativeBySlug(slug: string) {
  return publicAlternatives.find((item) => item.slug === slug);
}
