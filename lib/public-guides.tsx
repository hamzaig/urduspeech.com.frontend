import Link from "next/link";
import type { DocumentSection } from "@/components/public-site";
import { captionCues } from "@/lib/caption-demo";

export type PublicGuide = {
  slug: string;
  topic: string;
  title: string;
  seoTitle?: string;
  description: string;
  summary: string;
  updated: string;
  displayUpdated: string;
  primaryProductHref: `/${string}`;
  primaryProductLabel: string;
  ctaTitle: string;
  ctaCopy: string;
  sections: readonly DocumentSection[];
};

export const publicGuides = [
  {
    slug: "make-urdu-video-captions",
    topic: "Video workflow",
    title: "How to make Urdu video captions",
    seoTitle: "How to Make Urdu Video Captions in Studio | UrduSpeech",
    description:
      "Step-by-step guide to uploading an MP4 or MOV video, reviewing Urdu caption text and timestamps, choosing a style and exporting SRT, VTT or captioned MP4.",
    summary:
      "Upload a local video, review the Urdu draft and timestamps in Studio, then download SRT or VTT subtitles or render a captioned MP4.",
    updated: "2026-11-21",
    displayUpdated: "21 November 2026",
    primaryProductHref: "/video-captions",
    primaryProductLabel: "Explore video captions",
    ctaTitle: "Ready to caption your own Urdu video?",
    ctaCopy:
      "Start with a 10-minute one-time free allowance (no card required). Upload an MP4 or MOV file in Studio to review captions and export SRT, VTT, or a captioned MP4.",
    sections: [
      {
        title: "Prepare and upload a video with clear speech",
        body: (
          <>
            <p>
              Open a new project in Studio and choose a local{" "}
              <strong>MP4</strong> or <strong>MOV</strong> file encoded with
              H.264 or HEVC video and AAC audio. Check the{" "}
              <Link href="/supported-formats">
                supported formats and plan upload limits
              </Link>{" "}
              before uploading. If background music competes with the speaker,
              export a cleaner speech mix from your editor first so the speech
              recognition draft starts with fewer uncertain words.
            </p>
            <p>
              After the upload finishes, Studio validates the container and
              scans the file. If your video contains more than one audio stream,
              the <strong>Media check</strong> panel asks you to select which
              audio track to transcribe before processing starts.
            </p>
          </>
        ),
      },
      {
        title: "Choose your script, translation, and AI correction setting",
        body: (
          <>
            <p>
              Select the caption output that matches your viewers before
              starting transcription:
            </p>
            <ul>
              <li>
                <strong>Urdu</strong> keeps spoken Urdu in right-to-left
                Nastaliq script (<Link href="/urdu-transcription">details</Link>
                ).
              </li>
              <li>
                <strong>Roman Urdu</strong> writes the spoken Urdu words in
                Latin letters (
                <Link href="/urdu-audio-to-roman-urdu">details</Link>).
              </li>
              <li>
                <strong>English</strong> translates the spoken Urdu meaning into
                English (<Link href="/urdu-audio-to-english-text">details</Link>
                ).
              </li>
              <li>
                <strong>Urdu + English</strong> stacks both lines together, with
                a choice of <strong>Urdu first</strong> or{" "}
                <strong>English first</strong>.
              </li>
            </ul>
            <p>
              Leave <strong>AI text correction</strong> enabled if you want
              conservative Urdu character-form normalization, punctuation, and
              reviewable wording suggestions, or turn it off to keep the
              unadjusted speech-recognition draft. You can also turn on{" "}
              <strong>Automatically embed captions</strong> to queue a captioned
              MP4 render as soon as timed captions are ready.
            </p>
          </>
        ),
      },
      {
        title: "Review words and non-overlapping timestamps",
        body: (
          <>
            <p>
              When processing finishes, open the caption editor in Studio. Check
              proper names, spoken numbers, dates, and phrases where the speaker
              switches between Urdu and English. If AI text correction proposed
              changes, use the <strong>AI corrections</strong> section to{" "}
              <strong>Accept</strong> or <strong>Reject</strong> individual
              suggestions.
            </p>
            <p>
              Choose your original file in the local{" "}
              <strong>Media preview</strong> player (the preview stays on your
              device without re-uploading) to check where each line begins and
              ends. Cue times are edited in seconds—for example, start{" "}
              <code>4.000</code> and end <code>8.000</code>—and must stay within
              the media duration without overlapping adjacent cues. Save your
              edits to create a new track version.
            </p>
          </>
        ),
      },
      {
        title: "Export SRT, VTT, or a captioned MP4",
        body: (
          <p>
            Once your saved track has valid timing, generate{" "}
            <strong>SRT</strong> or <strong>VTT</strong> subtitle files for
            editing software and web players (including{" "}
            <Link href="/guides/urdu-subtitles-for-youtube">
              YouTube Studio
            </Link>
            ), or choose a visual preset—<strong>Clean</strong>,{" "}
            <strong>Social highlight</strong>, or <strong>Boxed</strong>—to
            render a captioned MP4 with visible text burned into the video
            frames. See the{" "}
            <Link href="/guides/subtitle-and-video-exports">
              TXT, SRT, VTT, and MP4 export guide
            </Link>{" "}
            to compare file types, or <Link href="/pricing">compare plans</Link>{" "}
            for 720p watermarked Free exports versus 1080p unwatermarked paid
            renders.
          </p>
        ),
      },
    ],
  },
  {
    slug: "urdu-roman-urdu-and-english",
    topic: "Script and translation",
    title: "Urdu, Roman Urdu and English captions",
    seoTitle:
      "Urdu Script, Roman Urdu and English Captions Compared | UrduSpeech",
    description:
      "Compare Urdu Nastaliq script, Roman Urdu transliteration, English translation and bilingual captions from the same spoken Urdu recording.",
    summary:
      "See how a single spoken Urdu line reads in Urdu script, Roman Urdu, English translation and stacked bilingual output.",
    updated: "2026-11-21",
    displayUpdated: "21 November 2026",
    primaryProductHref: "/urdu-transcription",
    primaryProductLabel: "Explore Urdu transcription",
    ctaTitle: "Try all four outputs from one Urdu recording",
    ctaCopy:
      "Start with 10 free minutes (no card required) or test the interactive sample editor in your browser before uploading.",
    sections: [
      {
        title: "Urdu script vs Roman Urdu transliteration",
        body: (
          <>
            <p>
              Both <Link href="/urdu-transcription">Urdu script</Link> and{" "}
              <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link> keep the
              speaker’s original Urdu words and grammar—they only change the
              writing system:
            </p>
            <ul>
              <li>
                <strong>Transcription in Urdu script</strong> writes spoken Urdu
                in right-to-left Urdu script, rendered in Nastaliq with generous
                vertical line spacing.
              </li>
              <li>
                <strong>Transliteration in Roman Urdu</strong> writes those same
                Urdu words left-to-right in Latin letters (<code>A–Z</code>).
                Because casual Roman Urdu spelling varies across writers (for
                example, <em>awaaz</em> versus <em>awaz</em>), review the draft
                in Studio so names and recurring terms match your channel’s
                style.
              </li>
            </ul>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                {captionCues[1].urdu}
              </span>
              <span lang="ur-Latn" dir="ltr">
                {captionCues[1].romanUrdu}
              </span>
            </div>
          </>
        ),
      },
      {
        title: "English translation and stacked bilingual captions",
        body: (
          <>
            <p>
              <Link href="/urdu-audio-to-english-text">
                English output translates
              </Link>{" "}
              spoken Urdu meaning into English sentences rather than writing
              Urdu words phonetically. <strong>Bilingual output</strong> (
              <strong>Urdu + English</strong>) pairs each Urdu script line with
              its English translation in a stacked two-line layout, and lets you
              choose <strong>Urdu first</strong> or{" "}
              <strong>English first</strong> when creating the project.
            </p>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                {captionCues[1].urdu}
              </span>
              <span lang="en" dir="ltr">
                {captionCues[1].english}
              </span>
            </div>
            <p>
              Translation and bilingual cues are anchored to the verified Urdu
              phrases rather than word-by-word English audio alignment. Always
              review idioms, numbers, and proper nouns, and leave enough screen
              time for viewers to read two stacked lines comfortably.
            </p>
          </>
        ),
      },
      {
        title: "Side-by-side comparison of the four outputs",
        body: (
          <div
            className="pricing-scroll"
            role="region"
            aria-label="Comparison of UrduSpeech output variants"
            tabIndex={0}
          >
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Output option</th>
                  <th scope="col">What it does</th>
                  <th scope="col">Script &amp; direction</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Urdu</th>
                  <td>Transcribes spoken Urdu into Urdu words</td>
                  <td>Urdu Nastaliq (RTL)</td>
                  <td>Native Urdu readers, news, literature, formal talks</td>
                </tr>
                <tr>
                  <th scope="row">Roman Urdu</th>
                  <td>Transliterates spoken Urdu words into Latin letters</td>
                  <td>Latin alphabet (LTR)</td>
                  <td>Social reels, casual captions, production edit notes</td>
                </tr>
                <tr>
                  <th scope="row">English</th>
                  <td>Translates spoken Urdu meaning into English</td>
                  <td>Latin alphabet (LTR)</td>
                  <td>
                    International viewers, English articles, research notes
                  </td>
                </tr>
                <tr>
                  <th scope="row">Urdu + English</th>
                  <td>Stacks Urdu script and English translation together</td>
                  <td>RTL Urdu + LTR English</td>
                  <td>Diaspora audiences, interviews, educational videos</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        title: "Choose and edit your output in Studio",
        body: (
          <p>
            Pick your output option on the new-upload screen in Studio. Every
            output supports plain-text <strong>TXT</strong> downloads, timed{" "}
            <strong>SRT</strong> and <strong>VTT</strong> subtitle files, and
            burned-in <Link href="/video-captions">captioned MP4</Link> video
            rendering. To compare all four outputs interactively on the same
            timed sample,{" "}
            <Link href="/demo">open the sample caption editor</Link>.
          </p>
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
      "Compare plain-text TXT transcripts, UTF-8 SRT and WebVTT subtitle files, and burned-in captioned MP4 video exports with valid Urdu timestamp examples.",
    summary:
      "Compare TXT transcripts, UTF-8 SRT and VTT subtitle files, and burned-in captioned MP4 exports with valid Urdu timestamp examples.",
    updated: "2026-11-21",
    displayUpdated: "21 November 2026",
    primaryProductHref: "/video-captions",
    primaryProductLabel: "Explore subtitle & video exports",
    ctaTitle: "Export TXT, SRT, VTT, or captioned MP4 from your recording",
    ctaCopy:
      "Upload an Urdu audio or video file with 10 free minutes (no card required), or download sample SRT, VTT, and TXT files directly from the browser demo.",
    sections: [
      {
        title: "Compare TXT, SRT, VTT, and captioned MP4",
        body: (
          <>
            <p>
              UrduSpeech produces two kinds of text downloads—un-timestamped
              transcripts (<strong>TXT</strong>) and timed subtitle files (
              <strong>SRT</strong> and <strong>VTT</strong>)—plus rendered video
              files (<strong>Captioned MP4</strong>) where visible captions are
              burned into the picture.
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
                    <th scope="col">Timestamps</th>
                    <th scope="col">Font &amp; visual styling</th>
                    <th scope="col">Best use case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">TXT (.txt)</th>
                    <td>None (plain text paragraphs/lines)</td>
                    <td>Controlled by your document editor</td>
                    <td>
                      Show notes, quotes, articles, scripts, YouTube auto-sync
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">SRT (.srt)</th>
                    <td>
                      Numbered cues with comma milliseconds (
                      <code>00:00:04,000</code>)
                    </td>
                    <td>Controlled by the video player or NLE</td>
                    <td>
                      YouTube Studio uploads, Premiere, DaVinci Resolve, archive
                      tracks
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">WebVTT (.vtt)</th>
                    <td>
                      <code>WEBVTT</code> header with period milliseconds (
                      <code>00:00:04.000</code>)
                    </td>
                    <td>Controlled by the web video player</td>
                    <td>HTML5 web video players and LMS platforms</td>
                  </tr>
                  <tr>
                    <th scope="row">Captioned MP4 (.mp4)</th>
                    <td>Rendered directly into video frames at cue times</td>
                    <td>
                      Burned-in Noto Nastaliq Urdu &amp; Inter (Clean, Social
                      highlight, Boxed)
                    </td>
                    <td>
                      Reels, Shorts, TikTok, and social feeds where captions
                      must always show
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ),
      },
      {
        title: "Plain text (TXT) for notes, quotes, and transcripts",
        body: (
          <p>
            <strong>TXT</strong> exports your transcript as UTF-8 plain text
            with line breaks and no timecodes. Use it when you are turning an{" "}
            <Link href="/urdu-transcription">
              interview, podcast, lecture, or voice recording
            </Link>{" "}
            into quotes, show notes, or a written draft. In Studio, TXT becomes
            available as soon as the transcript text is ready—even if you do not
            need timed captions or if timing alignment settles as partial. When
            you choose bilingual (<strong>Urdu + English</strong>) output, the
            TXT file includes both the ordered Urdu lines and the English
            translation.
          </p>
        ),
      },
      {
        title: "UTF-8 SRT and WebVTT for timed subtitle tracks",
        body: (
          <>
            <p>
              <strong>SRT</strong> (SubRip) and <strong>VTT</strong> (WebVTT)
              are separate UTF-8 text files containing start and end timestamps
              for each caption cue. Because the text is stored outside the video
              file, viewers can turn closed captions on or off, and video
              editors can import the track onto a timeline. However, the font,
              size, and right-to-left shaping depend on the player or platform
              displaying the file.
            </p>
            <div className="code-comparison">
              <div className="code-sample">
                <h3>Valid UTF-8 SRT example (comma milliseconds)</h3>
                <pre>
                  <code>
                    {"1\n00:00:04,000 --> 00:00:08,000\n"}
                    <span lang="ur" dir="rtl">
                      {captionCues[1].urdu}
                    </span>
                  </code>
                </pre>
              </div>
              <div className="code-sample">
                <h3>Valid UTF-8 WebVTT example (WEBVTT header + period)</h3>
                <pre>
                  <code>
                    {"WEBVTT\n\n00:00:04.000 --> 00:00:08,000".replace(
                      ",000",
                      ".000",
                    ) + "\n"}
                    <span lang="ur" dir="rtl">
                      {captionCues[1].urdu}
                    </span>
                  </code>
                </pre>
              </div>
            </div>
            <p>
              Notice the two structural differences: SRT starts each block with
              a sequential cue number (<code>1</code>) and uses a comma before
              milliseconds (<code>00:00:04,000 --&gt; 00:00:08,000</code>),
              whereas VTT begins with a <code>WEBVTT</code> header and uses a
              period before milliseconds (
              <code>00:00:04.000 --&gt; 00:00:08.000</code>). Both formats work
              for{" "}
              <Link href="/guides/urdu-subtitles-for-youtube">
                uploading Urdu subtitles in YouTube Studio
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        title: "Burned-in captioned MP4 for consistent social playback",
        body: (
          <p>
            A rendered <strong>captioned MP4</strong> permanently draws the
            captions into the video picture (burned-in captions, not an embedded
            selectable subtitle track). That guarantees viewers see proper Urdu
            Nastaliq shaping, right-to-left punctuation, and your chosen{" "}
            <Link href="/video-captions">
              Clean, Social highlight, or Boxed preset
            </Link>{" "}
            even on platforms or mobile apps that do not render external Urdu
            fonts well. Free plan renders are up to 720p with a watermark; paid
            plans render up to 1080p without a watermark (see{" "}
            <Link href="/pricing">plans and pricing</Link>). Rendered MP4 files
            have a 256 MiB operational safety cap, while TXT, SRT, and VTT
            downloads remain available separately—check{" "}
            <Link href="/supported-formats">
              supported formats and render limits
            </Link>{" "}
            before uploading long or high-bitrate footage.
          </p>
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
      "Learn how to check a saved Urdu voice note for supported audio formats, upload it to UrduSpeech Studio, review names and numbers, and export a TXT transcript.",
    summary:
      "Check a saved local voice recording's file format, upload it to Studio, review names and numbers, and export an editable transcript.",
    updated: "2026-11-21",
    displayUpdated: "21 November 2026",
    primaryProductHref: "/urdu-transcription",
    primaryProductLabel: "Go to Urdu speech to text",
    ctaTitle: "Have a supported Urdu voice recording ready?",
    ctaCopy:
      "Upload MP3, M4A, WAV, or FLAC audio in Studio. Your account includes a one-time 10-minute free allowance with no card required.",
    sections: [
      {
        title: "Check the saved voice note’s file format first",
        body: (
          <>
            <p>
              UrduSpeech transcribes local audio and video files that you
              already have saved on your phone or computer. Before starting a
              project, check the file extension and make sure the recording has
              an audible speech track:
            </p>
            <ul>
              <li>
                <strong>Supported audio files:</strong> MP3 (<code>.mp3</code>),
                AAC M4A (<code>.m4a</code>), PCM WAV (<code>.wav</code>), and
                FLAC (<code>.flac</code>).
              </li>
              <li>
                <strong>Supported video files:</strong> MP4 (<code>.mp4</code>)
                and MOV (<code>.mov</code>) with H.264 or HEVC video and AAC
                audio.
              </li>
            </ul>
            <p>
              Built-in phone voice recorders typically save memos as{" "}
              <code>.m4a</code>, <code>.wav</code>, or <code>.mp3</code>, which
              can be uploaded directly in Studio. See{" "}
              <Link href="/supported-formats">
                supported formats and plan upload limits
              </Link>{" "}
              for per-plan duration and file-size caps.
            </p>
          </>
        ),
      },
      {
        title: "What to do if a voice message is in an unsupported format",
        body: (
          <p>
            UrduSpeech does not connect directly to WhatsApp or other messaging
            apps, does not record live audio from your microphone, and does not
            include an in-app format converter. Some chat apps save exported
            voice messages as <code>.opus</code> or <code>.ogg</code> files,
            which are not accepted directly by the uploader. If your saved voice
            note uses an unsupported extension or codec, convert or re-save it
            on your device as an{" "}
            <strong>
              AAC M4A (<code>.m4a</code>)
            </strong>
            ,{" "}
            <strong>
              MP3 (<code>.mp3</code>)
            </strong>
            , or{" "}
            <strong>
              PCM WAV (<code>.wav</code>)
            </strong>{" "}
            file first, verify that the converted file plays clearly, and then
            upload it to Studio.
          </p>
        ),
      },
      {
        title: "Upload your recording and choose an output script",
        body: (
          <ol>
            <li>
              Sign in and open <strong>New upload</strong> in Studio.
            </li>
            <li>
              Select your saved <code>.m4a</code>, <code>.mp3</code>,{" "}
              <code>.wav</code>, or <code>.flac</code> voice note and give the
              project a clear title.
            </li>
            <li>
              Choose how you want the transcript written:{" "}
              <Link href="/urdu-transcription">Urdu script</Link> for Nastaliq
              text, <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link> for
              Urdu words in Latin letters,{" "}
              <Link href="/urdu-audio-to-english-text">English</Link> for an
              English translation, or <strong>Urdu + English</strong> for both.
            </li>
            <li>
              Keep <strong>AI text correction</strong> enabled for conservative
              Urdu character and punctuation cleanup (or switch it off for raw
              recognition output), confirm that you have permission to process
              the recording, and upload the file.
            </li>
            <li>
              Once the media check reports that the audio track is ready, select{" "}
              <strong>Start transcription</strong>.
            </li>
          </ol>
        ),
      },
      {
        title: "Review names, numbers, and short phrases before exporting",
        body: (
          <>
            <p>
              Voice messages often include informal phrasing, quick topic
              changes, background street or room noise, and mixed Urdu and
              English words. Read through the generated draft in Studio, check
              proper names, phone numbers, prices, and dates, and accept or
              reject any flagged AI correction suggestions. When the text looks
              right, generate and download a UTF-8 <strong>TXT</strong> file for
              your notes or documents—or export <strong>SRT</strong> or{" "}
              <strong>VTT</strong> if you need timestamped lines.
            </p>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                {captionCues[2].urdu}
              </span>
              <span lang="ur-Latn" dir="ltr">
                {captionCues[2].romanUrdu}
              </span>
            </div>
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
      "Prepare UTF-8 Urdu, Roman Urdu or English SRT and VTT subtitle files from your local video in UrduSpeech, then upload them in YouTube Studio.",
    summary:
      "Generate and review UTF-8 Urdu, Roman Urdu or English SRT and VTT subtitle files from your local video, then upload them in YouTube Studio.",
    updated: "2026-11-21",
    displayUpdated: "21 November 2026",
    primaryProductHref: "/video-captions",
    primaryProductLabel: "Explore Urdu video captions",
    ctaTitle: "Prepare YouTube-ready Urdu SRT or VTT files",
    ctaCopy:
      "Start with a 10-minute one-time free allowance (no card required). Upload your local MP4 or MOV video in Studio, review the timing, and export UTF-8 SRT or VTT.",
    sections: [
      {
        title: "Start with your owned local source video",
        body: (
          <p>
            UrduSpeech processes local video and audio files stored on your
            computer or phone—it does not download videos from YouTube links,
            connect to your Google account, or publish directly to YouTube.
            Start with the exported <strong>MP4</strong> or <strong>MOV</strong>{" "}
            master (H.264 or HEVC video with AAC speech audio) that you plan to
            upload to your YouTube channel, or a clean audio bounce of the exact
            same edit timeline. Check{" "}
            <Link href="/supported-formats">
              supported formats and plan upload limits
            </Link>{" "}
            before starting.
          </p>
        ),
      },
      {
        title: "Generate and review timed captions in UrduSpeech Studio",
        body: (
          <ol>
            <li>
              Create a project in Studio and upload your local MP4 or MOV video
              (if the file has multiple audio tracks, pick the spoken-Urdu track
              in the media check).
            </li>
            <li>
              Choose your output variant: <strong>Urdu</strong> for Urdu script,{" "}
              <Link href="/urdu-audio-to-roman-urdu">Roman Urdu</Link>,{" "}
              <Link href="/urdu-audio-to-english-text">
                English translation
              </Link>
              , or <strong>Urdu + English</strong>.
            </li>
            <li>
              Start transcription, then review the numbered cues in the caption
              editor. Fix proper names, numbers, and mixed Urdu/English terms,
              and adjust cue start and end times in seconds so no two captions
              overlap.
            </li>
            <li>
              Save your changes and export a UTF-8 <strong>SRT</strong> (
              <code>.srt</code>) or <strong>WebVTT</strong> (<code>.vtt</code>)
              subtitle file.
            </li>
          </ol>
        ),
      },
      {
        title: "Selectable YouTube subtitle tracks vs burned-in MP4 captions",
        body: (
          <>
            <p>
              Before exporting, decide whether your YouTube video needs a
              selectable closed-caption track or captions permanently rendered
              into the video frames:
            </p>
            <ul>
              <li>
                <strong>Selectable subtitle file (SRT or VTT):</strong> Viewers
                can toggle YouTube’s <strong>CC</strong> button on or off,
                change caption size in their player settings, and switch between
                separate language tracks (for example, an Urdu track and an
                English translation track).
              </li>
              <li>
                <strong>Burned-in captioned MP4:</strong> Renders visible
                Nastaliq or bilingual captions directly into the video picture
                using UrduSpeech’s <strong>Clean</strong>,{" "}
                <strong>Social highlight</strong>, or <strong>Boxed</strong>{" "}
                styles (<Link href="/video-captions">preview styles</Link>).
                This is popular for YouTube Shorts and social clips where
                captions should always appear in Nastaliq. If you upload a
                burned-in MP4 to YouTube, keep in mind that enabling a visible
                YouTube CC track at the same bottom position can overlap the
                burned-in text.
              </li>
            </ul>
            <p>
              See the{" "}
              <Link href="/guides/subtitle-and-video-exports">
                TXT, SRT, VTT, and MP4 export comparison
              </Link>{" "}
              for timestamp examples.
            </p>
          </>
        ),
      },
      {
        title: "Upload the SRT or VTT file in YouTube Studio",
        body: (
          <>
            <p>
              YouTube accepts UTF-8 encoded <code>.srt</code> and{" "}
              <code>.vtt</code> timed subtitle files (as well as un-timestamped{" "}
              <code>.txt</code> transcripts when using YouTube’s auto-sync
              option). Follow the current{" "}
              <a
                href="https://support.google.com/youtube/answer/2734796?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube Help workflow for adding subtitles and captions
              </a>{" "}
              and{" "}
              <a
                href="https://support.google.com/youtube/answer/2734698?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                supported subtitle file guidelines
              </a>
              :
            </p>
            <ol>
              <li>
                Sign in to <strong>YouTube Studio</strong> in your browser.
              </li>
              <li>
                Select <strong>Subtitles</strong> from the left navigation menu
                and click the video you want to caption.
              </li>
              <li>
                Click <strong>Add language</strong> and choose the language that
                matches your exported file (for example, <strong>Urdu</strong>{" "}
                for Urdu script or <strong>English</strong> for an English
                translation track).
              </li>
              <li>
                Under the <strong>Subtitles</strong> column for that language,
                click <strong>Add</strong> and choose{" "}
                <strong>Upload file</strong>.
              </li>
              <li>
                Select <strong>With timing</strong> for an <code>.srt</code> or{" "}
                <code>.vtt</code> file exported from UrduSpeech (or{" "}
                <strong>Without timing</strong> if uploading a plain{" "}
                <code>.txt</code> transcript), then click{" "}
                <strong>Continue</strong>.
              </li>
              <li>
                Choose the downloaded UTF-8 <code>.srt</code> or{" "}
                <code>.vtt</code> file from your device, inspect the cues on
                YouTube Studio’s timeline, and click <strong>Publish</strong>.
              </li>
            </ol>
          </>
        ),
      },
      {
        title: "Check the final playback on desktop and mobile",
        body: (
          <>
            <p>
              Open the published or unlisted YouTube video, turn on{" "}
              <strong>CC</strong>, and watch through key transitions—especially
              lines that mix Urdu script with Latin acronyms or numbers. Because
              UrduSpeech exports standard UTF-8 files, Urdu characters remain
              intact without garbled encoding. If a line feels too dense on a
              phone screen, edit the cue text or timing in UrduSpeech Studio,
              export a fresh <code>.srt</code> or <code>.vtt</code> file, and
              replace the track in YouTube Studio.
            </p>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                {captionCues[0].urdu}
              </span>
              <span lang="en" dir="ltr">
                {captionCues[0].english}
              </span>
            </div>
          </>
        ),
      },
    ],
  },
] satisfies PublicGuide[];
