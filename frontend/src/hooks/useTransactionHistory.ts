import { useState, useCallback, useMemo } from 'react';
import type { TransactionRecord, TransactionStatus } from '../types';
import { MAX_TX_HISTORY } from '../lib/constants';
import { logger } from '../lib/logger';

const STORAGE_KEY = 'bf-tx-history';

function loadHistory(): TransactionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as TransactionRecord[];
    if (!Array.isArray(parsed)) {
      logger.warn('Transaction history is not an array, resetting');
      return [];
    }
    return parsed;
  } catch (err) {
    logger.warn('Failed to load transaction history', err);
    return [];
  }
}

function saveHistory(records: TransactionRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, MAX_TX_HISTORY)));
  } catch (err) {
    logger.warn('Failed to save transaction history', err);
  }
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
      const next = [record, ...prev].slice(0, MAX_TX_HISTORY);
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
