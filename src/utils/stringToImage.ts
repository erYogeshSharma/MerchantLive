export default function svgToDataUrl(svgString: string) {
  const encodedSvg = encodeURIComponent(svgString)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
}
