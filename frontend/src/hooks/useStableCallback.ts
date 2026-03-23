import { useRef, useCallback } from 'react';

/**
 * Returns a stable callback reference that always calls the latest version
 * of the provided function. Useful for event handlers that depend on
 * frequently-changing state without causing re-renders in child components.
 */
export function useStableCallback<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useCallback((...args: unknown[]) => fnRef.current(...args), []) as T;
}
