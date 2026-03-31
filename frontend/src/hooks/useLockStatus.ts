import { useState, useEffect, useCallback } from 'react';
import type { LockStatus } from '../types/lock';
import { CONTRACT_ADDRESS, CONTRACT_NAME, API_URL } from '../lib/stacks';

export interface UseLockStatusReturn {
  lockStatus: LockStatus | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

async function fetchCurrentBlock(): Promise<number> {
  const res = await fetch(`${API_URL}/extended/v1/info/network_block_times`);
  if (!res.ok) throw new Error(`Block info fetch failed: ${res.status}`);
  const json = await res.json();
  return json.testnet?.target_block_time
    ? Math.floor(Date.now() / 1000 / json.testnet.target_block_time)
    : 0;
}

async function readLockStatusFromContract(address: string): Promise<LockStatus> {
  // Call the read-only function `get-lock-status` on the contract
  const body = {
    sender: address,
    arguments: [],
  };

  const res = await fetch(
    `${API_URL}/v2/contracts/call-read/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/get-lock-status`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  const currentBlock = await fetchCurrentBlock().catch(() => 0);

  if (!res.ok) {
    // Return default unlocked state if contract call fails
    return {
      isLocked: false,
      lockedUntilBlock: null,
      currentBlock,
      remainingBlocks: null,
    };
  }

  const json = await res.json();

  // Parse Clarity response: (ok (tuple (is-locked bool) (unlock-block uint)))
  const result = json.result;
  if (!result || result.type !== 'ok') {
    return {
      isLocked: false,
      lockedUntilBlock: null,
      currentBlock,
      remainingBlocks: null,
    };
  }

  const tuple = result.value;
  const isLocked: boolean = tuple?.['is-locked']?.value === true;
  const unlockBlock: number = parseInt(tuple?.['unlock-block']?.value ?? '0', 10);
  const remainingBlocks = isLocked ? Math.max(0, unlockBlock - currentBlock) : null;

  return {
    isLocked,
    lockedUntilBlock: isLocked ? unlockBlock : null,
    currentBlock,
    remainingBlocks,
  };
}

export function useLockStatus(address: string | null): UseLockStatusReturn {
  const [lockStatus, setLockStatus] = useState<LockStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const status = await readLockStatusFromContract(address);
      setLockStatus(status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lock status');
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { lockStatus, loading, error, refetch };
}
