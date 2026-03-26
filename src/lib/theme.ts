import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "mhcet-theme";

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const preferredDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initialTheme: Theme = saved ?? (preferredDark ? "dark" : "light");

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  return {
    theme,
    isDark: theme === "dark",
    toggleTheme,
  };
}
