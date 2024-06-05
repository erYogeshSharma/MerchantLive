export function getFontSize(
  figmaFontSize: number,
  dimensions: { height: number }
) {
  const figmaCardHeight = 192;

  const figmaFontPercent = figmaFontSize / figmaCardHeight;
  return figmaFontPercent * dimensions.height;
}
export function getWidth(figmaWidth: number, dimensions: { width: number }) {
  const figmaCardWidth = 336;

  const figmaWidthPercent = figmaWidth / figmaCardWidth;
  return figmaWidthPercent * dimensions.width;
}
