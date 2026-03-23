/**
 * Throttle a function so it runs at most once per interval.
 * Useful for scroll, resize, and other high-frequency events.
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  interval: number,
): T & { cancel: () => void } {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = ((...args: unknown[]) => {
    const now = Date.now();
    const remaining = interval - (now - lastCall);

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...args);
      }, remaining);
    }
  }) as T & { cancel: () => void };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return throttled;
}

/**
 * Create a throttled version using requestAnimationFrame.
 * Best for visual updates (scroll position, animations).
 */
export function rafThrottle<T extends (...args: unknown[]) => void>(
  fn: T,
): T & { cancel: () => void } {
  let rafId: number | null = null;

  const throttled = ((...args: unknown[]) => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  }) as T & { cancel: () => void };

  throttled.cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  return throttled;
}
