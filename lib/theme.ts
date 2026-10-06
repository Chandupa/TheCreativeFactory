/*
 * Site theme (dark default, optional light). Shared by the pre-paint script in
 * app/layout.tsx and components/layout/ThemeToggle.tsx. Plain module (not
 * "use client") so the server layout can read these values.
 */

export type Theme = "dark" | "light";

/** localStorage key holding the visitor's choice. */
export const THEME_STORAGE_KEY = "tcf-theme";

/** Browser UI colour (<meta name="theme-color">) per theme — matches each --bg. */
export const THEME_COLOR: Record<Theme, string> = { dark: "#0b0e13", light: "#f6f6f2" };
