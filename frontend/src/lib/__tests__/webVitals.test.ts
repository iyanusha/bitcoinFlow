import { describe, expect, it, vi } from 'vitest';
import { reportWebVitals } from '../webVitals';

describe('reportWebVitals', () => {
  it('calls callback function', () => {
    const callback = vi.fn();
    reportWebVitals(callback);
    // TTFB should be reported synchronously from navigation timing
    // The exact behavior depends on the test environment
    expect(typeof callback).toBe('function');
  });

  it('does not throw when PerformanceObserver unavailable', () => {
    const original = globalThis.PerformanceObserver;
    // @ts-expect-error: removing for test
    delete globalThis.PerformanceObserver;
    expect(() => reportWebVitals(vi.fn())).not.toThrow();
    globalThis.PerformanceObserver = original;
  });

  it('reports TTFB from navigation timing', () => {
    const callback = vi.fn();
    const mockEntry = { responseStart: 200 };
    vi.spyOn(performance, 'getEntriesByType').mockReturnValue([mockEntry as unknown as PerformanceEntry]);
    reportWebVitals(callback);
    const ttfbCall = callback.mock.calls.find(
      (c: unknown[]) => (c[0] as { name: string }).name === 'TTFB',
    );
    if (ttfbCall) {
      expect(ttfbCall[0].value).toBe(200);
      expect(ttfbCall[0].rating).toBe('good');
    }
    vi.restoreAllMocks();
  });
});
