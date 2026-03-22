import { useState, useEffect, useCallback } from 'react';
import { getStoredTheme, applyTheme, persistTheme } from '../lib/theme';

export function useTheme() {
  const [isDark, setIsDark] = useState(getStoredTheme);

  useEffect(() => {
    applyTheme(isDark);
    persistTheme(isDark);
  }, [isDark]);

  const toggle = useCallback(() => setIsDark(prev => !prev), []);
  const setLight = useCallback(() => setIsDark(false), []);
  const setDark = useCallback(() => setIsDark(true), []);

  return { isDark, toggle, setLight, setDark } as const;
}
