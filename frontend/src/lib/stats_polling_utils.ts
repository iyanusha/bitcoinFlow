export function stats_pollingFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function stats_pollingValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export function stats_pollingTransform<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export const STATS_POLLING_DEFAULTS = { pageSize: 20, timeout: 30000, retries: 3 } as const;
