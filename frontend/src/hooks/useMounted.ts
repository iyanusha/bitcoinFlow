import { useEffect, useRef, useCallback } from 'react';

/**
 * Returns a stable function that checks if the component is still mounted.
 * Useful for preventing state updates on unmounted components after async operations.
 */
export function useMounted(): () => boolean {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
}
