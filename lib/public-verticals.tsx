import Link from "next/link";
import type { ReactNode } from "react";
import type { QuestionItem } from "@/components/marketing";
import type { OgImageKey } from "@/lib/seo";

export type VerticalSlug =
  | "urdu-captions-for-reels-tiktok"
  | "bilingual-urdu-english-captions"
  | "urdu-voice-notes-to-text"
  | "srt-vtt-urdu-subtitle-generator"
  | "youtube-urdu-subtitles"
  | "urdu-podcast-transcription";

export interface VerticalPageSpec {
  slug: VerticalSlug;
  breadcrumb: string;
  title: string;
  h1: string;
  description: string;
  intro: ReactNode;
  ogImage: OgImageKey;
  appName: string;
  featureList: readonly string[];
  sampleLabel: string;
  sampleCues: readonly {
    time: string;
    urdu: string;
    secondary: string;
    secondaryLang: "ur-Latn" | "en";
  }[];
  workflowHeading: string;
  workflowIntro: string;
  steps: readonly { title: string; body: ReactNode }[];
  tableHeading: string;
  tableIntro: string;
  tableAria: string;
  tableColumns: readonly [string, string, string];
  tableRows: readonly [string, ReactNode, ReactNode][];
  deepDiveHeading: string;
  deepDiveBody: ReactNode;
  faqHeading: string;
  faqs: readonly QuestionItem[];
  relatedLinks: readonly { href: `/${string}`; label: string }[];
  ctaTitle: string;
  ctaCopy: string;
}

