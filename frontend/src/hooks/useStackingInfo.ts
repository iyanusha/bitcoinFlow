import { useState, useEffect, useCallback } from 'react';
import { cvToJSON, fetchCallReadOnlyFunction } from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';
import { REFRESH_INTERVAL_MS } from '../lib/constants';
import { logger } from '../lib/logger';
import { parseClarityInt, parseClarityBool } from '../lib/contractParsers';
import { handleContractError } from '../lib/contractErrors';
import { withRetry } from '../lib/retry';
import type { StackingInfo } from '../types';

const defaultInfo: StackingInfo = {
  delegationPool: null,
  lastCompoundCycle: 0,
  isVaultPaused: false,
  currentBlockHeight: 0,
};

export function useStackingInfo() {
  const [info, setInfo] = useState<StackingInfo>(defaultInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInfo = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const poolResult = await withRetry(() =>
        fetchCallReadOnlyFunction({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName: 'get-delegation-pool',
          functionArgs: [],
          network,
          senderAddress: CONTRACT_ADDRESS,
        })
      );

      const poolJson = cvToJSON(poolResult);

      const statusResult = await withRetry(() =>
        fetchCallReadOnlyFunction({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName: 'get-vault-status',
          functionArgs: [],
          network,
          senderAddress: CONTRACT_ADDRESS,
        })
      );

      const statusJson = cvToJSON(statusResult);
      const statusValue = statusJson.value;

      setInfo({
        delegationPool: poolJson.value?.value ?? null,
        lastCompoundCycle: 0,
        isVaultPaused: parseClarityBool(statusValue?.paused?.value),
        currentBlockHeight: parseClarityInt(statusValue?.['current-block']?.value),
      });

      logger.debug('Stacking info fetched successfully');
    } catch (err) {
      const msg = handleContractError(err);
      logger.error('Failed to fetch stacking info', err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInfo();
    const interval = setInterval(fetchInfo, REFRESH_INTERVAL_MS * 2);
    return () => clearInterval(interval);
  }, [fetchInfo]);

  return { info, loading, error, refresh: fetchInfo };
}
