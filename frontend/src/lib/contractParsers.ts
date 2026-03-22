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

/**
 * Safely parse a Clarity optional value — returns null if none.
 */
export function parseClarityOptional<T>(value: { value: T } | null | undefined): T | null {
  if (!value || value.value === undefined) return null;
  return value.value;
}

/**
 * Check if a Clarity response is an error (err) vs success (ok).
 */
export function isClarityError(response: { type: string }): boolean {
  return response.type === 'err';
}

/**
 * Convert a STX amount to micro-STX (multiply by 1e6).
 */
export function stxToMicro(stx: number): number {
  return Math.round(stx * 1_000_000);
}

/**
 * Convert a BTC amount to satoshis (multiply by 1e8).
 */
export function btcToSats(btc: number): number {
  return Math.round(btc * 100_000_000);
}
