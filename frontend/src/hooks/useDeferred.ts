import { useState, useEffect, useRef } from 'react';

/**
 * Defer an expensive computation to avoid blocking the UI.
 * Returns a stale value immediately and updates when computation completes.
 */
export function useDeferred<T>(
  compute: () => T,
  deps: unknown[],
  delay = 0,
): { value: T; isPending: boolean } {
  const [value, setValue] = useState<T>(compute);
  const [isPending, setIsPending] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    setIsPending(true);
    const timeoutId = setTimeout(() => {
      if (mountedRef.current) {
        setValue(compute());
        setIsPending(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { value, isPending };
}
