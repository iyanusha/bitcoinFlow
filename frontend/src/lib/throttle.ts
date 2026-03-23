/**
 * Creates a throttled version of a function that invokes at most once
 * every `intervalMs` milliseconds. The first call is always immediate.
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  intervalMs: number,
): T {
  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = (...args: unknown[]) => {
    const now = Date.now();
    const remaining = intervalMs - (now - lastCallTime);

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        timeoutId = null;
        fn(...args);
      }, remaining);
    }
  };

  return throttled as T;
}
