import React from 'react';

interface TxStatusDotProps {
  status: 'confirmed' | 'pending' | 'failed';
}

export function TxStatusDot({ status }: TxStatusDotProps) {
  if (status === 'confirmed') {
    return (
      <span
        className="tx-status-dot tx-status-confirmed"
        aria-label="Confirmed"
        title="Transaction confirmed"
        role="img"
      />
    );
  }

  if (status === 'pending') {
    return (
      <span
        className="tx-status-dot tx-status-pending"
        aria-label="Pending"
        title="Transaction pending"
        role="img"
      />
    );
  }

  // failed
  return (
    <span
      className="tx-status-failed"
      aria-label="Failed"
      title="Transaction failed"
      role="img"
    >
      ✕
    </span>
  );
}
