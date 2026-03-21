export function input_sanitizeFormat(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

export function input_sanitizeValidate(input: string): { valid: boolean; error?: string } {
  if (!input.trim()) return { valid: false, error: 'Required' };
  return { valid: true };
}

export function input_sanitizeTransform<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export const INPUT_SANITIZE_DEFAULTS = { pageSize: 20, timeout: 30000, retries: 3 } as const;
