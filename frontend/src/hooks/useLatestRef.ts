import { useRef, useEffect } from 'react';

/**
 * Keep a ref that always points to the latest value.
 * Avoids stale closures in callbacks and effects.
 */
export function useLatestRef<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
