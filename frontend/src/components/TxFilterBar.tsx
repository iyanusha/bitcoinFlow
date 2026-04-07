import React from 'react';
import type { TxFilter, TxType } from '../types/transaction';

interface TxFilterBarProps {
  filter: TxFilter;
  onChange: (f: TxFilter) => void;
}

const TX_TYPES: { value: TxType | ''; label: string }[] = [
  { value: '', label: 'All types' },
  { value: 'deposit', label: 'Deposit' },
  { value: 'withdrawal', label: 'Withdrawal' },
  { value: 'lock', label: 'Lock' },
  { value: 'unlock', label: 'Unlock' },
  { value: 'reward', label: 'Reward' },
];

const STATUSES = [
  { value: '', label: 'All statuses' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
];

export function TxFilterBar({ filter, onChange }: TxFilterBarProps) {
  const hasFilters = !!(filter.type || filter.status || filter.dateFrom || filter.dateTo);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as TxType | '';
    onChange({ ...filter, type: val || undefined });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as 'confirmed' | 'pending' | 'failed' | '';
    onChange({ ...filter, status: val || undefined });
  };

  const handleDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? new Date(e.target.value).getTime() : undefined;
    onChange({ ...filter, dateFrom: val });
  };

  const handleDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? new Date(e.target.value).getTime() + 86_399_999 : undefined;
    onChange({ ...filter, dateTo: val });
  };

  const clearFilters = () => onChange({});

  const toDateInputValue = (ms: number | undefined): string => {
    if (!ms) return '';
    return new Date(ms).toISOString().split('T')[0];
  };

  return (
    <div className="tx-filter-bar" role="search" aria-label="Filter transactions">
      <select
        value={filter.type ?? ''}
        onChange={handleTypeChange}
        className="tx-filter-select"
        aria-label="Filter by transaction type"
      >
        {TX_TYPES.map(t => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      <select
        value={filter.status ?? ''}
        onChange={handleStatusChange}
        className="tx-filter-select"
        aria-label="Filter by status"
      >
        {STATUSES.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <input
        type="date"
        value={toDateInputValue(filter.dateFrom)}
        onChange={handleDateFrom}
        className="tx-filter-date"
        aria-label="Filter from date"
        max={toDateInputValue(filter.dateTo) || undefined}
      />

      <input
        type="date"
        value={toDateInputValue(filter.dateTo)}
        onChange={handleDateTo}
        className="tx-filter-date"
        aria-label="Filter to date"
        min={toDateInputValue(filter.dateFrom) || undefined}
      />

      {hasFilters && (
        <button
          type="button"
          className="tx-filter-clear"
          onClick={clearFilters}
          aria-label="Clear all filters"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
