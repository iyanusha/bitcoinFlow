import { useTransactionHistory } from '../hooks/useTransactionHistory';
import { TransactionHistory } from './TransactionHistory';

export function TransactionDashboard() {
  const {
    transactions,
    clearHistory,
    pendingCount,
  } = useTransactionHistory();

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
