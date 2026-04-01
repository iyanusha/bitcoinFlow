import React, { useState } from 'react';
import type { LockPeriod } from '../types/lock';
import { useLockVault } from '../hooks/useLockVault';
import { blocksToReadable, formatUnlockDate, getUnlockEstimate } from '../lib/lockUtils';

interface LockVaultButtonProps {
  selectedPeriod: LockPeriod | null;
  currentBlock: number;
  onSuccess?: (txId: string) => void;
}

export function LockVaultButton({ selectedPeriod, currentBlock, onSuccess }: LockVaultButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { locking, error, txId, lockVault } = useLockVault();

  const handleLockClick = () => {
    if (!selectedPeriod) return;
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (!selectedPeriod) return;
    setShowConfirm(false);
    await lockVault(selectedPeriod.blocks);
    if (txId && onSuccess) onSuccess(txId);
  };

  const estimate = selectedPeriod
    ? getUnlockEstimate(currentBlock, selectedPeriod.blocks, currentBlock)
    : null;

  const unlockDateStr = estimate ? formatUnlockDate(estimate.estimatedMs) : '';

  return (
    <>
      <button
        type="button"
        className="lock-vault-btn"
        onClick={handleLockClick}
        disabled={!selectedPeriod || locking}
        aria-busy={locking}
        aria-label={selectedPeriod ? `Lock vault for ${selectedPeriod.label}` : 'Select a lock period first'}
      >
        {locking ? 'Submitting…' : 'Lock Vault'}
      </button>

      {error && (
        <p className="lock-error" role="alert">{error}</p>
      )}

      {txId && (
        <p className="lock-success" role="status">
          Lock submitted — tx: <code>{txId.slice(0, 10)}…</code>
        </p>
      )}

      {showConfirm && selectedPeriod && (
        <div
          className="lock-confirm-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lock-confirm-title"
        >
          <div className="lock-confirm-modal">
            <h3 id="lock-confirm-title">Confirm Vault Lock</h3>
            <dl className="lock-confirm-details">
              <dt>Lock period</dt>
              <dd>{selectedPeriod.label} ({blocksToReadable(selectedPeriod.blocks)})</dd>
              <dt>Blocks</dt>
              <dd>{selectedPeriod.blocks.toLocaleString()}</dd>
              <dt>Estimated unlock</dt>
              <dd>{unlockDateStr}</dd>
            </dl>
            <div className="lock-warning" role="note">
              <strong>Warning:</strong> Early withdrawal may incur penalties.
              Funds will be inaccessible until block{' '}
              {(currentBlock + selectedPeriod.blocks).toLocaleString()}.
            </div>
            <div className="lock-confirm-actions">
              <button
                type="button"
                className="lock-confirm-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="lock-confirm-proceed"
                onClick={handleConfirm}
              >
                Confirm Lock
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
