import Link from "next/link";
import type { DocumentSection } from "@/components/public-site";

export type PublicGuide = {
  slug: string;
  topic: string;
  title: string;
  seoTitle: string;
  description: string;
  summary: string;
  publishedIso: string;
  updated: string;
  updatedIso: string;
  displayUpdated: string;
  wordCount: number;
  primaryProductHref: `/${string}`;
  primaryProductLabel: string;
  ctaTitle: string;
  ctaCopy: string;
  sections: readonly DocumentSection[];
};

export const publicGuides: readonly PublicGuide[] = [
  {
    slug: "make-urdu-video-captions",
    topic: "Video workflow",
    title: "How to make Urdu video captions",
    seoTitle: "How to Make Urdu Video Captions in Studio | UrduSpeech",
    description:
      "Step-by-step workflow to upload an MP4 or MOV video, review Nastaliq captions and timestamps, pick a style preset, and export SRT, VTT, or MP4.",
    summary:
      "Upload a local video, review the Nastaliq Urdu draft and timestamps in Studio, choose a caption preset, and export UTF-8 SRT, WebVTT, or a burned-in captioned MP4.",
    publishedIso: "2026-11-18T00:00:00+05:00",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 1480,
    primaryProductHref: "/video-captions",
    primaryProductLabel: "Explore video captions",
    ctaTitle: "Ready to caption your own Urdu video?",
    ctaCopy:
      "Start with a 10-minute one-time free allowance (no card required). Upload an MP4 or MOV file in Studio to review captions and export SRT, VTT, or a captioned MP4.",
    sections: [
      {
        title: "Why standard caption tools break on spoken Urdu video",
        body: (
          <>
            <p>
              Creators making Urdu reels, interviews, documentaries, and YouTube
              explainers usually hit the same three roadblocks in
              general-purpose video editors. First, generic speech recognition
              models struggle with natural Pakistani Urdu cadence and everyday
              Urdu-English code-switching (for example, mixing words like{" "}
              <em>editing timeline</em>, <em>thumbnail</em>, or{" "}
              <em>camera lens</em> mid-sentence). Second, standard desktop
              editors often fall back to a flat Arabic Naskh font or split
              connected Urdu letters into disconnected glyphs when right-to-left
              shaping is misconfigured. Third, periods, question marks, and
              Latin digits jump to the wrong side of the line because the
              renderer lacks proper Unicode bidirectional isolation.
            </p>
            <p>
              UrduSpeech Studio solves these problems in a single browser
              workflow built specifically around spoken Urdu. Instead of forcing
              you to assemble three separate tools—an external transcriber, a
              third-party font plugin, and an offline subtitle burner—you upload
              your finished edit once, review the text and cue boundaries
              against local video playback, and export either
              standards-compliant UTF-8 subtitle tracks or a burned-in MP4
              rendered in{" "}
              <a
                href="https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu"
                target="_blank"
                rel="noopener noreferrer"
              >
                Noto Nastaliq Urdu
              </a>{" "}
              (licensed under the SIL Open Font License) paired with Inter for
              Latin characters and numbers.
            </p>
          </>
        ),
      },
      {
        title: "Step 1: Prepare and upload a clean MP4 or MOV master",
        body: (
          <>
            <p>
              Before opening Studio, confirm that your exported video matches
              accepted container and codec specifications. Studio accepts local{" "}
              <strong>MP4</strong> (<code>.mp4</code>) and{" "}
              <strong>QuickTime MOV</strong> (<code>.mov</code>) files using{" "}
              <strong>H.264</strong> or <strong>HEVC</strong> video and an
              audible <strong>AAC</strong> speech track. Check{" "}
              <Link href="/supported-formats">
                supported formats and per-plan upload ceilings
              </Link>{" "}
              (250 MiB / 10 min on Free, 1 GiB / 60 min on Starter, and up to
              just under 2 GiB on Creator and Studio).
            </p>
            <p>
              Audio cleanliness has the single largest impact on draft quality.
              If your timeline includes background music, lower the music bus by
              12 to 18 dB beneath the voice—or bounce a temporary speech-clean
              proxy if you only need an SRT or VTT track. Avoid clipping peaks
              above 0 dBFS, and if you filmed an interview with two microphones
              saved on separate stereo or multi-track channels, keep the primary
              spoken-Urdu stream intact: after upload validation, Studio’s{" "}
              <strong>Media check</strong> panel detects multiple audio tracks
              and lets you pick the exact stream to transcribe.
            </p>
            <p>
              Filmed on an iPhone in HDR? Studio automatically tone-maps
              properly tagged{" "}
              <a
                href="https://www.itu.int/rec/R-REC-BT.709"
                target="_blank"
                rel="noopener noreferrer"
              >
                BT.2020 HLG or PQ video to SDR BT.709
              </a>{" "}
              during captioned MP4 rendering so colors remain predictable on
              mobile social feeds. Always inspect the downloaded SDR render for
              skin-tone contrast before publishing.
            </p>
          </>
        ),
      },
      {
        title:
          "Step 2: Choose output script, bilingual order, and AI correction",
        body: (
          <>
            <p>
              On the <strong>New upload</strong> screen, select the exact output
              mode that matches your viewers:
            </p>
            <ul>
              <li>
                <strong>Urdu script:</strong> Keeps spoken Urdu in right-to-left
                Nastaliq—see our{" "}
                <Link href="/urdu-transcription">
                  Urdu speech-to-text workflow
                </Link>{" "}
                for transcription details.
              </li>
              <li>
                <strong>Roman Urdu:</strong> Keeps the original Urdu vocabulary
                in left-to-right Latin letters—explore{" "}
                <Link href="/urdu-audio-to-roman-urdu">
                  converting Urdu audio to Roman Urdu text
                </Link>
                .
              </li>
              <li>
                <strong>English translation:</strong> Translates spoken Urdu
                meaning into natural English lines—explore{" "}
                <Link href="/urdu-audio-to-english-text">
                  Urdu audio to English text and subtitles
                </Link>
                .
              </li>
              <li>
                <strong>Urdu + English (Bilingual):</strong> Stacks both scripts
                together in each cue with your choice of{" "}
                <strong>Urdu first</strong> or <strong>English first</strong>
                —see{" "}
                <Link href="/bilingual-urdu-english-captions">
                  bilingual Urdu and English caption layouts
                </Link>
                .
              </li>
            </ul>
            <p>
              Next, decide whether to leave <strong>AI text correction</strong>{" "}
              switched on. When enabled, Studio applies conservative Urdu
              Unicode normalization—converting stray Arabic{" "}
              <span lang="ur" dir="rtl">
                ك
              </span>{" "}
              and{" "}
              <span lang="ur" dir="rtl">
                ي
              </span>{" "}
              forms into proper Urdu{" "}
              <span lang="ur" dir="rtl">
                ک
              </span>{" "}
              and{" "}
              <span lang="ur" dir="rtl">
                ی
              </span>{" "}
              characters—and adds safe Urdu punctuation (
              <span lang="ur" dir="rtl">
                ۔
              </span>{" "}
              and{" "}
              <span lang="ur" dir="rtl">
                ؟
              </span>
              ) while locking numbers, PKR amounts, URLs, emails, and social
              handles against silent mutation. Uncertain word changes are held
              back as explicit accept/reject suggestions. You can also turn AI
              correction off to inspect the untouched speech-recognition draft.
              Read our full{" "}
              <Link href="/methodology">
                AI correction and Nastaliq rendering methodology
              </Link>{" "}
              for details.
            </p>
          </>
        ),
      },
      {
        title: "Step 3: Review words, code-switching, and cue timing in Studio",
        body: (
          <>
            <p>
              Once transcription finishes, attach your original local video in
              Studio’s <strong>Media preview</strong> player. The preview plays
              directly from your device without re-uploading bytes, letting you
              scrub line by line with zero latency. Work through a quick
              four-pass review checklist before exporting:
            </p>
            <ol>
              <li>
                <strong>Accept or reject AI suggestions:</strong> Inspect every
                flagged <code>before</code> and <code>after</code> card. Accept
                real spelling fixes and reject any change that alters colloquial
                phrasing or dialect intentionally used by the speaker.
              </li>
              <li>
                <strong>Verify proper names and figures:</strong> Check names of
                guests, Pakistani cities, brands, dates, and spoken numbers
                (especially <em>lakh</em>, <em>crore</em>, and mixed English
                percentages).
              </li>
              <li>
                <strong>Tighten reading pace:</strong> Nastaliq glyphs take more
                vertical space than Latin letters. Aim for one concise clause
                per cue (roughly 1.5 to 4.5 seconds on screen) so viewers can
                read comfortably without the text covering the speaker’s face.
              </li>
              <li>
                <strong>Confirm non-overlapping timestamps:</strong> Studio
                edits cue boundaries in seconds (for example{" "}
                <code>00:00:12.400</code> to <code>00:00:15.900</code>) and
                validates that cues stay strictly inside the video duration with
                no overlaps.
              </li>
            </ol>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                آج ہم پشاور سے لاہور تک کے سفر کی کہانی سنائیں گے۔
              </span>
              <span lang="ur-Latn" dir="ltr">
                Aaj hum Peshawar se Lahore tak ke safar ki kahani sunayenge.
              </span>
              <span lang="en" dir="ltr">
                Today we will share the story of our journey from Peshawar to
                Lahore.
              </span>
            </div>
            <p>
              Save your edits when finished—Studio records a new track version
              so your finalized wording drives every subsequent subtitle export
              and video render.
            </p>
          </>
        ),
      },
      {
        title: "Step 4: Pick a visual style and export SRT, VTT, or MP4",
        body: (
          <>
            <p>
              Decide whether your platform needs a separate timed subtitle file
              or permanently burned-in captions:
            </p>
            <div
              className="pricing-scroll"
              role="region"
              aria-label="Recommended export settings by video platform"
              tabIndex={0}
            >
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th scope="col">Destination</th>
                    <th scope="col">Recommended export</th>
                    <th scope="col">Preset &amp; framing note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Instagram Reels &amp; TikTok (9:16)</th>
                    <td>Burned-in Captioned MP4</td>
                    <td>
                      <strong>Social highlight</strong> (<code>#FFD54F</code>)
                      or <strong>Boxed</strong> keeps Nastaliq crisp over bright
                      footage; see{" "}
                      <Link href="/urdu-captions-for-reels-tiktok">
                        Reels &amp; TikTok captions
                      </Link>
                      .
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">YouTube long-form (16:9)</th>
                    <td>UTF-8 SRT or VTT</td>
                    <td>
                      Upload as selectable CC tracks in{" "}
                      <Link href="/guides/urdu-subtitles-for-youtube">
                        YouTube Studio
                      </Link>{" "}
                      so viewers can toggle Urdu and English independently.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Premiere Pro / DaVinci Resolve</th>
                    <td>UTF-8 SRT</td>
                    <td>
                      Enable South Asian / Middle Eastern text engine in
                      Premiere before styling Urdu tracks, or use Roman Urdu SRT
                      for fast edit logs.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Web courses &amp; HTML5 players</th>
                    <td>UTF-8 WebVTT (.vtt)</td>
                    <td>
                      Attach via{" "}
                      <code>&lt;track kind=&quot;subtitles&quot;&gt;</code>{" "}
                      following the{" "}
                      <a
                        href="https://www.w3.org/TR/webvtt1/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        W3C WebVTT specification
                      </a>
                      .
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              For burned-in MP4 videos, choose <strong>Clean</strong> (white
              text with subtle drop shadow), <strong>Social highlight</strong>{" "}
              (high-contrast gold <code>#FFD54F</code>), or{" "}
              <strong>Boxed</strong> (white text over a dark backing plate).
              Studio checks every rendered cue against safe-area margins so
              ascenders and Nastaliq dots never clip off-frame. Free accounts
              render up to 720p with a watermark, while{" "}
              <Link href="/pricing">Starter, Creator, and Studio plans</Link>{" "}
              render up to 1080p unwatermarked (subject to the 256 MiB MP4
              render cap; TXT/SRT/VTT remain downloadable regardless of video
              size).
            </p>
          </>
        ),
      },
      {
        title: "Troubleshooting common Urdu video caption issues",
        body: (
          <>
            <p>
              If something looks unexpected before or after export, check these
              four quick fixes:
            </p>
            <ul>
              <li>
                <strong>Video rejected during media check:</strong> Verify the
                audio codec is AAC (not AC-3, Opus, or PCM inside MOV) and the
                file size is under your plan ceiling and below 2 GiB.
              </li>
              <li>
                <strong>Rendered MP4 exceeds 256 MiB:</strong> Long or
                high-motion recordings can cross the 256 MiB render cap. Export
                the UTF-8 <strong>SRT</strong> or <strong>VTT</strong> file
                instead and attach it in YouTube Studio or burn it locally in
                your editor.
              </li>
              <li>
                <strong>Bilingual lines feel crowded on vertical video:</strong>{" "}
                Keep each cue short during Step 3 review so neither the Urdu nor
                English line wraps to three rows on 9:16 screens.
              </li>
              <li>
                <strong>Need to convert an existing SRT to VTT:</strong> Use our
                free browser{" "}
                <Link href="/tools/srt-to-vtt-converter">
                  SRT to WebVTT converter and validator
                </Link>{" "}
                with zero signup.
              </li>
            </ul>
            <p>
              Compare every file type in depth in our{" "}
              <Link href="/guides/subtitle-and-video-exports">
                TXT, SRT, VTT, and MP4 export guide
              </Link>
              , or see how UrduSpeech compares to mobile editors in{" "}
              <Link href="/compare/urduspeech-vs-capcut">
                UrduSpeech vs CapCut
              </Link>
              .
            </p>
          </>
        ),
      },
    ],
  },
  {
    slug: "urdu-roman-urdu-and-english",
    topic: "Script and translation",
    title: "Urdu, Roman Urdu and English captions",
    seoTitle: "Urdu, Roman Urdu & English Captions Compared | UrduSpeech",
    description:
      "Compare Urdu Nastaliq script, Roman Urdu transliteration, English translation, and stacked bilingual captions from the same spoken Urdu recording.",
    summary:
      "See how a single spoken Urdu recording reads across Urdu Nastaliq script, Roman Urdu transliteration, English translation, and stacked bilingual captions—and when to use each.",
    publishedIso: "2026-11-18T00:00:00+05:00",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 1180,
    primaryProductHref: "/urdu-transcription",
    primaryProductLabel: "Explore Urdu transcription",
    ctaTitle: "Try all four outputs from one Urdu recording",
    ctaCopy:
      "Start with 10 free minutes (no card required) or test all four script modes side by side in the interactive browser editor.",
    sections: [
      {
        title: "Why choosing the right script changes viewer retention",
        body: (
          <>
            <p>
              Spoken Urdu reaches one of the most script-diverse audiences on
              the internet. A single video recorded in Lahore or Karachi might
              be watched by native Urdu readers who prefer classic Nastaliq
              typography, urban Gen-Z viewers who scan Roman Urdu on Instagram
              Reels faster than right-to-left script, overseas Pakistani
              diaspora families who follow spoken Urdu alongside English
              subtitles, and international viewers who only read English.
            </p>
            <p>
              Picking the wrong output mode forces viewers to work harder than
              necessary—or scroll past silently muted video. UrduSpeech Studio
              generates four distinct outputs from the same spoken Urdu
              recording: <strong>Urdu script</strong>,{" "}
              <strong>Roman Urdu</strong>, <strong>English translation</strong>,
              and stacked <strong>Urdu + English</strong> (either Urdu-first or
              English-first). Understanding the exact difference between
              transcription, transliteration, and translation helps you match
              your subtitle choice to your channel’s real audience.
            </p>
          </>
        ),
      },
      {
        title: "Urdu Nastaliq script vs Roman Urdu transliteration",
        body: (
          <>
            <p>
              Both <Link href="/urdu-transcription">Urdu script</Link> and{" "}
              <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link> preserve
              the speaker’s original Urdu vocabulary, grammar, and rhythm—they
              differ only in writing system and reading direction:
            </p>
            <ul>
              <li>
                <strong>
                  Urdu script (Transcription, <code>lang=&quot;ur&quot;</code>,
                  RTL):
                </strong>{" "}
                Writes spoken Urdu in standard right-to-left Urdu Unicode
                characters, rendered in <strong>Noto Nastaliq Urdu</strong> for
                burned-in MP4 exports. Proper Unicode normalization matters:
                mixing Arabic kaf (<code>U+0643</code>) or Arabic yeh (
                <code>U+064A</code>) with Urdu kaf (<code>U+06A9</code>) and
                choti yeh (<code>U+06CC</code>) causes broken search indexing
                and ugly glyph fallback on Android and desktop players.
                UrduSpeech’s conservative AI correction normalizes these forms
                automatically.
              </li>
              <li>
                <strong>
                  Roman Urdu (Transliteration,{" "}
                  <code>lang=&quot;ur-Latn&quot;</code>, LTR):
                </strong>{" "}
                Writes the exact same spoken Urdu words left-to-right in Latin
                letters (<code>A–Z</code>). Because everyday Roman Urdu has no
                single standardized dictionary—writers alternate between{" "}
                <em>samajh</em> vs <em>smjh</em>, <em>awaaz</em> vs{" "}
                <em>awaz</em>, or <em>chalein</em> vs <em>chalen</em>—Studio
                produces readable, vowel-complete Roman Urdu and lets you edit
                any cue to match your brand’s house spelling.
              </li>
            </ul>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                اگر آواز صاف ہو تو کیپشن بنانے میں آدھا وقت بچ جاتا ہے۔
              </span>
              <span lang="ur-Latn" dir="ltr">
                Agar awaaz saaf ho to caption banane mein aadha waqt bach jata
                hai.
              </span>
            </div>
            <p>
              Notice how Roman Urdu also eliminates left-to-right/right-to-left
              cursor jumps when your team imports an SRT file into legacy
              desktop video editors or shares edit logs over Slack and Google
              Docs.
            </p>
          </>
        ),
      },
      {
        title:
          "English translation and stacked bilingual (Urdu + English) captions",
        body: (
          <>
            <p>
              Unlike Roman Urdu,{" "}
              <Link href="/urdu-audio-to-english-text">
                English output translates
              </Link>{" "}
              the meaning of spoken Urdu into natural English sentences. Every
              translation is generated from the verified Urdu speech transcript
              so cues stay anchored to what was actually spoken rather than
              hallucinating extra commentary.
            </p>
            <p>
              <strong>Stacked bilingual output (Urdu + English)</strong> places
              both the Urdu script line and its English translation on the same
              timed cue. When creating a project in Studio, you choose{" "}
              <strong>Urdu first</strong> (Nastaliq on top, English
              underneath—popular for Pakistani podcasts and educational reels)
              or <strong>English first</strong> (English on top, Urdu
              underneath—helpful when international accessibility leads). Learn
              more about bilingual layout decisions on our{" "}
              <Link href="/bilingual-urdu-english-captions">
                bilingual Urdu + English captions page
              </Link>
              .
            </p>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                اگر آواز صاف ہو تو کیپشن بنانے میں آدھا وقت بچ جاتا ہے۔
              </span>
              <span lang="en" dir="ltr">
                When the audio is clear, making captions takes half the time.
              </span>
            </div>
            <p>
              Because viewers reading two stacked lines need slightly more time
              per cue than single-language readers, keep bilingual cues tight
              during review and avoid cramming two full sentences into a
              two-second cut.
            </p>
          </>
        ),
      },
      {
        title: "Side-by-side matrix of all four UrduSpeech outputs",
        body: (
          <div
            className="pricing-scroll"
            role="region"
            aria-label="Detailed comparison of UrduSpeech script and translation outputs"
            tabIndex={0}
          >
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Output mode</th>
                  <th scope="col">Linguistic operation</th>
                  <th scope="col">Script &amp; BCP 47 tag</th>
                  <th scope="col">Best creator use cases</th>
                  <th scope="col">What to check in Studio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Urdu</th>
                  <td>Speech-to-text transcription</td>
                  <td>
                    Noto Nastaliq Urdu, RTL (<code>ur</code>)
                  </td>
                  <td>
                    News explainers, poetry, literature, formal interviews,
                    native YouTube CC
                  </td>
                  <td>Proper names, regional vocabulary, loanword spelling</td>
                </tr>
                <tr>
                  <th scope="row">Roman Urdu</th>
                  <td>Phonetic Latin transliteration</td>
                  <td>
                    Latin alphabet, LTR (<code>ur-Latn</code>)
                  </td>
                  <td>
                    Instagram Reels, TikTok, vlogs, comedy sketches, production
                    edit scripts
                  </td>
                  <td>House spelling consistency, mixed English tech terms</td>
                </tr>
                <tr>
                  <th scope="row">English</th>
                  <td>Urdu-to-English translation</td>
                  <td>
                    Latin alphabet, LTR (<code>en</code>)
                  </td>
                  <td>
                    Global YouTube CC tracks, documentaries, press quotes,
                    English research notes
                  </td>
                  <td>Idioms, cultural humor, lakh/crore numeric phrasing</td>
                </tr>
                <tr>
                  <th scope="row">Urdu + English</th>
                  <td>Stacked transcription + translation</td>
                  <td>
                    RTL <code>ur</code> + LTR <code>en</code>
                  </td>
                  <td>
                    Diaspora podcasts, language learning, interviews,
                    dual-market brand reels
                  </td>
                  <td>
                    Line length, reading time, Urdu-first vs English-first
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        title: "Handling Urdu-English code-switching cleanly across scripts",
        body: (
          <>
            <p>
              Real spoken Urdu in Pakistan routinely shifts into English
              mid-clause—for instance,{" "}
              <span lang="ur-Latn" dir="ltr">
                “Camera 4K par set hai lekin audio bitrate 192 kbps rakhna.”
              </span>{" "}
              Each script handles code-switching slightly differently:
            </p>
            <ul>
              <li>
                In <strong>Urdu script</strong>, technical acronyms and units
                (like <code>4K</code> or <code>192 kbps</code>) sit inline with
                Nastaliq text. UrduSpeech’s burned-in renderer balances optical
                sizing between Noto Nastaliq Urdu and Inter so Latin tokens do
                not look oversized or vertically misaligned.
              </li>
              <li>
                In <strong>Roman Urdu</strong>, mixed English words blend
                seamlessly in a single left-to-right flow, making it the fastest
                script to scan for tech reviews, startup podcasts, and creator
                tutorials.
              </li>
              <li>
                In <strong>English translation</strong>, spoken English terms
                inside Urdu sentences stay naturally intact while surrounding
                Urdu grammar translates into idiomatic English.
              </li>
            </ul>
            <p>
              Regardless of mode, UrduSpeech protects numbers, currency figures,
              URLs, email addresses, and social handles against accidental
              alteration during AI processing.
            </p>
          </>
        ),
      },
      {
        title: "Audience decision guide and testing in the browser demo",
        body: (
          <>
            <p>
              Not sure which output fits your next upload? Use this simple rule
              of thumb: pick <strong>Urdu script</strong> when authority,
              literary polish, or formal Pakistani readership matters most; pick{" "}
              <strong>Roman Urdu</strong> for fast-paced social clips where
              viewers watch muted on mobile; pick <strong>English</strong> when
              publishing a dedicated secondary subtitle track in YouTube Studio;
              and pick <strong>Urdu + English</strong> when a single burned-in
              video needs to serve both native and diaspora viewers at once.
            </p>
            <p>
              Every output mode supports UTF-8 <strong>TXT</strong>,{" "}
              <strong>SRT</strong>, and <strong>VTT</strong> downloads as well
              as burned-in <Link href="/video-captions">captioned MP4</Link>{" "}
              video exports. To compare all four outputs live on the same timed
              sample before signing up,{" "}
              <Link href="/demo">open the interactive caption demo</Link>.
            </p>
          </>
        ),
      },
    ],
  },
  {
    slug: "subtitle-and-video-exports",
    topic: "Files and exports",
    title: "When to export TXT, SRT, VTT or MP4",
    seoTitle: "When to Export TXT, SRT, VTT or Captioned MP4 | UrduSpeech",
    description:
      "Compare plain-text TXT transcripts, UTF-8 SRT and WebVTT subtitle files, and burned-in Nastaliq MP4 exports with valid Urdu timestamp examples.",
    summary:
      "Compare UTF-8 TXT transcripts, SRT and WebVTT subtitle tracks, and burned-in captioned MP4 renders with real Urdu timestamp examples and platform guidelines.",
    publishedIso: "2026-11-18T00:00:00+05:00",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 1160,
    primaryProductHref: "/video-captions",
    primaryProductLabel: "Explore subtitle & video exports",
    ctaTitle: "Export TXT, SRT, VTT, or captioned MP4 from your recording",
    ctaCopy:
      "Upload an Urdu audio or video file with 10 free minutes (no card required), or download sample SRT, VTT, and TXT files directly from the browser demo.",
    sections: [
      {
        title: "Overview: closed captions vs burned-in video vs plain text",
        body: (
          <>
            <p>
              Every project in UrduSpeech Studio gives you access to four export
              formats designed for different publishing pipelines:
              un-timestamped plain text (<strong>TXT</strong>), two timed
              closed-caption standards (<strong>SRT</strong> and{" "}
              <strong>WebVTT</strong>), and permanently rendered video (
              <strong>Captioned MP4</strong>). Choosing the right file prevents
              wasted re-renders, garbled Urdu fonts, or overlapping double
              captions on YouTube.
            </p>
            <div
              className="pricing-scroll"
              role="region"
              aria-label="Comparison of TXT, SRT, VTT, and captioned MP4 exports"
              tabIndex={0}
            >
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th scope="col">Export format</th>
                    <th scope="col">Timing data</th>
                    <th scope="col">Typography control</th>
                    <th scope="col">Media expiry behavior</th>
                    <th scope="col">Best destinations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">TXT (.txt)</th>
                    <td>None (clean lines)</td>
                    <td>Controlled by your word processor</td>
                    <td>Stays until project/account deletion</td>
                    <td>Show notes, articles, quotes, research archives</td>
                  </tr>
                  <tr>
                    <th scope="row">SRT (.srt)</th>
                    <td>
                      Sequential index + comma ms (<code>00:00:14,250</code>)
                    </td>
                    <td>Controlled by target video player or NLE</td>
                    <td>Stays until project/account deletion</td>
                    <td>YouTube Studio, Premiere Pro, DaVinci Resolve, VLC</td>
                  </tr>
                  <tr>
                    <th scope="row">WebVTT (.vtt)</th>
                    <td>
                      <code>WEBVTT</code> header + dot ms (
                      <code>00:00:14.250</code>)
                    </td>
                    <td>
                      Controlled by web player / CSS <code>::cue</code>
                    </td>
                    <td>Stays until project/account deletion</td>
                    <td>
                      HTML5 <code>&lt;video&gt;</code>, Vimeo, LMS portals,
                      YouTube
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Captioned MP4 (.mp4)</th>
                    <td>Baked into H.264 frames at cue times</td>
                    <td>
                      Locked Noto Nastaliq Urdu &amp; Inter (Clean, Social
                      highlight, Boxed)
                    </td>
                    <td>Expires after 3 / 15 / 30 / 90 days</td>
                    <td>Instagram Reels, TikTok, YouTube Shorts, WhatsApp</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ),
      },
      {
        title: "Plain text (TXT): articles, podcast show notes, and quotes",
        body: (
          <>
            <p>
              <strong>TXT</strong> downloads your finalized transcript as clean
              UTF-8 plain text with no timestamps or cue numbers. It is the
              fastest format for journalists pulling verified interview quotes,
              podcasters drafting episode summaries and chapter outlines (see{" "}
              <Link href="/urdu-podcast-transcription">
                Urdu podcast transcription
              </Link>
              ), and students turning recorded lectures into searchable study
              notes.
            </p>
            <p>
              In Studio, TXT becomes available as soon as text generation
              completes—even if you uploaded an audio-only file or skipped
              timing edits. When you choose bilingual (
              <strong>Urdu + English</strong>) output, the TXT file preserves
              both ordered lines cleanly. Always open exported Urdu{" "}
              <code>.txt</code> files in UTF-8-aware editors (Google Docs,
              Notion, VS Code, Apple Notes, or modern Microsoft Word) so Urdu
              characters never display as garbled symbols.
            </p>
          </>
        ),
      },
      {
        title: "UTF-8 SRT vs WebVTT: exact syntax and timestamp examples",
        body: (
          <>
            <p>
              <strong>SRT</strong> (SubRip Text) and <strong>WebVTT</strong>{" "}
              (Web Video Text Tracks, standardized by the{" "}
              <a
                href="https://www.w3.org/TR/webvtt1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                W3C WebVTT specification
              </a>
              ) are lightweight UTF-8 sidecar files stored outside your video.
              Viewers can switch them on or off, search engines can index closed
              captions on platforms like YouTube, and video editors can drop
              them straight onto a timeline. See our dedicated{" "}
              <Link href="/srt-vtt-urdu-subtitle-generator">
                SRT &amp; VTT Urdu subtitle generator
              </Link>{" "}
              overview for workflow specs.
            </p>
            <div className="code-comparison">
              <div className="code-sample">
                <h3>Valid UTF-8 SRT example (comma milliseconds)</h3>
                <pre>
                  <code>
                    {"1\n00:00:14,250 --> 00:00:18,600\n"}
                    <span lang="ur" dir="rtl">
                      ہم نے اس ڈاکومنٹری کی ریکارڈنگ کوئٹہ میں مکمل کی۔
                    </span>
                    {"\n\n2\n00:00:18,900 --> 00:00:22,400\n"}
                    <span lang="ur" dir="rtl">
                      ہر انٹرویو میں مقامی آوازوں کو ترجیح دی گئی۔
                    </span>
                  </code>
                </pre>
              </div>
              <div className="code-sample">
                <h3>Valid UTF-8 WebVTT example (WEBVTT header + dot)</h3>
                <pre>
                  <code>
                    {"WEBVTT\n\n00:00:14.250 --> 00:00:18.600\n"}
                    <span lang="ur" dir="rtl">
                      ہم نے اس ڈاکومنٹری کی ریکارڈنگ کوئٹہ میں مکمل کی۔
                    </span>
                    {"\n\n00:00:18.900 --> 00:00:22.400\n"}
                    <span lang="ur" dir="rtl">
                      ہر انٹرویو میں مقامی آوازوں کو ترجیح دی گئی۔
                    </span>
                  </code>
                </pre>
              </div>
            </div>
            <p>
              Three technical rules keep SRT and VTT files valid everywhere: (1)
              SRT uses a comma before milliseconds (<code>00:00:14,250</code>)
              and requires sequential cue indices, whereas WebVTT starts with{" "}
              <code>WEBVTT</code> on line one and uses a period before
              milliseconds (<code>00:00:14.250</code>); (2) WebVTT escapes
              literal <code>&amp;</code>, <code>&lt;</code>, and{" "}
              <code>&gt;</code> characters so they are never misinterpreted as
              HTML tags; and (3) adjacent cues should never overlap in time.
              Studio validates all three automatically before export. Already
              have an SRT file and need a clean VTT version? Run it locally in
              our free browser{" "}
              <Link href="/tools/srt-to-vtt-converter">
                SRT to WebVTT converter and validator
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        title: "Importing Urdu SRT files into Premiere Pro and DaVinci Resolve",
        body: (
          <>
            <p>
              If you import an Urdu-script <code>.srt</code> file into a desktop
              non-linear editor, remember that the editor—not the SRT
              file—controls font shaping:
            </p>
            <ul>
              <li>
                <strong>Adobe Premiere Pro:</strong> Open{" "}
                <em>Settings → Graphics</em> and switch the text engine from
                European &amp; East Asian to{" "}
                <strong>South Asian and Middle Eastern</strong> before importing
                the SRT. Then select all caption segments and assign{" "}
                <strong>Noto Nastaliq Urdu</strong> or{" "}
                <strong>Jameel Noori Nastaleeq</strong> with generous line
                height so stacked strokes do not collide.
              </li>
              <li>
                <strong>DaVinci Resolve:</strong> Assign a locally installed
                Nastaliq or Urdu Naskh font inside the Subtitle Track Style
                panel and double-check punctuation alignment on lines mixing
                Urdu and English numbers.
              </li>
              <li>
                <strong>Fastest alternative when NLE RTL misbehaves:</strong>{" "}
                Export a burned-in captioned MP4 directly from UrduSpeech Studio
                for social clips, or use{" "}
                <Link href="/urdu-audio-to-roman-urdu">Roman Urdu SRT</Link> for
                paper edits and rough cuts.
              </li>
            </ul>
          </>
        ),
      },
      {
        title:
          "Burned-in captioned MP4: resolution, presets, and the 256 MiB cap",
        body: (
          <>
            <p>
              A rendered <strong>captioned MP4</strong> permanently draws
              captions into the H.264 video picture with AAC audio. Unlike soft
              subtitles, viewers cannot accidentally turn them off, and
              Instagram, TikTok, LinkedIn, and WhatsApp cannot substitute a
              broken fallback font—every viewer sees properly shaped{" "}
              <strong>Noto Nastaliq Urdu</strong> and <strong>Inter</strong> in
              your chosen <strong>Clean</strong>,{" "}
              <strong>Social highlight</strong> (<code>#FFD54F</code>), or{" "}
              <strong>Boxed</strong> style.
            </p>
            <p>
              Keep three operational boundaries in mind when planning video
              renders:
            </p>
            <ul>
              <li>
                <strong>Resolution &amp; watermark:</strong> Free accounts
                render up to 720p with a watermark. Paid plans (
                <Link href="/pricing">Starter, Creator, Studio</Link>) render up
                to 1080p without a watermark while preserving 16:9, 9:16, or 1:1
                orientation.
              </li>
              <li>
                <strong>256 MiB output safety cap:</strong> Rendered captioned
                MP4 files have a 256 MiB ceiling. For 30- to 90-minute videos
                destined for YouTube, upload your master video separately and
                attach the UTF-8 SRT or VTT track in{" "}
                <Link href="/guides/urdu-subtitles-for-youtube">
                  YouTube Studio
                </Link>{" "}
                instead of burning captions into a multi-gigabyte file.
              </li>
              <li>
                <strong>Retention window:</strong> Original uploaded media and
                rendered MP4 files automatically expire after 3, 15, 30, or 90
                days depending on your plan, whereas your TXT, SRT, and VTT
                tracks remain saved until you delete the project or account (see{" "}
                <Link href="/security">security and retention details</Link>).
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    slug: "voice-notes-to-text",
    topic: "Audio workflow",
    title: "How to convert Urdu voice notes to text",
    seoTitle: "Convert Urdu Voice Notes to Text | UrduSpeech Guide",
    description:
      "Check a saved Urdu voice note for supported codecs, convert WhatsApp .opus files locally, review names and numbers, and export a UTF-8 transcript.",
    summary:
      "Prepare saved phone memos or WhatsApp voice messages in supported audio formats, upload them to Studio, review informal speech and names, and export UTF-8 text.",
    publishedIso: "2026-11-18T00:00:00+05:00",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 1120,
    primaryProductHref: "/urdu-transcription",
    primaryProductLabel: "Go to Urdu speech to text",
    ctaTitle: "Have a supported Urdu voice recording ready?",
    ctaCopy:
      "Upload MP3, M4A, WAV, or FLAC audio in Studio. Your account includes a one-time 10-minute free allowance with no card required.",
    sections: [
      {
        title: "Which phone and WhatsApp voice note formats work directly?",
        body: (
          <>
            <p>
              Journalists, founders, students, and remote teams across Pakistan
              often receive critical updates as two- to fifteen-minute Urdu
              voice messages rather than typed emails. Turning those recordings
              into searchable written notes saves hours of re-listening—provided
              you check the file format before uploading.
            </p>
            <p>
              UrduSpeech Studio validates and transcribes local audio files in{" "}
              <strong>MP3</strong> (<code>.mp3</code>), <strong>AAC M4A</strong>{" "}
              (<code>.m4a</code>), <strong>PCM WAV</strong> (<code>.wav</code>),
              and <strong>FLAC</strong> (<code>.flac</code>), as well as{" "}
              <strong>MP4</strong> and <strong>MOV</strong> videos with AAC
              audio. Here is how common phone recording apps map to Studio:
            </p>
            <div
              className="pricing-scroll"
              role="region"
              aria-label="Compatibility of common mobile voice note apps with UrduSpeech Studio"
              tabIndex={0}
            >
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th scope="col">Recording source</th>
                    <th scope="col">Typical file extension</th>
                    <th scope="col">Direct upload?</th>
                    <th scope="col">Action needed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">iPhone Voice Memos</th>
                    <td>
                      <code>.m4a</code> (AAC)
                    </td>
                    <td>Yes</td>
                    <td>Share to Files and upload directly in Studio</td>
                  </tr>
                  <tr>
                    <th scope="row">Android Voice Recorder / Samsung</th>
                    <td>
                      <code>.m4a</code>, <code>.mp3</code>, or <code>.wav</code>
                    </td>
                    <td>Yes</td>
                    <td>
                      Upload directly from your Downloads or Recordings folder
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">WhatsApp exported voice notes</th>
                    <td>
                      <code>.opus</code> or <code>.ogg</code>
                    </td>
                    <td>No (convert first)</td>
                    <td>Convert locally to AAC M4A, MP3, or PCM WAV first</td>
                  </tr>
                  <tr>
                    <th scope="row">Zoom / handheld field recorders</th>
                    <td>
                      <code>.wav</code> or <code>.mp3</code>
                    </td>
                    <td>Yes</td>
                    <td>Check file size stays under plan cap (see below)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Check{" "}
              <Link href="/supported-formats">
                supported formats and plan limits
              </Link>{" "}
              for exact duration and upload caps (10 min / 250 MiB on Free, up
              to 360 min and under 2 GiB on Studio).
            </p>
          </>
        ),
      },
      {
        title:
          "Converting WhatsApp .opus or .ogg voice messages safely on your device",
        body: (
          <>
            <p>
              UrduSpeech does not link to your WhatsApp account, does not read
              private chat threads, does not record live from your microphone,
              and does not include a built-in format transcoding tool. If you
              export a WhatsApp voice message and see a <code>.opus</code> or{" "}
              <code>.ogg</code> extension, convert it locally on your own
              computer or phone before uploading—keeping private recordings off
              random ad-supported converter websites:
            </p>
            <ul>
              <li>
                <strong>
                  On Windows, macOS, or Linux with VLC Media Player:
                </strong>{" "}
                Open <em>Media → Convert / Save</em>, add the <code>.opus</code>{" "}
                file, choose the <strong>Audio – MP3</strong> or{" "}
                <strong>Audio – AAC (M4A)</strong> profile, and save locally.
              </li>
              <li>
                <strong>On macOS or Linux with FFmpeg (command line):</strong>{" "}
                Run{" "}
                <code>
                  ffmpeg -i voice-note.opus -c:a aac -b:a 128k voice-note.m4a
                </code>{" "}
                (or <code>-ar 16000 -ac 1 voice-note.wav</code> for compact mono
                PCM WAV).
              </li>
              <li>
                <strong>On iPhone or Android:</strong> Use a trusted offline
                audio utility or Shortcuts/Audacity export to re-save as{" "}
                <code>.m4a</code> or <code>.mp3</code>, play the output for two
                seconds to confirm audio is intact, then upload.
              </li>
            </ul>
            <p>
              For a dedicated overview of mobile and voice-memo workflows, see{" "}
              <Link href="/urdu-voice-notes-to-text">
                Urdu voice notes to text
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        title: "Step-by-step: upload, pick script, and start transcription",
        body: (
          <>
            <ol>
              <li>
                Sign in to Studio and select <strong>New upload</strong>.
              </li>
              <li>
                Select your saved <code>.m4a</code>, <code>.mp3</code>,{" "}
                <code>.wav</code>, or <code>.flac</code> file and give the
                project a descriptive title (for example,{" "}
                <em>Client brief – Karachi shoot</em>).
              </li>
              <li>
                Choose the script that fits how you will share the notes:{" "}
                <Link href="/urdu-transcription">Urdu Nastaliq script</Link> for
                formal Urdu documentation,{" "}
                <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link> for
                quick WhatsApp/Slack summaries,{" "}
                <Link href="/urdu-audio-to-english-text">English</Link> for
                international stakeholders, or <strong>Urdu + English</strong>{" "}
                for bilingual reference.
              </li>
              <li>
                Leave <strong>AI text correction</strong> enabled to clean up
                punctuation and Urdu Unicode forms (or turn it off for untouched
                speech recognition), confirm you have rights to process the
                audio, and upload.
              </li>
              <li>
                Wait a moment for Studio’s media check to confirm the speech
                track, then click <strong>Start transcription</strong>.
              </li>
            </ol>
            <p>
              If you have multiple short voice notes on the same topic, note
              that Studio deducts actual recording duration against your minute
              allowance—so a 45-second memo uses less than one minute of your
              pool.
            </p>
          </>
        ),
      },
      {
        title:
          "Reviewing casual Urdu voice notes: names, prices, and rapid switches",
        body: (
          <>
            <p>
              Voice messages are far more informal than scripted studio video.
              Speakers talk while walking, switch abruptly between Urdu and
              English, dictate phone numbers or PKR quotes quickly, and drop
              words in traffic or fan noise. Before copying text into an email,
              invoice, or news story, play back your local file inside Studio
              and verify four high-risk elements:
            </p>
            <ul>
              <li>
                <strong>Prices, account numbers, and dates:</strong> UrduSpeech
                guards numeric tokens during AI correction, but muffled speech
                can still cause digits like <em>pachas</em> (50) and{" "}
                <em>pachpan</em> (55) to be misheard. Always listen back to
                figures.
              </li>
              <li>
                <strong>People and company names:</strong> Verify exact English
                or Urdu spellings of personal names, neighborhoods, and client
                brands.
              </li>
              <li>
                <strong>Multiple speakers:</strong> Remember Studio does not
                label separate speakers automatically. If two people spoke on a
                voice memo, add quick speaker initials or line breaks in your
                exported document.
              </li>
              <li>
                <strong>AI correction suggestions:</strong> Accept or reject
                each highlighted suggestion in Studio so informal idioms keep
                their intended tone.
              </li>
            </ul>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                کل صبح دس بجے کلائنٹ کال ہے، فائنل فائل آج شام بھیج دیں۔
              </span>
              <span lang="ur-Latn" dir="ltr">
                Kal subah das baje client call hai, final file aaj shaam bhej
                dein.
              </span>
              <span lang="en" dir="ltr">
                The client call is tomorrow at 10 a.m., please send the final
                file this evening.
              </span>
            </div>
          </>
        ),
      },
      {
        title:
          "Exporting TXT, SRT, or VTT and managing private voice recordings",
        body: (
          <>
            <p>
              Download a UTF-8 <strong>TXT</strong> file when you want clean
              readable paragraphs for meeting notes, articles, or project
              briefs, or export <strong>SRT</strong> / <strong>VTT</strong> if
              you want clickable timestamps to jump back to key moments in a
              long memo.
            </p>
            <p>
              Because voice notes often contain sensitive client or personal
              details, review how Studio handles retention: processing is 100%
              automated (no human staff listen to your audio, and recordings are
              never used to train models), uploaded audio expires automatically
              after 3, 15, 30, or 90 days according to your plan, and you can
              delete any project manually the moment you download your TXT
              transcript. Read our{" "}
              <Link href="/security">security and retention guide</Link> and{" "}
              <Link href="/privacy">privacy policy</Link> for full details.
            </p>
          </>
        ),
      },
    ],
  },
  {
    slug: "urdu-subtitles-for-youtube",
    topic: "Publishing",
    title: "How to add Urdu subtitles to YouTube videos",
    seoTitle: "How to Add Urdu Subtitles to YouTube Videos | UrduSpeech",
    description:
      "Generate UTF-8 Urdu, Roman Urdu, or English SRT and VTT subtitle tracks from your local video master, then upload and verify them in YouTube Studio.",
    summary:
      "Prepare clean UTF-8 Urdu, Roman Urdu, or English SRT and WebVTT subtitle tracks from your local edit master, upload them in YouTube Studio, and avoid double-caption overlap.",
    publishedIso: "2026-11-18T00:00:00+05:00",
    updated: "2026-11-22",
    updatedIso: "2026-11-22T00:00:00+05:00",
    displayUpdated: "22 November 2026",
    wordCount: 1150,
    primaryProductHref: "/video-captions",
    primaryProductLabel: "Explore Urdu video captions",
    ctaTitle: "Prepare YouTube-ready Urdu SRT or VTT files",
    ctaCopy:
      "Start with a 10-minute one-time free allowance (no card required). Upload your local MP4 or MOV video in Studio, review the timing, and export UTF-8 SRT or VTT.",
    sections: [
      {
        title: "Why manual UTF-8 Urdu subtitles beat YouTube auto-captions",
        body: (
          <>
            <p>
              YouTube’s automatic captions have historically lagged behind on
              natural Pakistani Urdu, especially on podcasts, interviews, and
              videos mixing Urdu with English technical vocabulary. Uploading a
              reviewed UTF-8 <code>.srt</code> or <code>.vtt</code> subtitle
              track gives viewers accurate spelling, clean punctuation, and
              dependable timestamps across desktop, mobile, and smart TVs—and
              lets you publish separate <strong>Urdu</strong> and{" "}
              <strong>English</strong> closed-caption tracks under the same
              video so global audiences can switch languages with one tap.
            </p>
            <p>
              See our dedicated{" "}
              <Link href="/youtube-urdu-subtitles">
                YouTube Urdu subtitles workflow
              </Link>{" "}
              for channel-level setup tips alongside this step-by-step guide.
            </p>
          </>
        ),
      },
      {
        title: "Step 1: Start from your finalized local master or audio bounce",
        body: (
          <>
            <p>
              UrduSpeech processes local files stored on your device—it does not
              pull videos from YouTube URLs, request access to your Google
              channel, or push files directly via the YouTube API. Always
              transcribe from the <strong>exact final timeline</strong> you are
              uploading to YouTube. If you trim a 5-second intro after
              generating subtitles, every downstream cue will drift 5 seconds
              out of sync.
            </p>
            <p>
              <strong>Pro tip for long 4K YouTube videos:</strong> If your
              finished 4K <code>.mp4</code> master is larger than 2 GiB (the
              scanning ceiling), do not compress your YouTube master. Instead,
              export a lightweight AAC <code>.m4a</code> or <code>.mp3</code>{" "}
              audio bounce of the exact same timeline (zero frame offset) and
              upload that audio file to Studio. Because audio and video share
              the same duration-based minute allowance, the resulting{" "}
              <code>.srt</code> or <code>.vtt</code> timestamps will match your
              4K YouTube upload frame-for-frame while uploading in seconds.
            </p>
          </>
        ),
      },
      {
        title:
          "Step 2: Generate, review, and export UTF-8 SRT or VTT in Studio",
        body: (
          <>
            <ol>
              <li>
                Open <strong>New upload</strong> in Studio and add your local
                MP4/MOV master or synced audio bounce (check{" "}
                <Link href="/supported-formats">
                  supported formats and plan limits
                </Link>
                ). If your video contains multiple audio streams, pick the
                spoken-Urdu track during Media check.
              </li>
              <li>
                Select the subtitle language you are preparing:{" "}
                <strong>Urdu</strong> for native Urdu closed captions,{" "}
                <Link href="/urdu-audio-to-english-text">
                  English translation
                </Link>{" "}
                for an international track,{" "}
                <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link> for
                Latin-script Urdu, or <strong>Urdu + English</strong> for a
                bilingual file.
              </li>
              <li>
                Review every cue in Studio’s editor alongside local playback.
                Correct guest names, brands, figures, and mixed Urdu-English
                terms, and verify cue start and end times so no two lines
                overlap.
              </li>
              <li>
                Save your track version and download a UTF-8{" "}
                <strong>SRT</strong> (<code>.srt</code>) or{" "}
                <strong>WebVTT</strong> (<code>.vtt</code>) file.
              </li>
            </ol>
            <p>
              Want both a selectable Urdu track and a selectable English track
              on the same YouTube video? Run one project in Urdu script and a
              separate project in English, then upload each <code>.srt</code>{" "}
              under its matching language row in YouTube Studio.
            </p>
          </>
        ),
      },
      {
        title:
          "Step 3: Closed-caption tracks (CC) vs burned-in MP4 for YouTube Shorts",
        body: (
          <>
            <p>
              Long-form 16:9 YouTube videos and vertical 9:16 YouTube Shorts
              usually benefit from different export choices:
            </p>
            <ul>
              <li>
                <strong>Long-form YouTube videos (use SRT or VTT):</strong>{" "}
                Selectable closed captions let viewers toggle CC on or off,
                resize text for accessibility, switch between Urdu and English
                tracks, and give YouTube’s player clean UTF-8 text without
                re-encoding your 4K master video.
              </li>
              <li>
                <strong>
                  YouTube Shorts (consider burned-in captioned MP4):
                </strong>{" "}
                Most viewers watch Shorts vertically on phones with captions
                expected on screen by default. Exporting a burned-in{" "}
                <Link href="/video-captions">captioned MP4</Link> in{" "}
                <strong>Social highlight</strong> (<code>#FFD54F</code>) or{" "}
                <strong>Boxed</strong> guarantees authentic{" "}
                <strong>Noto Nastaliq Urdu</strong> rendering instead of a
                phone’s fallback Naskh font. Avoid turning on a visible bottom
                YouTube CC track on top of a burned-in Short or the two layers
                will overlap.
              </li>
            </ul>
            <p>
              See{" "}
              <Link href="/guides/subtitle-and-video-exports">
                TXT, SRT, VTT, and MP4 exports
              </Link>{" "}
              for syntax examples and 720p Free vs 1080p paid render details.
            </p>
          </>
        ),
      },
      {
        title: "Step 4: Upload your SRT or VTT file inside YouTube Studio",
        body: (
          <>
            <p>
              YouTube accepts UTF-8 encoded <code>.srt</code> and{" "}
              <code>.vtt</code> timed files as well as plain <code>.txt</code>{" "}
              transcripts for auto-sync. Follow the official{" "}
              <a
                href="https://support.google.com/youtube/answer/2734796?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube Help guide to adding subtitles and captions
              </a>{" "}
              and{" "}
              <a
                href="https://support.google.com/youtube/answer/2734698?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube supported subtitle file formats
              </a>
              :
            </p>
            <ol>
              <li>
                Sign in to <strong>YouTube Studio</strong> on desktop and open{" "}
                <strong>Subtitles</strong> in the left sidebar.
              </li>
              <li>
                Select the video you want to caption. If prompted for a video
                language, choose <strong>Urdu</strong> and confirm.
              </li>
              <li>
                Click <strong>Add language</strong> and pick the language
                matching your file (<strong>Urdu</strong> for Urdu script, or{" "}
                <strong>English</strong> for your translated track).
              </li>
              <li>
                In the <strong>Subtitles</strong> column for that language,
                click <strong>Add → Upload file</strong>.
              </li>
              <li>
                Choose <strong>With timing</strong> for an exported{" "}
                <code>.srt</code> or <code>.vtt</code> file (or{" "}
                <strong>Without timing</strong> if uploading a plain{" "}
                <code>.txt</code> transcript), then click{" "}
                <strong>Continue</strong>.
              </li>
              <li>
                Select the UTF-8 file from your computer, preview several cues
                on YouTube Studio’s waveform timeline, and click{" "}
                <strong>Publish</strong>.
              </li>
            </ol>
          </>
        ),
      },
      {
        title:
          "Step 5: Verify mobile playback, RTL punctuation, and re-uploads",
        body: (
          <>
            <p>
              Before making the video public, play it unlisted on both desktop
              Chrome and the YouTube mobile app with <strong>CC</strong> turned
              on. Check three details specifically on Urdu tracks:
            </p>
            <ul>
              <li>
                <strong>Mixed Urdu + Latin lines:</strong> Verify that English
                brand names, URLs, and numbers read smoothly inside
                right-to-left cues without wrapping awkwardly onto a lone third
                line on narrow phone viewports.
              </li>
              <li>
                <strong>No sync drift near the end:</strong> Scrub to the final
                two minutes of the video to confirm cues still land cleanly on
                spoken pauses.
              </li>
              <li>
                <strong>Quick corrections:</strong> If you spot a typo after
                publishing, edit the cue in UrduSpeech Studio, export an updated
                UTF-8 <code>.srt</code> or <code>.vtt</code>, and replace the
                track inside YouTube Studio—or validate timestamp overlaps first
                with our free{" "}
                <Link href="/tools/srt-to-vtt-converter">
                  SRT to WebVTT converter and validator
                </Link>
                .
              </li>
            </ul>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                اگر آپ کو یہ ویڈیو پسند آئے تو چینل کو سبسکرائب ضرور کریں۔
              </span>
              <span lang="en" dir="ltr">
                If you enjoyed this video, please subscribe to the channel.
              </span>
            </div>
          </>
        ),
      },
    ],
  },
];
