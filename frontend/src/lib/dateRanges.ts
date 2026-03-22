export type DateRangePreset = 'all' | 'today' | '7d' | '30d' | '90d';

export interface DateRange {
  start: number;
  end: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function getPresetDateRange(preset: DateRangePreset): DateRange | null {
  if (preset === 'all') return null;

  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  switch (preset) {
    case 'today':
      return { start: todayStart.getTime(), end: now };
    case '7d':
      return { start: now - 7 * DAY_MS, end: now };
    case '30d':
      return { start: now - 30 * DAY_MS, end: now };
    case '90d':
      return { start: now - 90 * DAY_MS, end: now };
  }
}

export function isWithinDateRange(timestamp: number, range: DateRange | null): boolean {
  if (!range) return true;
  return timestamp >= range.start && timestamp <= range.end;
}

export const DATE_RANGE_LABELS: Record<DateRangePreset, string> = {
  all: 'All Time',
  today: 'Today',
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days',
  '90d': 'Last 90 Days',
};
