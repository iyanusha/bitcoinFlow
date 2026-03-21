export function mock_dataFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function mock_dataValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export function mock_dataTransform<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export const MOCK_DATA_DEFAULTS = { pageSize: 20, timeout: 30000, retries: 3 } as const;
