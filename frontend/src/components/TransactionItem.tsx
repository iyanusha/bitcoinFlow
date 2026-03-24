import type { TransactionRecord } from '../types';
import { getTxExplorerUrl } from '../lib/stacks';
import { formatBTC, formatTimeSince, formatDateFull, formatTxId } from '../lib/formatters';

interface TransactionItemProps {
  transaction: TransactionRecord;
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  failed: 'Failed',
};

const TYPE_ICONS: Record<string, string> = {
  deposit: '\u2193',  // ↓
  withdraw: '\u2191', // ↑
};

export function TransactionItem({ transaction: tx }: TransactionItemProps) {
  return (
    <li className="tx-item">
      <div className="tx-item-left">
        <span className={`tx-type-icon tx-type-icon-${tx.type}`} aria-hidden="true">
          {TYPE_ICONS[tx.type]}
        </span>
        <span className={`tx-type tx-type-${tx.type}`}>
          {tx.type === 'deposit' ? 'Deposit' : 'Withdraw'}
        </span>
        <span className="tx-amount">{formatBTC(tx.amount)} sBTC</span>
        <span className="tx-id" title={tx.txId}>{formatTxId(tx.txId)}</span>
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
