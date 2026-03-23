import { useRef, useEffect } from 'react';

/**
 * Like useMemo but uses a custom comparison function instead of
 * reference equality. Returns the previous value if the comparison
 * says the new value is equivalent.
 */
export function useMemoCompare<T>(
  next: T,
  compare: (prev: T | undefined, next: T) => boolean,
): T {
  const previousRef = useRef<T>();
  const previous = previousRef.current;

  const isEqual = compare(previous, next);

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  return isEqual ? (previous as T) : next;
}
