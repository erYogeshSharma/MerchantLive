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
export function getCNameFromURL(url: string) {
  try {
    const hostnameParts = url.split(".");

    // If there are more than two parts, assume the first part is the subdomain (CNAME)
    if (hostnameParts.length > 2) {
      return hostnameParts[0]; // The subdomain, which could be considered the CNAME
    }

    if (hostnameParts.length === 2) {
      return "@";
    }

    return null; // No subdomain present
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

export const validDomainRegex = new RegExp(
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
);
