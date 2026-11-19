---
name: UrduSpeech
description: An Urdu transcription and caption studio for creators.
colors:
  primary: "#5736c5"
  primary-hover: "#4423a7"
  wash: "#eee9ff"
  stage: "#302349"
  stage-accent: "#dbcaff"
  frame-line: "#4e436b"
  frame-text: "#f9f6ff"
  frame-soft: "#d9cee9"
  subtitle-ink: "#1b1128"
  ink: "#261b3d"
  muted: "#615871"
  paper: "#f7f6fb"
  surface: "#fff"
  line: "#e1dbea"
  control: "#9586aa"
  red: "#a62c48"
  green: "#1d6848"
typography:
  display:
    fontFamily: '"Bricolage Grotesque Variable", "Public Sans Variable", CaptionUrdu, Arial, sans-serif'
    fontSize: "6rem"
    fontWeight: 750
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Bricolage Grotesque Variable", "Public Sans Variable", CaptionUrdu, Arial, sans-serif'
    fontSize: "4rem"
    fontWeight: 750
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Public Sans Variable", CaptionUrdu, Arial, sans-serif'
    fontSize: "2.2rem"
    fontWeight: 700
    lineHeight: 1.22
    letterSpacing: "-0.033em"
  panel-title:
    fontFamily: '"Public Sans Variable", CaptionUrdu, Arial, sans-serif'
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.22
    letterSpacing: "-0.023em"
  body:
    fontFamily: '"Public Sans Variable", CaptionUrdu, Arial, sans-serif'
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"Public Sans Variable", CaptionUrdu, Arial, sans-serif'
    fontSize: "12px"
    fontWeight: 660
    lineHeight: 1.35
  button:
    fontFamily: '"Public Sans Variable", CaptionUrdu, Arial, sans-serif'
    fontSize: "14px"
    fontWeight: 680
    lineHeight: 1.35
  urdu-caption:
    fontFamily: "CaptionUrdu, serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 2.08
rounded:
  strip: "4px"
  status: "6px"
  field: "8px"
  control: "9px"
  frame: "10px"
  panel: "12px"
  group: "14px"
  stage: "16px"
spacing:
  tight: "4px"
  compact: "8px"
  control: "10px"
  inner: "12px"
  editor-panel: "15px"
  standard: "16px"
  roomy: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  button-secondary-hover:
    backgroundColor: "{colors.wash}"
  button-text:
    textColor: "{colors.primary}"
    padding: "4px 0"
  button-danger:
    backgroundColor: "{colors.red}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  text-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "9px 11px"
  text-field-disabled:
    backgroundColor: "{colors.paper}"
  workspace-nav-item:
    textColor: "{colors.muted}"
    rounded: "{rounded.field}"
    padding: "9px 11px"
  workspace-nav-item-current:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.primary-hover}"
  status-label:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.primary-hover}"
    typography: "{typography.label}"
    rounded: "{rounded.status}"
    padding: "4px 9px"
  success-message:
    textColor: "{colors.green}"
  media-preview-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "{spacing.editor-panel}"
  caption-format-selector:
    rounded: "{rounded.frame}"
    padding: "{spacing.tight}"
  caption-format-option:
    textColor: "{colors.frame-soft}"
    rounded: "{rounded.status}"
  caption-format-option-hover:
    textColor: "{colors.frame-text}"
  caption-format-selected:
    backgroundColor: "{colors.stage-accent}"
    textColor: "{colors.stage}"
    rounded: "{rounded.status}"
  caption-strip:
    backgroundColor: "{colors.subtitle-ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.strip}"
    padding: "4px 10px"
  caption-strip-urdu:
    backgroundColor: "{colors.stage-accent}"
    textColor: "{colors.stage}"
    typography: "{typography.urdu-caption}"
    rounded: "{rounded.strip}"
    padding: "2px 12px 6px"
---

# Design System: UrduSpeech

## Overview

**Creative North Star: "Post-production screening sheet"**

UrduSpeech takes its visual cues from reviewing a recording. Lavender and white surfaces support deep violet type. A matte indigo frame holds the media, and timecoded caption rows link words to the recording. Public typography opens up the page. Studio uses the same palette at the scale of fields, rows, and editing panels.

Urdu is part of the working interface and the media. Nastaliq captions have enough vertical space for the script, and bilingual samples place Urdu above English. Shared controls keep the script changes legible across the public demo and Studio.

**Key Characteristics:**

- Lavender fields, deep violet ink, and white workspace surfaces.
- A matte indigo media stage with fitted subtitle strips and tabular timecodes.
- Bricolage Grotesque for public display type, Public Sans for controls and reading, and Noto Nastaliq Urdu for Urdu script.
- Flat workspace panels, fine rules, and restrained corner radii.

## Colors

The palette uses one violet accent supported by cool white and lavender grounds.

### Primary

- **Action violet** fills primary buttons and the waveform mark and colors text actions and keyboard focus.
- **Deep action violet** is the hover fill for primary buttons and the text color for current navigation and status labels on lavender.
- **Lavender wash** groups public content and fills selected options and current Studio cues.
- **Stage lavender** highlights selected demo formats, timecodes, and Urdu strips on the media stage.

### Neutral

- **Deep violet ink** carries headings and readable text. **Muted violet** carries supporting copy and inactive navigation.
- **Cool paper** grounds Studio and pricing. **White surface** is the working layer for fields, panels, and public reading areas.
- **Divider lavender** marks structural 1px boundaries. **Control lavender** gives interactive outlines and fields more definition.
- **Stage indigo** frames the demo and local media. **Stage divider**, **stage text**, and **stage muted text** distinguish the dark toolbar, headings, and secondary rows. **Subtitle ink** keeps Roman Urdu and English sample lines readable over the still.

