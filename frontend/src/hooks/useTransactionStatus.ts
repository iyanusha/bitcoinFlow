import { useCallback } from 'react';
import { API_URL } from '../lib/stacks';
import { logger } from '../lib/logger';
import { withRetry } from '../lib/retry';
import type { TransactionStatus, HiroTxResponse } from '../types';

export function useTransactionStatus() {
  const checkStatus = useCallback(async (txId: string): Promise<TransactionStatus> => {
    try {
      const res = await withRetry(
        () => fetch(`${API_URL}/extended/v1/tx/${txId}`),
        { maxRetries: 2, baseDelayMs: 500 }
      );
      if (!res.ok) return 'pending';

      const data = (await res.json()) as HiroTxResponse;
      const status = data.tx_status;

      if (status === 'success') return 'confirmed';
      if (status === 'abort_by_response' || status === 'abort_by_post_condition') return 'failed';
      return 'pending';
    } catch (err) {
      logger.warn('Failed to check tx status', err);
      return 'pending';
    }
  }, []);

  return { checkStatus };
}
