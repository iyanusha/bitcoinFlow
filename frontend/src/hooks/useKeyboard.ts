import { useEffect } from 'react';
export function useKeyboard(key: string, handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const h = (e: KeyboardEvent) => { if (e.key === key) handler(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [key, handler, enabled]);
}
