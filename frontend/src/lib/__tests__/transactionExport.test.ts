import { describe, expect, it } from 'vitest';
import { transactionsToCSV } from '../transactionExport';
import type { TransactionRecord } from '../../types';

const mockTx: TransactionRecord = {
  txId: '0x1234567890abcdef',
  type: 'deposit',
  amount: 150_000_000,
  status: 'confirmed',
  timestamp: new Date('2026-03-22T12:00:00Z').getTime(),
};

describe('transactionsToCSV', () => {
  it('generates CSV header row', () => {
    const csv = transactionsToCSV([]);
    expect(csv).toBe('Transaction ID,Type,Amount (BTC),Status,Date');
  });

  it('formats a single transaction row', () => {
    const csv = transactionsToCSV([mockTx]);
    const lines = csv.split('\n');
    expect(lines).toHaveLength(2);
    expect(lines[1]).toContain('0x1234567890abcdef');
    expect(lines[1]).toContain('deposit');
    expect(lines[1]).toContain('1.5');
    expect(lines[1]).toContain('confirmed');
  });

  it('formats multiple transactions', () => {
    const txs: TransactionRecord[] = [
      mockTx,
      { ...mockTx, txId: '0xabcdef', type: 'withdraw', amount: 50_000_000, status: 'pending' },
    ];
    const csv = transactionsToCSV(txs);
    const lines = csv.split('\n');
    expect(lines).toHaveLength(3);
  });

  it('escapes commas in transaction IDs', () => {
    const txWithComma = { ...mockTx, txId: 'tx,with,commas' };
    const csv = transactionsToCSV([txWithComma]);
    expect(csv).toContain('"tx,with,commas"');
  });

  it('escapes quotes in transaction IDs', () => {
    const txWithQuote = { ...mockTx, txId: 'tx"id' };
    const csv = transactionsToCSV([txWithQuote]);
    expect(csv).toContain('"tx""id"');
  });

  it('includes ISO date format', () => {
    const csv = transactionsToCSV([mockTx]);
    expect(csv).toContain('2026-03-22T12:00:00.000Z');
  });
});
