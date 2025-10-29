import { useState, useCallback } from "react";

export type ThemeMode = "light" | "dark";

export const useThemeMode = (initialMode: ThemeMode = "light") => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { mode, setMode, toggleMode };
};
