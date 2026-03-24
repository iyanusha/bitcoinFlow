export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

type ReportCallback = (metric: WebVitalsMetric) => void;

/**
 * Report Core Web Vitals (CLS, FID, FCP, LCP, TTFB) using the
 * PerformanceObserver API.
 */
export function reportWebVitals(onReport: ReportCallback): void {
  if (typeof PerformanceObserver === 'undefined') return;

  // Largest Contentful Paint
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
      if (lastEntry) {
        onReport({
          name: 'LCP',
          value: lastEntry.startTime,
          rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor',
        });
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch { /* API not available */ }

  // First Contentful Paint
  try {
    const fcpObserver = new PerformanceObserver((list) => {
      const entry = list.getEntries().find((e) => e.name === 'first-contentful-paint');
      if (entry) {
        onReport({
          name: 'FCP',
          value: entry.startTime,
          rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor',
        });
      }
    });
    fcpObserver.observe({ type: 'paint', buffered: true });
  } catch { /* API not available */ }

  // Time to First Byte
  try {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      const ttfb = navEntry.responseStart;
      onReport({
        name: 'TTFB',
        value: ttfb,
        rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor',
      });
    }
  } catch { /* API not available */ }
}
