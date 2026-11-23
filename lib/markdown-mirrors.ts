import { PLANS, MANUAL_PAYMENT_METHODS } from "@/lib/plans";
import { publicAlternatives } from "@/lib/public-alternatives";
import { publicGuides } from "@/lib/public-guides";
import { publicComparisons } from "@/lib/public-comparisons";
import { verticalPages, verticalSlugs } from "@/lib/public-verticals";
import { URDU_GLOSSARY_TERMS } from "@/lib/urdu-glossary";
import { SITE_URL, SUPPORT_EMAIL } from "@/lib/seo";

export function buildLlmsTxt(): string {
  const guideLines = publicGuides
    .map(
      (g) =>
        `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.summary} ([Markdown](${SITE_URL}/guides/${g.slug}.md))`,
    )
    .join("\n");

  const verticalLines = verticalSlugs
    .map((slug) => {
      const v = verticalPages[slug];
      return `- [${v.title}](${SITE_URL}/${v.slug}): ${v.description}`;
    })
    .join("\n");

  const compareLines = publicComparisons
    .map(
      (c) =>
        `- [${c.title}](${SITE_URL}/compare/${c.slug}): ${c.summary} ([Markdown](${SITE_URL}/compare/${c.slug}.md))`,
    )
    .join("\n");

  const alternativeLines = publicAlternatives
    .map(
      (a) =>
        `- [${a.title}](${SITE_URL}/alternatives/${a.slug}): ${a.summary} ([Markdown](${SITE_URL}/alternatives/${a.slug}.md))`,
    )
    .join("\n");

  return `# UrduSpeech

> UrduSpeech (${SITE_URL}), operated by MoonSys Ltd, is a browser-based automated AI Urdu speech-to-text, Roman Urdu transliteration, English translation, SRT/WebVTT subtitle, and burned-in Noto Nastaliq MP4 video captioning studio. It is not a human transcription agency, does not train models on uploaded user recordings, and is unrelated to the academic ASLP-lab/UrduSpeech corpus.

Complete digest for AI agents: [${SITE_URL}/llms-full.txt](${SITE_URL}/llms-full.txt)

## Core Product

- [UrduSpeech Homepage](${SITE_URL}): Overview, interactive caption preview, workflow, and PKR pricing ([Markdown](${SITE_URL}/index.md))
- [Urdu Speech to Text & Audio Transcription](${SITE_URL}/urdu-transcription): Upload MP3, FLAC, PCM WAV, AAC M4A, MP4, or MOV for editable Nastaliq, Roman Urdu, or English transcripts ([Markdown](${SITE_URL}/urdu-transcription.md))
- [Urdu Subtitle Generator & Video Captions](${SITE_URL}/video-captions): Timed UTF-8 SRT/VTT subtitles and Clean, Social highlight (#FFD54F), or Boxed burned-in Nastaliq MP4 exports ([Markdown](${SITE_URL}/video-captions.md))
- [Urdu Audio to Roman Urdu Text](${SITE_URL}/urdu-audio-to-roman-urdu): Transliterate spoken Urdu into editable left-to-right Roman Urdu (ur-Latn) ([Markdown](${SITE_URL}/urdu-audio-to-roman-urdu.md))
- [Urdu Audio to English Text & Subtitles](${SITE_URL}/urdu-audio-to-english-text): Translate spoken Urdu audio/video into English or stacked Urdu + English captions ([Markdown](${SITE_URL}/urdu-audio-to-english-text.md))
- [Interactive Caption Editor Demo](${SITE_URL}/demo): Zero-signup browser editor with live Nastaliq/bilingual preview and sample SRT/VTT/TXT downloads
- [Pricing in PKR](${SITE_URL}/pricing): Free (10 min one-time), Starter (PKR 999/mo), Creator (PKR 2,499/mo), Studio (PKR 5,999/mo) ([Markdown](${SITE_URL}/pricing.md))
- [Supported Formats & Upload Limits](${SITE_URL}/supported-formats): Accepted codecs, iPhone HDR BT.2020-to-BT.709 tone-mapping, 2 GiB scan cap, and 256 MiB MP4 render cap ([Markdown](${SITE_URL}/supported-formats.md))

## Use Cases & Free Tools

${verticalLines}
- [Free Urdu Creator Tools Hub](${SITE_URL}/tools): All zero-signup client-side utilities for Urdu subtitles and PKR cost planning
- [Free Browser SRT to WebVTT Converter & Urdu Validator](${SITE_URL}/tools/srt-to-vtt-converter): 100% client-side UTF-8 SRT/VTT/TXT converter and overlap validator
- [Free Urdu Subtitle Speed & Unicode Checker](${SITE_URL}/tools/urdu-subtitle-checker): Check Reels/YouTube CPS speed and normalize Arabic ك / ي to Urdu ک / ی locally
- [Urdu Caption & Transcription PKR Cost Calculator](${SITE_URL}/tools/caption-plan-calculator): Estimate monthly publishing minutes and recommended PKR tier
- [Urdu Subtitling, Nastaliq & Transcription Glossary](${SITE_URL}/urdu-caption-glossary): 15 technical definitions covering Nastaliq, Unicode ک/ی, RTL BiDi, CPS, SRT/VTT, and HDR tone-mapping ([Markdown](${SITE_URL}/urdu-caption-glossary.md))

## Creator Guides

${guideLines}

## Comparisons & Alternatives

- [Compare Urdu Caption & Transcription Tools](${SITE_URL}/compare): Side-by-side hub comparing UrduSpeech with major caption and transcription tools
${compareLines}
${alternativeLines}

## Company, Methodology & Policies

- [About UrduSpeech & MoonSys Ltd](${SITE_URL}/about): Company identity, editorial team, and disambiguation ([Markdown](${SITE_URL}/about.md))
- [AI Transcription & Nastaliq Methodology](${SITE_URL}/methodology): Speech recognition, conservative AI correction, protected tokens, and safe-area Nastaliq rendering ([Markdown](${SITE_URL}/methodology.md))
- [Data Security, Sub-Processors & Media Retention](${SITE_URL}/security): Zero training on uploads, AWS S3 US East Ohio storage, 3–90 day auto-expiry, and verified deletion receipts ([Markdown](${SITE_URL}/security.md))
- [FAQ](${SITE_URL}/faq): Detailed answers on WhatsApp voice notes, RTL typography, exports, billing, and privacy ([Markdown](${SITE_URL}/faq.md))
- [Contact Support](${SITE_URL}/contact): Email ${SUPPORT_EMAIL}

## Optional

- [Privacy Policy](${SITE_URL}/privacy)
- [Terms of Service](${SITE_URL}/terms)
- [Payments & Refunds Policy](${SITE_URL}/refunds)
- [Delete Account](${SITE_URL}/delete-account)
`;
}

