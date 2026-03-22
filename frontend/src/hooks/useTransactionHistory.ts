import { useState, useCallback } from 'react';
import type { TransactionRecord, TransactionStatus } from '../types';

const STORAGE_KEY = 'bf-tx-history';
const MAX_HISTORY = 50;

function loadHistory(): TransactionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as TransactionRecord[];
  } catch {
    return [];
  }
}

function saveHistory(records: TransactionRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, MAX_HISTORY)));
}

export function useTransactionHistory() {
  const [transactions, setTransactions] = useState<TransactionRecord[]>(loadHistory);

  const addTransaction = useCallback((tx: Omit<TransactionRecord, 'timestamp' | 'status'>) => {
    const record: TransactionRecord = {
      ...tx,
      status: 'pending',
      timestamp: Date.now(),
    };
    setTransactions(prev => {
      const next = [record, ...prev].slice(0, MAX_HISTORY);
      saveHistory(next);
      return next;
    });
    return record;
  }, []);

  const updateStatus = useCallback((txId: string, status: TransactionStatus) => {
    setTransactions(prev => {
      const next = prev.map(tx => tx.txId === txId ? { ...tx, status } : tx);
      saveHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setTransactions([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { transactions, addTransaction, updateStatus, clearHistory };
}
