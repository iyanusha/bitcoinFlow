import { useState, useEffect, useCallback } from 'react';
import { THEME } from '../lib/constants';
import { getStoredTheme, applyTheme, persistTheme, getColorScheme } from '../lib/theme';

export function useTheme() {
  const [isDark, setIsDark] = useState(getStoredTheme);

  useEffect(() => {
    applyTheme(isDark);
    persistTheme(isDark);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.setAttribute('content', getColorScheme(isDark));
    }
  }, [isDark]);

  // Sync with system preference when no explicit choice stored
  useEffect(() => {
    const mql = window.matchMedia(THEME.SYSTEM_PREFERENCE_QUERY);
    const handler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME.STORAGE_KEY) === null) {
        setIsDark(e.matches);
      }
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const toggle = useCallback(() => setIsDark(prev => !prev), []);
  const setLight = useCallback(() => setIsDark(false), []);
  const setDark = useCallback(() => setIsDark(true), []);

  return { isDark, toggle, setLight, setDark } as const;
}
