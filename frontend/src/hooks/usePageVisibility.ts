import { useState, useEffect } from 'react';

/**
 * Tracks whether the current tab/page is visible.
 * Returns false when the user switches tabs or minimizes the window.
 * Useful for pausing polling or animations when the page is hidden.
 */
export function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof document === 'undefined') return true;
    return !document.hidden;
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return isVisible;
}
