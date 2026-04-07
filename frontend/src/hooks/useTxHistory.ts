import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Transaction, TxFilter } from '../types/transaction';
import { TxService } from '../services/txService';

const PAGE_SIZE = 20;

export interface UseTxHistoryReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  filter: TxFilter;
  setFilter: (f: TxFilter) => void;
  loadMore: () => void;
  refetch: () => void;
  pendingTxIds: string[];
  addPendingTx: (txId: string) => void;
}

function applyFilter(txs: Transaction[], filter: TxFilter): Transaction[] {
  return txs.filter(tx => {
    if (filter.type && tx.type !== filter.type) return false;
    if (filter.status && tx.status !== filter.status) return false;
    if (filter.dateFrom && tx.timestamp < filter.dateFrom) return false;
    if (filter.dateTo && tx.timestamp > filter.dateTo) return false;
    return true;
  });
}

export function useTxHistory(address: string): UseTxHistoryReturn {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<TxFilter>({});
  const [pendingTxIds, setPendingTxIds] = useState<string[]>([]);
  const prevFilterRef = useRef<TxFilter>({});

  const fetchPage = useCallback(async (pageOffset: number, replace: boolean) => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const page = await TxService.instance.fetchTxHistory(address, PAGE_SIZE, pageOffset);
      setAllTransactions(prev => replace ? page : [...prev, ...page]);
      setHasMore(page.length === PAGE_SIZE);
      setOffset(pageOffset + page.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    setAllTransactions([]);
    setOffset(0);
    setHasMore(true);
    fetchPage(0, true);
  }, [address, fetchPage]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) fetchPage(offset, false);
  }, [loading, hasMore, offset, fetchPage]);

  const refetch = useCallback(() => {
    setOffset(0);
    fetchPage(0, true);
  }, [fetchPage]);

  const addPendingTx = useCallback((txId: string) => {
    setPendingTxIds(prev => prev.includes(txId) ? prev : [txId, ...prev]);
  }, []);

  // Auto-remove pending tx once it appears confirmed in fetched data
  useEffect(() => {
    if (pendingTxIds.length === 0) return;
    const confirmedIds = new Set(
      allTransactions.filter(tx => tx.status === 'confirmed').map(tx => tx.txHash)
    );
    setPendingTxIds(prev => prev.filter(id => !confirmedIds.has(id)));
  }, [allTransactions, pendingTxIds.length]);

  const transactions = useMemo(() => applyFilter(allTransactions, filter), [allTransactions, filter]);

  // Expose a typed setFilter that also tracks the previous filter for diffing
  const updateFilter = useCallback((newFilter: TxFilter) => {
    prevFilterRef.current = filter;
    setFilter(newFilter);
  }, [filter]);

  return { transactions, loading, error, hasMore, filter, setFilter: updateFilter, loadMore, refetch, pendingTxIds, addPendingTx };
}
