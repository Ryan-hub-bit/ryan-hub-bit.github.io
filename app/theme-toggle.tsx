"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { getTimeBasedTheme, parseTheme, themeStorageKey, type Theme } from "./theme";

const themeChangeEvent = "homepage-theme-change";
const getSnapshot = () => document.documentElement.dataset.theme === "dark";
const getServerSnapshot = () => false;
let manualTheme: Theme | null | undefined;

function subscribe(onChange: () => void) {
  if (manualTheme === undefined) {
    try {
      manualTheme = parseTheme(localStorage.getItem(themeStorageKey));
    } catch {
      manualTheme = null;
    }
  }

  const updateTheme = () => {
    const theme = manualTheme ?? getTimeBasedTheme(new Date().getHours());
    if (document.documentElement.dataset.theme !== theme) {
      document.documentElement.dataset.theme = theme;
      onChange();
    }
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === themeStorageKey || event.key === null) {
      manualTheme = parseTheme(event.newValue);
      updateTheme();
    }
  };
  const timer = window.setInterval(updateTheme, 60_000);
  document.addEventListener("visibilitychange", updateTheme);
  window.addEventListener(themeChangeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", updateTheme);
    window.removeEventListener(themeChangeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export default function ThemeToggle({ language }: { language: "en" | "zh" }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const label = language === "zh"
    ? (isDark ? "切换到日间模式" : "切换到夜间模式")
    : (isDark ? "Switch to light mode" : "Switch to dark mode");

  function toggleTheme() {
    const theme = getSnapshot() ? "light" : "dark";
    manualTheme = theme;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      // The switch still works if the browser does not allow local storage.
    }
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={label} title={label}>
      <Moon className="theme-icon theme-icon-moon" aria-hidden="true" />
      <Sun className="theme-icon theme-icon-sun" aria-hidden="true" />
    </button>
  );
}
