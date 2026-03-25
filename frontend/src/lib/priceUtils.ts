const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Format a USD amount with $ prefix and 2 decimal places.
 */
export function formatUSD(usd: number): string {
  return usdFormatter.format(usd);
}

/**
 * Format a 24h price change percentage with + or - sign.
 */
export function formatChangePercent(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

/**
 * Convert micro-STX units to STX (divide by 1,000,000).
 */
export function microSTXtoSTX(micro: number): number {
  return micro / 1_000_000;
}

/**
 * Calculate total portfolio value in USD given an STX amount and current price.
 */
export function calculatePortfolioValue(stxAmount: number, priceUSD: number): number {
  return stxAmount * priceUSD;
}

/**
 * Format an STX amount to 6 decimal places.
 */
export function formatSTXAmount(stx: number): string {
  return stx.toFixed(6);
}

/**
 * Return true if the 24h change is positive or zero.
 */
export function isPositiveChange(change: number): boolean {
  return change >= 0;
}

/**
 * Return a Tailwind text color class based on whether the price change is positive.
 */
export function getPriceChangeColor(change: number): string {
  return change >= 0 ? 'text-green-600' : 'text-red-600';
}

/**
 * Format a large USD value compactly (e.g. $1.2M, $34.5K).
 */
export function formatUSDCompact(usd: number): string {
  if (Math.abs(usd) >= 1_000_000) {
    return `$${(usd / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(usd) >= 1_000) {
    return `$${(usd / 1_000).toFixed(2)}K`;
  }
  return usdFormatter.format(usd);
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Normalize an array of price values to a 0–1 range for chart rendering.
 */
export function normalizePrices(prices: number[]): number[] {
  if (prices.length === 0) return [];
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min;
  if (range === 0) return prices.map(() => 0.5);
  return prices.map(p => (p - min) / range);
}
