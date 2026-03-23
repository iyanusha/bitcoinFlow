import { useState, useEffect, useRef } from 'react';

/**
 * Throttle a rapidly changing value.
 * The returned value updates at most once per interval.
 */
export function useThrottle<T>(value: T, interval: number): T {
  const [throttled, setThrottled] = useState(value);
  const lastUpdated = useRef(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastUpdated.current;

    if (elapsed >= interval) {
      setThrottled(value);
      lastUpdated.current = now;
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setThrottled(value);
        lastUpdated.current = Date.now();
      }, interval - elapsed);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, interval]);

  return throttled;
}
