import React from 'react';
import type { LockAction } from '../types/lock';
import { blocksToReadable } from '../lib/lockUtils';
import { getTxExplorerUrl } from '../lib/stacks';

interface LockHistoryItemProps {
  action: LockAction;
}

export function LockHistoryItem({ action }: LockHistoryItemProps) {
  const isLock = action.type === 'lock';
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(action.timestamp));

  const truncatedTx = action.txId
    ? `${action.txId.slice(0, 8)}…${action.txId.slice(-4)}`
    : null;

  return (
    <div
      className={`lock-history-item lock-history-item--${isLock ? 'lock' : 'unlock'}`}
      aria-label={`${isLock ? 'Lock' : 'Unlock'} action on ${date}`}
    >
      <div className="lock-history-type-indicator" aria-hidden="true" />

      <div className="lock-history-content">
        <div className="lock-history-header">
          <span className={`lock-history-type-label lock-history-type-label--${isLock ? 'lock' : 'unlock'}`}>
            {isLock ? 'Locked' : 'Unlocked'}
          </span>
          <span className="lock-history-date">{date}</span>
        </div>

        {isLock && action.blocks && (
          <p className="lock-history-detail">
            Period: {blocksToReadable(action.blocks)} ({action.blocks.toLocaleString()} blocks)
          </p>
        )}

        {truncatedTx && (
          <div className="lock-history-tx">
            <span className="lock-history-tx-label">Tx:</span>
            <code className="lock-history-tx-hash">{truncatedTx}</code>
            {action.txId && (
              <a
                href={getTxExplorerUrl(action.txId)}
                target="_blank"
                rel="noopener noreferrer"
                className="lock-history-tx-link"
                aria-label={`View transaction ${truncatedTx} on explorer`}
              >
                ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
