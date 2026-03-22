import { describe, expect, it } from 'vitest';
import { searchTransactions, highlightMatch } from '../transactionSearch';
import type { TransactionRecord } from '../../types';

const now = Date.now();
const txs: TransactionRecord[] = [
  { txId: '0xabc123', type: 'deposit', amount: 100, status: 'confirmed', timestamp: now },
  { txId: '0xdef456', type: 'withdraw', amount: 200, status: 'pending', timestamp: now },
  { txId: '0xghi789', type: 'deposit', amount: 300, status: 'failed', timestamp: now },
];

describe('searchTransactions', () => {
  it('returns all transactions for empty query', () => {
    expect(searchTransactions(txs, '')).toEqual(txs);
    expect(searchTransactions(txs, '  ')).toEqual(txs);
  });

  it('filters by txId', () => {
    const result = searchTransactions(txs, 'abc');
    expect(result).toHaveLength(1);
    expect(result[0].txId).toBe('0xabc123');
  });

  it('filters by type', () => {
    const result = searchTransactions(txs, 'deposit');
    expect(result).toHaveLength(2);
  });

  it('filters by status', () => {
    const result = searchTransactions(txs, 'pending');
    expect(result).toHaveLength(1);
    expect(result[0].txId).toBe('0xdef456');
  });

  it('is case insensitive', () => {
    const result = searchTransactions(txs, 'ABC');
    expect(result).toHaveLength(1);
  });

  it('returns empty for no matches', () => {
    expect(searchTransactions(txs, 'zzz')).toHaveLength(0);
  });
});

describe('highlightMatch', () => {
  it('returns null for empty query', () => {
    expect(highlightMatch('hello', '')).toBeNull();
  });

  it('returns null for no match', () => {
    expect(highlightMatch('hello', 'xyz')).toBeNull();
  });

  it('splits text around match', () => {
    const result = highlightMatch('hello world', 'world');
    expect(result).toEqual({ before: 'hello ', match: 'world', after: '' });
  });

  it('handles case insensitive matching', () => {
    const result = highlightMatch('Hello World', 'hello');
    expect(result).toEqual({ before: '', match: 'Hello', after: ' World' });
  });

  it('handles match at beginning', () => {
    const result = highlightMatch('abc123', 'abc');
    expect(result).toEqual({ before: '', match: 'abc', after: '123' });
  });

  it('handles match in middle', () => {
    const result = highlightMatch('xxabcxx', 'abc');
    expect(result).toEqual({ before: 'xx', match: 'abc', after: 'xx' });
  });
});