export function buildLlmsFullTxt(): string {
  const plansTable = [
    "| Plan | Price (PKR) | Minutes | Max Recording | Max Upload | Video Quality | Media Retention |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...PLANS.map(
      (p) =>
        `| ${p.name}${p.recommended ? " (Recommended)" : ""} | PKR ${p.priceDisplay}${p.billingPeriod === "monthly" ? "/mo" : " one-time"} | ${p.minutes} min | ${p.maxDurationMinutes} min | ${p.maxUploadLabel} | ${p.videoQuality} | ${p.retentionDays} days |`,
    ),
  ].join("\n");

  const guideSummary = publicGuides
    .map(
      (g) =>
        `### ${g.title}\n- URL: ${SITE_URL}/guides/${g.slug}\n- Markdown: ${SITE_URL}/guides/${g.slug}.md\n- Summary: ${g.summary}`,
    )
    .join("\n\n");

  const compareSummary = publicComparisons
    .map(
      (c) =>
        `### ${c.title}\n- URL: ${SITE_URL}/compare/${c.slug}\n- Verdict: ${c.verdictSummary}`,
    )
    .join("\n\n");

  return `# UrduSpeech — Complete Product & Documentation Digest

- Canonical Site: ${SITE_URL}
- Operator: MoonSys Ltd
- Support Email: ${SUPPORT_EMAIL}
- Category: Automated browser-based AI Urdu speech-to-text, subtitling, and burned-in Nastaliq video captioning web studio.

## Entity Disambiguation

- UrduSpeech (${SITE_URL}) is operated by MoonSys Ltd as a self-service automated AI software studio.
- It is NOT a human transcription agency and does NOT employ human transcriptionists.
- It is NOT affiliated with the academic ASLP-lab/UrduSpeech speech corpus (arXiv / Hugging Face).
- It does NOT train its own AI models on user-uploaded recordings.

## Supported Inputs & Operational Limits

- **Audio formats:** MP3 (.mp3), FLAC (.flac), PCM WAV (.wav), AAC M4A (.m4a).
- **Video formats:** MP4 (.mp4) and MOV (.mov) with H.264 or HEVC video and an audible AAC speech track.
- **Unsupported directly:** Encrypted files, videos without audio, and WhatsApp .opus/.ogg files (convert locally to .m4a, .mp3, or .wav before uploading).
- **Multi-track video:** Studio Media check lets users choose which audio track to transcribe.
- **HDR video:** Properly tagged BT.2020 HLG or PQ HDR video is automatically tone-mapped to SDR BT.709 for captioned MP4 rendering.
- **Scanning cap:** Strictly 2 GiB minus 1 byte across all plans.
- **Rendered MP4 safety cap:** 256 MiB operational limit (TXT, SRT, and VTT downloads remain independent and always available).
- **Unsupported workflows (stated transparently):** No live microphone dictation, no speaker diarization, no OCR of on-screen text, no ripping embedded soft subtitles, no YouTube URL scraping, no English-to-Urdu dubbing.

## Outputs & Export Formats

1. **Urdu script (lang="ur", RTL):** Rendered in Noto Nastaliq Urdu paired with Inter for Latin characters and digits, inside verified safe-area margins.
2. **Roman Urdu (lang="ur-Latn", LTR):** Spoken Urdu words written in Latin letters for fast mobile scanning and non-RTL video editors.
3. **English translation (lang="en", LTR):** Meaning-focused English text and subtitles anchored to the verified Urdu transcript.
4. **Stacked Bilingual (Urdu + English):** Selectable Urdu-first or English-first line order.
5. **Export files:** UTF-8 plain text (.txt), UTF-8 SRT (.srt, comma milliseconds), UTF-8 WebVTT (.vtt, WEBVTT header + dot milliseconds + escaped entities), and burned-in H.264 captioned MP4 (.mp4) in Clean, Social highlight (#FFD54F), or Boxed styles.

## AI Correction & Review Methodology

- Optional conservative AI text correction normalizes equivalent Urdu Unicode character forms (such as Urdu ک and ی) and safe punctuation.
- Numbers, currencies, dates, URLs, emails, hashtags, and @handles are protected against silent alteration.
- Uncertain wording suggestions appear with before/after cards and a reason so users can accept or reject each change individually, or turn AI correction off at upload time.
- Users review cues alongside local zero-upload playback of their original file and save versioned non-overlapping timestamps before exporting.

## Pricing in Pakistani Rupees (PKR)

${plansTable}

- Audio and video share the same duration-based minute allowance. Unused monthly minutes do not roll over.
- Payment methods shown inside Studio Billing: Stripe card checkout (where available) and manual Pakistani local verification via ${MANUAL_PAYMENT_METHODS.join(", ")}.

## Security, Sub-Processors & Deletion

- Sub-processors: AWS S3 (US East Ohio) for private file storage; Hetzner and Vercel for backend/web hosting; Modal for media processing/rendering; Deepgram and OpenAI for automated speech and language processing; Stripe for card billing; Zoho for transactional email.
- Automatic media expiry: Original uploads and rendered MP4 videos expire after 3, 15, 30, or 90 days depending on plan. Transcripts and SRT/VTT tracks remain until project or account deletion.
- Account deletion: Self-service in Studio Settings with immediate access revocation and a private JSON deletion receipt for tracking content removal, subscription cleanup, and backup propagation.

## Creator Guides

${guideSummary}

## Tool Comparisons

${compareSummary}
`;
}

