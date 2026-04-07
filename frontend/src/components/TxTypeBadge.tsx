import React from 'react';
import type { TxType } from '../types/transaction';
import { getTxTypeLabel } from '../lib/txUtils';

interface TxTypeBadgeProps {
  type: TxType;
}

const colorMap: Record<TxType, string> = {
  deposit:    'tx-type-deposit',
  withdrawal: 'tx-type-withdrawal',
  lock:       'tx-type-lock',
  unlock:     'tx-type-unlock',
  reward:     'tx-type-reward',
};

export function TxTypeBadge({ type }: TxTypeBadgeProps) {
  const colorClass = colorMap[type] ?? 'tx-type-default';
  const label = getTxTypeLabel(type);

  return (
    <span
      className={`tx-type-badge ${colorClass}`}
      aria-label={`Transaction type: ${label}`}
    >
      {label}
    </span>
  );
}
