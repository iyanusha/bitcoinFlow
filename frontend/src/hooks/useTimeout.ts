import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Declarative setTimeout that auto-cleans on unmount.
 * Returns a set function to start/restart and a clear function to cancel.
 */
export function useTimeout(
  callback: () => void,
  delay: number | null,
): { reset: () => void; clear: () => void } {
  const callbackRef = useRef(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  callbackRef.current = callback;

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clear();
    if (delay !== null) {
      timerRef.current = setTimeout(() => callbackRef.current(), delay);
    }
  }, [delay, clear]);

  useEffect(() => {
    reset();
    return clear;
  }, [reset, clear]);

  return { reset, clear };
}
