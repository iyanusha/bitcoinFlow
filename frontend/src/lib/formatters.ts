export function formatSTX(microStx: number): string {
  return (microStx / 1_000_000).toFixed(6);
}

export function formatBTC(sats: number): string {
  return (sats / 100_000_000).toFixed(8);
}

export function formatCompact(num: number): string {
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