export const verticalPages: Record<VerticalSlug, VerticalPageSpec> = {
  "urdu-captions-for-reels-tiktok": {
    slug: "urdu-captions-for-reels-tiktok",
    breadcrumb: "Reels & TikTok captions",
    title: "Urdu Captions for Instagram Reels & TikTok",
    h1: "Burned-in Urdu captions for Instagram Reels, TikTok & Shorts",
    description:
      "Create burned-in Nastaliq Urdu, Roman Urdu, and bilingual 9:16 video captions for Instagram Reels, TikTok, and YouTube Shorts with clean presets.",
    intro: (
      <p>
        Most viewers scroll Instagram Reels, TikTok, and YouTube Shorts with
        sound muted. Upload your vertical 9:16 MP4 or MOV clip to UrduSpeech
        Studio, review every Urdu,{" "}
        <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link>, or bilingual
        cue, and export a burned-in MP4 styled in{" "}
        <strong>Noto Nastaliq Urdu</strong>—so ligatures never split and mobile
        apps never override your typography.
      </p>
    ),
    ogImage: "captions",
    appName: "UrduSpeech — Urdu Captions for Instagram Reels & TikTok",
    featureList: [
      "9:16 portrait video support preserving vertical framing up to 1080p",
      "Clean, Social highlight (#FFD54F), and Boxed Nastaliq burned-in presets",
      "Automatic BT.2020 HLG/PQ iPhone HDR to SDR BT.709 tone-mapping",
      "Urdu script, Roman Urdu, English, and stacked bilingual caption modes",
    ],
    sampleLabel: "9:16 short-form reel sample",
    sampleCues: [
      {
        time: "00:00–00:03",
        urdu: "پہلے تین سیکنڈ میں ناظرین کی توجہ پکڑیں۔",
        secondary: "Pehle teen second mein nazreen ki tawajjah pakrein.",
        secondaryLang: "ur-Latn",
      },
      {
        time: "00:03–00:07",
        urdu: "صاف نستعلیق کیپشن خاموش اسکرول کو روک دیتے ہیں۔",
        secondary: "Saaf Nastaliq caption khamosh scroll ko rok dete hain.",
        secondaryLang: "ur-Latn",
      },
      {
        time: "00:07–00:10",
        urdu: "مکمل ویڈیو دیکھنے کے لیے پروفائل فالو کریں۔",
        secondary: "Mukammal video dekhne ke liye profile follow karein.",
        secondaryLang: "ur-Latn",
      },
    ],
    workflowHeading: "Four steps from raw 9:16 clip to ready-to-post Reel",
    workflowIntro:
      "Keep vertical framing crisp and legible without fighting broken RTL text layers on your phone.",
    steps: [
      {
        title: "1. Upload your vertical MP4 or MOV clip",
        body: (
          <p>
            Export your edited 9:16 Reel or TikTok in H.264/HEVC with AAC audio.
            iPhone HDR clips (BT.2020 HLG/PQ) are automatically tone-mapped to
            SDR BT.709 during render so highlights do not blow out on Instagram.
          </p>
        ),
      },
      {
        title: "2. Choose Nastaliq, Roman Urdu, or stacked bilingual",
        body: (
          <p>
            Pick <strong>Urdu</strong> for authentic Nastaliq authority,{" "}
            <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link> for casual
            Gen-Z feeds, or{" "}
            <Link href="/bilingual-urdu-english-captions">Urdu + English</Link>{" "}
            to reach overseas diaspora followers in the same post.
          </p>
        ),
      },
      {
        title: "3. Keep hooks tight and verify names",
        body: (
          <p>
            Review the opening 3-second hook in Studio, trim long clauses so
            text stays inside safe-area margins away from TikTok and Reels UI
            buttons, and confirm brand names and numbers.
          </p>
        ),
      },
      {
        title: "4. Render Clean, Social highlight, or Boxed MP4",
        body: (
          <p>
            Choose <strong>Social highlight</strong> (<code>#FFD54F</code> gold)
            for energetic short videos, <strong>Boxed</strong> over busy outdoor
            backgrounds, or <strong>Clean</strong> for minimal talking-head
            lighting. Paid plans export crisp 1080p vertical MP4 with zero
            watermark.
          </p>
        ),
      },
    ],
    tableHeading: "Choosing the right caption preset for vertical video",
    tableIntro:
      "Match your burned-in visual style to your filming environment so Urdu strokes stay crisp on bright phone screens.",
    tableAria: "Burned-in caption presets for Reels, TikTok, and Shorts",
    tableColumns: ["Preset", "Visual treatment", "Best vertical footage"],
    tableRows: [
      [
        "Social highlight",
        <>
          High-contrast gold (<code>#FFD54F</code>) text with dark shadow
        </>,
        "Fast-paced commentary, educational hooks, creator tips, and TikTok explainers",
      ],
      [
        "Boxed",
        "White Noto Nastaliq Urdu / Inter over a solid dark backing plate",
        "Bright outdoor street vlogs, kitchens, white walls, and high-motion B-roll",
      ],
      [
        "Clean",
        "White text with subtle edge shadow and no background box",
        "Cinematic studio lighting, podcasts, poetry, and minimalist brand reels",
      ],
    ],
    deepDiveHeading:
      "Why burned-in Nastaliq beats in-app Instagram and TikTok auto-captions",
    deepDiveBody: (
      <>
        <p>
          Instagram, TikTok, and YouTube Shorts auto-captions either omit Urdu
          support on many accounts or render disconnected Arabic-style letters
          with clipped diacritics. Worse, in-app caption overlays cannot export
          cleanly across platforms—forcing you to redo captions three times for
          Reels, TikTok, and Shorts.
        </p>
        <p>
          Rendering a single burned-in captioned MP4 in UrduSpeech Studio gives
          you one consistent 1080p vertical master with verified safe-area
          margins, balanced Noto Nastaliq Urdu and Inter sizing for mixed
          Urdu-English words, and a companion UTF-8 <code>.srt</code> file if
          you also need captions in Premiere or CapCut. See how UrduSpeech
          compares directly in{" "}
          <Link href="/compare/urduspeech-vs-capcut">
            UrduSpeech vs CapCut for Urdu captions
          </Link>
          .
        </p>
      </>
    ),
    faqHeading: "Reels & TikTok Urdu caption questions",
    faqs: [
      {
        question: "Does UrduSpeech preserve 9:16 vertical aspect ratio?",
        answer: (
          <p>
            Yes. Portrait (9:16), square (1:1), and landscape (16:9) videos keep
            their original orientation. Free exports render up to 720p (
            <code>720×1280</code> vertical) with a watermark; paid plans render
            up to 1080p without a watermark.
          </p>
        ),
      },
      {
        question: "Why did my iPhone HDR reel look washed out in other tools?",
        answer: (
          <p>
            Many tools ignore BT.2020 HLG/PQ HDR color metadata. UrduSpeech
            tone-maps properly tagged iPhone HDR footage to SDR BT.709 when
            rendering your captioned MP4 so colors stay natural across social
            apps.
          </p>
        ),
      },
      {
        question:
          "Should I use Urdu Nastaliq or Roman Urdu for Pakistani TikTok?",
        answer: (
          <p>
            Use Nastaliq for news, storytelling, poetry, and formal education;
            use <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link> for
            fast-paced tech, comedy, and lifestyle hooks where viewers skim
            Latin letters rapidly.
          </p>
        ),
      },
    ],
    relatedLinks: [
      {
        href: "/video-captions",
        label: "Explore Urdu video captions & presets",
      },
      {
        href: "/compare/urduspeech-vs-capcut",
        label: "Compare UrduSpeech vs CapCut",
      },
      {
        href: "/bilingual-urdu-english-captions",
        label: "Create stacked Urdu + English reels",
      },
      {
        href: "/guides/make-urdu-video-captions",
        label: "Read the complete Urdu caption guide",
      },
    ],
    ctaTitle: "Caption your next vertical Reel or TikTok in Nastaliq",
    ctaCopy:
      "Upload a clip up to 10 minutes free (no card required) and test Clean, Social highlight, and Boxed captions in Studio.",
  },

  "bilingual-urdu-english-captions": {
    slug: "bilingual-urdu-english-captions",
    breadcrumb: "Bilingual Urdu + English",
    title: "Bilingual Urdu & English Video Captions",
    h1: "Stacked bilingual Urdu and English captions from one upload",
    description:
      "Generate stacked Urdu Nastaliq and English subtitles from one recording. Choose Urdu-first or English-first layout and export TXT, SRT, VTT, or MP4.",
    intro: (
      <p>
        Reach native Urdu speakers and international or diaspora viewers in a
        single video. Upload your spoken Urdu audio or video once, choose{" "}
        <strong>Urdu + English</strong> in UrduSpeech Studio, pick{" "}
        <strong>Urdu first</strong> or <strong>English first</strong>, refine
        both lines side by side, and export stacked bilingual{" "}
        <strong>TXT</strong>, <strong>SRT</strong>, <strong>VTT</strong>, or a
        burned-in <strong>captioned MP4</strong>.
      </p>
    ),
    ogImage: "english",
    appName: "UrduSpeech — Bilingual Urdu & English Video Captions",
    featureList: [
      "Dual-line Urdu Nastaliq (RTL) + English (LTR) cues from a single spoken Urdu recording",
      "Selectable Urdu-first or English-first line order at upload time",
      "Optically balanced Noto Nastaliq Urdu and Inter typography in MP4 renders",
      "Bilingual UTF-8 TXT, SRT, WebVTT, and burned-in MP4 export support",
    ],
    sampleLabel: "Stacked bilingual cue preview",
    sampleCues: [
      {
        time: "00:00–00:04",
        urdu: "پاکستان کے ہر شہر کا اپنا منفرد ذائقہ اور تاریخ ہے۔",
        secondary:
          "Every city in Pakistan has its own distinct flavor and history.",
        secondaryLang: "en",
      },
      {
        time: "00:04–00:08",
        urdu: "دو لسانی کیپشن دنیا بھر کے ناظرین کو جوڑ دیتے ہیں۔",
        secondary: "Bilingual captions connect audiences across the world.",
        secondaryLang: "en",
      },
      {
        time: "00:08–00:12",
        urdu: "آپ اردو اوپر یا انگلش اوپر اپنی مرضی سے منتخب کر سکتے ہیں۔",
        secondary:
          "You can choose Urdu on top or English on top before exporting.",
        secondaryLang: "en",
      },
    ],
    workflowHeading: "How stacked bilingual captioning works in Studio",
    workflowIntro:
      "Stop manually duplicating tracks and aligning two separate SRT files by hand.",
    steps: [
      {
        title: "1. Upload your spoken Urdu recording",
        body: (
          <p>
            Start with any supported MP4, MOV, MP3, M4A, WAV, or FLAC recording
            with clear Urdu speech. Both audio-only subtitle workflows and full
            video renders share the exact same minute allowance.
          </p>
        ),
      },
      {
        title: "2. Select Urdu + English and line order",
        body: (
          <p>
            On the new-upload screen, pick <strong>Urdu + English</strong> and
            set <strong>First caption line</strong> to{" "}
            <strong>Urdu first</strong> (Nastaliq above English) or{" "}
            <strong>English first</strong> (English above Nastaliq).
          </p>
        ),
      },
      {
        title: "3. Edit both scripts against local playback",
        body: (
          <p>
            Review Urdu spelling and English idioms together inside each cue
            card. Tighten long English clauses so viewers comfortably read both
            lines before the cue transitions.
          </p>
        ),
      },
      {
        title: "4. Export stacked SRT, VTT, TXT, or burned-in MP4",
        body: (
          <p>
            Download a dual-line UTF-8 SRT or VTT track, a paired bilingual TXT
            script, or a burned-in MP4 where Noto Nastaliq Urdu and Inter are
            optically scaled for balanced two-line reading.
          </p>
        ),
      },
    ],
    tableHeading: "Urdu-first vs English-first: which stack fits your viewers?",
    tableIntro:
      "Your line ordering signals who your video speaks to first while keeping both audiences included.",
    tableAria: "Comparison of Urdu-first vs English-first bilingual captions",
    tableColumns: ["Stack order", "Visual layout", "Best suited for"],
    tableRows: [
      [
        "Urdu first",
        "Right-to-left Nastaliq Urdu on top, left-to-right English directly below",
        "Pakistani podcasts, cultural documentaries, poetry, and local brands expanding abroad",
      ],
      [
        "English first",
        "Left-to-right English on top, right-to-left Nastaliq Urdu directly below",
        "Diaspora education, Urdu language learning channels, and global press explainers",
      ],
      [
        "Separate single-language tracks",
        "One Urdu SRT + one English SRT uploaded independently to YouTube",
        "Long-form YouTube videos where viewers prefer toggling one language at a time",
      ],
    ],
    deepDiveHeading:
      "Typography balance: keeping RTL Nastaliq and LTR English readable together",
    deepDiveBody: (
      <>
        <p>
          Stacking Urdu Nastaliq and English inside generic editors almost
          always creates awkward spacing: either the Urdu line looks tiny beside
          blocky English sans-serif letters, or tall Nastaliq strokes collide
          with the English line directly underneath.
        </p>
        <p>
          UrduSpeech’s renderer pairs <strong>Noto Nastaliq Urdu</strong> with{" "}
          <strong>Inter</strong> using calibrated vertical line heights and
          verified safe-area margins. Protected values—such as currency figures,
          dates, and URLs—stay accurate across both languages while you retain
          full editorial control in Studio. Note that UrduSpeech translates
          spoken Urdu into English text and captions; it does not translate
          English-only audio into Urdu or generate synthetic voice dubbing.
        </p>
      </>
    ),
    faqHeading: "Bilingual Urdu + English caption questions",
    faqs: [
      {
        question: "Do bilingual captions consume double minutes?",
        answer: (
          <p>
            No. Minute usage is based strictly on your recording’s duration, not
            on whether you select single-language or stacked bilingual Urdu +
            English output.
          </p>
        ),
      },
      {
        question: "Can I preview stacked bilingual captions before signing up?",
        answer: (
          <p>
            Yes—open the <Link href="/demo">interactive caption editor</Link>,
            select <strong>Bilingual</strong>, edit both Urdu and English lines,
            and download a sample SRT or VTT file immediately.
          </p>
        ),
      },
      {
        question:
          "How should I time bilingual cues so viewers have enough reading time?",
        answer: (
          <p>
            Two stacked lines take slightly longer to scan than one line. Keep
            each cue concise (one short thought per 2.5 to 5 seconds) and avoid
            splitting a single Urdu clause across rapid half-second cuts.
          </p>
        ),
      },
    ],
    relatedLinks: [
      {
        href: "/urdu-audio-to-english-text",
        label: "Urdu audio to English text & subtitles",
      },
      {
        href: "/guides/urdu-roman-urdu-and-english",
        label: "Compare all four UrduSpeech script outputs",
      },
      {
        href: "/urdu-captions-for-reels-tiktok",
        label: "Burned-in captions for Reels & TikTok",
      },
      { href: "/demo", label: "Try stacked bilingual editing in the browser" },
    ],
    ctaTitle: "Publish your next video in both Urdu and English",
    ctaCopy:
      "Start with 10 free minutes (no card required) and export stacked bilingual SRT, VTT, TXT, or burned-in MP4.",
  },

  "urdu-voice-notes-to-text": {
    slug: "urdu-voice-notes-to-text",
    breadcrumb: "Voice notes to text",
    title: "Urdu Voice Notes & Memos to Text",
    h1: "Convert saved Urdu voice notes and phone memos into text",
    description:
      "Turn saved iPhone M4A, Android MP3/WAV, and converted WhatsApp voice messages into editable Urdu, Roman Urdu, or English UTF-8 text transcripts.",
    intro: (
      <p>
        Stop replaying five-minute Urdu voice messages to copy down addresses,
        meeting notes, or interview quotes. Upload saved <strong>M4A</strong>,{" "}
        <strong>MP3</strong>, <strong>WAV</strong>, or <strong>FLAC</strong>{" "}
        voice recordings to UrduSpeech Studio and download clean, editable UTF-8
        text in Nastaliq Urdu,{" "}
        <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link>, or{" "}
        <Link href="/urdu-audio-to-english-text">English</Link>.
      </p>
    ),
    ogImage: "transcription",
    appName: "UrduSpeech — Urdu Voice Notes to Text",
    featureList: [
      "Direct upload for iPhone Voice Memos (.m4a) and Android voice recordings (.mp3, .wav, .flac)",
      "Editable Urdu Nastaliq, Roman Urdu, English, and bilingual UTF-8 TXT output",
      "Protected numbers, prices, URLs, and dates during optional AI correction",
      "Private automated processing with manual project deletion and automatic expiry",
    ],
    sampleLabel: "Voice memo to written notes sample",
    sampleCues: [
      {
        time: "00:00–00:04",
        urdu: "سلام، کل میٹنگ کا وقت تین بجے طے ہو گیا ہے۔",
        secondary: "Salam, kal meeting ka waqt teen baje tay ho gaya hai.",
        secondaryLang: "ur-Latn",
      },
      {
        time: "00:04–00:08",
        urdu: "براہِ کرم انوائس اور ڈیزائن فائلیں صبح بھیج دیں۔",
        secondary: "Barah-e-karam invoice aur design files subah bhej dein.",
        secondaryLang: "ur-Latn",
      },
      {
        time: "00:08–00:12",
        urdu: "کوئی تبدیلی ہو تو واٹس ایپ پر میسج کر دیجیے گا۔",
        secondary: "Koi tabdeeli ho to WhatsApp par message kar dijiye ga.",
        secondaryLang: "ur-Latn",
      },
    ],
    workflowHeading: "How to transcribe phone voice memos and chat audio",
    workflowIntro:
      "Verify the saved file extension first, then generate editable text in four quick steps.",
    steps: [
      {
        title: "1. Check your file format (M4A, MP3, WAV, FLAC)",
        body: (
          <p>
            iPhone Voice Memos (<code>.m4a</code>) and Android voice recorders (
            <code>.mp3</code> / <code>.m4a</code> / <code>.wav</code>) upload
            directly. WhatsApp exports (<code>.opus</code> / <code>.ogg</code>)
            must be converted locally to M4A, MP3, or WAV first—see our{" "}
            <Link href="/guides/voice-notes-to-text">
              step-by-step WhatsApp conversion instructions
            </Link>
            .
          </p>
        ),
      },
      {
        title: "2. Pick Urdu, Roman Urdu, or English output",
        body: (
          <p>
            Choose <strong>Roman Urdu</strong> for fast team chat notes,{" "}
            <strong>Urdu script</strong> for formal letters or articles, or{" "}
            <strong>English</strong> when summarizing an Urdu voice brief for
            international clients.
          </p>
        ),
      },
      {
        title: "3. Review names, prices, and quick pauses",
        body: (
          <p>
            Play your local audio file inside Studio alongside the draft text to
            verify spoken numbers, client names, dates, and mixed Urdu-English
            phrases.
          </p>
        ),
      },
      {
        title: "4. Export UTF-8 TXT (or delete immediately after)",
        body: (
          <p>
            Download a clean UTF-8 <code>.txt</code> transcript (or timestamped{" "}
            <code>.srt</code> / <code>.vtt</code>). For sensitive voice memos,
            you can delete the project inside Studio right after copying your
            text.
          </p>
        ),
      },
    ],
    tableHeading: "Honest scope for voice notes and messaging audio",
    tableIntro:
      "Know exactly what Studio supports before starting your workflow.",
    tableAria: "Voice note transcription capabilities and boundaries",
    tableColumns: ["Workflow item", "Status in Studio", "Recommended approach"],
    tableRows: [
      [
        "iPhone Voice Memos (.m4a) & Android (.mp3/.wav)",
        "Directly supported",
        "Upload directly from Files or Downloads in Studio",
      ],
      [
        "WhatsApp .opus / .ogg files",
        "Convert locally first",
        "Convert offline via VLC or FFmpeg to .m4a or .mp3, then upload",
      ],
      [
        "Live microphone dictation or WhatsApp bot",
        "Not offered",
        "Record locally first; Studio only processes uploaded files (see Google Docs comparison)",
      ],
      [
        "Human review or model training",
        "Never performed",
        "Processing is automated and recordings expire after 3–90 days",
      ],
    ],
    deepDiveHeading: "Privacy first for personal and client voice recordings",
    deepDiveBody: (
      <>
        <p>
          Voice notes frequently contain private business quotes, medical
          reminders, family discussions, or unreleased reporting sources. Unlike
          human transcription agencies or free consumer tools that reserve
          rights to reuse user audio for training, UrduSpeech processes files
          through an automated pipeline, never trains models on your audio, and
          automatically removes uploaded recordings after your plan’s retention
          window (3 days on Free up to 90 days on Studio)—or earlier when you
          delete a project manually.
        </p>
        <p>
          Read our full{" "}
          <Link href="/security">security and retention documentation</Link>, or
          compare uploaded transcription with live dictation in{" "}
          <Link href="/compare/urduspeech-vs-google-docs-voice-typing">
            UrduSpeech vs Google Docs Voice Typing
          </Link>
          .
        </p>
      </>
    ),
    faqHeading: "Urdu voice note transcription questions",
    faqs: [
      {
        question: "Why doesn’t UrduSpeech connect directly to my WhatsApp?",
        answer: (
          <p>
            Keeping Studio file-based protects your chat privacy and requires no
            messaging-account permissions. Export only the specific voice note
            you need, convert <code>.opus</code> to <code>.m4a</code> or{" "}
            <code>.mp3</code> locally, and upload that single file.
          </p>
        ),
      },
      {
        question: "How many minutes does a 2-minute voice note use?",
        answer: (
          <p>
            Usage is duration-based, so a 2-minute voice note uses 2 minutes out
            of your 10-minute Free trial or monthly Starter/Creator/Studio
            allowance.
          </p>
        ),
      },
      {
        question: "Can it transcribe noisy voice messages recorded in traffic?",
        answer: (
          <p>
            Studio will still produce an editable draft, though heavy road noise
            or wind increases uncertain words. Always replay noisy segments
            using Studio’s local audio player to verify names and figures.
          </p>
        ),
      },
    ],
    relatedLinks: [
      {
        href: "/guides/voice-notes-to-text",
        label: "Full guide: Convert Urdu voice notes to text",
      },
      {
        href: "/urdu-transcription",
        label: "Urdu speech-to-text & audio transcription",
      },
      {
        href: "/compare/urduspeech-vs-google-docs-voice-typing",
        label: "UrduSpeech vs Google Docs Voice Typing",
      },
      {
        href: "/supported-formats",
        label: "Check supported audio formats & file limits",
      },
    ],
    ctaTitle: "Turn your next Urdu voice memo into clean text",
    ctaCopy:
      "Start with 10 free minutes (no card required) and export editable Nastaliq, Roman Urdu, or English UTF-8 TXT.",
  },

  "srt-vtt-urdu-subtitle-generator": {
    slug: "srt-vtt-urdu-subtitle-generator",
    breadcrumb: "SRT & VTT generator",
    title: "Urdu SRT & WebVTT Subtitle Generator",
    h1: "Generate valid UTF-8 Urdu SRT and WebVTT subtitle files",
    description:
      "Generate timed UTF-8 SRT and WebVTT Urdu subtitle files from uploaded audio or video. Verify non-overlapping cues for YouTube, Premiere, and HTML5.",
    intro: (
      <p>
        Need clean, standards-compliant timed subtitle files instead of
        burned-in video? Upload your Urdu audio or video recording to UrduSpeech
        Studio, refine every cue and timestamp in seconds, and download UTF-8{" "}
        <strong>SRT</strong> (<code>.srt</code>) and <strong>WebVTT</strong> (
        <code>.vtt</code>) files ready for YouTube Studio, Premiere Pro, DaVinci
        Resolve, Vimeo, and HTML5 web players.
      </p>
    ),
    ogImage: "captions",
    appName: "UrduSpeech — Urdu SRT & WebVTT Subtitle Generator",
    featureList: [
      "Automatic Urdu speech-to-timed-subtitle generation from MP3, M4A, WAV, FLAC, MP4, and MOV",
      "Server-validated non-overlapping millisecond timestamps",
      "UTF-8 SRT (comma milliseconds) and W3C WebVTT (WEBVTT header + escaped entities)",
      "Supports Urdu script, Roman Urdu, English translation, and stacked bilingual tracks",
    ],
    sampleLabel: "Timed UTF-8 SRT & WebVTT sample",
    sampleCues: [
      {
        time: "00:00:00,000 → 00:00:03,800",
        urdu: "درست ٹائم اسٹیمپ کے بغیر سب ٹائٹل ویڈیو سے آگے پیچھے ہو جاتے ہیں۔",
        secondary:
          "Without accurate timestamps, subtitles drift out of sync with video.",
        secondaryLang: "en",
      },
      {
        time: "00:00:04,000 → 00:00:08,100",
        urdu: "یوٹیوب اور پریمیئر پرو کے لیے UTF-8 ایس آر ٹی سب سے بہتر ہے۔",
        secondary:
          "UTF-8 SRT is the standard choice for YouTube Studio and Premiere Pro.",
        secondaryLang: "en",
      },
      {
        time: "00:00:08,400 → 00:00:12,000",
        urdu: "ویب پلیئرز کے لیے WebVTT فائل ایک کلک میں ڈاؤن لوڈ کریں۔",
        secondary: "Download WebVTT files in one click for HTML5 web players.",
        secondaryLang: "en",
      },
    ],
    workflowHeading: "Generate standards-compliant SRT and VTT in four steps",
    workflowIntro:
      "Every timestamp and character encoding rule is enforced before your file downloads.",
    steps: [
      {
        title: "1. Upload video or a synced audio bounce",
        body: (
          <p>
            Upload your MP4/MOV master—or, for giant 4K timelines, upload a
            lightweight AAC M4A or MP3 audio bounce with identical duration and
            zero trim offset so SRT/VTT timestamps match frame-for-frame.
          </p>
        ),
      },
      {
        title: "2. Choose Urdu, Roman Urdu, English, or Bilingual",
        body: (
          <p>
            Generate native Urdu UTF-8 subtitles, left-to-right Roman Urdu cues
            for legacy NLEs, English translation tracks for international
            channels, or dual-line bilingual files.
          </p>
        ),
      },
      {
        title: "3. Edit cues and validate timestamps in seconds",
        body: (
          <p>
            Review text alongside local playback and adjust cue start/end times.
            Studio prevents overlapping cues and out-of-bounds timestamps before
            saving a track version.
          </p>
        ),
      },
      {
        title: "4. Download UTF-8 .srt and .vtt from the same project",
        body: (
          <p>
            Export both SRT and WebVTT as many times as you like without extra
            minute charges—and note that subtitle files remain saved even after
            source media expires.
          </p>
        ),
      },
    ],
    tableHeading: "Technical differences between UrduSpeech SRT and WebVTT",
    tableIntro:
      "Both exports use strict UTF-8 encoding so Urdu characters never corrupt on Windows, macOS, or Linux.",
    tableAria: "Technical comparison of SRT and WebVTT outputs",
    tableColumns: ["Specification", "SRT (.srt)", "WebVTT (.vtt)"],
    tableRows: [
      ["Header line", "None (starts at cue 1)", "Mandatory WEBVTT header"],
      [
        "Timestamp separator",
        <>
          Comma milliseconds (<code>00:01:05,250</code>)
        </>,
        <>
          Period milliseconds (<code>00:01:05.250</code>)
        </>,
      ],
      [
        "Entity escaping",
        "Raw UTF-8 text",
        <>
          Escapes <code>&amp;</code>, <code>&lt;</code>, and <code>&gt;</code>{" "}
          per W3C WebVTT
        </>,
      ],
      [
        "Best target platforms",
        "YouTube Studio, Premiere Pro, DaVinci Resolve, Final Cut, VLC",
        "HTML5 <track>, Vimeo, Teachable/LMS course players, YouTube Studio",
      ],
    ],
    deepDiveHeading:
      "Already have an SRT file? Convert and validate it free in your browser",
    deepDiveBody: (
      <>
        <p>
          If you already exported an Urdu or English subtitle track and just
          need to convert between <code>.srt</code> and <code>.vtt</code>, strip
          timestamps into plain <code>.txt</code>, or check for overlapping cues
          before uploading to YouTube or an LMS, use our free client-side{" "}
          <Link href="/tools/srt-to-vtt-converter">
            SRT to WebVTT converter and Urdu subtitle validator
          </Link>
          —no account required and zero files leave your device.
        </p>
        <p>
          For deeper guidance on configuring South Asian / Middle Eastern RTL
          text engines in Adobe Premiere Pro and DaVinci Resolve, read{" "}
          <Link href="/guides/subtitle-and-video-exports">
            When to export TXT, SRT, VTT, or captioned MP4
          </Link>
          .
        </p>
      </>
    ),
    faqHeading: "SRT and WebVTT subtitle generator questions",
    faqs: [
      {
        question: "Why do my Urdu SRT files look garbled in Windows Notepad?",
        answer: (
          <p>
            Older text editors sometimes default to ANSI instead of UTF-8.
            UrduSpeech exports strict UTF-8 files that open cleanly in YouTube
            Studio, VS Code, Premiere Pro, DaVinci Resolve, and modern Notepad.
          </p>
        ),
      },
      {
        question: "Do SRT and VTT exports stay available after media expiry?",
        answer: (
          <p>
            Yes. Source video/audio files expire after 3–90 days depending on
            your plan, but your saved transcripts, timings, and SRT/VTT exports
            remain accessible in Studio until you delete the project or account.
          </p>
        ),
      },
      {
        question: "Can I get SRT files for a 3-hour Urdu video?",
        answer: (
          <p>
            Yes. The Creator plan supports recordings up to 180 minutes and
            Studio supports up to 360 minutes (under 2 GiB scanning limit—use a
            synced audio bounce if your 4K video is larger than 2 GiB).
          </p>
        ),
      },
    ],
    relatedLinks: [
      {
        href: "/tools/srt-to-vtt-converter",
        label: "Free browser SRT to WebVTT converter & validator",
      },
      {
        href: "/guides/subtitle-and-video-exports",
        label: "Guide: TXT, SRT, VTT, and captioned MP4 exports",
      },
      {
        href: "/youtube-urdu-subtitles",
        label: "YouTube Urdu subtitle workflow",
      },
      {
        href: "/video-captions",
        label: "Need burned-in Nastaliq MP4 instead?",
      },
    ],
    ctaTitle: "Generate your first UTF-8 Urdu SRT or WebVTT track",
    ctaCopy:
      "Try Studio free with 10 minutes (no card required) or download sample SRT and VTT exports right now in the browser demo.",
  },

  "youtube-urdu-subtitles": {
    slug: "youtube-urdu-subtitles",
    breadcrumb: "YouTube Urdu subtitles",
    title: "YouTube Urdu Subtitles & Closed Captions",
    h1: "Accurate Urdu and English subtitles for YouTube creators",
    description:
      "Prepare reviewed Urdu, Roman Urdu, and English SRT or VTT tracks for YouTube Studio closed captions—plus burned-in Nastaliq MP4s for Shorts.",
    intro: (
      <p>
        Replace patchy auto-captions with clean, reviewed UTF-8{" "}
        <strong>SRT</strong> and <strong>WebVTT</strong> tracks tailored to
        Pakistani Urdu, mixed English terminology, and guest names. Publish
        separate Urdu and English closed-caption tracks for long-form YouTube
        videos, or render burned-in Nastaliq MP4 videos for vertical YouTube
        Shorts.
      </p>
    ),
    ogImage: "captions",
    appName: "UrduSpeech — YouTube Urdu Subtitles & Closed Captions",
    featureList: [
      "Frame-accurate UTF-8 SRT and VTT exports built for YouTube Studio upload",
      "Audio-bounce workflow for 4K masters exceeding 2 GiB",
      "Separate Urdu script, Roman Urdu, and English translation outputs",
      "Burned-in 1080p Nastaliq MP4 renders for YouTube Shorts",
    ],
    sampleLabel: "YouTube channel subtitle sample",
    sampleCues: [
      {
        time: "00:00–00:04",
        urdu: "آج کے ریویو میں ہم نئے کیمرے کا تفصیلی ٹیسٹ کریں گے۔",
        secondary:
          "In today’s review, we will run a full test of the new camera.",
        secondaryLang: "en",
      },
      {
        time: "00:04–00:08",
        urdu: "ٹائم اسٹیمپ نیچے ڈسکرپشن میں موجود ہیں۔",
        secondary: "Chapter timestamps are listed in the description below.",
        secondaryLang: "en",
      },
      {
        time: "00:08–00:12",
        urdu: "اپنی رائے کمنٹس میں ضرور بتائیں۔",
        secondary: "Share your thoughts in the comments below.",
        secondaryLang: "en",
      },
    ],
    workflowHeading: "A clean YouTube subtitle workflow for 16:9 and Shorts",
    workflowIntro:
      "Keep your 4K master untouched while shipping accurate multi-language captions.",
    steps: [
      {
        title: "1. Export your final cut or synced audio bounce",
        body: (
          <p>
            Lock your YouTube timeline first so cues never drift. If your 4K
            master exceeds 2 GiB, upload a matching-length M4A or MP3 audio
            bounce—it uploads in seconds and generates identical timestamps.
          </p>
        ),
      },
      {
        title: "2. Generate Urdu or English tracks in Studio",
        body: (
          <p>
            Create an <strong>Urdu</strong> track for native viewers and
            optionally an{" "}
            <Link href="/urdu-audio-to-english-text">English</Link> track for
            global reach. Review names, sponsor mentions, and technical jargon
            before saving.
          </p>
        ),
      },
      {
        title: "3. Upload With Timing inside YouTube Studio",
        body: (
          <p>
            Download UTF-8 <code>.srt</code> or <code>.vtt</code>, open YouTube
            Studio →{" "}
            <strong>
              Subtitles → Add language → Upload file → With timing
            </strong>
            , and publish. Follow every screenshot step in our{" "}
            <Link href="/guides/urdu-subtitles-for-youtube">
              YouTube Studio upload guide
            </Link>
            .
          </p>
        ),
      },
      {
        title: "4. Burn Nastaliq captions for YouTube Shorts",
        body: (
          <p>
            For 60-second vertical Shorts where captions should stay visible in
            proper Nastaliq, export a burned-in{" "}
            <Link href="/video-captions">captioned MP4</Link> in Social
            highlight or Boxed style and skip duplicate bottom CC tracks.
          </p>
        ),
      },
    ],
    tableHeading: "Long-form YouTube videos vs YouTube Shorts",
    tableIntro:
      "Match your export format to how viewers actually watch each format.",
    tableAria: "Export recommendations for YouTube long-form vs Shorts",
    tableColumns: ["YouTube format", "Best UrduSpeech export", "Why it works"],
    tableRows: [
      [
        "16:9 Long-form (10–180 min)",
        "UTF-8 SRT / VTT closed captions",
        "Zero re-encoding of 4K video, viewer-toggleable CC, supports separate Urdu + English tracks",
      ],
      [
        "9:16 YouTube Shorts (<60 sec)",
        "Burned-in 1080p Captioned MP4",
        "Guarantees authentic Noto Nastaliq Urdu styling with Social highlight or Boxed contrast",
      ],
      [
        "Podcast episodes & essays",
        "SRT + UTF-8 TXT transcript",
        "Attach SRT to YouTube while repurposing TXT into pinned comments, chapters, and blog posts",
      ],
    ],
    deepDiveHeading: "Honest integration notes for YouTube creators",
    deepDiveBody: (
      <>
        <p>
          UrduSpeech does not request Google OAuth access to your YouTube
          channel and does not download videos from YouTube URLs. Working from
          your own local edit master or audio bounce guarantees you only process
          recordings you own, protects your channel credentials, and lets you
          publish subtitles before your video even leaves Unlisted status.
        </p>
        <p>
          Check <Link href="/pricing">Creator (200 min/mo, PKR 2,499)</Link> and{" "}
          <Link href="/pricing">Studio (500 min/mo, PKR 5,999)</Link> plans for
          weekly upload schedules, and use our{" "}
          <Link href="/tools/srt-to-vtt-converter">free SRT validator</Link>{" "}
          anytime you edit subtitle files locally.
        </p>
      </>
    ),
    faqHeading: "YouTube Urdu subtitle questions",
    faqs: [
      {
        question: "Can I paste a YouTube video link to generate subtitles?",
        answer: (
          <p>
            No. UrduSpeech only transcribes local audio and video files uploaded
            by the rights holder. Export your edit master or a synced audio
            bounce from your editing software and upload it in Studio.
          </p>
        ),
      },
      {
        question: "Should I upload .srt or .vtt to YouTube Studio?",
        answer: (
          <p>
            YouTube Studio accepts both UTF-8 <code>.srt</code> and{" "}
            <code>.vtt</code> cleanly. SRT is the most widely compatible format
            if you also plan to reuse the same file in Premiere Pro or DaVinci
            Resolve.
          </p>
        ),
      },
      {
        question: "How do I avoid double captions when uploading a Shorts MP4?",
        answer: (
          <p>
            When you upload a burned-in captioned MP4 to YouTube Shorts, do not
            publish an additional visible bottom CC track—or viewers with CC
            enabled will see two caption layers stacked on top of each other.
          </p>
        ),
      },
    ],
    relatedLinks: [
      {
        href: "/guides/urdu-subtitles-for-youtube",
        label: "Step-by-step YouTube Studio subtitle upload guide",
      },
      {
        href: "/srt-vtt-urdu-subtitle-generator",
        label: "UTF-8 SRT & WebVTT subtitle generator",
      },
      {
        href: "/urdu-captions-for-reels-tiktok",
        label: "Burned-in Nastaliq MP4 for Shorts & Reels",
      },
      {
        href: "/pricing",
        label: "Compare Creator & Studio monthly PKR plans",
      },
    ],
    ctaTitle: "Upgrade your YouTube channel’s Urdu captions",
    ctaCopy:
      "Test Studio on a 10-minute clip free (no card required) and upload your first reviewed UTF-8 SRT track to YouTube Studio.",
  },

  "urdu-podcast-transcription": {
    slug: "urdu-podcast-transcription",
    breadcrumb: "Podcast transcription",
    title: "Urdu Podcast & Interview Transcription",
    h1: "Transcribe long Urdu podcasts and interviews into text & clips",
    description:
      "Transcribe long Urdu podcasts and interviews up to 6 hours into editable Nastaliq, Roman Urdu, or English show notes, quotes, and timed subtitles.",
    intro: (
      <p>
        Turn 60-minute to 6-hour Urdu podcasts, panel interviews, and YouTube
        talk shows into searchable UTF-8 transcripts, episode show notes,
        YouTube SRT subtitles, and short promotional clip captions—all priced in
        Pakistani rupees with zero USD billing friction.
      </p>
    ),
    ogImage: "transcription",
    appName: "UrduSpeech — Urdu Podcast & Interview Transcription",
    featureList: [
      "Long-form audio/video uploads up to 180 min (Creator) and 360 min (Studio)",
      "Editable Nastaliq Urdu, Roman Urdu, English, and bilingual transcripts",
      "One upload yields plain-text TXT show notes plus timed SRT/VTT tracks",
      "Optional conservative AI correction guarding names, numbers, and mixed English terms",
    ],
    sampleLabel: "Podcast episode transcript sample",
    sampleCues: [
      {
        time: "00:14–00:18",
        urdu: "آج کے پوڈکاسٹ میں ہمارے ساتھ لاہور سے فلم ساز موجود ہیں۔",
        secondary: "Joining today’s podcast is a filmmaker from Lahore.",
        secondaryLang: "en",
      },
      {
        time: "00:18–00:23",
        urdu: "ہم آزاد سنیما، بجٹ اور نئے کریئیٹرز کے چیلنجز پر بات کریں گے۔",
        secondary:
          "We will discuss independent cinema, budgets, and challenges for new creators.",
        secondaryLang: "en",
      },
      {
        time: "00:23–00:27",
        urdu: "مکمل گفتگو کے اہم نکات نیچے شو نوٹس میں شامل ہیں۔",
        secondary:
          "Key takeaways from the full conversation are included in the show notes below.",
        secondaryLang: "en",
      },
    ],
    workflowHeading: "From full episode master to show notes and clips",
    workflowIntro:
      "Built for Pakistani podcasters, journalists, and long-form interviewers publishing every week.",
    steps: [
      {
        title: "1. Upload your episode audio (MP3, WAV, M4A, FLAC) or video",
        body: (
          <p>
            For 1- to 3-hour video podcasts whose 4K file exceeds 2 GiB, upload
            the mastered audio mix (MP3 or AAC M4A) so transcription finishes
            fast while timestamps still align with your full YouTube episode.
          </p>
        ),
      },
      {
        title: "2. Choose script for your show notes or YouTube CC",
        body: (
          <p>
            Select <strong>Urdu</strong> for Urdu transcripts and YouTube CC,{" "}
            <strong>Roman Urdu</strong> for fast editor paper-cuts, or{" "}
            <strong>English</strong> / <strong>Urdu + English</strong> to reach
            international listeners.
          </p>
        ),
      },
      {
        title: "3. Review guest names, quotes, and figures",
        body: (
          <p>
            Scrub key timestamps against local playback in Studio, verify guest
            names and statistics, and accept or reject conservative AI
            suggestions before saving.
          </p>
        ),
      },
      {
        title: "4. Export TXT show notes + SRT/VTT subtitles",
        body: (
          <p>
            Download UTF-8 <strong>TXT</strong> for blog posts, timestamps, and
            pull quotes, plus <strong>SRT</strong> / <strong>VTT</strong> for
            YouTube Studio and podcast web players. Upload 30–60 second vertical
            cutdowns separately to render burned-in Nastaliq promo Reels.
          </p>
        ),
      },
    ],
    tableHeading: "Podcast plan capacity and honest workflow notes",
    tableIntro:
      "Pick a plan based on total monthly episode length and longest single recording.",
    tableAria: "Podcast transcription capacity by UrduSpeech plan",
    tableColumns: ["Plan", "Monthly minutes & max episode", "Best for"],
    tableRows: [
      [
        "Starter (PKR 999 / mo)",
        "60 min/mo · max 60 min · 1 GiB · 15-day retention",
        "Monthly solo podcast, guest interviews, or short video essays",
      ],
      [
        "Creator (PKR 2,499 / mo)",
        "200 min/mo · max 180 min · <2 GiB · 30-day retention",
        "Weekly 45-minute Urdu podcasts and active YouTube interview channels",
      ],
      [
        "Studio (PKR 5,999 / mo)",
        "500 min/mo · max 360 min · <2 GiB · 90-day retention",
        "Multi-show networks, newsrooms, and marathon 3–6 hour livestreams",
      ],
    ],
    deepDiveHeading:
      "Multi-guest podcasts: speaker labels and code-switching tips",
    deepDiveBody: (
      <>
        <p>
          Two practical realities help podcasters get the best results from
          Studio. First, UrduSpeech currently transcribes speech as a single
          continuous track and{" "}
          <strong>does not perform automatic speaker diarization</strong>{" "}
          (assigning Host vs Guest labels automatically). If you publish a
          formatted Q&amp;A interview transcript, export the UTF-8{" "}
          <code>.txt</code> file and add speaker names during your final
          editorial pass.
        </p>
        <p>
          Second, conversational Urdu podcasts switch constantly into English
          tech, business, and pop-culture vocabulary. Keep each guest on a clean
          mic with minimal crosstalk so speech recognition captures rapid
          switches cleanly, and compare Studio with English-first podcast suites
          in{" "}
          <Link href="/compare/urduspeech-vs-descript">
            UrduSpeech vs Descript
          </Link>{" "}
          and{" "}
          <Link href="/compare/urduspeech-vs-whisper">
            UrduSpeech vs Whisper
          </Link>
          .
        </p>
      </>
    ),
    faqHeading: "Urdu podcast transcription questions",
    faqs: [
      {
        question:
          "Does UrduSpeech label Speaker 1 and Speaker 2 automatically?",
        answer: (
          <p>
            No. Studio focuses on accurate Urdu speech transcription, script
            conversion, and subtitle timing without speaker diarization or
            automatic episode summarization.
          </p>
        ),
      },
      {
        question:
          "Can I transcribe a 2-hour podcast in one upload without splitting it?",
        answer: (
          <p>
            Yes—Creator supports single files up to 180 minutes (3 hours) and
            Studio supports up to 360 minutes (6 hours), provided the file size
            is under 2 GiB and fits within your remaining monthly minutes.
          </p>
        ),
      },
      {
        question: "How should I repurpose a long podcast into captioned Reels?",
        answer: (
          <p>
            Use the full episode’s TXT/SRT transcript to pick your strongest
            30–60 second moments, cut those clips vertically in your editor, and
            upload the short clips to render burned-in Nastaliq MP4s in Studio.
          </p>
        ),
      },
    ],
    relatedLinks: [
      {
        href: "/urdu-transcription",
        label: "Explore Urdu speech-to-text transcription",
      },
      {
        href: "/compare/urduspeech-vs-descript",
        label: "Compare UrduSpeech vs Descript",
      },
      {
        href: "/compare/urduspeech-vs-whisper",
        label: "Compare UrduSpeech vs Whisper",
      },
      { href: "/pricing", label: "View Creator & Studio PKR plans" },
    ],
    ctaTitle: "Transcribe your next Urdu podcast episode",
    ctaCopy:
      "Test Studio free with a 10-minute clip (no card required), then scale up to 200 or 500 minutes per month in PKR.",
  },
};

export const verticalSlugs = Object.keys(verticalPages) as VerticalSlug[];
