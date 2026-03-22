/**
 * Safely parse a Clarity integer value string to a number.
 * Falls back to 0 if the value is invalid.
 */
export function parseClarityInt(value: string | undefined): number {
  if (!value) return 0;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Safely parse a Clarity boolean value.
 */
export function parseClarityBool(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true';
  return false;
}

/**
 * Convert a Clarity uint (micro-units) to a human-readable decimal string.
 */
export function microToDecimal(microValue: number, decimals: number): string {
  const divisor = Math.pow(10, decimals);
  return (microValue / divisor).toFixed(decimals);
}
