import type { TransactionRecord, TransactionSummaryStats, TransactionFilter } from '../types';

/**
 * Calculate summary statistics from transaction history.
 */
export function calculateTransactionStats(transactions: TransactionRecord[]): TransactionSummaryStats {
  let totalDeposits = 0;
  let totalWithdrawals = 0;
  let depositCount = 0;
  let withdrawCount = 0;
  let pendingCount = 0;
  let failedCount = 0;

  for (const tx of transactions) {
    if (tx.status === 'pending') pendingCount++;
    if (tx.status === 'failed') failedCount++;

    if (tx.type === 'deposit' && tx.status === 'confirmed') {
      totalDeposits += tx.amount;
      depositCount++;
    } else if (tx.type === 'withdraw' && tx.status === 'confirmed') {
      totalWithdrawals += tx.amount;
      withdrawCount++;
    }
  }

  return {
    totalDeposits,
    totalWithdrawals,
    depositCount,
    withdrawCount,
    pendingCount,
    failedCount,
    netFlow: totalDeposits - totalWithdrawals,
  };
}

/**
 * Filter transactions by type, status, and date range.
 */
export function filterTransactions(
  transactions: TransactionRecord[],
  filter: TransactionFilter
): TransactionRecord[] {
  return transactions.filter(tx => {
    if (filter.type && tx.type !== filter.type) return false;
    if (filter.status && tx.status !== filter.status) return false;
    if (filter.dateRange) {
      if (tx.timestamp < filter.dateRange.start) return false;
      if (tx.timestamp > filter.dateRange.end) return false;
    }
    return true;
  });
}

/**
 * Get the most recent transaction of a given type.
 */
export function getLatestTransaction(
  transactions: TransactionRecord[],
  type?: 'deposit' | 'withdraw'
): TransactionRecord | null {
  for (const tx of transactions) {
    if (!type || tx.type === type) return tx;
  }
  return null;
}

/**
 * Get all pending transaction IDs.
 */
export function getPendingTxIds(transactions: TransactionRecord[]): string[] {
  return transactions
    .filter(tx => tx.status === 'pending')
    .map(tx => tx.txId);
}
