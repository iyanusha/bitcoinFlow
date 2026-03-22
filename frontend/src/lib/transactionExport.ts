import type { TransactionRecord } from '../types';
import { formatBTC } from './formatters';

function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toISOString();
}

export function transactionsToCSV(transactions: TransactionRecord[]): string {
  const headers = ['Transaction ID', 'Type', 'Amount (BTC)', 'Status', 'Date'];
  const rows = transactions.map(tx => [
    escapeCSV(tx.txId),
    tx.type,
    formatBTC(tx.amount),
    tx.status,
    formatDate(tx.timestamp),
  ]);

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportTransactions(transactions: TransactionRecord[]): void {
  const csv = transactionsToCSV(transactions);
  const date = new Date().toISOString().slice(0, 10);
  downloadCSV(csv, `bitcoin-flow-transactions-${date}.csv`);
}
