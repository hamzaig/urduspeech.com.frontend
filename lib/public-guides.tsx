import Link from "next/link";
import type { DocumentSection } from "@/components/public-site";
import { captionCues } from "@/lib/caption-demo";

export type PublicGuide = {
  slug: string;
  topic: string;
  title: string;
  summary: string;
  sections: readonly DocumentSection[];
};

export const publicGuides = [
  {
    slug: "make-urdu-video-captions",
    topic: "Video workflow",
    title: "How to make Urdu video captions",
    summary:
      "Upload a video, review the Urdu draft, then download subtitles or a video with captions on it.",
    sections: [
      {
        title: "Upload a video with clear speech",
        body: (
          <p>
            Open a new project in Studio and choose a supported MP4 or MOV file.
            Check the <Link href="/supported-formats">upload limits</Link> for
            your plan before starting. If background music competes with the
            speaker, lower it in your edit before uploading so you have a
            clearer draft to review.
          </p>
        ),
      },
      {
        title: "Choose the words your viewers can read",
        body: (
          <p>
            Keep Urdu script, choose Roman Urdu for Urdu written in Latin
            letters, or translate to English. Bilingual captions display Urdu
            and English together. Think about where most of your audience will
            watch the video before choosing an output.
          </p>
        ),
      },
      {
        title: "Review your timings and export",
        body: (
          <p>
            Check names, figures and any Urdu and English switching in the
            recording. Play the video and review where each caption begins and
            ends. Save the edits, then choose SRT or VTT to use the subtitles
            separately, or render a captioned MP4 using an available style.{" "}
            <Link href="/video-captions">Try the caption style preview</Link>{" "}
            before you start.
          </p>
        ),
      },
    ],
  },
  {
    slug: "urdu-roman-urdu-and-english",
    topic: "Script and translation",
    title: "Urdu, Roman Urdu and English captions",
    summary:
      "See how a single Urdu line reads in each output, and choose the format that fits your audience.",
    sections: [
      {
        title: "Urdu script and Roman Urdu",
        body: (
          <>
            <p>
              Urdu script keeps the recording in the language and script Urdu
              readers expect. Roman Urdu keeps the Urdu words and writes them in
              Latin letters. Spelling in Roman Urdu can vary, so read the whole
              sentence and check names before publishing.
            </p>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                {captionCues[1].urdu}
              </span>
              <span lang="ur-Latn">{captionCues[1].romanUrdu}</span>
            </div>
          </>
        ),
      },
      {
        title: "English and bilingual output",
        body: (
          <>
            <p>
              English output translates the sentence. Bilingual output shows the
              Urdu line together with the English translation. This is handy for
              an audience that reads both languages. Review the English for
              meaning and leave enough time to read both lines in a video.
            </p>
            <div className="guide-language-example">
              <span lang="ur" dir="rtl">
                {captionCues[1].urdu}
              </span>
              <span>{captionCues[1].english}</span>
            </div>
          </>
        ),
      },
      {
        title: "Choose an output for your project",
        body: (
          <p>
            Choose the output when you create the project. Check the draft in
            Studio, particularly phrases mixed with English or a name with more
            than one spelling. If you are comparing the four choices,{" "}
            <Link href="/#caption-demo">try the caption demo</Link> with the
            same timestamps.
          </p>
        ),
      },
    ],
  },
  {
    slug: "subtitle-and-video-exports",
    topic: "Files and exports",
    title: "When to export TXT, SRT, VTT or MP4",
    summary:
      "Choose a file for your next edit, your web player or the final video you want to post.",
    sections: [
      {
        title: "Plain text for notes and transcripts",
        body: (
          <p>
            TXT is the transcript as plain text. Use it for quotes, scripts and
            show notes. If you have a recording without a timed subtitle track,
            you can still export the text when the transcript is ready. Review
            names and numbers before taking the text into an article.
          </p>
        ),
      },
      {
        title: "SRT and VTT for timed captions",
        body: (
          <p>
            Both carry caption text and start and end times. Choose SRT when
            your video editor or platform accepts SubRip subtitles. Choose VTT
            for a compatible web video player. Save your timing edits in Studio
            before preparing the files, then check for long lines in the player
            you will publish to.
          </p>
        ),
      },
      {
        title: "Captioned MP4 for publishing",
        body: (
          <p>
            A rendered MP4 has the captions on the video itself. Play your
            finished file to check that the words are readable and clear of
            important parts of the picture. Resolution, watermark and media
            retention depend on your <Link href="/pricing">plan</Link>. Check
            the{" "}
            <Link href="/supported-formats">
              supported formats and render limits
            </Link>{" "}
            for long or high-resolution recordings.
          </p>
        ),
      },
    ],
  },
] satisfies PublicGuide[];
