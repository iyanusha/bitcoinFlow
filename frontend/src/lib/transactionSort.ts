import type { TransactionRecord } from '../types';

export type SortField = 'timestamp' | 'amount' | 'type' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

const STATUS_ORDER: Record<string, number> = {
  pending: 0,
  confirmed: 1,
  failed: 2,
};

function compare(a: TransactionRecord, b: TransactionRecord, field: SortField): number {
  switch (field) {
    case 'timestamp':
      return a.timestamp - b.timestamp;
    case 'amount':
      return a.amount - b.amount;
    case 'type':
      return a.type.localeCompare(b.type);
    case 'status':
      return (STATUS_ORDER[a.status] ?? 0) - (STATUS_ORDER[b.status] ?? 0);
  }
}

export function sortTransactions(
  transactions: TransactionRecord[],
  config: SortConfig
): TransactionRecord[] {
  const sorted = [...transactions].sort((a, b) => compare(a, b, config.field));
  return config.direction === 'desc' ? sorted.reverse() : sorted;
}

export const DEFAULT_SORT: SortConfig = {
  field: 'timestamp',
  direction: 'desc',
};

export function toggleDirection(direction: SortDirection): SortDirection {
  return direction === 'asc' ? 'desc' : 'asc';
}
