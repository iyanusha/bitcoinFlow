import { useState, useEffect, useRef } from 'react';
import type { TransactionRecord } from '../types';

interface TransactionAnnouncerProps {
  transactions: TransactionRecord[];
}

export function TransactionAnnouncer({ transactions }: TransactionAnnouncerProps) {
  const [message, setMessage] = useState('');
  const prevTransactionsRef = useRef<TransactionRecord[]>(transactions);

  useEffect(() => {
    const prev = prevTransactionsRef.current;
    prevTransactionsRef.current = transactions;

    if (prev === transactions) return;

    for (const tx of transactions) {
      const prevTx = prev.find(p => p.txId === tx.txId);

      if (!prevTx) {
        const type = tx.type === 'deposit' ? 'Deposit' : 'Withdrawal';
        setMessage(`${type} transaction submitted`);
        return;
      }

      if (prevTx.status !== tx.status) {
        const type = tx.type === 'deposit' ? 'Deposit' : 'Withdrawal';
        const status = tx.status === 'confirmed' ? 'confirmed' : 'failed';
        setMessage(`${type} transaction ${status}`);
        return;
      }
    }
  }, [transactions]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}
