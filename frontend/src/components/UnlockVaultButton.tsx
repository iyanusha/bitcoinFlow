import React from 'react';
import type { LockStatus } from '../types/lock';
import { useUnlockVault } from '../hooks/useUnlockVault';
import { blocksToReadable } from '../lib/lockUtils';

interface UnlockVaultButtonProps {
  lockStatus: LockStatus | null;
  onSuccess?: (txId: string) => void;
}

export function UnlockVaultButton({ lockStatus, onSuccess }: UnlockVaultButtonProps) {
  const { unlocking, error, txId, canUnlockNow, unlockVault } = useUnlockVault(lockStatus);

  const remaining = lockStatus?.remainingBlocks ?? null;
  const disabledReason = !lockStatus
    ? 'Loading lock status…'
    : !lockStatus.isLocked
    ? 'Vault is already unlocked'
    : !canUnlockNow && remaining !== null
    ? `${blocksToReadable(remaining)} until unlock`
    : null;

  const handleClick = async () => {
    await unlockVault();
    if (txId && onSuccess) onSuccess(txId);
  };

  return (
    <div className="unlock-vault-wrapper">
      <div className="unlock-btn-row">
        <button
          type="button"
          className="unlock-vault-btn"
          onClick={handleClick}
          disabled={!canUnlockNow || unlocking}
          aria-busy={unlocking}
          aria-disabled={!canUnlockNow}
          aria-describedby={disabledReason ? 'unlock-tooltip' : undefined}
          aria-label={canUnlockNow ? 'Unlock vault' : disabledReason ?? 'Unlock vault'}
        >
          {unlocking ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Unlocking…
            </>
          ) : (
            'Unlock Vault'
          )}
        </button>

        {disabledReason && !canUnlockNow && (
          <span
            id="unlock-tooltip"
            className="unlock-tooltip"
            role="tooltip"
            aria-live="polite"
          >
            {disabledReason}
          </span>
        )}
      </div>

      {error && (
        <p className="lock-error" role="alert">{error}</p>
      )}

      {txId && (
        <p className="lock-success" role="status">
          Unlock submitted — tx: <code>{txId.slice(0, 10)}…</code>
        </p>
      )}
    </div>
  );
}
