import { useEffect, useRef } from 'react';
export function useFocusTrap(isActive: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isActive || !ref.current) return;
    const el = ref.current;
    const focusable = el.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
    const first = focusable[0], last = focusable[focusable.length - 1];
    const h = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
      else { if (document.activeElement === last) { e.preventDefault(); first?.focus(); } }
    };
    el.addEventListener('keydown', h);
    first?.focus();
    return () => el.removeEventListener('keydown', h);
  }, [isActive]);
  return ref;
}
