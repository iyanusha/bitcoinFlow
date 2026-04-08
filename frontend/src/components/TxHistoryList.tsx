import React from 'react';
import type { Transaction, TxFilter } from '../types/transaction';
import { groupTxsByDate } from '../lib/txUtils';
import { TxHistoryItem } from './TxHistoryItem';
import { TxFilterBar } from './TxFilterBar';

interface TxHistoryListProps {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  filter: TxFilter;
  onFilterChange: (f: TxFilter) => void;
  onLoadMore: () => void;
  pendingTxIds?: string[];
}

function SkeletonRow() {
  return (
    <div className="tx-item tx-item-skeleton" aria-hidden="true">
      <div className="price-skeleton" style={{ width: 64, height: 20 }} />
      <div className="price-skeleton" style={{ width: 100, height: 16, marginTop: 6 }} />
      <div className="price-skeleton" style={{ width: 80, height: 12, marginTop: 4 }} />
    </div>
  );
}

export function TxHistoryList({
  transactions,
  loading,
  error,
  hasMore,
  filter,
  onFilterChange,
  onLoadMore,
  pendingTxIds = [],
}: TxHistoryListProps) {
  const grouped = groupTxsByDate(transactions);
  const dateKeys = Object.keys(grouped);
  const isEmpty = transactions.length === 0 && !loading;

  return (
    <div className="tx-history-wrapper">
      <TxFilterBar filter={filter} onChange={onFilterChange} />

      {error && (
        <div className="tx-error-banner" role="alert">
          <span>Error loading transactions: {error}</span>
        </div>
      )}

      {loading && transactions.length === 0 && (
        <div className="tx-list" aria-label="Loading transactions" aria-busy="true">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      )}

      {pendingTxIds.length > 0 && (
        <div className="tx-pending-section">
          <p className="tx-date-group-header">Pending</p>
          {pendingTxIds.map(txId => (
            <div key={txId} className="tx-item tx-item-pending">
              <span className="tx-pending-dot" aria-hidden="true" />
              <code className="tx-pending-hash">{txId.slice(0, 10)}…</code>
              <span className="tx-pending-label">Awaiting confirmation</span>
            </div>
          ))}
        </div>
      )}

      {isEmpty && !error && (
        <div className="tx-empty-state" role="status">
          <p>No transactions found{filter.type ? ` for type "${filter.type}"` : ''}.</p>
        </div>
      )}

      <div className="tx-list" role="list" aria-label="Transaction history">
        {dateKeys.map(date => (
          <div key={date} className="tx-date-group">
            <div className="tx-date-group-header-wrapper" aria-label={`Transactions on ${date}`}>
              <p className="tx-date-group-header">{date}</p>
              <span className="tx-date-group-count">{grouped[date].length} tx{grouped[date].length !== 1 ? 's' : ''}</span>
            </div>
            {grouped[date].map(tx => (
              <TxHistoryItem key={tx.id} transaction={tx} />
            ))}
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <button
          type="button"
          className="tx-load-more-btn"
          onClick={onLoadMore}
          aria-label="Load more transactions"
        >
          Load more
        </button>
      )}

      {loading && transactions.length > 0 && (
        <p className="tx-loading-more" aria-live="polite" aria-busy="true">
          Loading more transactions…
        </p>
      )}
    </div>
  );
}
