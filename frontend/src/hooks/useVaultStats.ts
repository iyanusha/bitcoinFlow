import { useState, useEffect, useCallback } from 'react';
import { cvToJSON, fetchCallReadOnlyFunction, principalCV } from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';
import { REFRESH_INTERVAL_MS } from '../lib/constants';
import { logger } from '../lib/logger';
import { parseClarityInt, parseClarityBool } from '../lib/contractParsers';
import { handleContractError } from '../lib/contractErrors';
import { withRetry } from '../lib/retry';
import type { VaultStats, VaultStatusResponse } from '../types';

const defaultStats: VaultStats = {
  totalDeposits: 0,
  totalRewards: 0,
  userBalance: 0,
  stxBalance: 0,
  depositCount: 0,
  withdrawCount: 0,
  isPaused: false,
  currentBlock: 0,
};

export function useVaultStats(userAddress: string | null) {
  const [stats, setStats] = useState<VaultStats>(defaultStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchStats = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);

    try {
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
      const statusValue = statusJson.value as VaultStatusResponse;

      let userBalance = 0;
      if (userAddress) {
        const balanceResult = await withRetry(() =>
          fetchCallReadOnlyFunction({
            contractAddress: CONTRACT_ADDRESS,
            contractName: CONTRACT_NAME,
            functionName: 'get-user-flow-balance',
            functionArgs: [principalCV(userAddress)],
            network,
            senderAddress: CONTRACT_ADDRESS,
          })
        );
        const balanceJson = cvToJSON(balanceResult);
        userBalance = parseClarityInt(balanceJson.value);
      }

      let tvl = 0;
      try {
        const tvlResult = await withRetry(() =>
          fetchCallReadOnlyFunction({
            contractAddress: CONTRACT_ADDRESS,
            contractName: CONTRACT_NAME,
            functionName: 'get-vault-tvl',
            functionArgs: [],
            network,
            senderAddress: CONTRACT_ADDRESS,
          })
        );
        const tvlJson = cvToJSON(tvlResult);
        tvl = parseClarityInt(tvlJson.value);
      } catch {
        // TVL fetch is optional — falls back to stx-balance
      }

      setStats({
        totalDeposits: parseClarityInt(statusValue['total-deposits'].value),
        totalRewards: parseClarityInt(statusValue['total-rewards'].value),
        userBalance,
        stxBalance: tvl || parseClarityInt(statusValue['stx-balance'].value),
        depositCount: parseClarityInt(statusValue['deposit-count'].value),
        withdrawCount: parseClarityInt(statusValue['withdraw-count'].value),
        isPaused: parseClarityBool(statusValue.paused.value),
        currentBlock: parseClarityInt(statusValue['current-block'].value),
      });
      setLastUpdated(Date.now());
      logger.debug('Vault stats fetched successfully');
    } catch (err) {
      const msg = handleContractError(err);
      logger.error('Failed to fetch vault stats', err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(() => fetchStats(true), REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchStats]);

  // Refresh when tab becomes visible again
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchStats(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [fetchStats]);

  return { stats, loading, error, lastUpdated, refresh: fetchStats };
}
