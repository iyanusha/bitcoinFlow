import { useState, useEffect, useCallback } from 'react';
import { THEME } from '../lib/constants';

export type ThemeMode = 'light' | 'dark' | 'system';

function getInitialMode(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(THEME.STORAGE_KEY);
  if (stored !== null) return stored === 'true';
  return window.matchMedia(THEME.SYSTEM_PREFERENCE_QUERY).matches;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(getInitialMode);

  useEffect(() => {
    document.documentElement.classList.toggle(THEME.CLASS_NAME, isDark);
    localStorage.setItem(THEME.STORAGE_KEY, String(isDark));
  }, [isDark]);

  const toggle = useCallback(() => setIsDark(prev => !prev), []);
  const setLight = useCallback(() => setIsDark(false), []);
  const setDark = useCallback(() => setIsDark(true), []);

  return { isDark, toggle, setLight, setDark } as const;
}
