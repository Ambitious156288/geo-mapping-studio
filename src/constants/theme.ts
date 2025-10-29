export const DEFAULT_FILL_COLOR: [number, number, number, number] = [
  0, 150, 255, 80,
];
export const DEFAULT_LINE_COLOR: [number, number, number, number] = [
  0, 150, 255, 200,
];

export const SELECTED_FEATURE_COLOR = {
  fill: [255, 0, 0, 120] as const,
  line: [255, 0, 0, 255] as const,
} as const;

export const DEFAULT_VIEW_LAYER_COLOR = {
  fill: [200, 200, 200, 100] as const,
  line: [0, 0, 0, 255] as const,
} as const;
