export function formatSTX(microStx: number): string {
  return (microStx / 1_000_000).toFixed(6);
}

export function formatBTC(sats: number): string {
  return (sats / 100_000_000).toFixed(8);
}

export function formatSBTC(sats: number, decimals = 4): string {
  const btc = sats / 100_000_000;
  if (btc === 0) return '0';
  if (btc < 0.0001) return '< 0.0001';
  return btc.toFixed(decimals);
}

export function formatCompact(num: number): string {
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export function formatPercentage(basisPoints: number): string {
  return `${(basisPoints / 100).toFixed(2)}%`;
}

export function formatBlocks(blocks: number): string {
  const minutes = Math.round((blocks * 10));
  if (minutes < 60) return `~${minutes}m`;
  const hours = Math.round(minutes / 60);
  return `~${hours}h`;
}

export function formatExchangeRate(rate: number): string {
  return (rate / 1_000_000).toFixed(6);
}

export function formatAddress(address: string, startLen = 8, endLen = 4): string {
  if (address.length <= startLen + endLen) return address;
  return `${address.slice(0, startLen)}...${address.slice(-endLen)}`;
}

export function formatTxId(txId: string): string {
  return formatAddress(txId, 10, 6);
}

export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function formatTimeSince(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

/**
 * Format a share percentage from basis points (10000 = 100%).
 */
export function formatSharePct(basisPoints: number): string {
  if (basisPoints === 0) return '0%';
  const pct = basisPoints / 100;
  if (pct < 0.01) return '< 0.01%';
  return `${pct.toFixed(2)}%`;
}

/**
 * Format vault TVL for compact display.
 */
export function formatTVL(microStx: number): string {
  const stx = microStx / 1_000_000;
  if (stx >= 1_000_000) return `${(stx / 1_000_000).toFixed(2)}M STX`;
  if (stx >= 1_000) return `${(stx / 1_000).toFixed(2)}K STX`;
  return `${stx.toFixed(2)} STX`;
}
