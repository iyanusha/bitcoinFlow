import { useState, useEffect, useCallback } from 'react';
import { cvToJSON, fetchCallReadOnlyFunction, principalCV } from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';
import { REFRESH_INTERVAL_MS } from '../lib/constants';
import type { VaultStats } from '../types';

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
      const statusResult = await fetchCallReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-vault-status',
        functionArgs: [],
        network,
        senderAddress: CONTRACT_ADDRESS,
      });

      const statusJson = cvToJSON(statusResult);
      const statusValue = statusJson.value;

      let userBalance = 0;
      if (userAddress) {
        const balanceResult = await fetchCallReadOnlyFunction({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName: 'get-user-flow-balance',
          functionArgs: [principalCV(userAddress)],
          network,
          senderAddress: CONTRACT_ADDRESS,
        });
        const balanceJson = cvToJSON(balanceResult);
        userBalance = parseInt(balanceJson.value, 10);
      }

      setStats({
        totalDeposits: parseInt(statusValue['total-deposits'].value, 10),
        totalRewards: parseInt(statusValue['total-rewards'].value, 10),
        userBalance,
        stxBalance: parseInt(statusValue['stx-balance'].value, 10),
        depositCount: parseInt(statusValue['deposit-count'].value, 10),
        withdrawCount: parseInt(statusValue['withdraw-count'].value, 10),
        isPaused: statusValue.paused.value,
        currentBlock: parseInt(statusValue['current-block'].value, 10),
      });
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vault stats');
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(() => fetchStats(true), REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return { stats, loading, error, lastUpdated, refresh: fetchStats };
}
