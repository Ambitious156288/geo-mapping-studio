export const SNACKBAR_CONFIG = {
  AUTO_HIDE_DURATION: 3000,
  ANCHOR_ORIGIN: {
    vertical: "bottom" as const,
    horizontal: "center" as const,
  },
} as const;

export const DRAWER_CONFIG = {
  MOBILE_WIDTH: 280,
  DESKTOP_WIDTH: 300,
  MOBILE_HEIGHT_OFFSET: 56,
  DESKTOP_HEIGHT_OFFSET: 64,
} as const;
