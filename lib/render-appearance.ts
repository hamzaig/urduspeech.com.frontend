import { DEFAULT_FONTS, type CaptionFontChoice } from "./caption-fonts";
import type { Defaults } from "./contracts";

type Placement = Defaults["captionPlacement"];
type Fonts = CaptionFontChoice | null | undefined;

export function sameRenderAppearance(
  renderedPlacement: Placement,
  renderedFonts: Fonts,
  selectedPlacement: Placement,
  selectedFonts: Fonts,
) {
  return (
    renderedPlacement?.y === selectedPlacement?.y &&
    renderedPlacement?.scale === selectedPlacement?.scale &&
    (renderedFonts?.latin ?? DEFAULT_FONTS.latin) ===
      (selectedFonts?.latin ?? DEFAULT_FONTS.latin) &&
    (renderedFonts?.urdu ?? DEFAULT_FONTS.urdu) ===
      (selectedFonts?.urdu ?? DEFAULT_FONTS.urdu)
  );
}
