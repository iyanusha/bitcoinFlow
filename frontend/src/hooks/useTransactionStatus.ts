import { useCallback } from 'react';
import { API_URL } from '../lib/stacks';
import { logger } from '../lib/logger';
import type { TransactionStatus } from '../types';

export function useTransactionStatus() {
  const checkStatus = useCallback(async (txId: string): Promise<TransactionStatus> => {
    try {
      const res = await fetch(`${API_URL}/extended/v1/tx/${txId}`);
      if (!res.ok) return 'pending';

      const data = await res.json();
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
