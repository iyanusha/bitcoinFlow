import { useEffect, useRef, useCallback } from 'react';
import { TX_POLL_INTERVAL_MS } from '../lib/constants';
import { logger } from '../lib/logger';
import type { TransactionStatus } from '../types';

interface UseTransactionPollerOptions {
  /** Transaction IDs to poll */
  pendingTxIds: string[];
  /** Function to check the status of a transaction */
  checkStatus: (txId: string) => Promise<TransactionStatus>;
  /** Callback when a transaction status changes */
  onStatusChange: (txId: string, status: TransactionStatus) => void;
  /** Whether polling is enabled */
  enabled?: boolean;
}

/**
 * Polls pending transaction statuses and calls back when they resolve.
 */
export function useTransactionPoller({
  pendingTxIds,
  checkStatus,
  onStatusChange,
  enabled = true,
}: UseTransactionPollerOptions) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingRef = useRef(pendingTxIds);
  pendingRef.current = pendingTxIds;

  const pollOnce = useCallback(async () => {
    const ids = pendingRef.current;
    if (ids.length === 0) return;

    logger.debug(`Polling ${ids.length} pending transactions`);

    for (const txId of ids) {
      try {
        const status = await checkStatus(txId);
        if (status !== 'pending') {
          logger.info(`Transaction ${txId.slice(0, 10)} resolved: ${status}`);
          onStatusChange(txId, status);
        }
      } catch {
        // Individual poll failure is non-fatal
      }
    }
  }, [checkStatus, onStatusChange]);

  useEffect(() => {
    if (!enabled || pendingTxIds.length === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Poll immediately on mount/change
    pollOnce();

    intervalRef.current = setInterval(pollOnce, TX_POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, pendingTxIds.length, pollOnce]);
}
