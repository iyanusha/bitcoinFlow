import { useState, useCallback } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';

export interface UseLockVaultReturn {
  locking: boolean;
  error: string | null;
  txId: string | null;
  lockVault: (blocks: number) => Promise<void>;
}

export function useLockVault(): UseLockVaultReturn {
  const [locking, setLocking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);

  const lockVault = useCallback(async (blocks: number) => {
    if (blocks < 144 || blocks > 52_560) {
      setError(`Invalid lock period: ${blocks} blocks. Must be between 144 and 52,560.`);
      return;
    }

    setLocking(true);
    setError(null);
    setTxId(null);

    try {
      // Dynamically import to avoid SSR-like bundle issues with @stacks/connect
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
          setTxId(data.txId);
          setLocking(false);
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

  return { locking, error, txId, lockVault };
}
