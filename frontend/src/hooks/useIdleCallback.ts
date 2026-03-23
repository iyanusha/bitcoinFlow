import { useEffect, useRef } from 'react';

/**
 * Schedules a callback to run during browser idle periods.
 * Falls back to setTimeout when requestIdleCallback is unavailable.
 * Automatically cancels on unmount.
 */
export function useIdleCallback(
  callback: () => void,
  options?: { timeout?: number },
): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(() => callbackRef.current(), options);
      return () => cancelIdleCallback(id);
    }

    // Fallback for Safari
    const id = setTimeout(() => callbackRef.current(), options?.timeout ?? 1);
    return () => clearTimeout(id);
  }, [options?.timeout]);
}
