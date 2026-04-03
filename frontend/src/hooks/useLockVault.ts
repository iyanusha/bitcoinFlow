import { useState, useCallback } from 'react';
import type { LockStatus } from '../types/lock';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';

export interface UseLockVaultReturn {
  locking: boolean;
  error: string | null;
  txId: string | null;
  optimisticLockStatus: LockStatus | null;
  lockVault: (blocks: number, currentBlock: number) => Promise<void>;
}

export function useLockVault(): UseLockVaultReturn {
  const [locking, setLocking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);
  const [optimisticLockStatus, setOptimisticLockStatus] = useState<LockStatus | null>(null);

  const lockVault = useCallback(async (blocks: number, currentBlock: number) => {
    if (blocks < 144 || blocks > 52_560) {
      setError(`Invalid lock period: ${blocks} blocks. Must be between 144 and 52,560.`);
      return;
    }

    setLocking(true);
    setError(null);
    setTxId(null);

    try {
      const { openContractCall } = await import('@stacks/connect');
      const { uintCV, PostConditionMode } = await import('@stacks/transactions');

      await openContractCall({
        network,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'lock-vault',
        functionArgs: [uintCV(blocks)],
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          const submittedTxId = data.txId;
          setTxId(submittedTxId);
          setLocking(false);

          // Optimistic UI: assume the lock takes effect immediately
          setOptimisticLockStatus({
            isLocked: true,
            lockedUntilBlock: currentBlock + blocks,
            currentBlock,
            remainingBlocks: blocks,
          });
        },
        onCancel: () => {
          setLocking(false);
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit lock transaction';
      setError(message);
      setLocking(false);
    }
  }, []);

  return { locking, error, txId, optimisticLockStatus, lockVault };
}
