import { useState, useCallback } from 'react';
import type { LockStatus } from '../types/lock';
import { canUnlock } from '../lib/lockUtils';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';

export interface UseUnlockVaultReturn {
  unlocking: boolean;
  error: string | null;
  txId: string | null;
  canUnlockNow: boolean;
  unlockVault: () => Promise<void>;
}

export function useUnlockVault(lockStatus: LockStatus | null): UseUnlockVaultReturn {
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);

  const canUnlockNow = lockStatus !== null && canUnlock(lockStatus);

  const unlockVault = useCallback(async () => {
    if (!canUnlockNow) {
      setError('Vault is not yet eligible for unlocking.');
      return;
    }

    setUnlocking(true);
    setError(null);
    setTxId(null);

    try {
      const { openContractCall } = await import('@stacks/connect');
      const { PostConditionMode } = await import('@stacks/transactions');

      await openContractCall({
        network,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'unlock-vault',
        functionArgs: [],
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          setTxId(data.txId);
          setUnlocking(false);
        },
        onCancel: () => {
          setUnlocking(false);
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit unlock transaction';
      setError(message);
      setUnlocking(false);
    }
  }, [canUnlockNow]);

  return { unlocking, error, txId, canUnlockNow, unlockVault };
}
