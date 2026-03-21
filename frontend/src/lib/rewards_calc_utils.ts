export function rewards_calcFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function rewards_calcValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export function rewards_calcTransform<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export const REWARDS_CALC_DEFAULTS = { pageSize: 20, timeout: 30000, retries: 3 } as const;
