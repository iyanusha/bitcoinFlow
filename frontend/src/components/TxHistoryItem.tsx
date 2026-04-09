import React, { useState } from 'react';
import type { Transaction } from '../types/transaction';
import { formatTxHash, getTxTypeLabel, getExplorerUrl, formatFee } from '../lib/txUtils';
import { microSTXtoSTX } from '../lib/priceUtils';
import { TxTypeBadge } from './TxTypeBadge';
import { TxStatusDot } from './TxStatusDot';

interface TxHistoryItemProps {
  transaction: Transaction;
  usdPrice?: number;
}

export function TxHistoryItem({ transaction: tx, usdPrice }: TxHistoryItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tx.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  const isCredit = tx.type === 'deposit' || tx.type === 'reward' || tx.type === 'unlock';
  const amountSTX = microSTXtoSTX(tx.amount);
  const amountPrefix = isCredit ? '+' : '-';
  const amountColor = isCredit ? 'tx-amount-credit' : 'tx-amount-debit';
  const usdEquiv = usdPrice ? (amountSTX * usdPrice).toFixed(2) : null;

  const timeStr = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(tx.timestamp));

  return (
    <div
      className="tx-item"
      role="listitem"
      aria-label={`${getTxTypeLabel(tx.type)} of ${amountSTX.toFixed(6)} STX — ${tx.status}`}
    >
      <div className="tx-item-left">
        <TxStatusDot status={tx.status} />
        <TxTypeBadge type={tx.type} />
      </div>

      <div className="tx-item-center">
        <div className="tx-item-hash-row">
          <code className="tx-hash">{formatTxHash(tx.txHash)}</code>
          <button
            type="button"
            className="tx-copy-btn"
            onClick={handleCopy}
            aria-label={copied ? 'Copied!' : `Copy transaction hash ${formatTxHash(tx.txHash)}`}
            title={copied ? 'Copied!' : 'Copy hash'}
          >
            {copied ? '✓' : '⎘'}
          </button>
          <a
            href={getExplorerUrl(tx.txHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="tx-explorer-link"
            aria-label="View on block explorer"
          >
            ↗
          </a>
        </div>
        <div className="tx-item-meta">
          <span className="tx-fee">{formatFee(tx.fee)}</span>
          <span className="tx-time">{timeStr}</span>
          {tx.blockHeight > 0 && (
            <span className="tx-block">Block {tx.blockHeight.toLocaleString()}</span>
          )}
        </div>
      </div>

      <div className="tx-item-right">
        <span className={`tx-amount ${amountColor}`} aria-label={`Amount: ${amountPrefix}${amountSTX.toFixed(6)} STX`}>
          <span className="tx-amount-prefix" aria-hidden="true">{amountPrefix}</span>
          {amountSTX.toFixed(6)}
          <span className="tx-amount-unit"> STX</span>
        </span>
        {usdEquiv && (
          <span className="tx-amount-usd" aria-label={`USD equivalent: approximately $${usdEquiv}`}>
            ≈ ${usdEquiv}
          </span>
        )}
      </div>
    </div>
  );
}
