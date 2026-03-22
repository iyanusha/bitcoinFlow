import { describe, expect, it } from 'vitest';
import { sortTransactions, toggleDirection, DEFAULT_SORT } from '../transactionSort';
import type { TransactionRecord } from '../../types';

const now = Date.now();
const txs: TransactionRecord[] = [
  { txId: '0x1', type: 'deposit', amount: 100, status: 'confirmed', timestamp: now - 3000 },
  { txId: '0x2', type: 'withdraw', amount: 300, status: 'pending', timestamp: now - 1000 },
  { txId: '0x3', type: 'deposit', amount: 200, status: 'failed', timestamp: now - 2000 },
];

describe('sortTransactions', () => {
  it('sorts by timestamp ascending', () => {
    const sorted = sortTransactions(txs, { field: 'timestamp', direction: 'asc' });
    expect(sorted[0].txId).toBe('0x1');
    expect(sorted[2].txId).toBe('0x2');
  });

  it('sorts by timestamp descending', () => {
    const sorted = sortTransactions(txs, { field: 'timestamp', direction: 'desc' });
    expect(sorted[0].txId).toBe('0x2');
    expect(sorted[2].txId).toBe('0x1');
  });

  it('sorts by amount ascending', () => {
    const sorted = sortTransactions(txs, { field: 'amount', direction: 'asc' });
    expect(sorted[0].amount).toBe(100);
    expect(sorted[2].amount).toBe(300);
  });

  it('sorts by amount descending', () => {
    const sorted = sortTransactions(txs, { field: 'amount', direction: 'desc' });
    expect(sorted[0].amount).toBe(300);
    expect(sorted[2].amount).toBe(100);
  });

  it('sorts by type ascending', () => {
    const sorted = sortTransactions(txs, { field: 'type', direction: 'asc' });
    expect(sorted[0].type).toBe('deposit');
    expect(sorted[2].type).toBe('withdraw');
  });

  it('sorts by status ascending (pending first)', () => {
    const sorted = sortTransactions(txs, { field: 'status', direction: 'asc' });
    expect(sorted[0].status).toBe('pending');
    expect(sorted[2].status).toBe('failed');
  });

  it('does not mutate the original array', () => {
    const original = [...txs];
    sortTransactions(txs, { field: 'amount', direction: 'asc' });
    expect(txs).toEqual(original);
  });
});

describe('toggleDirection', () => {
  it('toggles asc to desc', () => {
    expect(toggleDirection('asc')).toBe('desc');
  });

  it('toggles desc to asc', () => {
    expect(toggleDirection('desc')).toBe('asc');
  });
});

describe('DEFAULT_SORT', () => {
  it('defaults to timestamp descending', () => {
    expect(DEFAULT_SORT.field).toBe('timestamp');
    expect(DEFAULT_SORT.direction).toBe('desc');
  });
});
