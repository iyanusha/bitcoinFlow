import { useMemo } from 'react';
import type { TransactionRecord } from '../types';
import { formatBTC } from '../lib/formatters';

interface TransactionSummaryProps {
  transactions: TransactionRecord[];
}

interface SummaryStats {
  totalDeposits: number;
  totalWithdrawals: number;
  depositCount: number;
  withdrawCount: number;
  pendingCount: number;
  failedCount: number;
  netFlow: number;
}

function calculateStats(transactions: TransactionRecord[]): SummaryStats {
  let totalDeposits = 0;
  let totalWithdrawals = 0;
  let depositCount = 0;
  let withdrawCount = 0;
  let pendingCount = 0;
  let failedCount = 0;

  for (const tx of transactions) {
    if (tx.status === 'pending') pendingCount++;
    if (tx.status === 'failed') failedCount++;

    if (tx.type === 'deposit' && tx.status === 'confirmed') {
      totalDeposits += tx.amount;
      depositCount++;
    } else if (tx.type === 'withdraw' && tx.status === 'confirmed') {
      totalWithdrawals += tx.amount;
      withdrawCount++;
    }
  }

  return {
    totalDeposits,
    totalWithdrawals,
    depositCount,
    withdrawCount,
    pendingCount,
    failedCount,
    netFlow: totalDeposits - totalWithdrawals,
  };
}

export function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const stats = useMemo(() => calculateStats(transactions), [transactions]);

  if (transactions.length === 0) return null;

  return (
    <div className="tx-summary" role="region" aria-label="Transaction summary">
      <div className="tx-summary-grid">
        <div className="tx-summary-item">
          <span className="tx-summary-label">Total Deposited</span>
          <span className="tx-summary-value tx-summary-deposit">
            {formatBTC(stats.totalDeposits)} sBTC
          </span>
          <span className="tx-summary-count">{stats.depositCount} transactions</span>
        </div>
        <div className="tx-summary-item">
          <span className="tx-summary-label">Total Withdrawn</span>
          <span className="tx-summary-value tx-summary-withdraw">
            {formatBTC(stats.totalWithdrawals)} sBTC
          </span>
          <span className="tx-summary-count">{stats.withdrawCount} transactions</span>
        </div>
        <div className="tx-summary-item">
          <span className="tx-summary-label">Net Flow</span>
          <span className={`tx-summary-value ${stats.netFlow >= 0 ? 'tx-summary-positive' : 'tx-summary-negative'}`}>
            {stats.netFlow >= 0 ? '+' : ''}{formatBTC(stats.netFlow)} sBTC
          </span>
        </div>
        {stats.pendingCount > 0 && (
          <div className="tx-summary-item">
            <span className="tx-summary-label">Pending</span>
            <span className="tx-summary-value tx-summary-pending">
              {stats.pendingCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
