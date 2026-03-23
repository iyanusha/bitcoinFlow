import type { TransactionRecord } from '../types';
import { getTxExplorerUrl } from '../lib/stacks';
import { formatBTC } from '../lib/formatters';

interface TransactionHistoryProps {
  transactions: TransactionRecord[];
  onClear: () => void;
}

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function StatusBadge({ status }: { status: TransactionRecord['status'] }) {
  const labels: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    failed: 'Failed',
  };
  return (
    <span
      className={`tx-status tx-status-${status}`}
      role="status"
      aria-label={`Transaction status: ${labels[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export function TransactionHistory({ transactions, onClear }: TransactionHistoryProps) {
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
        <h3 id="tx-history-heading-full">Transaction History <span className="tx-count">({transactions.length})</span></h3>
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
      <ul className="tx-list" aria-label="Transaction history">
        {transactions.map(tx => (
          <li key={tx.txId} className="tx-item">
            <div className="tx-item-left">
              <span className={`tx-type tx-type-${tx.type}`}>
                {tx.type === 'deposit' ? 'Deposit' : 'Withdraw'}
              </span>
              <span className="tx-amount">{formatBTC(tx.amount)} sBTC</span>
            </div>
            <div className="tx-item-right">
              <StatusBadge status={tx.status} />
              <span className="tx-time">{formatTimeAgo(tx.timestamp)}</span>
              <a
                href={getTxExplorerUrl(tx.txId)}
                target="_blank"
                rel="noopener noreferrer"
                className="tx-explorer-link"
                aria-label={`View transaction ${tx.txId.slice(0, 8)} in explorer`}
              >
                View
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
