export const rgbToHex = (rgb: [number, number, number]) =>
  `#${rgb
    .map((color) =>
      Math.round(Math.max(0, Math.min(255, color)))
        .toString(16)
        .padStart(2, "0")
    )
    .join("")}`;

export const hexToRgb = (hex: string) => {
  const cleanHex = hex.replace("#", "");

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return [r, g, b];
};
