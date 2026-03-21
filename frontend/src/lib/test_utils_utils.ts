export function test_utilsFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function test_utilsValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export function test_utilsTransform<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export const TEST_UTILS_DEFAULTS = { pageSize: 20, timeout: 30000, retries: 3 } as const;
