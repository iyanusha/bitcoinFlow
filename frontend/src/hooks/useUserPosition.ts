import { useState, useEffect, useCallback } from 'react';
import { cvToJSON, fetchCallReadOnlyFunction, principalCV } from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';
import type { UserPosition, CooldownInfo, UserShareResponse } from '../types';

export function useUserPosition(userAddress: string | null) {
  const [position, setPosition] = useState<UserPosition | null>(null);
  const [cooldown, setCooldown] = useState<CooldownInfo>({ blocksRemaining: 0, isExpired: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchPosition = useCallback(async () => {
    if (!userAddress) {
      setPosition(null);
      return;
    }

    setLoading(true);
    try {
      const shareResult = await fetchCallReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-user-share',
        functionArgs: [principalCV(userAddress)],
        network,
        senderAddress: CONTRACT_ADDRESS,
      });

      const shareJson = cvToJSON(shareResult);
      const shareValue = shareJson.value as UserShareResponse;

      const cooldownResult = await fetchCallReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-cooldown-remaining',
        functionArgs: [principalCV(userAddress)],
        network,
        senderAddress: CONTRACT_ADDRESS,
      });

      const cooldownJson = cvToJSON(cooldownResult);
      const blocksRemaining = parseInt(cooldownJson.value, 10);

      setPosition({
        depositedAmount: parseInt(shareValue.deposited.value, 10),
        flowTokenBalance: parseInt(shareValue['flow-balance'].value, 10),
        pendingRewards: 0,
        lastDepositTime: null,
        sharePct: parseInt(shareValue['share-pct'].value, 10),
      });

      setCooldown({
        blocksRemaining,
        isExpired: blocksRemaining === 0,
      });
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch position');
      setPosition(null);
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  return { position, cooldown, loading, error, lastUpdated, refresh: fetchPosition };
}