Red identifies destructive actions and deleted text. Green identifies saved states and inserted text.

**The Violet Selection Rule.** Use lavender wash under the current workspace item and stage lavender to mark selected formats on indigo. Give the current caption row a visible fill and outline on either surface.

## Typography

Bricolage Grotesque Variable gives public headings and prices a tightly spaced display voice. Public Sans Variable handles workspace titles, body copy, labels, and buttons. The local Noto Nastaliq Urdu font is available as `CaptionUrdu` for Urdu, with Arial and generic sans-serif as additional fallbacks in the body stack.

- **Display and headline** use the same heavy, close-set display treatment. The public masthead scales between `3.5rem` and `6rem` on desktop. Public section headings and policy headings scale between `2.5rem` and `4rem`. Auth headings use their own narrower clamp.
- **Workspace title** uses Public Sans and drops to `1.85rem` on narrow screens. Panel titles step down to `1.25rem`.
- **Body** uses comfortable paragraph leading. General paragraphs cap at `76ch`, while offer and pricing summaries cap at `40ch`.
- **Labels and timecodes** use the body family. Controls stay in sentence case and timestamps and duration inputs use tabular figures.
- **Urdu captions** use their own size and leading. The public overlay scales from `1.05rem` to `2rem`. The Urdu Studio preview and caption field use `18px` with `2.06` line height.

**The Urdu Line Height Rule.** Allow about two ems of vertical space per Urdu caption line. Mark Urdu sample captions with their language and reading direction, and use directional isolation or automatic direction for user content.

## Layout

The public container caps at `1220px` with `48px` gutters, changing to `20px` gutters at `760px` and below. Grid and flex layout keep the masthead and offer aligned at wide sizes. The media figure starts beside its timecoded rows, with the list moving below the frame at `860px`. At `760px`, public two-column copy and auth stack, and pricing reduces to two columns. At `560px`, the public navigation moves under the brand and sign-in.

Studio uses a `218px` sticky sidebar and a flexible work area with `23px` to `48px` gutters. At `820px`, the sidebar becomes wrapping top navigation. The editor gives the cue list more width than the preview and exports column. At `1060px`, cue editing moves above the preview and exports, which can sit side by side down to `660px`. Below that, they stack and the editor panels use tighter padding.

Use close spacing inside controls and cues, then separate working panels with `14px` to `16px` gaps. Larger public sections have clear blocks of vertical whitespace. Keep long titles wrappable and let control rows wrap before they create horizontal scrolling.

## Elevation & Depth

Workspace depth comes from white panels against cool paper, lighter dividers, and tinted selection. The public screening panel carries the soft offset shadow (`0 20px 42px #35246822`). Local media captions use a small text shadow (`0 1px 3px #120b1a`) for readability against footage.

**The Media Shadow Rule.** Keep work panels flat and bordered. Reserve the broad ambient shadow for the public screening panel.

## Shapes

Use short-radius rectangles. Caption overlays use the smallest radius and fit the text on each line. Fields, buttons, and cue rows have distinct tight radii. Workspace panels use the panel radius, with a slightly larger radius for a grouped pricing table and the public stage. The stage clips the media to its frame radius, and the pricing group clips its internal dividers at the outside corners.

## Components

### Buttons

Primary and destructive buttons share a `44px` minimum height, compact horizontal padding, and white type. Primary buttons deepen on hover. Secondary actions have a white fill with a control-colored outline and switch to lavender wash on hover. Text actions use violet type on a transparent background and underline on hover. Disabled buttons use reduced opacity. Light-surface keyboard focus uses a `2px` violet outline with `3px` offset.

### Inputs and selectable options

Fields use a white fill, the stronger control border, visible labels, and a `44px` minimum height. Timing inputs are compact numeric fields with tabular figures. Selectable output cards use a complete outline and add a violet border and lavender wash when checked. Use a lavender focus outline for controls on the indigo stage.

### Status labels

Processing status uses a small lavender rectangle with deep violet text inside the Project status disclosure. Refresh sits beside the disclosure.

### Cards and panels

Editor, upload, and settings panels use a white surface and a fine divider outline. Build denser structures such as the project list and plan comparison with internal row and column dividers. The editor cue list nests cool paper rows inside the white editing panel. The cue playing in the media preview switches to a violet border and lavender wash.

### Navigation

The public header centers a short set of text links between the waveform wordmark and the sign-in action. Studio navigation pairs each destination with a small stroke icon and uses a lavender rectangle for the current location. Use the same wordmark across public, auth, and Studio surfaces.

### Media and captions

On the indigo stage, a segmented radio group sets the caption language. Selectable caption rows pair tabular timecodes with script and translation. Each row has a chevron. The selected row adds a mid-violet fill, an outline, and a brighter chevron. The sample figure overlays a lavender Urdu strip and a dark English strip as live text.

Studio places the editable text and timing beside the local player at wide widths. The empty media frame holds the Choose original recording action. When video is playing, the compact subtitle overlay sits above the player controls.

The illustrative interview still used in the demo and auth was generated with ImageGen. [Asset provenance](assets/caption-demo.webp.json)

## Do's and Don'ts

### Do

- **Do** preserve a clear selected state for formats, navigation, and the current cue.
- **Do** keep Urdu script selectable and give it its own line height and direction.
- **Do** keep captions legible over footage with fitted strips or the local preview text shadow.

### Don't

- **Don't** bake captions into an illustrative still used for the interactive demo.
- **Don't** add ambient shadow to routine Studio panels.
- **Don't** apply the tight display leading to Urdu captions.
