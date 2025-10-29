import { createTheme } from "@mui/material";

export type ThemeMode = "light" | "dark";

export const createAppTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
      },
      ...(mode === "dark"
        ? {
            background: { default: "#0f1115", paper: "#141823" },
          }
        : {}),
    },
    shape: { borderRadius: 10 },
  });

export default createAppTheme;
