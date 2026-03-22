import { useCallback, useMemo } from 'react';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import { useTransactionPoller } from '../hooks/useTransactionPoller';
import { useTransactionStatus } from '../hooks/useTransactionStatus';
import { TransactionHistory } from './TransactionHistory';

export function TransactionDashboard() {
  const {
    transactions,
    updateStatus,
    clearHistory,
    pendingCount,
    hasPending,
  } = useTransactionHistory();

  const { checkStatus } = useTransactionStatus();

  const pendingTxIds = useMemo(
    () => transactions.filter(tx => tx.status === 'pending').map(tx => tx.txId),
    [transactions]
  );

  const onStatusChange = useCallback(
    (txId: string, status: 'confirmed' | 'failed' | 'pending') => {
      updateStatus(txId, status);
    },
    [updateStatus]
  );

  useTransactionPoller({
    pendingTxIds,
    checkStatus,
    onStatusChange,
    enabled: hasPending,
  });

  return (
    <div className="tx-dashboard">
      <TransactionHistory
        transactions={transactions}
        onClear={clearHistory}
        pendingCount={pendingCount}
      />
    </div>
  );
}
