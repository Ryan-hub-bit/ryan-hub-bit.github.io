export const themeStorageKey = "kun-liu-theme";
export type Theme = "light" | "dark";

const dayStartHour = 7;
const nightStartHour = 19;

export function getTimeBasedTheme(hour: number): Theme {
  return hour >= dayStartHour && hour < nightStartHour ? "light" : "dark";
}

export function parseTheme(value: string | null): Theme | null {
  return value === "light" || value === "dark" ? value : null;
}

// Use the visitor's local clock before the first paint, with saved choices taking priority.
export const themeInitScript = `(() => {
  const hour = new Date().getHours();
  let theme = hour >= ${dayStartHour} && hour < ${nightStartHour} ? "light" : "dark";
  try {
    const saved = localStorage.getItem("${themeStorageKey}");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch {}
  document.documentElement.dataset.theme = theme;
})();`;
