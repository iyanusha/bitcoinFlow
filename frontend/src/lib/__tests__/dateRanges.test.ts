import { describe, expect, it } from 'vitest';
import { getPresetDateRange, isWithinDateRange, DATE_RANGE_LABELS } from '../dateRanges';

describe('dateRanges', () => {
  describe('getPresetDateRange', () => {
    it('returns null for all preset', () => {
      expect(getPresetDateRange('all')).toBeNull();
    });

    it('returns a range for today preset', () => {
      const range = getPresetDateRange('today');
      expect(range).not.toBeNull();
      expect(range!.start).toBeLessThan(range!.end);
    });

    it('returns a range for 7d preset', () => {
      const range = getPresetDateRange('7d');
      expect(range).not.toBeNull();
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      expect(range!.end - range!.start).toBeCloseTo(sevenDaysMs, -3);
    });

    it('returns a range for 30d preset', () => {
      const range = getPresetDateRange('30d');
      expect(range).not.toBeNull();
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      expect(range!.end - range!.start).toBeCloseTo(thirtyDaysMs, -3);
    });

    it('returns a range for 90d preset', () => {
      const range = getPresetDateRange('90d');
      expect(range).not.toBeNull();
      const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;
      expect(range!.end - range!.start).toBeCloseTo(ninetyDaysMs, -3);
    });
  });

  describe('isWithinDateRange', () => {
    it('returns true for null range', () => {
      expect(isWithinDateRange(Date.now(), null)).toBe(true);
    });

    it('returns true for timestamp within range', () => {
      const range = { start: 1000, end: 5000 };
      expect(isWithinDateRange(3000, range)).toBe(true);
    });

    it('returns false for timestamp before range', () => {
      const range = { start: 1000, end: 5000 };
      expect(isWithinDateRange(500, range)).toBe(false);
    });

    it('returns false for timestamp after range', () => {
      const range = { start: 1000, end: 5000 };
      expect(isWithinDateRange(6000, range)).toBe(false);
    });

    it('returns true for timestamp at range boundary', () => {
      const range = { start: 1000, end: 5000 };
      expect(isWithinDateRange(1000, range)).toBe(true);
      expect(isWithinDateRange(5000, range)).toBe(true);
    });
  });

  describe('DATE_RANGE_LABELS', () => {
    it('has labels for all presets', () => {
      expect(DATE_RANGE_LABELS.all).toBe('All Time');
      expect(DATE_RANGE_LABELS.today).toBe('Today');
      expect(DATE_RANGE_LABELS['7d']).toBe('Last 7 Days');
      expect(DATE_RANGE_LABELS['30d']).toBe('Last 30 Days');
      expect(DATE_RANGE_LABELS['90d']).toBe('Last 90 Days');
    });
  });
});
