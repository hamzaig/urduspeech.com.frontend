import Link from "next/link";

const contact = (
  <a href="mailto:notification@urduspeech.com">notification@urduspeech.com</a>
);
export const publicDocuments = {
  privacy: {
    title: "Your recordings, your choices.",
    description:
      "How UrduSpeech handles your account, media and generated content.",
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
            your recordings.
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
              and legal obligations.
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
    description:
      "UrduSpeech is an automated transcription and caption service operated by MoonSys Ltd.",
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
              release the reservation. Contact us if your usage looks incorrect.
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
    description:
      "Contact us when a payment, plan activation or usage charge does not look right.",
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
            Tell us about a duplicate charge, money collected without plan
            activation, an incorrect allowance, or a charge after cancellation.
            We check the provider’s settlement record and your account history
            before confirming a correction or refund. A screenshot supports a
            claim; it does not by itself verify receipt of funds.
          </p>
        ),
      },
      {
        title: "Manual payments",
        body: (
          <p>
            Use only the receiving details shown in your workspace. Bank
            transfer, Easypaisa, SadaPay and NayaPay payments require
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
            provider processing times vary. This draft does not set a blanket
            refund window or override rights under applicable law.
          </p>
        ),
      },
    ],
  },
  "supported-formats": {
    title: "Check your recording before uploading.",
    description:
      "File type, audio track and plan limits determine what UrduSpeech can process.",
    sections: [
      {
        title: "Audio and video",
        body: (
          <>
            <p>
              Audio: MP3, FLAC, PCM WAV and AAC M4A. Video: MP4 or MOV with
              H.264 or HEVC video and AAC audio. A supported file needs an
              audible speech track; a filename extension alone does not
              establish compatibility. Encrypted files and files without audio
              are not supported.
            </p>
            <p>
              If a video has several audio tracks, select the one you want
              transcribed. Reels, portrait recordings and landscape videos use
              the same workflow. Video rendering preserves the source
              orientation and fits your plan’s maximum output height.
            </p>
          </>
        ),
      },
      {
        title: "HDR and iPhone recordings",
        body: (
          <p>
            Properly tagged BT.2020 HLG or PQ video is converted to SDR BT.709
            for captioned MP4 output. The result does not retain HDR or Dolby
            Vision metadata. Files with missing or inconsistent HDR color tags
            may be rejected. Review colors in the downloaded result before
            publishing.
          </p>
        ),
      },
      {
        title: "Upload limits",
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Free</th>
                    <td>10 minutes</td>
                    <td>250 MiB</td>
                  </tr>
                  <tr>
                    <th scope="row">Starter</th>
                    <td>60 minutes</td>
                    <td>1 GiB</td>
                  </tr>
                  <tr>
                    <th scope="row">Creator</th>
                    <td>180 minutes</td>
                    <td>Less than 2 GiB</td>
                  </tr>
                  <tr>
                    <th scope="row">Studio</th>
                    <td>360 minutes</td>
                    <td>Less than 2 GiB</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The current scanning safety limit is 2 GiB minus one byte, even if
              a plan has a higher nominal limit. Available account minutes also
              apply. Compress larger recordings before upload while keeping
              speech clear.
            </p>
          </>
        ),
      },
      {
        title: "Outputs",
        body: (
          <>
            <p>
              Download TXT transcripts and SRT or VTT subtitles. Video captions
              render to H.264 MP4 with AAC audio when the selected track has
              audio. Free exports have a watermark and a 720p height limit; paid
              plans allow up to 1080p without the watermark. Source geometry can
              reduce the resulting size.
            </p>
            <p>
              Generated video files currently have a 256 MiB safety limit. A
              long or detailed video may exceed this even when its source upload
              is accepted. Transcript and subtitle downloads remain separate
              from video rendering. Keep your original and download generated
              media before its retention deadline.
            </p>
          </>
        ),
      },
      {
        title: "Get better results",
        body: (
          <p>
            Use clear speech with minimal background music. Mixed Urdu and
            English are supported, but names and figures need review. If timing
            needs attention, edit it before exporting or rendering. See{" "}
            <Link href="/">plans</Link> or email {contact} with a project
            reference for help.
          </p>
        ),
      },
    ],
  },
} as const;