export function renderMarkdownMirror(
  slugParts: readonly string[],
): string | null {
  const key = slugParts.join("/");

  if (key === "home") {
    return `# UrduSpeech — AI Urdu Captions & Transcripts for Creators\n\nCanonical URL: ${SITE_URL}\n\n${buildLlmsFullTxt()}`;
  }

  if (key === "pricing") {
    const table = [
      "| Plan | Price (PKR) | Minutes | Max Recording | Max Upload | Video Quality | Retention |",
      "| --- | --- | --- | --- | --- | --- | --- |",
      ...PLANS.map(
        (p) =>
          `| ${p.name}${p.recommended ? " (Recommended)" : ""} | PKR ${p.priceDisplay}${p.billingPeriod === "monthly" ? "/mo" : " once"} | ${p.minutes} | ${p.maxDurationMinutes} min | ${p.maxUploadLabel} | ${p.videoQuality} | ${p.retentionDays} days |`,
      ),
    ].join("\n");
    return `# UrduSpeech Pricing in Pakistani Rupees (PKR)\n\nCanonical URL: ${SITE_URL}/pricing\n\n${table}\n\n- Audio and video share one duration-based minute allowance.\n- Available payment rails inside Studio Billing: card checkout (Stripe) and local manual verification (${MANUAL_PAYMENT_METHODS.join(", ")}).\n- Unused monthly minutes do not roll over.\n- Refund & payment review policy: ${SITE_URL}/refunds\n`;
  }

  if (key === "about") {
    return `# About UrduSpeech & MoonSys Ltd\n\nCanonical URL: ${SITE_URL}/about\n\nUrduSpeech (${SITE_URL}) is a browser-based automated AI Urdu speech-to-text, Roman Urdu transliteration, English translation, and burned-in Noto Nastaliq video captioning studio operated by **MoonSys Ltd**.\n\n## Disambiguation\n- Automated AI software studio (NOT a human transcription agency).\n- Unrelated to the academic ASLP-lab/UrduSpeech dataset.\n- Never trains models on uploaded user recordings.\n- Editorial & engineering guides are maintained by the UrduSpeech Editorial & Engineering Team at MoonSys Ltd.\n- Support: ${SUPPORT_EMAIL}\n`;
  }

  if (key === "methodology") {
    return `# UrduSpeech AI Transcription & Nastaliq Rendering Methodology\n\nCanonical URL: ${SITE_URL}/methodology\n\n1. **Container inspection & speech-track selection:** Validates real MP3/FLAC/WAV/M4A/MP4/MOV codecs under the 2 GiB scanning limit and allows selecting a speech track on multi-track video.\n2. **Canonical Urdu recognition & script outputs:** Produces Urdu script (RTL), Roman Urdu (ur-Latn), English translation, or stacked bilingual Urdu + English (Urdu-first or English-first).\n3. **Conservative AI correction:** Normalizes Urdu Unicode forms (ک/ی) and safe punctuation while protecting numbers, currencies, URLs, emails, and handles. Uncertain suggestions require user Accept/Reject review; AI correction can also be disabled.\n4. **Non-overlapping timing & local preview:** Users scrub local recordings zero-upload and save validated non-overlapping timestamps.\n5. **Noto Nastaliq safe-area rendering & HDR tone-mapping:** Burned-in MP4 renders use Noto Nastaliq Urdu + Inter, verified safe-area margins, and BT.2020 HLG/PQ to SDR BT.709 tone-mapping (up to 720p watermarked Free; 1080p clean Paid; 256 MiB MP4 cap).\n`;
  }

  if (key === "security") {
    return `# UrduSpeech Data Security, Sub-Processors & Media Retention\n\nCanonical URL: ${SITE_URL}/security\n\n- **Automated processing, zero model training:** No human transcriptionists; no training on user media.\n- **Sub-processors:** AWS S3 (US East Ohio), Hetzner, Vercel, Modal, Deepgram, OpenAI, Stripe, Zoho.\n- **Automatic media expiry:** 3 days (Free), 15 days (Starter), 30 days (Creator), 90 days (Studio) from upload validation. Transcripts and SRT/VTT files remain until project or account deletion.\n- **Verified deletion:** Self-service deletion in Studio Settings revokes access immediately and issues a private deletion receipt to track content removal, billing cleanup, and backup propagation.\n`;
  }

  if (key === "supported-formats") {
    return `# Supported Audio, Video Formats & Upload Limits\n\nCanonical URL: ${SITE_URL}/supported-formats\n\n- **Audio:** MP3, FLAC, PCM WAV, AAC M4A.\n- **Video:** MP4, MOV (H.264 or HEVC video + audible AAC speech track).\n- **WhatsApp voice notes (.opus/.ogg):** Convert locally to .m4a, .mp3, or .wav before uploading.\n- **HDR video:** Properly tagged BT.2020 HLG/PQ video is tone-mapped to SDR BT.709 for captioned MP4 output.\n- **Plan caps:** Free (10 min / 250 MiB / 3d), Starter (60 min / 1 GiB / 15d), Creator (180 min / <2 GiB / 30d), Studio (360 min / <2 GiB / 90d).\n- **Hard ceilings:** 2 GiB minus 1 byte scanning cap; 256 MiB rendered captioned MP4 safety cap (TXT/SRT/VTT stay independent).\n`;
  }

  if (
    key === "urdu-transcription" ||
    key === "video-captions" ||
    key === "urdu-audio-to-roman-urdu" ||
    key === "urdu-audio-to-english-text" ||
    key === "faq"
  ) {
    return `# UrduSpeech — ${key.replaceAll("-", " ")}\n\nCanonical URL: ${SITE_URL}/${key}\n\n${buildLlmsFullTxt()}`;
  }

  if (key.startsWith("guides/")) {
    const slug = key.slice("guides/".length);
    const guide = publicGuides.find((g) => g.slug === slug);
    if (!guide) return null;
    const sectionTitles = guide.sections
      .map((s, idx) => `${idx + 1}. ${s.title}`)
      .join("\n");
    return `# ${guide.title}\n\n- Canonical URL: ${SITE_URL}/guides/${guide.slug}\n- Topic: ${guide.topic}\n- Author: UrduSpeech Editorial & Engineering Team (${SITE_URL}/about#editorial-team)\n- Updated: ${guide.updated}\n\n## Summary\n${guide.summary}\n\n## Sections\n${sectionTitles}\n\n## Primary Workflow\n${guide.primaryProductLabel}: ${SITE_URL}${guide.primaryProductHref}\n\nFor complete UrduSpeech platform specifications, see ${SITE_URL}/llms-full.txt.\n`;
  }

  if (key.startsWith("compare/")) {
    const slug = key.slice("compare/".length);
    const comp = publicComparisons.find((c) => c.slug === slug);
    if (!comp) return null;
    const rows = [
      `| Dimension | UrduSpeech | ${comp.competitor} |`,
      `| --- | --- | --- |`,
      ...comp.matrixRows.map(
        (r) => `| ${r.dimension} | ${r.urduSpeech} | ${r.competitor} |`,
      ),
    ].join("\n");
    return `# ${comp.title}\n\n- Canonical URL: ${SITE_URL}/compare/${comp.slug}\n- Updated: ${comp.updated}\n\n## Verdict\n${comp.verdictSummary}\n\n## Feature Comparison\n${rows}\n\n## Choose UrduSpeech when\n${comp.chooseUrduSpeech.map((x) => `- ${x}`).join("\n")}\n\n## Choose ${comp.competitor} when\n${comp.chooseCompetitor.map((x) => `- ${x}`).join("\n")}\n`;
  }

  if (key === "urdu-caption-glossary") {
    const entries = URDU_GLOSSARY_TERMS.map(
      (item) =>
        `### ${item.term}${item.urduTerm ? ` (${item.urduTerm})` : ""}\n- Category: ${item.category}\n${item.definition}`,
    ).join("\n\n");
    return `# Urdu Subtitling, Nastaliq & Transcription Glossary\n\nCanonical URL: ${SITE_URL}/urdu-caption-glossary\n\n${entries}\n`;
  }

  if (key.startsWith("alternatives/")) {
    const slug = key.slice("alternatives/".length);
    const alt = publicAlternatives.find((a) => a.slug === slug);
    if (!alt) return null;
    return `# ${alt.title}\n\n- Canonical URL: ${SITE_URL}/alternatives/${alt.slug}\n- Verified: ${alt.asOfDate}\n\n## Summary\n${alt.summary}\n\n## Why Urdu creators switch from ${alt.competitor}\n${alt.whyCreatorsSwitch.map((x) => `- **${x.title}:** ${x.detail}`).join("\n")}\n\n## Keep ${alt.competitor} for\n${alt.keepCompetitorFor.map((x) => `- ${x}`).join("\n")}\n\n## 4-step migration workflow\n${alt.migrationSteps.map((s, idx) => `${idx + 1}. **${s.step}:** ${s.detail}`).join("\n")}\n`;
  }

  return null;
}
