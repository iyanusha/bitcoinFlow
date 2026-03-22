import { useState, useEffect, useCallback } from 'react';
import { cvToJSON, fetchCallReadOnlyFunction } from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';
import { REFRESH_INTERVAL_MS } from '../lib/constants';
import { logger } from '../lib/logger';
import { parseClarityInt } from '../lib/contractParsers';
import { withRetry } from '../lib/retry';
import type { ExchangeRate } from '../types';

export function useExchangeRate() {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({
    rate: 1_000_000,
    formattedRate: '1.000000',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await withRetry(() =>
        fetchCallReadOnlyFunction({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName: 'get-exchange-rate',
          functionArgs: [],
          network,
          senderAddress: CONTRACT_ADDRESS,
        })
      );

      const json = cvToJSON(result);
      const rate = parseClarityInt(json.value);

      setExchangeRate({
        rate,
        formattedRate: (rate / 1_000_000).toFixed(6),
      });
    } catch (err) {
      logger.warn('Failed to fetch exchange rate, keeping current value', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch exchange rate');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRate();
    const interval = setInterval(fetchRate, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchRate]);

  return { ...exchangeRate, loading, error, refresh: fetchRate };
}
