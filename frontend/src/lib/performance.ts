/**
 * Lightweight performance monitoring utilities.
 * Uses the Performance API to measure and report timings.
 */

/** Mark the start of a performance measurement */
export function markStart(label: string): void {
  if (typeof performance === 'undefined') return;
  performance.mark(`${label}-start`);
}

/** Mark the end and measure the duration */
export function markEnd(label: string): number | null {
  if (typeof performance === 'undefined') return null;

  performance.mark(`${label}-end`);
  try {
    const measure = performance.measure(label, `${label}-start`, `${label}-end`);
    return measure.duration;
  } catch {
    return null;
  }
}

/** Get Web Vitals metrics if available */
export function getWebVitals(): Record<string, number> {
  if (typeof performance === 'undefined') return {};

  const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  if (entries.length === 0) return {};

  const nav = entries[0];
  return {
    dns: nav.domainLookupEnd - nav.domainLookupStart,
    tcp: nav.connectEnd - nav.connectStart,
    ttfb: nav.responseStart - nav.requestStart,
    domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
    load: nav.loadEventEnd - nav.startTime,
  };
}

/** Report long tasks (>50ms) blocking the main thread */
export function observeLongTasks(callback: (duration: number) => void): (() => void) | null {
  if (typeof PerformanceObserver === 'undefined') return null;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        callback(entry.duration);
      }
    });
    observer.observe({ type: 'longtask', buffered: true });
    return () => observer.disconnect();
  } catch {
    return null;
  }
}
