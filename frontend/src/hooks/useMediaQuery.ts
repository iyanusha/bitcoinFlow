import { useState, useEffect } from 'react';
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const h = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, [query]);
  return matches;
}
export function useIsMobile() { return useMediaQuery('(max-width: 768px)'); }
