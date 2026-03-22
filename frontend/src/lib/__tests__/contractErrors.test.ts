import { describe, expect, it } from 'vitest';
import {
  getContractError,
  extractErrorCode,
  classifyContractError,
  handleContractError,
} from '../contractErrors';

describe('getContractError', () => {
  it('returns message for known error code', () => {
    expect(getContractError(100)).toContain('authorized');
  });

  it('returns message for code 101', () => {
    expect(getContractError(101)).toContain('balance');
  });

  it('returns message for code 102', () => {
    expect(getContractError(102)).toContain('amount');
  });

  it('returns message for code 105', () => {
    expect(getContractError(105)).toContain('paused');
  });

  it('returns unknown message for unrecognized code', () => {
    expect(getContractError(999)).toContain('Unknown');
    expect(getContractError(999)).toContain('999');
  });
});

describe('extractErrorCode', () => {
  it('extracts code from Clarity error message', () => {
    expect(extractErrorCode(new Error('Transaction failed (err u101)'))).toBe(101);
  });

  it('returns null for non-matching error', () => {
    expect(extractErrorCode(new Error('Something else'))).toBeNull();
  });

  it('returns null for non-Error values', () => {
    expect(extractErrorCode('string error')).toBeNull();
  });

  it('extracts code from nested error message', () => {
    expect(extractErrorCode(new Error('Call failed: (err u106) cooldown active'))).toBe(106);
  });
});

describe('classifyContractError', () => {
  it('classifies NOT_AUTHORIZED as user error', () => {
    expect(classifyContractError(100)).toBe('user');
  });

  it('classifies INSUFFICIENT_BALANCE as user error', () => {
    expect(classifyContractError(101)).toBe('user');
  });

  it('classifies STACKING_ERROR as system error', () => {
    expect(classifyContractError(103)).toBe('system');
  });

  it('classifies VAULT_PAUSED as system error', () => {
    expect(classifyContractError(105)).toBe('system');
  });

  it('classifies unknown codes as unknown', () => {
    expect(classifyContractError(999)).toBe('unknown');
  });
});

describe('handleContractError', () => {
  it('returns formatted message for Clarity error', () => {
    const result = handleContractError(new Error('(err u102)'));
    expect(result).toContain('amount');
  });

  it('returns error message for non-contract error', () => {
    const result = handleContractError(new Error('Network timeout'));
    expect(result).toBe('Network timeout');
  });

  it('returns fallback for non-Error values', () => {
    const result = handleContractError('oops');
    expect(result).toBe('An unexpected error occurred');
  });
});
