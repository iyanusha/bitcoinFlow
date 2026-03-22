import type { TransactionRecord } from '../types';
import { getTxExplorerUrl } from '../lib/stacks';
import { formatBTC, formatTimeSince, formatDateFull } from '../lib/formatters';

interface TransactionItemProps {
  transaction: TransactionRecord;
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  failed: 'Failed',
};

export function TransactionItem({ transaction: tx }: TransactionItemProps) {
  return (
    <li className="tx-item">
      <div className="tx-item-left">
        <span className={`tx-type tx-type-${tx.type}`}>
          {tx.type === 'deposit' ? 'Deposit' : 'Withdraw'}
        </span>
        <span className="tx-amount">{formatBTC(tx.amount)} sBTC</span>
      </div>
      <div className="tx-item-right">
        <span
          className={`tx-status tx-status-${tx.status}`}
          role="status"
          aria-label={`Transaction status: ${STATUS_LABELS[tx.status]}`}
        >
          {STATUS_LABELS[tx.status]}
        </span>
        <span className="tx-time" title={formatDateFull(tx.timestamp)}>
          {formatTimeSince(tx.timestamp)}
        </span>
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
  );
}
