"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_COLOR, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

// The theme lives on <html data-theme>; subscribe to that attribute so every
// toggle on the page stays in sync without React state or context.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerTheme = (): Theme => "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode / blocked storage: the switch still works for this visit.
  }
}

/** Dark ⇄ light switch. Dark is the default; the choice is remembered per browser. */
export default function ThemeToggle({ className = "icon-btn theme-toggle" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const next: Theme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className={className}
      onClick={() => applyTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === "light" ? <Moon width={20} height={20} aria-hidden="true" /> : <Sun width={20} height={20} aria-hidden="true" />}
    </button>
  );
}
