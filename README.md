# UrduSpeech creator app

New AI creator application, isolated from the legacy human-service website on `feat/ai-creator-app`. The original frontend worktree and its uncommitted edits remain intact.

## Run

Node 22 or newer. `npm ci`, then `npm run dev`. Copy `.env.example` to `.env.local` only when connecting a deployed backend. Provider, Stripe, AWS and email credentials do not belong in this project.

`npm run typecheck`, `npm test`, `npm run build` verify the app. Tests cover the fixed-origin session bridge, CSRF origin checks, cookie handling, metadata limits and multipart upload failure boundaries.

## Application

- `/studio`: real project list and usage; honest loading/error/empty states.
- `/studio/new`: output choices, saved defaults, direct S3 multipart upload, rights confirmation.
- `/studio/projects/:id`: processing, versioned cue text/timing changes, correction review, text/subtitle exports, video renders, local media timing preview, deletion.
- `/studio/settings`: saved output/correction/render defaults and account deletion.
- `/studio/billing`: live PKR plan catalog and provider-gated card/manual payment flows.
- `/auth/:mode`: register, sign in, email verification, password recovery/reset. Root `/verify-email` and `/reset-password` routes match backend email URLs.

The same-origin API bridge fixes the upstream origin and only exposes methods/paths in the backend public OpenAPI contract. Admin, webhook, internal-auth and health paths are excluded. Browser sessions use the backend's Secure HttpOnly opaque cookie. Unsafe requests require the canonical APP_ORIGIN. Production previews on another origin intentionally cannot mutate sessions/accounts until configured as a separate environment; do not weaken this guard to a wildcard.

## Current release gates

This is an initial implementation, not a released commercial product. Backend TLS and host storage are pending owner-run admin steps. Email delivery is deferred until Zoho integration; do not use a placeholder Resend key. Vercel CLI credentials currently return HTTP 403 and need owner login. Production-domain routing must be reviewed against the existing Vercel project before changing it.

Still pending: real authenticated browser E2E, visual/mobile browser review, true Urdu media quality evaluation, resilient upload resumption across reloads, restored job/render discovery after a new browser session, and deployment testing of large streamed MP4 downloads. Upload retries deliberately do not fabricate a completed project or start processing after failure. The server retains authority over timing QA, retention, availability, minutes and payment activation. No demo projects, fake balances or simulated transcription are used.

Caption style examples are approximate. Video rendering remains the authority for exact font/layout. Urdu font is copied with its SIL OFL license in `public/fonts`.
