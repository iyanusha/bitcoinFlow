export function stacking_infoFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function stacking_infoValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export function stacking_infoTransform<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export const STACKING_INFO_DEFAULTS = { pageSize: 20, timeout: 30000, retries: 3 } as const;
