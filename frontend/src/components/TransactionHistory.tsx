import { useState, useMemo } from 'react';
import type { TransactionRecord, TransactionStatus } from '../types';
import { TransactionItem } from './TransactionItem';

type FilterType = 'all' | 'deposit' | 'withdraw';
type StatusFilter = 'all' | TransactionStatus;

interface TransactionHistoryProps {
  transactions: TransactionRecord[];
  onClear: () => void;
  pendingCount?: number;
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`tx-filter-btn ${active ? 'tx-filter-active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export function TransactionHistory({ transactions, onClear, pendingCount = 0 }: TransactionHistoryProps) {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
      if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
      return true;
    });
  }, [transactions, typeFilter, statusFilter]);

  if (transactions.length === 0) {
    return (
      <section className="tx-history" aria-labelledby="tx-history-heading">
        <h3 id="tx-history-heading">Transaction History</h3>
        <p className="tx-empty">No transactions yet. Make a deposit or withdrawal to get started.</p>
      </section>
    );
  }

  return (
    <section className="tx-history" aria-labelledby="tx-history-heading-full">
      <div className="tx-history-header">
        <h3 id="tx-history-heading-full">
          Transaction History{' '}
          <span className="tx-count">({transactions.length})</span>
          {pendingCount > 0 && (
            <span className="tx-pending-badge" aria-label={`${pendingCount} pending`}>
              {pendingCount} pending
            </span>
          )}
        </h3>
        <button
          className="tx-clear-btn"
          onClick={() => {
            if (window.confirm('Clear all transaction history?')) {
              onClear();
            }
          }}
          aria-label="Clear transaction history"
        >
          Clear
        </button>
      </div>

      <div className="tx-filters" role="toolbar" aria-label="Transaction filters">
        <div className="tx-filter-group">
          <FilterButton label="All" active={typeFilter === 'all'} onClick={() => setTypeFilter('all')} />
          <FilterButton label="Deposits" active={typeFilter === 'deposit'} onClick={() => setTypeFilter('deposit')} />
          <FilterButton label="Withdrawals" active={typeFilter === 'withdraw'} onClick={() => setTypeFilter('withdraw')} />
        </div>
        <div className="tx-filter-group">
          <FilterButton label="Any Status" active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} />
          <FilterButton label="Pending" active={statusFilter === 'pending'} onClick={() => setStatusFilter('pending')} />
          <FilterButton label="Confirmed" active={statusFilter === 'confirmed'} onClick={() => setStatusFilter('confirmed')} />
          <FilterButton label="Failed" active={statusFilter === 'failed'} onClick={() => setStatusFilter('failed')} />
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="tx-empty">No transactions match the selected filters.</p>
      ) : (
        <ul className="tx-list" aria-label="Transaction history">
          {filteredTransactions.map(tx => (
            <TransactionItem key={tx.txId} transaction={tx} />
          ))}
        </ul>
      )}
    </section>
  );
}
