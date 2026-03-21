export function lazy_loadingFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function lazy_loadingValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export function lazy_loadingTransform<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export const LAZY_LOADING_DEFAULTS = { pageSize: 20, timeout: 30000, retries: 3 } as const;
