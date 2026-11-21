# Command Code work log

## Current status

**Completed.** All planned public marketing layout, responsive, dark-theme contrast, and accessibility fixes are implemented, verified, and committed on `fix/public-marketing-audit`.

Work is isolated in the scratchpad checkout on `fix/public-marketing-audit`, based on latest `origin/main` (`4788b3f`). The original legacy checkout and its uncommitted files are untouched.

## Completed and merged previously

- Audited the public marketing routes, shared navigation, caption demos, responsive CSS, and dark theme.
- Redesigned the homepage masthead and added a synchronized parallel-text transcript while preserving language selection, cue selection, editing, copy, and export controls.
- Merged the homepage work through PR #16 (`4788b3f`).
- Previous verification passed: TypeScript, Prettier, 29 tests, and the Next.js production build.
- Confirmed the scoped public routes have no broken internal links, inconsistent CTA targets, duplicate IDs, or missing main/H1 semantics.

## Implemented and verified on this branch

- [x] `app/home.css`, `app/site.css`: added container-based sizing (`container-type: inline-size`) to `PublicCaptionPreview` and replaced its viewport-only stacked-layout media query with `@container (max-width: 650px)`. Set `.product-hero .sample-toolbar` to `grid-template-columns: minmax(0, 1fr)` so the language selector spans the card cleanly on `/urdu-transcription` (including 981–1100px viewports) while preserving RTL line height and selected cue states.
- [x] `app/site.css`, `components/site-header.tsx`, `components/marketing.tsx`: finished the compact mobile header (`<= 420px`) by moving `Start free` into the mobile navigation menu (`.site-mobile-start-free`) so brand, theme toggle, CTA, and menu button never collide down to 320px while preserving the linked `Brand` (`/` / `UrduSpeech home`). Also added `white-space: nowrap` to `.site-header .button` and a `961px–1180px` desktop header layout rule so `Start free` stays single-line across intermediate desktop widths.
- [x] `app/site.css`, `app/theme.css`: constrained the open mobile navigation and theme popup to `100dvh` (with `100vh` fallback) minus the sticky-header offset with `overflow-y: auto` and `overscroll-behavior: contain` for short landscape screens.
- [x] `app/public.css`: added a single-column pricing layout at `<= 440px` (placed after `<= 560px` for descending cascade order) with corrected borders and balanced single-column card padding.
- [x] `app/error.tsx`, `app/not-found.tsx`, `app/auth/[mode]/page.tsx`: wrapped the error, 404, and invalid-auth panels in the shared `public-container account-compact` container so small screens retain 20px gutters without double-padding valid auth layouts.
- [x] `components/site-header.tsx`, `lib/public-a11y.ts`, `app/site.css`: added `aria-current="location"` for nested guide routes (`/guides/[slug]`) while retaining `aria-current="page"` for exact page matches (including mobile `Sign in`).
- [x] `components/theme-toggle.tsx`, `lib/public-a11y.ts`, `app/theme.css`: completed the WAI-ARIA radio-group interaction model — single roving Tab stop on the checked radio (`tabIndex={0}` vs `-1`), `ArrowDown`/`ArrowRight`/`ArrowUp`/`ArrowLeft` selection with wraparound, `Home`/`End`, automatic focus on the checked option when opened, preserved `Escape`/outside-click behavior, focus return to the trigger on selection/Escape, and visually hidden `Sunrise` / `Sunset` `.sr-only` labels (scoping `.theme-sun-times > span` so `.sr-only` stays unaffected).
- [x] `components/caption-studio-demo.tsx`: removed the duplicate `aria-live="polite"` from `.caption-studio-subtitles`, kept one polite atomic live region on `.caption-transcript-lines` on the homepage (`!editable`), and disabled atomic live announcements during per-keystroke editing on `/demo` (`editable`) while retaining cue/language output and copy status feedback (`role="status"`).
- [x] `components/public-caption-preview.tsx`, `lib/caption-demo.ts`: unified language metadata (`captionLanguageMeta` / `captionOutputLanguages`) so `PublicCaptionPreview` outputs Urdu as `lang="ur" dir="rtl"`, Roman Urdu as `lang="ur-Latn" dir="ltr"`, and English as `lang="en" dir="ltr"`.
- [x] `app/theme.css`: updated dark `--control` from `#4e6d5b` to `#698473` (verified contrast: 4.55:1 vs canvas, 4.17:1 vs surface, 3.82:1 vs paper, 3.66:1 vs site-sage, 3.40:1 vs wash — all exceeding 3:1).
- [x] `tests/public-a11y.test.ts`: added focused `node:test` regression tests for `getNavCurrent`, `nextRadioIndex`, `captionLanguageMeta`, and `captionOutputLanguages`.

## Verification completed

- `npm run typecheck` (`next typegen && tsc --noEmit`): passed.
- `npm test` (`tsx --test tests/*.test.ts`): 32/32 tests passed.
- `npm run format:check`: passed across all matched files.
- `git diff --check`: clean.
- `NODE_ENV=production npm run build`: passed (27/27 static pages generated cleanly).
- Headless Google Chrome (CDP) browser & visual QA against production `next start`: 39/39 checks passed across 320px, 360px, 420px, 440px, 667x320 landscape, 961px, 1024px, and 1280px viewports in both light and dark themes (including live keyboard verification of the theme radio group, live DOM checks of `aria-current`, live regions, `lang`/`dir`, gutters, container-query stacking, and screenshot inspection).

## Validation commands

- `npm run typecheck`
- `npm test`
- `npm run format:check`
- `git diff --check`
- `NODE_ENV=production npm run build`

## Deferred work (intentionally out of scope for this branch)

- Manual assistive-technology (NVDA/VoiceOver/TalkBack) verification and long edited bilingual captions at 320–460px under 200% text zoom.
- Profile Urdu font-swap layout shift and offscreen decorative animation cost before changing font loading or animation lifecycle.
- Decide separately whether source-cue text should be decoupled from buttons for drag selection and whether mobile transcript DOM/visual order should change.
- Auto daylight fallback scheduling is unchanged and requires separate theme-state work.
- Historical design-token documentation drift is not being rewritten as part of this fix branch.
