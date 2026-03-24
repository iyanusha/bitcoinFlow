import { THEME } from './constants';

/** Check if system prefers dark color scheme */
export function systemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(THEME.SYSTEM_PREFERENCE_QUERY).matches;
}

/** Read stored theme preference, falling back to system preference */
export function getStoredTheme(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(THEME.STORAGE_KEY);
  if (stored === null) return systemPrefersDark();
  return stored === 'true';
}

/** Apply the dark class to the document root */
export function applyTheme(isDark: boolean): void {
  document.documentElement.classList.toggle(THEME.CLASS_NAME, isDark);
}

/** Persist theme to localStorage */
export function persistTheme(isDark: boolean): void {
  localStorage.setItem(THEME.STORAGE_KEY, String(isDark));
}

/** Generate a CSS color-scheme meta tag value */
export function getColorScheme(isDark: boolean): string {
  return isDark ? 'dark' : 'light';
}
