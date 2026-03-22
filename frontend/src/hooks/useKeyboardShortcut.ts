import { useEffect, useCallback } from 'react';

interface ShortcutOptions {
  /** Key name (e.g., 'k', 'Escape', '/') */
  key: string;
  /** Require Ctrl/Cmd modifier */
  ctrl?: boolean;
  /** Require Shift modifier */
  shift?: boolean;
  /** Require Alt modifier */
  alt?: boolean;
  /** Whether the shortcut is enabled */
  enabled?: boolean;
  /** Prevent default browser behavior */
  preventDefault?: boolean;
}

export function useKeyboardShortcut(
  options: ShortcutOptions,
  handler: () => void
): void {
  const {
    key,
    ctrl = false,
    shift = false,
    alt = false,
    enabled = true,
    preventDefault = true,
  } = options;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // Don't trigger shortcuts when typing in inputs
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key !== key) return;
      if (ctrl && !(e.ctrlKey || e.metaKey)) return;
      if (shift && !e.shiftKey) return;
      if (alt && !e.altKey) return;

      if (preventDefault) {
        e.preventDefault();
      }

      handler();
    },
    [key, ctrl, shift, alt, enabled, preventDefault, handler]
  );

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);
}
