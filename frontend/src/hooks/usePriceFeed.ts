import { useState, useEffect, useCallback, useRef } from 'react';
import { PriceService } from '../services/priceService';
import type { PriceData } from '../types/price';

const POLL_INTERVAL_MS = 30_000;
const HISTORY_MAX_POINTS = 20;

export interface UsePriceFeedReturn {
  price: PriceData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  history: PriceData[];
  btcRate: number | null;
}

export function usePriceFeed(): UsePriceFeedReturn {
  const [price, setPrice] = useState<PriceData | null>(() => PriceService.instance.getCached());
  const [loading, setLoading] = useState<boolean>(price === null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<PriceData[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addToHistory = useCallback((data: PriceData) => {
    setHistory(prev => {
      const next = [...prev, data];
      return next.length > HISTORY_MAX_POINTS ? next.slice(next.length - HISTORY_MAX_POINTS) : next;
    });
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PriceService.instance.fetchCurrentPrice();
      setPrice(data);
      addToHistory(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch STX price';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [addToHistory]);

  // Poll every 30 seconds
  useEffect(() => {
    refresh();
    intervalRef.current = setInterval(refresh, POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refresh]);

  // Refresh on window focus
  useEffect(() => {
    const handleFocus = () => refresh();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refresh]);

  const btcRate = price?.btc ?? null;

  return { price, loading, error, refresh, history, btcRate };
}
