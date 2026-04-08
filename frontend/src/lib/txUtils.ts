import type { TxType, Transaction } from '../types/transaction';

/** Truncate a tx hash to first 6 + "…" + last 4 characters. */
export function formatTxHash(hash: string): string {
  if (hash.length <= 12) return hash;
  return `${hash.slice(0, 6)}…${hash.slice(-4)}`;
}

/** Human-readable label for a transaction type. */
export function getTxTypeLabel(type: TxType): string {
  switch (type) {
    case 'deposit':    return 'Deposit';
    case 'withdrawal': return 'Withdrawal';
    case 'lock':       return 'Lock';
    case 'unlock':     return 'Unlock';
    case 'reward':     return 'Reward';
    default:           return 'Unknown';
  }
}

/** Tailwind color class for a transaction type badge. */
export function getTxTypeColor(type: TxType): string {
  switch (type) {
    case 'deposit':    return 'text-green-700 bg-green-50 border-green-200';
    case 'withdrawal': return 'text-red-700 bg-red-50 border-red-200';
    case 'lock':       return 'text-amber-700 bg-amber-50 border-amber-200';
    case 'unlock':     return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'reward':     return 'text-purple-700 bg-purple-50 border-purple-200';
    default:           return 'text-gray-700 bg-gray-50 border-gray-200';
  }
}

/** Get the Hiro block explorer URL for a transaction. */
export function getExplorerUrl(
  txHash: string,
  network: 'mainnet' | 'testnet' = 'testnet'
): string {
  const chain = network === 'mainnet' ? '' : '&chain=testnet';
  return `https://explorer.hiro.so/txid/${txHash}?${chain}`;
}

/** Format a fee from micro-STX to a human-readable STX string. */
export function formatFee(microSTX: number): string {
  const stx = microSTX / 1_000_000;
  return `${stx.toFixed(6)} STX`;
}

/** Group a list of transactions by their date string (e.g. "Apr 6, 2026"). */
export function groupTxsByDate(transactions: Transaction[]): Record<string, Transaction[]> {
  const groups: Record<string, Transaction[]> = {};

  for (const tx of transactions) {
    const label = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(tx.timestamp));

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(tx);
  }

  return groups;
}

/** Sort transactions by timestamp descending (newest first). */
export function sortTxsNewestFirst(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => b.timestamp - a.timestamp);
}

/** Group transactions by type. */
export function groupTxsByType(transactions: Transaction[]): Partial<Record<TxType, Transaction[]>> {
  const groups: Partial<Record<TxType, Transaction[]>> = {};
  for (const tx of transactions) {
    if (!groups[tx.type]) groups[tx.type] = [];
    groups[tx.type]!.push(tx);
  }
  return groups;
}

/** Compute aggregate stats across a list of transactions. */
export function computeTxStats(transactions: Transaction[]): {
  totalDeposited: number;
  totalWithdrawn: number;
  totalFees: number;
  confirmedCount: number;
  failedCount: number;
} {
  let totalDeposited = 0;
  let totalWithdrawn = 0;
  let totalFees = 0;
  let confirmedCount = 0;
  let failedCount = 0;

  for (const tx of transactions) {
    totalFees += tx.fee;
    if (tx.status === 'confirmed') confirmedCount++;
    if (tx.status === 'failed') failedCount++;
    if (tx.type === 'deposit' || tx.type === 'reward') totalDeposited += tx.amount;
    if (tx.type === 'withdrawal') totalWithdrawn += tx.amount;
  }

  return { totalDeposited, totalWithdrawn, totalFees, confirmedCount, failedCount };
}
