import Link from "next/link";
import type { ReactNode } from "react";
import type { QuestionItem } from "@/components/marketing";

export type ComparisonSlug =
  | "urduspeech-vs-capcut"
  | "urduspeech-vs-descript"
  | "urduspeech-vs-veed"
  | "urduspeech-vs-whisper"
  | "urduspeech-vs-google-docs-voice-typing";

export interface ComparisonSpec {
  slug: ComparisonSlug;
  competitor: string;
  title: string;
  seoTitle: string;
  description: string;
  summary: string;
  updated: string;
  updatedIso: string;
  displayUpdated: string;
  wordCount: number;
  verdictSummary: string;
  chooseUrduSpeech: readonly string[];
  chooseCompetitor: readonly string[];
  matrixRows: readonly {
    dimension: string;
    urduSpeech: string;
    competitor: string;
  }[];
  analysisSections: readonly { title: string; body: ReactNode }[];
  faqs: readonly QuestionItem[];
}

export const publicComparisons: readonly ComparisonSpec[] = [
  {
    slug: "urduspeech-vs-capcut",
    competitor: "CapCut",
    title: "UrduSpeech vs CapCut for Urdu video captions",
    seoTitle: "UrduSpeech vs CapCut for Urdu Video Captions",
    description:
      "Compare Nastaliq RTL typography, Roman Urdu, bilingual captions, desktop browser editing, and PKR plans against CapCut mobile and desktop editing.",
    summary:
      "CapCut is a full timeline video editor; UrduSpeech is a dedicated browser studio for Urdu transcription, Nastaliq rendering, Roman Urdu, and bilingual subtitles.",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 740,
    verdictSummary:
      "Use CapCut when cutting B-roll, transitions, color grades, and motion effects; use UrduSpeech when you want reliable Urdu speech-to-text, authentic Noto Nastaliq Urdu RTL rendering, Roman Urdu or stacked Urdu + English outputs, and PKR billing.",
    chooseUrduSpeech: [
      "You want proper Noto Nastaliq Urdu right-to-left rendering without manually hunting for Urdu fonts or fixing broken ligatures.",
      "You need four outputs from spoken Urdu—Urdu script, Roman Urdu, English translation, or stacked bilingual Urdu + English—plus UTF-8 TXT, SRT, and WebVTT files.",
      "You prefer transparent Pakistani rupee plans (PKR 999–5,999/mo) with local manual payment verification options.",
      "You want conservative AI text correction with reviewable accept/reject suggestions and protected numbers/handles.",
    ],
    chooseCompetitor: [
      "You need a full multi-track video editor for trimming cuts, adding B-roll, transitions, stickers, music, and animated motion graphics.",
      "You edit primarily in English and want animated word-by-word karaoke templates inside an all-in-one mobile app.",
      "You prefer working offline inside a native phone or desktop editing suite before exporting.",
    ],
    matrixRows: [
      {
        dimension: "Primary purpose",
        urduSpeech:
          "Dedicated Urdu speech-to-text, subtitle editing, and Nastaliq caption studio",
        competitor:
          "General-purpose timeline video editor with auto-captions and effects",
      },
      {
        dimension: "Urdu Nastaliq & RTL shaping",
        urduSpeech:
          "Built-in Noto Nastaliq Urdu + Inter optical pairing with verified safe-area margins",
        competitor:
          "General caption templates; Urdu RTL alignment and Nastaliq shaping often require manual font setup",
      },
      {
        dimension: "Roman Urdu & stacked bilingual",
        urduSpeech:
          "Native Roman Urdu (ur-Latn), English translation, and Urdu-first/English-first stacked captions",
        competitor:
          "Focuses on standard single-language auto-captions; Roman Urdu requires manual typing or external tools",
      },
      {
        dimension: "Export files",
        urduSpeech:
          "UTF-8 TXT, SRT, WebVTT, and burned-in MP4 (720p watermarked Free; 1080p clean Paid; 256 MiB cap)",
        competitor:
          "Full edited video renders; SRT export and Pro caption styles vary by subscription tier",
      },
      {
        dimension: "Pricing & local payments",
        urduSpeech:
          "10 free min, then PKR 999 / 2,499 / 5,999 per month; Stripe + local Pakistani manual rails",
        competitor:
          "Freemium with Pro subscriptions billed primarily through USD/app-store tiers",
      },
      {
        dimension: "Timeline editing & effects",
        urduSpeech:
          "Caption text, timing, and style presets only (no video cutting or B-roll timeline)",
        competitor:
          "Full multi-track timeline cutting, transitions, animations, keyframing, and effects",
      },
    ],
    analysisSections: [
      {
        title: "Using CapCut and UrduSpeech together in one creator workflow",
        body: (
          <>
            <p>
              Most Pakistani short-form creators do not need to replace CapCut
              completely—they split the workflow cleanly. Cut your footage,
              color-grade, add B-roll, and mix audio inside CapCut first, then
              export a clean 1080p H.264/AAC MP4 master.
            </p>
            <p>
              Upload that finished cut to UrduSpeech Studio to generate accurate
              Nastaliq Urdu,{" "}
              <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link>, or{" "}
              <Link href="/bilingual-urdu-english-captions">
                bilingual Urdu + English
              </Link>{" "}
              captions, review names and timing, and export either a
              ready-to-post burned-in MP4 (in Clean, Social highlight, or Boxed
              style) or a UTF-8 <code>.srt</code> file to bring back into
              desktop CapCut.
            </p>
          </>
        ),
      },
      {
        title: "Typography, safe areas, and iPhone HDR handling",
        body: (
          <p>
            In vertical 9:16 Reels and TikTok clips, Nastaliq descenders and
            dots easily clip if line height is calibrated for Latin alphabets.
            UrduSpeech measures every Nastaliq cue against safe-area boundaries
            and tone-maps properly tagged iPhone BT.2020 HLG/PQ HDR video to
            standard SDR BT.709 automatically during MP4 export. See{" "}
            <Link href="/urdu-captions-for-reels-tiktok">
              Urdu captions for Instagram Reels &amp; TikTok
            </Link>{" "}
            for vertical best practices.
          </p>
        ),
      },
    ],
    faqs: [
      {
        question: "Can I import an UrduSpeech SRT file into CapCut desktop?",
        answer: (
          <p>
            Yes. UrduSpeech exports standard UTF-8 <code>.srt</code> files that
            you can import into CapCut desktop, Premiere Pro, or DaVinci
            Resolve. Remember to assign a Nastaliq-capable Urdu font inside your
            editor if you style the SRT locally.
          </p>
        ),
      },
      {
        question: "Does UrduSpeech replace CapCut for trimming and B-roll?",
        answer: (
          <p>
            No. UrduSpeech focuses strictly on speech recognition, script
            conversion, caption timing, and Nastaliq rendering. Keep CapCut for
            cutting clips, audio ducking, and visual transitions.
          </p>
        ),
      },
    ],
  },
  {
    slug: "urduspeech-vs-descript",
    competitor: "Descript",
    title: "UrduSpeech vs Descript for Urdu podcasts & video",
    seoTitle: "UrduSpeech vs Descript for Urdu Podcasts & Video",
    description:
      "Compare Urdu Nastaliq support, Roman Urdu output, bilingual subtitles, and Pakistani rupee plans against Descript’s English-first editing suite.",
    summary:
      "Descript excels at text-based English podcast and screen-recording editing; UrduSpeech is purpose-built for spoken Urdu scripts, Nastaliq captions, and PKR billing.",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 700,
    verdictSummary:
      "Choose Descript for English-language text-based audio/video cutting, Studio Sound cleanup, and multi-speaker labeling; choose UrduSpeech when your recordings are in spoken Urdu and you need Nastaliq, Roman Urdu, English translation, or PKR plans.",
    chooseUrduSpeech: [
      "Your podcasts, YouTube videos, or interviews are primarily in spoken Urdu or mixed Urdu-English.",
      "You need authentic Noto Nastaliq Urdu captions, Roman Urdu transliteration, or stacked Urdu + English bilingual subtitles.",
      "You want conservative AI Urdu Unicode normalization that guards numbers and handles without rewriting your speaker’s voice.",
      "You want predictable monthly plans in Pakistani rupees (starting at PKR 999/mo) with local bank/wallet verification.",
    ],
    chooseCompetitor: [
      "Your show is recorded in English (or another core Western language) and you want to edit video by deleting transcript words.",
      "You rely heavily on built-in filler-word removal, AI Studio Sound denoising, screen recording, or automatic multi-speaker labeling.",
      "You already pay for USD creator SaaS subscriptions and want a collaborative cloud NLE.",
    ],
    matrixRows: [
      {
        dimension: "Urdu language focus",
        urduSpeech:
          "Built specifically around spoken Urdu, Urdu-English code-switching, and RTL reading",
        competitor:
          "English-first text-based editor; limited Nastaliq and Roman Urdu workflow support",
      },
      {
        dimension: "Script & translation outputs",
        urduSpeech:
          "Urdu Nastaliq, Roman Urdu, English translation, and stacked Urdu + English",
        competitor:
          "Transcript editing and translation oriented around major global Latin/European languages",
      },
      {
        dimension: "Speaker diarization & audio editing",
        urduSpeech:
          "Not offered (single-stream transcription & subtitle timing editor)",
        competitor:
          "Built-in speaker labeling, word-level timeline cuts, filler-word removal, Studio Sound",
      },
      {
        dimension: "Burned-in Urdu Nastaliq MP4",
        urduSpeech:
          "Native Noto Nastaliq Urdu + Inter rendering with verified safe-area margins",
        competitor:
          "General caption layers designed primarily for left-to-right scripts",
      },
      {
        dimension: "Pricing currency & entry tier",
        urduSpeech:
          "10 free min, then PKR 999 / 2,499 / 5,999 per month (PKR billing)",
        competitor: "USD-billed SaaS plans requiring international cards",
      },
      {
        dimension: "Data retention & zero training",
        urduSpeech:
          "Zero model training on uploads; automatic 3–90 day media expiry + deletion receipts",
        competitor:
          "Cloud project storage governed by Descript’s workspace plan and privacy terms",
      },
    ],
    analysisSections: [
      {
        title: "Podcast workflows in Pakistan: where each tool shines",
        body: (
          <>
            <p>
              Podcasters who record in English love Descript because cutting an
              entire paragraph of transcript trims the audio and video timeline
              simultaneously. When your podcast is in Urdu, however, general
              English-first editors frequently stumble over regional idioms,
              Nastaliq shaping, and Roman Urdu show notes.
            </p>
            <p>
              UrduSpeech lets you upload mastered podcast episodes up to 180
              minutes on Creator or 360 minutes on Studio (see{" "}
              <Link href="/urdu-podcast-transcription">
                Urdu podcast transcription
              </Link>
              ), generate clean UTF-8 <strong>TXT</strong> show notes and{" "}
              <strong>SRT/VTT</strong> YouTube tracks, and render vertical promo
              clips in proper Nastaliq—while being upfront that speaker
              diarization and timeline audio cutting stay in your DAW or NLE.
            </p>
          </>
        ),
      },
      {
        title: "Cost predictability in Pakistani rupees",
        body: (
          <p>
            Dollar-denominated subscriptions fluctuate with bank FX spreads and
            international card taxes in Pakistan. UrduSpeech publishes fixed
            monthly prices in PKR (Starter PKR 999 for 60 min, Creator PKR 2,499
            for 200 min, Studio PKR 5,999 for 500 min) and supports manual local
            transfers (bank transfer, JazzCash, Easypaisa, SadaPay, NayaPay)
            when enabled inside Studio Billing.
          </p>
        ),
      },
    ],
    faqs: [
      {
        question:
          "Does UrduSpeech cut pauses or remove filler words like Descript?",
        answer: (
          <p>
            No. UrduSpeech edits caption text and cue timestamps without cutting
            your video timeline. Edit audio/video cuts in Audacity, Premiere,
            Resolve, or Descript first, then caption in UrduSpeech Studio.
          </p>
        ),
      },
      {
        question: "Can I get both Urdu show notes and English subtitles?",
        answer: (
          <p>
            Yes. Choose stacked <strong>Urdu + English</strong> for a bilingual
            transcript and captions, or run separate Urdu and English outputs
            for dedicated YouTube closed-caption tracks.
          </p>
        ),
      },
    ],
  },
  {
    slug: "urduspeech-vs-veed",
    competitor: "VEED.io",
    title: "UrduSpeech vs VEED.io for Urdu subtitles & MP4",
    seoTitle: "UrduSpeech vs VEED.io for Urdu Subtitles & MP4",
    description:
      "Compare Noto Nastaliq Urdu safe-area rendering, four script outputs, local Pakistani payments, and retention against VEED’s USD video editor.",
    summary:
      "VEED.io is a broad browser video editor billed in USD; UrduSpeech specializes in Urdu Nastaliq subtitling, Roman Urdu, bilingual captions, and transparent PKR plans.",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 645,
    verdictSummary:
      "Pick VEED.io if you want stock media, browser video trimming, and social templates in USD; pick UrduSpeech if Urdu script fidelity (Noto Nastaliq Urdu), Roman Urdu transliteration, bilingual Urdu + English stacks, and PKR pricing are your priority.",
    chooseUrduSpeech: [
      "You want guaranteed Noto Nastaliq Urdu typography and RTL safe-area checks on burned-in MP4 exports.",
      "You need Roman Urdu transliteration (ur-Latn) in addition to Urdu script and English translation.",
      "You want clear PKR pricing (from PKR 999/mo) with Pakistani local payment options and no USD FX surprises.",
      "You value explicit media retention ceilings (3–90 days), published sub-processors, and zero model training.",
    ],
    chooseCompetitor: [
      "You want an all-in-one browser video editor with stock B-roll, waveform visualizers, avatars, and trimming tools.",
      "Your content spans dozens of non-Urdu global languages and you already budget in USD.",
      "You need animated subtitle templates and multi-layer browser compositing.",
    ],
    matrixRows: [
      {
        dimension: "Urdu Nastaliq rendering",
        urduSpeech:
          "First-class Noto Nastaliq Urdu + Inter with calibrated line height and safe-area validation",
        competitor:
          "General web canvas captions; Nastaliq shaping and RTL punctuation need manual verification",
      },
      {
        dimension: "Roman Urdu support",
        urduSpeech:
          "Dedicated Roman Urdu output option for TXT, SRT, VTT, and burned-in MP4",
        competitor:
          "Not offered as a dedicated spoken-Urdu-to-Roman-Urdu pipeline",
      },
      {
        dimension: "Bilingual stacked captions",
        urduSpeech:
          "Built-in Urdu + English stack with selectable Urdu-first or English-first ordering",
        competitor:
          "Available via multi-track translation tools on higher USD plans",
      },
      {
        dimension: "AI correction guardrails",
        urduSpeech:
          "Conservative normalization protecting numbers/URLs + accept/reject review cards (toggleable)",
        competitor: "Standard manual subtitle editor after auto-transcription",
      },
      {
        dimension: "Pricing & currency",
        urduSpeech:
          "10 free min (720p watermarked), then PKR 999 / 2,499 / 5,999 per month (1080p clean)",
        competitor:
          "USD subscriptions (typically $19–$49+/mo billed annually/monthly)",
      },
      {
        dimension: "Extra video-suite tools",
        urduSpeech:
          "Focused purely on transcription, subtitle editing, and caption rendering",
        competitor:
          "Includes browser video trimmer, stock assets, screen recorder, and templates",
      },
    ],
    analysisSections: [
      {
        title: "Paying for Urdu precision instead of bloated browser suites",
        body: (
          <p>
            Many Pakistani creators sign up for broad browser video editors only
            to discover that 80% of the USD monthly fee pays for stock B-roll,
            AI avatars, and English templates they never touch—while their Urdu
            captions still render in basic Naskh. UrduSpeech strips away suite
            bloat so every engineering decision focuses on Urdu speech accuracy,
            conservative Unicode normalization, clean UTF-8 subtitle exports,
            and readable Nastaliq rendering at local rupee prices.
          </p>
        ),
      },
      {
        title: "Export independence and retention clarity",
        body: (
          <p>
            In UrduSpeech Studio, your UTF-8 <code>.txt</code>,{" "}
            <code>.srt</code>, and <code>.vtt</code> files remain downloadable
            even after source video media expires at your plan’s 3–90 day
            retention boundary, and you never get locked into a proprietary
            project file format. Compare exact export limits on{" "}
            <Link href="/supported-formats">supported formats and limits</Link>.
          </p>
        ),
      },
    ],
    faqs: [
      {
        question: "Does UrduSpeech watermark videos on paid plans?",
        answer: (
          <p>
            No. Only the 10-minute Free trial adds a watermark (at up to 720p).
            Starter (PKR 999), Creator (PKR 2,499), and Studio (PKR 5,999) all
            render up to 1080p without any watermark.
          </p>
        ),
      },
      {
        question: "Can I use UrduSpeech on mobile and desktop browsers?",
        answer: (
          <p>
            Yes. Studio runs directly in modern desktop and mobile browsers with
            no software download required.
          </p>
        ),
      },
    ],
  },
  {
    slug: "urduspeech-vs-whisper",
    competitor: "OpenAI Whisper (Self-Hosted)",
    title: "UrduSpeech vs OpenAI Whisper for Urdu transcripts",
    seoTitle: "UrduSpeech vs OpenAI Whisper for Urdu Transcripts",
    description:
      "Compare a hosted Nastaliq caption editor, conservative AI review, and burned-in MP4 rendering against running open-source Whisper locally on GPU.",
    summary:
      "Self-hosted Whisper is great for developers with local GPUs who want raw CLI transcripts; UrduSpeech adds a complete browser cue editor, Roman Urdu, bilingual translation, Nastaliq MP4 rendering, and zero setup.",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 780,
    verdictSummary:
      "Run open-source Whisper locally if you are technical, own a CUDA/Apple Silicon machine, and only want raw offline text files at zero subscription cost; choose UrduSpeech when you want a browser editing studio, conservative Urdu normalization, Roman Urdu, bilingual outputs, and burned-in Nastaliq MP4s in minutes.",
    chooseUrduSpeech: [
      "You want to upload a recording in your browser and export reviewed Urdu, Roman Urdu, English, or bilingual TXT/SRT/VTT/MP4 without Python, FFmpeg, or GPU setup.",
      "You need conservative Urdu Unicode cleanup (normalizing Arabic/Urdu character variants while protecting numbers and URLs) plus accept/reject review cards.",
      "You need burned-in Noto Nastaliq Urdu MP4 videos with verified safe-area margins and iPhone HDR-to-SDR tone-mapping.",
      "You want local playback synced to a structured cue editor that validates non-overlapping timestamps automatically.",
    ],
    chooseCompetitor: [
      "You are comfortable with Python, FFmpeg, and CLI tooling and already own a fast NVIDIA GPU or Apple Silicon Mac.",
      "You require 100% air-gapped offline processing where audio bytes never leave your local workstation.",
      "You are building a custom automated batch pipeline for thousands of hours of raw audio.",
    ],
    matrixRows: [
      {
        dimension: "Setup & hardware required",
        urduSpeech: "Zero setup; runs in any modern desktop or mobile browser",
        competitor:
          "Requires Python, PyTorch/whisper.cpp, FFmpeg, model weights, and GPU for fast runs",
      },
      {
        dimension: "Urdu script & Arabic-form cleanup",
        urduSpeech:
          "Optional conservative AI correction normalizes Urdu ک/ی forms and punctuation with review cards",
        competitor:
          "Raw model output; frequently mixes Arabic/Persian forms and requires custom post-processing scripts",
      },
      {
        dimension: "Roman Urdu & stacked bilingual",
        urduSpeech:
          "Built-in Urdu, Roman Urdu, English, and Urdu-first/English-first bilingual outputs",
        competitor:
          "Speech-to-text and English translation only; Roman Urdu & bilingual stacking require separate LLM scripts",
      },
      {
        dimension: "Visual cue editor & local playback",
        urduSpeech:
          "Browser cue editor with local video/audio preview, versioned saves, and overlap validation",
        competitor:
          "CLI text/SRT output only; requires external tools like Subtitle Edit or Aegisub to review",
      },
      {
        dimension: "Burned-in Nastaliq MP4 rendering",
        urduSpeech:
          "One-click Clean, Social highlight, and Boxed Noto Nastaliq MP4 with HDR tone-mapping",
        competitor:
          "Requires manual ASS/HarfBuzz/libass FFmpeg pipelines to avoid broken RTL Nastaliq glyphs",
      },
      {
        dimension: "Privacy & cost model",
        urduSpeech:
          "Automated cloud processing (zero model training, 3–90 day expiry); PKR 0 free trial, PKR 999–5,999/mo",
        competitor:
          "100% offline on your hardware; free software license (hardware/electricity/engineering time only)",
      },
    ],
    analysisSections: [
      {
        title:
          "The hidden engineering cost of burning Nastaliq subtitles with FFmpeg",
        body: (
          <p>
            Getting a raw <code>.srt</code> file out of Whisper takes one
            terminal command—the real time sink starts afterward. Raw Urdu
            transcripts often mix Arabic and Urdu Unicode characters, drift on
            long pauses, and lack Roman Urdu or bilingual stacks. Burning
            Nastaliq Urdu cleanly into an MP4 with FFmpeg requires configuring{" "}
            <code>libass</code>, HarfBuzz RTL shaping, explicit Noto Nastaliq
            line heights, safe-area padding, and BT.2020-to-BT.709 HDR
            tone-mapping filters. UrduSpeech packages that entire workflow into
            a reliable studio you can use in five minutes. Read our{" "}
            <Link href="/methodology">technical methodology</Link> to see how
            each stage operates.
          </p>
        ),
      },
      {
        title: "When self-hosting Whisper is genuinely the better call",
        body: (
          <p>
            If you handle strictly air-gapped legal, defense, or confidential
            archival audio that cannot touch any external cloud infrastructure,
            running open-source Whisper locally on your own machine is the right
            architectural choice. For creators, journalists, educators, and
            teams who want fast turnaround, clean Nastaliq renders, and zero
            maintenance overhead, UrduSpeech Studio saves hours every week.
          </p>
        ),
      },
    ],
    faqs: [
      {
        question: "Can I validate or convert Whisper-generated SRT files here?",
        answer: (
          <p>
            Yes—drop any Whisper <code>.srt</code> file into our free browser{" "}
            <Link href="/tools/srt-to-vtt-converter">
              SRT to WebVTT converter and Urdu validator
            </Link>{" "}
            to check overlapping timestamps or convert to WebVTT locally with
            zero upload.
          </p>
        ),
      },
      {
        question: "Does UrduSpeech train models on my recordings?",
        answer: (
          <p>
            No. UrduSpeech never trains its own models on user audio or video,
            and media expires automatically after 3–90 days depending on your
            plan. See <Link href="/security">security and retention</Link>.
          </p>
        ),
      },
    ],
  },
  {
    slug: "urduspeech-vs-google-docs-voice-typing",
    competitor: "Google Docs Voice Typing",
    title: "UrduSpeech vs Google Docs Voice Typing for Urdu",
    seoTitle: "UrduSpeech vs Google Docs Voice Typing for Urdu",
    description:
      "Compare uploaded audio and video transcription, timed SRT/VTT/MP4 exports, and bilingual outputs against live browser microphone dictation.",
    summary:
      "Google Docs Voice Typing is free for live microphone dictation into a document; UrduSpeech transcribes pre-recorded Urdu audio and video files with timestamps, Roman Urdu, English translation, and burned-in MP4 captions.",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 670,
    verdictSummary:
      "Use Google Docs Voice Typing when you are speaking live into a microphone to draft a free Urdu document; use UrduSpeech when you have an existing audio or video file (voice note, interview, podcast, or Reel) and need timestamps, Roman Urdu, English translation, or video captions.",
    chooseUrduSpeech: [
      "You already have a recorded audio or video file (MP3, M4A, WAV, FLAC, MP4, MOV) and cannot re-speak it live.",
      "You need timed UTF-8 SRT or WebVTT subtitles for YouTube, Premiere Pro, or web players.",
      "You want Roman Urdu transliteration, English translation, or stacked Urdu + English captions from the same file.",
      "You want burned-in Noto Nastaliq Urdu captions rendered directly onto your MP4 video.",
    ],
    chooseCompetitor: [
      "You want free, real-time microphone dictation in Chrome to draft an article or essay while speaking slowly at your desk.",
      "You do not have an existing audio or video file and do not need timestamps or subtitle files.",
      "You want text placed directly inside a collaborative Google Doc with zero file upload.",
    ],
    matrixRows: [
      {
        dimension: "Input method",
        urduSpeech:
          "Uploaded local audio/video files (MP3, FLAC, WAV, M4A, MP4, MOV)",
        competitor:
          "Live microphone dictation in desktop Chrome only (no native file upload)",
      },
      {
        dimension: "Timestamps & SRT/VTT subtitles",
        urduSpeech:
          "Full phrase-level timing editor + UTF-8 SRT and WebVTT exports",
        competitor: "Un-timestamped plain document text only",
      },
      {
        dimension: "Roman Urdu & bilingual translation",
        urduSpeech:
          "Native Urdu Nastaliq, Roman Urdu, English, and stacked Urdu + English",
        competitor: "Single selected dictation language at a time",
      },
      {
        dimension: "Burned-in video captions (MP4)",
        urduSpeech:
          "Clean, Social highlight, and Boxed Noto Nastaliq MP4 video rendering",
        competitor: "Not supported",
      },
      {
        dimension: "AI text correction & punctuation",
        urduSpeech:
          "Optional conservative Urdu character/punctuation cleanup with accept/reject review",
        competitor:
          "Basic live dictation; punctuation often requires manual cleanup",
      },
      {
        dimension: "Cost",
        urduSpeech:
          "10 free minutes, then PKR 999 / 2,499 / 5,999 monthly plans",
        competitor: "Free with a Google account",
      },
    ],
    analysisSections: [
      {
        title: "Why playing audio into a microphone rarely works well",
        body: (
          <p>
            Many creators try playing an Urdu voice note or interview from their
            phone speaker next to a laptop microphone running Google Docs Voice
            Typing. Acoustic feedback, room echo, and automatic silence timeouts
            degrade recognition sharply—and you still end up without timestamps,
            Roman Urdu, or subtitle cues. Uploading the actual audio file into{" "}
            <Link href="/urdu-transcription">UrduSpeech Studio</Link> processes
            the clean digital audio stream directly with zero microphone loss.
          </p>
        ),
      },
      {
        title: "Live dictation vs pre-recorded file workflows",
        body: (
          <p>
            We state clearly across UrduSpeech that Studio is built for uploaded
            files, not real-time voice typing. If you want to sit at your desk
            and dictate Urdu prose live into a document for free, Google Docs
            Voice Typing is genuinely useful. The moment you have a recorded
            voice memo, interview, lecture, podcast, or video file to turn into
            text or subtitles, UrduSpeech is purpose-built for the job.
          </p>
        ),
      },
    ],
    faqs: [
      {
        question: "Does UrduSpeech offer live microphone typing?",
        answer: (
          <p>
            No. Record your voice memo on your phone or computer in M4A, MP3,
            WAV, or FLAC, then upload the file to Studio for transcription,
            editing, and TXT/SRT/VTT export.
          </p>
        ),
      },
      {
        question: "Can I copy an UrduSpeech TXT transcript into Google Docs?",
        answer: (
          <p>
            Yes. Every project exports standard UTF-8 plain text (
            <code>.txt</code>) in Urdu script, Roman Urdu, English, or bilingual
            order that pastes cleanly into Google Docs, Notion, or Word.
          </p>
        ),
      },
    ],
  },
];

export function getComparisonBySlug(slug: string) {
  return publicComparisons.find((item) => item.slug === slug);
}
