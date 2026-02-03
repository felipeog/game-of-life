export function getCssRgbFromColorObject(colorObject: Color) {
  const { r, g, b, a } = colorObject;

  return `rgb(${r} ${g} ${b} / ${a ?? 1})`;
}
