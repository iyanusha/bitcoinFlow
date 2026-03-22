import { describe, expect, it, vi, beforeEach } from 'vitest';
import { markStart, markEnd, getWebVitals } from '../performance';

describe('performance utilities', () => {
  beforeEach(() => {
    performance.clearMarks();
    performance.clearMeasures();
  });

  describe('markStart and markEnd', () => {
    it('measures duration between start and end marks', () => {
      markStart('test-op');
      // Simulate some work
      const start = performance.now();
      while (performance.now() - start < 1) {} // ~1ms
      const duration = markEnd('test-op');

      expect(duration).not.toBeNull();
      expect(duration!).toBeGreaterThan(0);
    });

    it('returns null if start mark is missing', () => {
      const duration = markEnd('nonexistent');
      expect(duration).toBeNull();
    });
  });

  describe('getWebVitals', () => {
    it('returns an object with timing metrics', () => {
      const vitals = getWebVitals();
      // In test environment, navigation entries may be empty
      expect(vitals).toBeDefined();
      expect(typeof vitals).toBe('object');
    });
  });
});
