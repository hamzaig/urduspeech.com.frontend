# Creator app verification

## Current continuation: 2026-11-16

Application source `e07b31e` passes 18 tests, strict TypeScript and a production Next.js build. GitHub CI43932275348 and protected Vercel deployment `dpl_FMKexH1vfAqKaX6jW15NeMvFx7tQ` pass at that exact source. Authorized HTTP checks cover sign-in HTML, the owner-access loading shell, deletion-status HTML, direct-stream bridge404 and wrong-Origin403. These checks do not establish authenticated E2E, successful admin mutations or browser download behavior. Later documentation-only commits do not change that tested application behavior; qualify their CI/source identity separately before release.

New coverage includes multipart resume with local-byte hashes and remote receipts, canonical finalization replay after response loss, private account-bound deletion receipts, direct-download grant validation and binding the native form action to the configured backend. Owned project activity restores job/render/export discovery. The reviewed admin allowlist supports private settings, Modal accounts and manual-payment review; other admin, webhook, internal-auth, health and direct-stream routes stay outside the bridge.

Zoho is configured privately in the backend and Vercel access works through the authorized project API/Git integration. The root operations ledger records provider, storage, payment and native backend evidence. Owner-run Hetzner storage/TLS setup, final backend deployment and authenticated E2E remain pending. Representative Urdu quality, visual/mobile review, production large-download behavior and final domain cutover remain separate gates. Production is not promoted, and original legacy-worktree edits remain untouched.

## Historical initial verification

2026-11-14. Branch `feat/ai-creator-app`. Production Next.js build and strict TypeScript pass. Ten tests pass for public route allowlist, origin/CSRF rejection, cookie isolation, upstream redirect rejection, metadata body size, header preservation, multipart slices, missing ETags, failed parts and untrusted upload destinations. Locked dependency audit reports zero vulnerabilities.

Backend contract types and route allowlist are extracted from the current backend OpenAPI. A versioned update must refresh these when changing backend routes. Browser product sessions use same-origin HttpOnly cookies; legacy MongoDB/JWT/localStorage authentication is removed from this branch. No provider/payment/storage secret is included.

The UI has real loading, empty and API error states. Caption examples are labelled. No fake jobs or success responses are used. The media-track selector calls the real inspection/selection endpoints. Export requests poll until ready. Captions are saved with ETag and idempotency key. Backend validation remains authoritative.

At that initial checkpoint, the Zoho adapter, durable upload resume, cross-session activity discovery and Vercel access were incomplete. Those implementation/access limitations are superseded by the current continuation above. Preview origins remain intentionally rejected for unsafe operations when APP_ORIGIN is the production domain. Configure an isolated preview environment before testing mutations there.

The initial saved Vercel credential returned HTTP403. Current authorized API/Git access has since been verified. Only server-side backend/app-origin configuration and protected preview credentials were added; production aliases remain unchanged.

Remote main had one later legacy MongoDB/prototype fix commit (7eba35e). The new app branch was rebased onto it; the resulting application tree is identical to the reviewed replacement tree. The original local main worktree remains untouched. Historical GitHub deployment records show a successful Vercel deployment; a new branch push will verify whether the integration remains active.
