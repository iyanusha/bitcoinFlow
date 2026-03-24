import { useEffect, useRef } from 'react';

/**
 * Saves the currently focused element when isOpen becomes true
 * and returns focus to it when isOpen becomes false.
 * Essential for modal dialogs and overlays per WAI-ARIA practices.
 */
export function useFocusReturn(isOpen: boolean): void {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else if (previousFocusRef.current) {
      // Small delay to ensure the dialog has fully closed
      const el = previousFocusRef.current;
      requestAnimationFrame(() => {
        if (el && typeof el.focus === 'function') {
          el.focus();
        }
      });
      previousFocusRef.current = null;
    }
  }, [isOpen]);
}
