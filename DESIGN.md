---
name: UrduSpeech
description: An Urdu transcription and caption studio for creators.
colors:
  primary: "#20583c"
  primary-hover: "#16432d"
  wash: "#eaf2e6"
  stage: "#1c2921"
  stage-accent: "#dceadd"
  subtitle-ink: "#101810"
  ink: "#19231c"
  muted: "#4d5c51"
  paper: "#f4f6f1"
  canvas: "#fcfdf9"
  surface: "#fff"
  line: "#d9e1d7"
  control: "#87988a"
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
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.field}"
    padding: "3px"
  caption-format-option:
    textColor: "{colors.muted}"
    rounded: "{rounded.status}"
  caption-format-option-hover:
    textColor: "{colors.ink}"
  caption-format-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
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

UrduSpeech uses ink text, a light green canvas and green actions across the public site, account pages and Studio. The public header and footer are shared by marketing, help and account routes. The editor puts caption lines next to local media and exports at wide widths.

## Colors

Use the root tokens in `app/globals.css`. The canvas supports reading and work areas. White panels separate forms and editable controls from the canvas. The stronger control outline distinguishes inputs and selected caption lines. Use the primary green for main actions, the brand mark and keyboard focus. Use green wash for the current Studio destination and selected cues. Reserve the dark media stage and pale overlay tint for caption previews over footage.

## Typography

Bricolage Grotesque carries public and Studio headings. Public Sans handles reading and controls. Noto Nastaliq Urdu uses the local `CaptionUrdu` face. Use tabular numerals for durations and timecodes. Allow about two ems of vertical space for Urdu caption lines. Mark sample Urdu text with its language and direction, and isolate the direction of user text.

## Layout

The public container caps at 1220px. Marketing interiors use the same gutters and navigation as the homepage and provide narrower reading columns for help and policies. Account forms use a single panel up to 460px wide. Public navigation moves below the wordmark at 680px.

Studio uses top navigation and a content width up to 1330px. Below 880px, the editor stacks above the preview and exports. Below 660px, the preview and exports also stack.

## Elevation & Depth

Separate panels using thin borders and lightly tinted grounds. Use a small text shadow for local subtitle legibility over footage.

## Shapes

Public action buttons are round-ended. Fields, cue rows and workspace controls use tighter corner radii. Grouped panels use a continuous outside border and internal dividers.

## Components

Primary actions are green with white text. Secondary actions use a white surface and a visible outline. Disabled actions keep their native state. Public questions use native disclosures with a visible expand control. Forms keep labels above fields and use inline recovery and success feedback.

The public caption demo uses native radio controls for output language and timecoded buttons for sample lines. The active caption appears as selectable text on a pale green surface. The video captions page shows the same scripts over an illustrative frame. [ImageGen asset provenance](assets/caption-demo.webp.json)

## Do's and Don'ts

- Keep the active format, selected cue and current navigation link visible.
- Keep Urdu selectable and give it its own line height and direction.
- Keep policy and help copy to readable widths.
