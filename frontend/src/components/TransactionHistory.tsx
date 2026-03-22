import { useState, useMemo } from 'react';
import type { TransactionRecord, TransactionStatus } from '../types';
import { TransactionItem } from './TransactionItem';
import { TransactionSummary } from './TransactionSummary';
import { EmptyTransactions } from './EmptyTransactions';
import { Pagination } from './Pagination';
import { usePagination } from '../hooks/usePagination';
import { exportTransactions } from '../lib/transactionExport';
import { getPresetDateRange, isWithinDateRange, DATE_RANGE_LABELS } from '../lib/dateRanges';
import type { DateRangePreset } from '../lib/dateRanges';
import { searchTransactions } from '../lib/transactionSearch';

type FilterType = 'all' | 'deposit' | 'withdraw';
type StatusFilter = 'all' | TransactionStatus;

const PAGE_SIZE = 10;

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

function PaginatedList({ transactions }: { transactions: TransactionRecord[] }) {
  const {
    pageItems,
    currentPage,
    totalPages,
    hasNext,
    hasPrev,
    nextPage,
    prevPage,
  } = usePagination(transactions, PAGE_SIZE);

  if (transactions.length === 0) {
    return <EmptyTransactions filtered />;
  }

  return (
    <>
      <ul className="tx-list" aria-label="Transaction history">
        {pageItems.map(tx => (
          <TransactionItem key={tx.txId} transaction={tx} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrev={hasPrev}
        onNext={nextPage}
        onPrev={prevPage}
      />
    </>
  );
}

export function TransactionHistory({ transactions, onClear, pendingCount = 0 }: TransactionHistoryProps) {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [datePreset, setDatePreset] = useState<DateRangePreset>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const hasActiveFilters = typeFilter !== 'all' || statusFilter !== 'all' || datePreset !== 'all' || searchQuery !== '';

  const resetFilters = () => {
    setTypeFilter('all');
    setStatusFilter('all');
    setDatePreset('all');
    setSearchQuery('');
  };

  const filteredTransactions = useMemo(() => {
    const dateRange = getPresetDateRange(datePreset);
    const filtered = transactions.filter(tx => {
      if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
      if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
      if (!isWithinDateRange(tx.timestamp, dateRange)) return false;
      return true;
    });
    return searchTransactions(filtered, searchQuery);
  }, [transactions, typeFilter, statusFilter, datePreset, searchQuery]);

  if (transactions.length === 0) {
    return (
      <section className="tx-history" aria-labelledby="tx-history-heading">
        <h3 id="tx-history-heading">Transaction History</h3>
        <EmptyTransactions />
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
        <div className="tx-header-actions">
          <button
            className="tx-export-btn"
            onClick={() => exportTransactions(transactions)}
            aria-label="Export transactions as CSV"
          >
            Export
          </button>
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
      </div>

      <TransactionSummary transactions={transactions} />

      <div className="tx-search">
        <input
          type="search"
          className="tx-search-input"
          placeholder="Search by TX ID, type, or status..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          aria-label="Search transactions"
        />
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
        <div className="tx-filter-group">
          {(['all', 'today', '7d', '30d', '90d'] as DateRangePreset[]).map(preset => (
            <FilterButton
              key={preset}
              label={DATE_RANGE_LABELS[preset]}
              active={datePreset === preset}
              onClick={() => setDatePreset(preset)}
            />
          ))}
        </div>
      </div>

      {filteredTransactions.length !== transactions.length && (
        <div className="tx-filter-status">
          <p className="tx-filter-count" aria-live="polite">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
          {hasActiveFilters && (
            <button
              className="tx-reset-filters-btn"
              onClick={resetFilters}
              aria-label="Reset all filters"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      <PaginatedList transactions={filteredTransactions} />
    </section>
  );
}
