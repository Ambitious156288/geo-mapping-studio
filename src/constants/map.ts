export const INITIAL_VIEW_STATE = {
  longitude: 19,
  latitude: 52,
  zoom: 5,
  pitch: 0,
  bearing: 0,
} as const;

export const MAP_STYLE_URL =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export const MAP_STYLES = {
  SEARCH_ZOOM: 12,
  MARKER_RADIUS: 1000,
  MARKER_COLOR: [255, 0, 0, 200] as const,
} as const;
