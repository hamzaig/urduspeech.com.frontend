# UrduSpeech creator studio

Authorized scope: self-service AI transcription/captions for Pakistani creators; new application at urduspeech.com, backend on the approved MoonSys hostname. Existing main-worktree edits remain untouched. Zoho email integration is deferred. No human fulfillment or general video editor.

Design skill: https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md

## First pass

Palette: ocean ink #153D4A, paper blue #F3F7FA, surface #FFFFFF, interaction blue #2369AA, caption amber #F4BB51, muted ink #546B76. Public Sans for interface and captions in Latin script. Urdu outputs use a language-aware RTL region with Arabic font fallback. Left aligned utility layout; actual captions preserve their language direction.

Desktop:

```
| Studio navigation | Page title                  Account |
|                   | Upload + output choices | Caption  |
|                   | Recent projects / empty | example  |
| Usage / settings  |                         |          |
```

Editor: transcript/cues at left, media preview in the center, preset/export controls at right. Mobile collapses into a single column with ordinary navigation links. Upload configuration uses a real sequence: media, output, processing. Saved defaults remain explicit and reversible.

Distinctive moment: an oversized two-line Roman Urdu caption inside a portrait media frame, using a warm word plate against a cool editing surface. It is explicitly an example, never fabricated customer data. Quiet surroundings leave the actual creator content in focus. No invented accuracy, usage, customer projects or processing progress.

## Critique before implementation

A row of analytics cards would repeat a generic SaaS dashboard and obscure the first task. Replace it with a broad upload work surface and a narrow caption example. Keep usage as an account detail, and project history as a table. Use borders only to group controls or delineate editing regions. Avoid gradients, decorative badges, uppercase labels and automatic animation. Use visible focus, reduced-motion handling, real error/empty/loading states and keyboard-operable native controls.

## Integration boundaries

Same-origin /api/backend/v1 bridge handles opaque session cookies. Fixed server-only backend origin; no browser provider keys or localStorage tokens. Metadata bodies are bounded. Media uploads go directly to signed S3 part URLs, never through Vercel. No fake API fallback. Production auth waits for Zoho and actual backend readiness. Signed download URLs and cookies must never be logged.

Verification: production build, TypeScript, API bridge boundary tests, multipart failure tests and HTTP smoke checks. No browser automation; visual/browser parity remains manual.

## Operations extension

The owner works through pending payment reviews, Modal accounts, then private settings. Use the existing six-color palette and Public Sans; left align form labels and account data. A section navigation links to each task, rather than adding an analytics dashboard. Receiving account details sit directly beside the review form. Payment confirmation requires a checked acknowledgment, a separately entered received amount, and a verified settlement reference. Provider credentials are blank password inputs, never displayed existing values. Configuration rows expand only when edited, so infrequent settings do not overwhelm the review queue. Mobile stacks the rows and form fields, preserving complete account numbers and visible keyboard focus. No new decorative motif is needed: the creator studio's caption example remains its visual signature.

This keeps the existing creator-focused layout intact and gives the owner's operational tasks their own page. The API enforces verified owner identity and recent authentication independently of navigation visibility.
