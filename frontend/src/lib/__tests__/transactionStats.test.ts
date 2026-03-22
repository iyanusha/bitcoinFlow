import { describe, expect, it } from 'vitest';
import {
  calculateTransactionStats,
  filterTransactions,
  getLatestTransaction,
  getPendingTxIds,
} from '../transactionStats';
import type { TransactionRecord } from '../../types';

const mockTxs: TransactionRecord[] = [
  { txId: '0x1', type: 'deposit', amount: 100_000_000, status: 'confirmed', timestamp: 1000 },
  { txId: '0x2', type: 'deposit', amount: 50_000_000, status: 'confirmed', timestamp: 2000 },
  { txId: '0x3', type: 'withdraw', amount: 30_000_000, status: 'confirmed', timestamp: 3000 },
  { txId: '0x4', type: 'deposit', amount: 20_000_000, status: 'pending', timestamp: 4000 },
  { txId: '0x5', type: 'withdraw', amount: 10_000_000, status: 'failed', timestamp: 5000 },
];

describe('calculateTransactionStats', () => {
  it('calculates totals from confirmed transactions only', () => {
    const stats = calculateTransactionStats(mockTxs);
    expect(stats.totalDeposits).toBe(150_000_000);
    expect(stats.totalWithdrawals).toBe(30_000_000);
    expect(stats.depositCount).toBe(2);
    expect(stats.withdrawCount).toBe(1);
  });

  it('counts pending and failed', () => {
    const stats = calculateTransactionStats(mockTxs);
    expect(stats.pendingCount).toBe(1);
    expect(stats.failedCount).toBe(1);
  });

  it('calculates net flow', () => {
    const stats = calculateTransactionStats(mockTxs);
    expect(stats.netFlow).toBe(120_000_000);
  });

  it('returns zeros for empty array', () => {
    const stats = calculateTransactionStats([]);
    expect(stats.totalDeposits).toBe(0);
    expect(stats.totalWithdrawals).toBe(0);
    expect(stats.netFlow).toBe(0);
  });
});

describe('filterTransactions', () => {
  it('filters by type', () => {
    const deposits = filterTransactions(mockTxs, { type: 'deposit' });
    expect(deposits).toHaveLength(3);
    expect(deposits.every(tx => tx.type === 'deposit')).toBe(true);
  });

  it('filters by status', () => {
    const confirmed = filterTransactions(mockTxs, { status: 'confirmed' });
    expect(confirmed).toHaveLength(3);
  });

  it('filters by type and status', () => {
    const confirmedDeposits = filterTransactions(mockTxs, { type: 'deposit', status: 'confirmed' });
    expect(confirmedDeposits).toHaveLength(2);
  });

  it('filters by date range', () => {
    const filtered = filterTransactions(mockTxs, { dateRange: { start: 2000, end: 4000 } });
    expect(filtered).toHaveLength(3);
  });

  it('returns all when filter is empty', () => {
    const result = filterTransactions(mockTxs, {});
    expect(result).toHaveLength(5);
  });
});

describe('getLatestTransaction', () => {
  it('returns first transaction without type filter', () => {
    const latest = getLatestTransaction(mockTxs);
    expect(latest?.txId).toBe('0x1');
  });

  it('returns first deposit', () => {
    const latest = getLatestTransaction(mockTxs, 'deposit');
    expect(latest?.txId).toBe('0x1');
  });

  it('returns first withdrawal', () => {
    const latest = getLatestTransaction(mockTxs, 'withdraw');
    expect(latest?.txId).toBe('0x3');
  });

  it('returns null for empty array', () => {
    expect(getLatestTransaction([])).toBeNull();
  });
});

describe('getPendingTxIds', () => {
  it('returns pending transaction IDs', () => {
    const ids = getPendingTxIds(mockTxs);
    expect(ids).toEqual(['0x4']);
  });

  it('returns empty for no pending', () => {
    const confirmed = mockTxs.filter(tx => tx.status === 'confirmed');
    expect(getPendingTxIds(confirmed)).toEqual([]);
  });
});
