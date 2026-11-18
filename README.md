# UrduSpeech creator app

New AI creator application, isolated from the legacy human-service website on `feat/ai-creator-app`. The original frontend worktree and its uncommitted edits remain intact.

## Run

Node 22 or newer. `npm ci`, then `npm run dev`. Copy `.env.example` to `.env.local` only when connecting a deployed backend. Provider, Stripe, AWS and email credentials do not belong in this project.

`npm run typecheck`, `npm test`, `npm run build` verify the app. Tests cover the fixed-origin session bridge, CSRF origin checks, cookie handling, metadata limits, byte-verified multipart recovery, private deletion receipts and direct-download grants.

## Application

- `/studio`: real project list and usage; honest loading/error/empty states.
- `/studio/new`: output choices, saved defaults, direct S3 multipart upload, rights confirmation.
- `/studio/projects/:id`: processing, versioned cue text/timing changes, correction review, text/subtitle exports, video renders, local media timing preview, deletion.
- `/studio/settings`: saved output/correction/render defaults and account deletion.
- `/studio/billing`: live PKR plan catalog and provider-gated card/manual payment flows.
- `/studio/admin`: verified owner access to encrypted service settings, Modal account management/tests and manual-payment review.
- `/deletion-status`: private deletion receipt checks and account-bound retries after sign-out.
- `/auth/:mode`: register, sign in, email verification, password recovery/reset. Root `/verify-email` and `/reset-password` routes match backend email URLs.

The same-origin API bridge fixes the upstream origin and exposes reviewed methods/paths generated from the backend OpenAPI contract, including an explicit allowlist of owner admin endpoints. Webhooks, internal auth, health, unreviewed admin endpoints and the direct file stream are excluded. Browser sessions use the backend's Secure HttpOnly opaque cookie. Unsafe requests require the canonical APP_ORIGIN. Previews on another origin intentionally cannot mutate production sessions/accounts; use a separate environment when testing a different origin.

Large downloads mint a short-lived one-time grant through the bridge, then submit a native form POST directly to the fixed backend. Its bearer stays in the POST body and file bytes bypass Vercel. The backend retains authority over session validity, ownership and deletion during streaming. Upload recovery reuses a completed part only when local byte hashes, stored receipts and remote part identity agree; another device safely reuploads parts it cannot verify.

## Current release gates

The application is implemented and has passing tests, TypeScript, production build and protected Vercel preview CI. Production is not promoted. The owner completed backend storage, Nginx/TLS, certificate-renewal rehearsal and operations installation on18November2026. Backend PR15's release SSH fix is undergoing native CI before a fresh protected deployment. Zoho is configured privately; the owner confirmed receipt of the approved monitoring canary in the Yahoo Inbox. Vercel access is available through the authorized project API/Git integration. Review production-domain routing against the existing project during the verified cutover.

The owner approved the payment-issue correction/refund policy on18November2026, with no automatic unused-plan refund window. Public copy records that decision and preserves applicable legal rights. Its updated preview still needs verification before production promotion.

Release checks still include deployed authenticated E2E, visual/mobile browser review, representative Urdu quality and large-download behavior through production ingress. Multipart recovery and owned job/render/export discovery are implemented and covered by code-level tests; deployed browser parity remains a separate check. The server retains authority over timing QA, retention, availability, minutes and payment activation. No demo projects, fake balances or simulated transcription are used in the application.

Caption style examples are approximate. Video rendering remains the authority for exact font/layout. Urdu font is copied with its SIL OFL license in `public/fonts`.
