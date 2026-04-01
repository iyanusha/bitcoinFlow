import React from 'react';
import type { LockStatus } from '../types/lock';
import { blocksToReadable, canUnlock } from '../lib/lockUtils';

interface VaultLockBadgeProps {
  lockStatus: LockStatus | null;
}

export function VaultLockBadge({ lockStatus }: VaultLockBadgeProps) {
  if (!lockStatus) {
    return (
      <span className="lock-badge lock-badge-loading" aria-label="Loading lock status">
        <span className="price-skeleton" style={{ width: 80, height: 16, display: 'inline-block' }} aria-hidden="true" />
      </span>
    );
  }

  if (!lockStatus.isLocked) {
    return (
      <span className="lock-badge lock-badge-unlocked" aria-label="Vault is unlocked">
        <span className="lock-badge-dot" aria-hidden="true" /> Unlocked
      </span>
    );
  }

  const eligible = canUnlock(lockStatus);

  if (eligible) {
    return (
      <span className="lock-badge lock-badge-eligible" aria-label="Lock period elapsed — eligible to unlock">
        <span className="lock-badge-dot" aria-hidden="true" /> Eligible to unlock
      </span>
    );
  }

  const remaining = lockStatus.remainingBlocks ?? 0;
  return (
    <span
      className="lock-badge lock-badge-locked"
      aria-label={`Vault is locked — ${blocksToReadable(remaining)} remaining`}
    >
      <span className="lock-badge-dot" aria-hidden="true" />
      Locked ({blocksToReadable(remaining)} left)
    </span>
  );
}
