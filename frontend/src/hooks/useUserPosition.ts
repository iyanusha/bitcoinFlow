import { useState, useEffect, useCallback } from 'react';
import { cvToJSON, fetchCallReadOnlyFunction, principalCV } from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';
import { logger } from '../lib/logger';
import { parseClarityInt } from '../lib/contractParsers';
import { withRetry } from '../lib/retry';
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
      const shareResult = await withRetry(() =>
        fetchCallReadOnlyFunction({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName: 'get-user-share',
          functionArgs: [principalCV(userAddress)],
          network,
          senderAddress: CONTRACT_ADDRESS,
        })
      );

      const shareJson = cvToJSON(shareResult);
      const shareValue = shareJson.value as UserShareResponse;

      const cooldownResult = await withRetry(() =>
        fetchCallReadOnlyFunction({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName: 'get-cooldown-remaining',
          functionArgs: [principalCV(userAddress)],
          network,
          senderAddress: CONTRACT_ADDRESS,
        })
      );

      const cooldownJson = cvToJSON(cooldownResult);
      const blocksRemaining = parseClarityInt(cooldownJson.value);

      setPosition({
        depositedAmount: parseClarityInt(shareValue.deposited.value),
        flowTokenBalance: parseClarityInt(shareValue['flow-balance'].value),
        pendingRewards: 0,
        lastDepositTime: null,
        sharePct: parseClarityInt(shareValue['share-pct'].value),
      });

      setCooldown({
        blocksRemaining,
        isExpired: blocksRemaining === 0,
      });
      setLastUpdated(Date.now());
      logger.debug('User position fetched successfully', { address: userAddress });
    } catch (err) {
      logger.error('Failed to fetch user position', err);
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
