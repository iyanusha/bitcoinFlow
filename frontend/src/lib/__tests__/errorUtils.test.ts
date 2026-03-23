import { describe, expect, it } from 'vitest';
import { getContractErrorMessage, parseTransactionError, isRetryableError, getErrorSeverity } from '../errorUtils';

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

describe('parseTransactionError', () => {
  it('handles UserRejected error', () => {
    const err = new Error('UserRejected: user cancelled');
    expect(parseTransactionError(err)).toBe('Transaction was cancelled by user');
  });

  it('handles ContractCall error', () => {
    const err = new Error('ContractCall failed');
    expect(parseTransactionError(err)).toBe('Contract call failed — check your inputs');
  });

  it('handles InsufficientFunds error', () => {
    const err = new Error('InsufficientFunds for transaction');
    expect(parseTransactionError(err)).toBe('Insufficient funds for this transaction');
  });

  it('handles network error', () => {
    const err = new Error('network timeout');
    expect(parseTransactionError(err)).toBe('Network error — please check your connection');
  });

  it('extracts contract error code from message', () => {
    const err = new Error('Transaction failed: (err u105)');
    expect(parseTransactionError(err)).toBe('Vault operations are currently paused');
  });

  it('returns raw message for unknown Error', () => {
    const err = new Error('Something weird happened');
    expect(parseTransactionError(err)).toBe('Something weird happened');
  });

  it('returns fallback for non-Error input', () => {
    expect(parseTransactionError('string error')).toBe('An unexpected error occurred');
    expect(parseTransactionError(null)).toBe('An unexpected error occurred');
    expect(parseTransactionError(undefined)).toBe('An unexpected error occurred');
  });
});

describe('isRetryableError', () => {
  it('returns true for network errors', () => {
    expect(isRetryableError(new Error('network timeout'))).toBe(true);
  });

  it('returns true for fetch errors', () => {
    expect(isRetryableError(new Error('fetch failed'))).toBe(true);
  });

  it('returns true for timeout errors', () => {
    expect(isRetryableError(new Error('Request timeout'))).toBe(true);
  });

  it('returns false for contract errors', () => {
    expect(isRetryableError(new Error('(err u105)'))).toBe(false);
  });

  it('returns false for non-Error values', () => {
    expect(isRetryableError('string')).toBe(false);
    expect(isRetryableError(null)).toBe(false);
  });
});

describe('getErrorSeverity', () => {
  it('returns low for user-cancelled transactions', () => {
    expect(getErrorSeverity(new Error('UserRejected'))).toBe('low');
  });

  it('returns medium for network errors', () => {
    expect(getErrorSeverity(new Error('network error'))).toBe('medium');
  });

  it('returns high for unknown errors', () => {
    expect(getErrorSeverity(new Error('Something broke'))).toBe('high');
  });

  it('returns high for non-Error values', () => {
    expect(getErrorSeverity('string')).toBe('high');
  });
});
