export interface GlossaryTerm {
  id: string;
  term: string;
  urduTerm?: string;
  category:
    | "Urdu Script & Typography"
    | "Subtitle Formats & Timing"
    | "Video & Audio Engineering"
    | "AI Workflow & Privacy";
  definition: string;
  relatedHref?: `/${string}`;
  relatedLabel?: string;
}

export const URDU_GLOSSARY_TERMS: readonly GlossaryTerm[] = [
  {
    id: "nastaliq-vs-naskh",
    term: "Nastaliq vs Naskh",
    urduTerm: "نستعلیق اور نسخ",
    category: "Urdu Script & Typography",
    definition:
      "Nastaliq is the sloping calligraphic script preferred for Pakistani Urdu reading, while Naskh is the horizontal Arabic print script used as a fallback by many generic video editors. Nastaliq requires taller line heights and OpenType shaping so stacked ligatures and descenders remain legible on screen.",
    relatedHref: "/video-captions",
    relatedLabel: "See Noto Nastaliq caption styles",
  },
  {
    id: "urdu-unicode-kaf-yeh",
    term: "Urdu Unicode Normalization (ک / ی)",
    urduTerm: "اردو یونیکوڈ ک اور ی",
    category: "Urdu Script & Typography",
    definition:
      "Raw speech models often output Arabic Kaf (U+0643 ك) and Arabic Yeh (U+064A ي) instead of standard Urdu Keheh (U+06A9 ک) and Choti Yeh (U+06CC ی). Normalizing to Urdu code points prevents broken letter joining in Nastaliq fonts and improves searchability across YouTube and web players.",
    relatedHref: "/tools/urdu-subtitle-checker",
    relatedLabel: "Fix Arabic ك / ي in our free checker",
  },
  {
    id: "rtl-bidirectional-isolation",
    term: "RTL Bidirectional (BiDi) Isolation",
    category: "Urdu Script & Typography",
    definition:
      "Urdu reads right-to-left (RTL) while English words, brand names, and numbers read left-to-right (LTR). Bidirectional isolation wraps mixed-script lines properly so periods, question marks (؟), and English phrases do not jump to the wrong side of an Urdu caption.",
    relatedHref: "/methodology",
    relatedLabel: "Read our typography methodology",
  },
  {
    id: "roman-urdu",
    term: "Roman Urdu (ur-Latn)",
    category: "Urdu Script & Typography",
    definition:
      "Roman Urdu writes spoken Urdu words using the Latin alphabet (for example, 'Aaj hum Urdu captions bana rahe hain'). Creators use it for fast mobile scanning on Instagram Reels and TikTok, audiences who speak Urdu fluently without reading Nastaliq quickly, and editors that lack RTL support.",
    relatedHref: "/urdu-audio-to-roman-urdu",
    relatedLabel: "Convert Urdu audio to Roman Urdu",
  },
  {
    id: "urdu-english-code-switching",
    term: "Urdu-English Code-Switching",
    category: "Urdu Script & Typography",
    definition:
      "Code-switching is the natural habit of mixing English technical, business, or everyday nouns inside spoken Urdu sentences. Caption pipelines must pair Nastaliq Urdu optically with a clean Latin sans-serif typeface (such as Inter) so mixed lines keep consistent baseline height and readability.",
    relatedHref: "/bilingual-urdu-english-captions",
    relatedLabel: "Explore bilingual Urdu + English captions",
  },
  {
    id: "srt-subrip",
    term: "SRT (SubRip Subtitle Format)",
    category: "Subtitle Formats & Timing",
    definition:
      "SRT is a plain-text UTF-8 subtitle format storing numbered cues, comma-separated millisecond timestamps (00:00:01,500 --> 00:00:04,200), and caption lines. It is the standard upload format for YouTube Studio, Premiere Pro, DaVinci Resolve, CapCut desktop, and LinkedIn video.",
    relatedHref: "/srt-vtt-urdu-subtitle-generator",
    relatedLabel: "Generate UTF-8 Urdu SRT files",
  },
  {
    id: "webvtt",
    term: "WebVTT (.vtt)",
    category: "Subtitle Formats & Timing",
    definition:
      "WebVTT (Web Video Text Tracks) is the W3C browser subtitle standard used by HTML5 <track> elements, course platforms, and streaming players. It begins with a WEBVTT header, uses period-separated milliseconds (00:00:01.500), and requires escaping HTML characters (&, <, >).",
    relatedHref: "/tools/srt-to-vtt-converter",
    relatedLabel: "Convert SRT to WebVTT free in browser",
  },
  {
    id: "cps-reading-speed",
    term: "CPS (Characters Per Second)",
    category: "Subtitle Formats & Timing",
    definition:
      "Characters Per Second measures how fast viewers must read a subtitle cue while it stays on screen. Because Nastaliq Urdu packs dense ligatures into vertical space, comfortable mobile Reels pacing stays at or below 17 CPS, while 16:9 YouTube captions comfortably support up to 20 CPS.",
    relatedHref: "/tools/urdu-subtitle-checker",
    relatedLabel: "Check your subtitle CPS speed",
  },
  {
    id: "burned-in-vs-closed-captions",
    term: "Burned-In (Open) vs Closed Captions",
    category: "Subtitle Formats & Timing",
    definition:
      "Burned-in captions (hardsubs) are rendered permanently into the MP4 pixels so Nastaliq styling looks identical on Instagram Reels, TikTok, and WhatsApp. Closed captions (softsubs via SRT/VTT) stay selectable by viewers and are indexed by YouTube Search without altering video pixels.",
    relatedHref: "/guides/subtitle-and-video-exports",
    relatedLabel: "Compare TXT, SRT, VTT, and MP4 exports",
  },
  {
    id: "safe-area-margins",
    term: "Video Safe-Area Margins",
    category: "Video & Audio Engineering",
    definition:
      "Safe areas are the unobstructed interior zones of 9:16 vertical or 16:9 landscape frames that stay clear of platform UI overlays (like TikTok/Reels side buttons, bottom captions, and player scrub bars). Verified margins keep Nastaliq descenders from getting cut off or hidden behind buttons.",
    relatedHref: "/urdu-captions-for-reels-tiktok",
    relatedLabel: "Reels & TikTok Urdu caption workflow",
  },
  {
    id: "hdr-bt2020-tone-mapping",
    term: "BT.2020 HDR to BT.709 SDR Tone-Mapping",
    category: "Video & Audio Engineering",
    definition:
      "Modern iPhones record HLG or PQ 10-bit HDR video in the BT.2020 color space. Naive subtitle renderers ignore HDR metadata and produce washed-out, grey-looking MP4 exports. Tone-mapping converts properly tagged HDR video accurately to standard BT.709 SDR during caption rendering.",
    relatedHref: "/supported-formats",
    relatedLabel: "Check video codec & HDR support",
  },
  {
    id: "aac-speech-track",
    term: "AAC Audio Track & Multi-Track Containers",
    category: "Video & Audio Engineering",
    definition:
      "MP4 and MOV containers pair H.264 or HEVC video streams with one or more AAC audio tracks. When a camera or OBS recording contains separate host and guest audio tracks, selecting the primary speech track during media validation prevents silent or mismatched transcripts.",
    relatedHref: "/supported-formats",
    relatedLabel: "View all supported formats & limits",
  },
  {
    id: "conservative-ai-correction",
    term: "Conservative AI Text Correction",
    category: "AI Workflow & Privacy",
    definition:
      "Conservative correction cleans unambiguous Unicode variants and safe punctuation while protecting numbers, PKR/USD amounts, dates, URLs, emails, and @handles from silent edits. Uncertain phrasing changes appear as explicit Accept/Reject cards so the creator keeps final editorial authority.",
    relatedHref: "/methodology",
    relatedLabel: "Inspect our AI correction guardrails",
  },
  {
    id: "media-retention-window",
    term: "Automatic Media Retention Window",
    category: "AI Workflow & Privacy",
    definition:
      "A fixed storage ceiling (3 days on Free, 15 on Starter, 30 on Creator, 90 on Studio) after which original uploaded audio/video and rendered MP4 files expire automatically. Plain-text transcripts and SRT/VTT subtitle tracks remain downloadable until you delete the project or account.",
    relatedHref: "/security",
    relatedLabel: "Review security & retention policy",
  },
  {
    id: "deletion-receipt",
    term: "Verifiable Deletion Receipt",
    category: "AI Workflow & Privacy",
    definition:
      "A private status record issued after self-service account deletion that confirms immediate session revocation and tracks cleanup of stored media, transcripts, active billing records, and backup propagation timelines without requiring support tickets.",
    relatedHref: "/delete-account",
    relatedLabel: "How account deletion works",
  },
];
