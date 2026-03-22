import type { TransactionRecord } from '../types';

export function searchTransactions(
  transactions: TransactionRecord[],
  query: string
): TransactionRecord[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return transactions;

  return transactions.filter(tx => {
    if (tx.txId.toLowerCase().includes(trimmed)) return true;
    if (tx.type.toLowerCase().includes(trimmed)) return true;
    if (tx.status.toLowerCase().includes(trimmed)) return true;
    return false;
  });
}

export function highlightMatch(text: string, query: string): { before: string; match: string; after: string } | null {
  if (!query) return null;
  const lower = text.toLowerCase();
  const index = lower.indexOf(query.toLowerCase());
  if (index === -1) return null;

  return {
    before: text.slice(0, index),
    match: text.slice(index, index + query.length),
    after: text.slice(index + query.length),
  };
}
