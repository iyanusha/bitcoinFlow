export function deposit_confirmFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function deposit_confirmValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export function deposit_confirmTransform<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export const DEPOSIT_CONFIRM_DEFAULTS = { pageSize: 20, timeout: 30000, retries: 3 } as const;
