import Link from "next/link";
import type { DocumentSection } from "@/components/public-site";
import type { OgImageKey } from "@/lib/seo";

const contact = (
  <a href="mailto:notification@urduspeech.com">notification@urduspeech.com</a>
);

export type PublicDocumentKey =
  "privacy" | "terms" | "refunds" | "delete-account" | "supported-formats";

export interface PublicDocument {
  title: string;
  seoTitle: string;
  breadcrumbLabel: string;
  description: string;
  metaDescription: string;
  updated: string;
  updatedIso: string;
  ogImage: OgImageKey;
  isTechArticle?: boolean;
  markdownPath?: `/${string}`;
  sections: readonly DocumentSection[];
}

export const publicDocuments: Record<PublicDocumentKey, PublicDocument> = {
  privacy: {
    title: "Your recordings, your choices.",
    seoTitle: "Privacy Policy & Media Retention",
    breadcrumbLabel: "Privacy policy",
    description:
      "How UrduSpeech handles your account, uploaded recordings, AI processing providers, media expiry, and deletion receipts.",
    metaDescription:
      "Read how uploaded Urdu recordings, transcripts, cookies, sub-processors (AWS S3, Deepgram, OpenAI, Modal), retention windows, and deletion work.",
    updated: "18 November 2026",
    updatedIso: "2026-11-18T00:00:00+05:00",
    ogImage: "about",
    sections: [
      {
        title: "What we process",
        body: (
          <p>
            We process your account details, uploaded recordings, selected
            preferences, generated transcripts and captions, and the payment
            information needed to manage your plan. Security and operational
            records help us investigate failures and protect accounts. Do not
            upload content you are not entitled to share with these services.
          </p>
        ),
      },
      {
        title: "How your content is used",
        body: (
          <p>
            Processing is automated: speech recognition, AI correction or
            translation, timing alignment and caption rendering. You can turn AI
            correction off and review or edit results. UrduSpeech does not offer
            a human transcription service and does not train its own models on
            your recordings. Read our{" "}
            <Link href="/security">security and retention overview</Link> for an
            architectural summary.
          </p>
        ),
      },
      {
        title: "Service providers",
        body: (
          <>
            <p>
              AWS S3 stores private files in the configured US East (Ohio)
              region. Hetzner hosts the backend, Vercel hosts this application,
              and Modal runs media processing. Deepgram and OpenAI process the
              audio or text needed for transcription and language features. Zoho
              handles account emails. These services can process data outside
              Pakistan.
            </p>
            <p>
              When card checkout is available, Stripe processes card details;
              UrduSpeech does not store full card numbers. Manual-payment
              references are used to verify payments. Provider data controls and
              retention policies can differ from UrduSpeech’s media expiry;
              deleting a project does not instantly remove every provider
              record.
            </p>
          </>
        ),
      },
      {
        title: "Media expiry and deletion",
        body: (
          <>
            <p>
              Source recordings and rendered videos expire after your plan’s 3,
              15, 30 or 90 day retention period. The clock starts when an upload
              passes validation. Changing plans or rendering again does not
              extend an existing recording’s deadline. The workspace shows the
              applicable expiry.
            </p>
            <p>
              Transcripts, timings and subtitle exports remain after media
              expiry until project or account deletion. Temporary prepared audio
              is scheduled for cleanup after processing ends. Incomplete uploads
              and abandoned drafts are also scheduled for cleanup.
            </p>
            <p>
              Request project or account deletion in the studio. Access is
              revoked first; the deletion status distinguishes pending cleanup
              from verified removal. Backup propagation and provider cleanup are
              separate, and a pending status does not mean they have finished.
              Necessary financial and audit records may remain for accounting
              and legal obligations. See{" "}
              <Link href="/delete-account">how to delete your account</Link>.
            </p>
          </>
        ),
      },
      {
        title: "Account security and cookies",
        body: (
          <p>
            We use necessary session cookies to sign you in and protect account
            actions. Provider credentials are encrypted in application
            configuration and are not included in browser responses. No session
            replay is used. Keep your password and verification links private.
          </p>
        ),
      },
      {
        title: "Contact and requests",
        body: (
          <p>
            Email {contact} for privacy questions, access requests or a deletion
            problem. Include your account email and project reference; avoid
            attaching a recording unless needed. See our{" "}
            <Link href="/terms">terms</Link> for service conditions.
          </p>
        ),
      },
    ],
  },
  terms: {
    title: "Terms of service",
    seoTitle: "Terms of Service & Usage Rules",
    breadcrumbLabel: "Terms of service",
    description:
      "UrduSpeech is an automated transcription and caption service operated by MoonSys Ltd.",
    metaDescription:
      "Review terms of service for accounts, content ownership, AI review responsibilities, Pakistani rupee minute plans, retention, and acceptable use.",
    updated: "18 November 2026",
    updatedIso: "2026-11-18T00:00:00+05:00",
    ogImage: "about",
    sections: [
      {
        title: "Your account and recordings",
        body: (
          <p>
            Provide accurate account information, keep your account secure, and
            upload only recordings you own or have permission to process. Obtain
            any required permission from people in your recordings. You retain
            your rights in your content and permit us and our service providers
            to process it to deliver the features you request.
          </p>
        ),
      },
      {
        title: "AI output needs your review",
        body: (
          <p>
            Transcription, correction, translation and timing are AI generated
            and can contain mistakes, especially names, figures, mixed languages
            and noisy speech. You decide what to publish. The service does not
            promise a particular accuracy score, legal transcript, human review
            or suitability for medical, legal or other critical decisions.
          </p>
        ),
      },
      {
        title: "Plans, minutes and payments",
        body: (
          <>
            <p>
              Prices are displayed in Pakistani rupees. Audio and video use the
              same duration-based allowance. Free includes 10 minutes once per
              account. Paid plans include a monthly allowance and do not roll
              unused minutes into the next period. The workspace shows available
              minutes, limits and payment methods before purchase.
            </p>
            <p>
              A successful canonical transcription commits its reserved minutes.
              A later export or caption-render problem does not by itself mean
              the transcription was never delivered. Failures before that commit
              release the reservation. If you cancel processing or delete the
              project after audio preparation or transcription has started, the
              reserved minutes are committed; retrying the same file later does
              not charge them again. Cancelling before that point releases them.
              Contact us if your usage looks incorrect.
            </p>
            <p>
              When available, card subscriptions renew automatically until
              cancelled. A manually paid plan starts after payment verification
              and requires another verified payment to continue. Submitted proof
              alone does not confirm receipt of funds. Cancellation stops future
              renewal; refunds are handled separately under the{" "}
              <Link href="/refunds">payments and refunds policy</Link>.
            </p>
          </>
        ),
      },
      {
        title: "Keep copies of your work",
        body: (
          <p>
            Media is automatically deleted according to the retention period
            attached to the validated upload. Download original and rendered
            files before expiry. Transcript and subtitle data remain until
            project or account deletion. See{" "}
            <Link href="/privacy">privacy</Link> for deletion behavior and{" "}
            <Link href="/supported-formats">supported formats</Link> for
            processing limits.
          </p>
        ),
      },
      {
        title: "Acceptable use",
        body: (
          <p>
            Do not use the service to infringe rights, impersonate people,
            distribute unlawful material, compromise security, bypass usage or
            payment limits, or disrupt other users. We may restrict access to
            investigate abuse, protect accounts or comply with legal
            requirements. Use of this service does not grant rights to a
            person’s voice or third-party content.
          </p>
        ),
      },
      {
        title: "Availability and changes",
        body: (
          <>
            <p>
              Processing depends on external infrastructure and AI providers and
              may be delayed or unavailable. We may change the service or future
              plans; your workspace identifies the plan and media expiry that
              apply to your work. These terms do not remove rights that cannot
              be excluded under applicable law.
            </p>
            <p>For account, billing or service questions, contact {contact}.</p>
          </>
        ),
      },
    ],
  },
  refunds: {
    title: "Payment support, without the guesswork.",
    seoTitle: "Payments, PKR Billing & Refund Policy",
    breadcrumbLabel: "Payments & refunds",
    description:
      "Contact us when a payment, plan activation, manual transfer verification, or usage charge does not look right.",
    metaDescription:
      "Learn how Pakistani rupee card checkout, bank transfer, JazzCash, Easypaisa, SadaPay, NayaPay verification, cancellation, and payment reviews work.",
    updated: "18 November 2026",
    updatedIso: "2026-11-18T00:00:00+05:00",
    ogImage: "pricing",
    sections: [
      {
        title: "Report a payment problem",
        body: (
          <p>
            Email {contact} from your account email. Include the payment date,
            amount, method and payment or invoice reference. For a processing
            problem, include the project reference. Never send a card number,
            PIN, password or OTP.
          </p>
        ),
      },
      {
        title: "Duplicate, failed or missing payments",
        body: (
          <p>
            Tell us about a duplicate or incorrect charge, money collected
            without paid-plan activation, a paid service that was not delivered,
            an incorrect allowance, or a charge after cancellation. We verify
            the provider’s settlement record and your account and processing
            history. If our review confirms a payment or delivery problem, we
            will correct the account or arrange a refund. A screenshot supports
            a claim; it does not by itself verify receipt of funds.
          </p>
        ),
      },
      {
        title: "Manual payments",
        body: (
          <p>
            Use only the receiving details shown in your workspace. Bank
            transfer, JazzCash, Easypaisa, SadaPay and NayaPay payments require
            verification. Do not pay again just because your first payment is
            pending. Keep the transfer reference and submit it once through the
            workspace.
          </p>
        ),
      },
      {
        title: "Cancellation and unused minutes",
        body: (
          <>
            <p>
              Cancelling a card subscription stops future renewal; it does not
              automatically refund an existing paid period. Manually paid plans
              do not renew without another verified payment. Unused monthly
              minutes do not roll over. Contact us about an unused purchase or
              service failure so we can review the actual circumstances and
              applicable rights.
            </p>
            <p>
              AI output can need editing. An export failure and a failed
              transcription can have different usage outcomes; the{" "}
              <Link href="/terms">terms</Link> explain when minutes are
              committed. We do not promise an automatic refund solely because
              generated wording needs correction.
            </p>
          </>
        ),
      },
      {
        title: "Refund confirmation",
        body: (
          <p>
            A refund is confirmed after payment review is complete. Where
            available, refunds go through the original payment method. Bank and
            provider processing times vary. This policy does not promise an
            automatic refund window for unused paid plans. Your rights under
            applicable law are preserved. See{" "}
            <Link href="/pricing">current PKR plans</Link>.
          </p>
        ),
      },
    ],
  },
  "delete-account": {
    title: "Delete your account and stored data",
    seoTitle: "How to Delete Your Account & Data",
    breadcrumbLabel: "Delete account",
    description:
      "Save copies of your transcripts and videos, request permanent account deletion inside Studio, and verify cleanup with your private receipt.",
    metaDescription:
      "Step-by-step instructions to export your files, permanently delete your account inside Studio settings, and track verified data and backup cleanup.",
    updated: "22 November 2026",
    updatedIso: "2026-11-22T00:00:00+05:00",
    ogImage: "about",
    sections: [
      {
        title: "Save your work first",
        body: (
          <>
            <p>
              Download any original recordings, UTF-8 TXT transcripts, SRT or
              VTT subtitle tracks, and rendered MP4 videos you want to keep
              before submitting an account deletion request. Project access and
              file download grants are revoked immediately as soon as your
              request is accepted.
            </p>
            <p>
              If you only want to remove one recording without closing your
              entire account, open that project inside Studio and delete the
              individual project instead. Deleting a single project removes its
              files while keeping your remaining monthly allowance intact.
            </p>
          </>
        ),
      },
      {
        title: "Request deletion in Studio",
        body: (
          <ol>
            <li>
              Sign in and open{" "}
              <a href="/studio/settings" rel="nofollow">
                Studio settings
              </a>
              .
            </li>
            <li>
              Scroll to <strong>Delete your account</strong> and type{" "}
              <strong>DELETE</strong> in the confirmation field.
            </li>
            <li>
              Select <strong>Delete my account</strong>. If your session is
              older than the recent-authentication window, Studio will prompt
              you to sign in again before accepting the deletion request.
            </li>
          </ol>
        ),
      },
      {
        title: "Check your deletion status and private receipt",
        body: (
          <>
            <p>
              Immediately after your request is accepted, save the private JSON
              deletion receipt displayed in your browser. Because your account
              is signed out upon acceptance, that private receipt lets you open{" "}
              <a href="/deletion-status" rel="nofollow">
                Deletion status
              </a>{" "}
              later to track three independent stages: primary media and project
              content removal, active subscription cleanup, and backup
              propagation.
            </p>
            <p>
              Read our <Link href="/privacy">privacy policy</Link> and{" "}
              <Link href="/security">security and retention documentation</Link>{" "}
              for details on provider cleanup and financial records retained for
              accounting or legal compliance. If you lose access to your account
              email or receipt, email {contact} from your registered address.
            </p>
          </>
        ),
      },
    ],
  },
  "supported-formats": {
    title: "Supported audio, video formats, and upload limits",
    seoTitle: "Supported Audio, Video & Upload Limits",
    breadcrumbLabel: "Supported formats",
    description:
      "File containers, codecs, HDR tone-mapping, per-plan upload ceilings, and the 256 MiB MP4 render safety limit explained clearly.",
    metaDescription:
      "Check supported audio (MP3, FLAC, WAV, M4A) and video (MP4, MOV H.264/HEVC AAC) codecs, iPhone HDR conversion, plan size caps, and MP4 limits.",
    updated: "22 November 2026",
    updatedIso: "2026-11-22T00:00:00+05:00",
    ogImage: "transcription",
    isTechArticle: true,
    markdownPath: "/supported-formats.md",
    sections: [
      {
        title: "Accepted audio and video codecs",
        body: (
          <>
            <p>
              Studio inspects every uploaded file’s actual media container and
              elementary streams before transcription begins; renaming a file
              extension alone does not make an unsupported codec compatible.
            </p>
            <ul>
              <li>
                <strong>Audio files:</strong> MP3 (<code>.mp3</code>), FLAC (
                <code>.flac</code>), uncompressed PCM WAV (<code>.wav</code>),
                and AAC inside M4A (<code>.m4a</code>).
              </li>
              <li>
                <strong>Video files:</strong> MP4 (<code>.mp4</code>) or
                QuickTime MOV (<code>.mov</code>) containing H.264 (AVC) or HEVC
                (H.265) video plus an audible AAC speech audio track.
              </li>
              <li>
                <strong>Not supported directly:</strong> DRM-encrypted media,
                silent videos without an audio stream, and messaging exports
                encoded as <code>.opus</code> or <code>.ogg</code> (such as raw
                WhatsApp voice messages—convert those locally to{" "}
                <code>.m4a</code>, <code>.mp3</code>, or <code>.wav</code> first
                using our{" "}
                <Link href="/guides/voice-notes-to-text">
                  voice notes preparation guide
                </Link>
                ).
              </li>
            </ul>
            <p>
              If a video has several audio tracks (for instance a camera mic and
              a wireless lavalier stream), Studio’s <strong>Media check</strong>{" "}
              panel lets you select the exact spoken-Urdu track to transcribe.
              Portrait reels (9:16), square clips (1:1), and landscape videos
              (16:9) all preserve their source orientation up to your plan’s
              maximum output height.
            </p>
          </>
        ),
      },
      {
        title: "HDR and iPhone recordings",
        body: (
          <>
            <p>
              Modern iPhones and flagship Android cameras frequently record in
              10-bit HDR (BT.2020 HLG or PQ). When you render a burned-in
              captioned MP4, Studio automatically tone-maps properly tagged
              BT.2020 HLG or PQ video to standard 8-bit SDR BT.709 so colors and
              Nastaliq captions display predictably across Instagram, TikTok,
              YouTube, and desktop browsers.
            </p>
            <p>
              Rendered MP4 outputs do not carry HDR or Dolby Vision metadata.
              Videos with corrupt or contradictory color tags may be rejected
              during media validation. Always inspect skin tones and contrast in
              the downloaded MP4 before publishing.
            </p>
          </>
        ),
      },
      {
        title: "Upload duration and file size limits by plan",
        body: (
          <>
            <div
              className="pricing-scroll"
              role="region"
              aria-label="Upload limits by plan"
              tabIndex={0}
            >
              <table className="public-pricing">
                <thead>
                  <tr>
                    <th scope="col">Plan</th>
                    <th scope="col">Maximum recording</th>
                    <th scope="col">Maximum upload</th>
                    <th scope="col">Media retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Free</th>
                    <td>10 minutes</td>
                    <td>250 MiB</td>
                    <td>3 days</td>
                  </tr>
                  <tr>
                    <th scope="row">Starter</th>
                    <td>60 minutes</td>
                    <td>1 GiB</td>
                    <td>15 days</td>
                  </tr>
                  <tr>
                    <th scope="row">Creator</th>
                    <td>180 minutes</td>
                    <td>Less than 2 GiB</td>
                    <td>30 days</td>
                  </tr>
                  <tr>
                    <th scope="row">Studio</th>
                    <td>360 minutes</td>
                    <td>Less than 2 GiB</td>
                    <td>90 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The operational scanning ceiling is strictly{" "}
              <strong>2 GiB minus one byte</strong> across all plans, alongside
              your remaining account minute allowance. For long 4K camera
              recordings that exceed 2 GiB, export a 1080p H.264/AAC proxy from
              your editor—or upload a clean AAC M4A or MP3 audio bounce if you
              only need UTF-8 <strong>TXT</strong>, <strong>SRT</strong>, or{" "}
              <strong>VTT</strong> files.
            </p>
          </>
        ),
      },
      {
        title: "Outputs and the 256 MiB rendered MP4 safety limit",
        body: (
          <>
            <p>
              Every project supports UTF-8 <strong>TXT</strong> transcripts and
              timed <strong>SRT</strong> or <strong>WebVTT</strong> subtitle
              downloads once timing is ready. Burned-in video captions render to
              H.264 MP4 with AAC audio using Noto Nastaliq Urdu and Inter inside
              verified safe-area margins. Free plan MP4 exports are capped at
              720p with a watermark; paid plans render up to 1080p without a
              watermark.
            </p>
            <p>
              Generated captioned MP4 files have a{" "}
              <strong>256 MiB operational safety limit</strong>. A long,
              high-motion video may exceed 256 MiB even when its source upload
              passes validation. Transcript and subtitle downloads stay
              completely independent of video rendering—so for hour-long YouTube
              episodes, export the SRT or VTT track and attach it directly in{" "}
              <Link href="/youtube-urdu-subtitles">YouTube Studio</Link> or your
              non-linear editor.
            </p>
          </>
        ),
      },
      {
        title: "Preparing recordings for cleaner Urdu transcripts",
        body: (
          <>
            <p>
              Clean vocal audio dramatically reduces manual review time. Before
              uploading, lower loud background music beds by 12–18 dB relative
              to speech, avoid heavy room echo where possible, and export mono
              or clean stereo AAC/WAV speech tracks. Mixed Urdu and English
              speech is supported, while proper names, places, and figures
              should always be verified in Studio.
            </p>
            <p>
              Explore our{" "}
              <Link href="/urdu-transcription">
                Urdu transcription workflow
              </Link>
              , <Link href="/video-captions">video captioning presets</Link>,{" "}
              <Link href="/methodology">AI processing methodology</Link>, or{" "}
              <Link href="/tools/srt-to-vtt-converter">
                free SRT to WebVTT converter
              </Link>
              . For upload troubleshooting, check{" "}
              <Link href="/pricing">plan limits</Link> or email {contact} with
              your project reference.
            </p>
          </>
        ),
      },
    ],
  },
};
