import { describe, expect, it } from 'vitest';
import { getContractErrorMessage, parseTransactionError } from '../errorUtils';

describe('getContractErrorMessage', () => {
  it('returns message for ERR-NOT-AUTHORIZED (100)', () => {
    expect(getContractErrorMessage(100)).toBe('Not authorized to perform this action');
  });

  it('returns message for ERR-INSUFFICIENT-BALANCE (101)', () => {
    expect(getContractErrorMessage(101)).toBe('Insufficient balance for this operation');
  });

  it('returns message for ERR-INVALID-AMOUNT (102)', () => {
    expect(getContractErrorMessage(102)).toBe('Invalid amount — must be greater than zero');
  });

  it('returns message for ERR-STACKING-ERROR (103)', () => {
    expect(getContractErrorMessage(103)).toBe('Stacking operation failed');
  });

  it('returns message for ERR-SBTC-TRANSFER-FAILED (104)', () => {
    expect(getContractErrorMessage(104)).toBe('sBTC transfer could not be completed');
  });

  it('returns message for ERR-VAULT-PAUSED (105)', () => {
    expect(getContractErrorMessage(105)).toBe('Vault operations are currently paused');
  });

  it('returns message for ERR-COOLDOWN-ACTIVE (106)', () => {
    expect(getContractErrorMessage(106)).toBe('Please wait for the cooldown period to end before withdrawing');
  });

  it('returns fallback for unknown code', () => {
    const msg = getContractErrorMessage(999);
    expect(msg).toContain('Unknown contract error');
    expect(msg).toContain('999');
  });
});
