import { describe, expect, it } from 'vitest';
import {
  validateAmount,
  validateDeposit,
  validateWithdraw,
  validateDecimalPrecision,
  sanitizeNumericInput,
  isPositiveInteger,
  isValidStxAddress,
  validateStxAddress,
  combineValidators,
} from '../validation';

describe('validateAmount', () => {
  it('rejects empty string', () => {
    const result = validateAmount('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Amount is required');
  });

  it('rejects whitespace-only string', () => {
    const result = validateAmount('   ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Amount is required');
  });

  it('rejects non-numeric input', () => {
    const result = validateAmount('abc');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Please enter a valid number');
  });

  it('rejects negative numbers', () => {
    const result = validateAmount('-5');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Amount must be greater than zero');
  });

  it('rejects zero', () => {
    const result = validateAmount('0');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Amount must be greater than zero');
  });

  it('accepts valid positive number', () => {
    const result = validateAmount('1.5');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('accepts integer string', () => {
    const result = validateAmount('100');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
});

describe('validateDeposit', () => {
  it('rejects amount below minimum (0.0001)', () => {
    const result = validateDeposit('0.00001');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Minimum deposit is 0.0001 sBTC');
  });

  it('rejects amount exceeding maximum supply', () => {
    const result = validateDeposit('22000000');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Amount exceeds maximum supply');
  });

  it('accepts valid deposit amount', () => {
    const result = validateDeposit('0.5');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('accepts minimum deposit exactly', () => {
    const result = validateDeposit('0.0001');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
});

describe('validateWithdraw', () => {
  it('rejects amount exceeding balance', () => {
    const result = validateWithdraw('10', 5);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Insufficient balance');
  });

  it('accepts amount equal to balance', () => {
    const result = validateWithdraw('5', 5);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('accepts amount below balance', () => {
    const result = validateWithdraw('2.5', 10);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('inherits base validation for zero amount', () => {
    const result = validateWithdraw('0', 100);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Amount must be greater than zero');
  });
});

describe('validateDecimalPrecision', () => {
  it('accepts value within precision limit', () => {
    const result = validateDecimalPrecision('1.12345678');
    expect(result.isValid).toBe(true);
  });

  it('rejects value exceeding default 8 decimal precision', () => {
    const result = validateDecimalPrecision('1.123456789');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Maximum 8 decimal places');
  });

  it('accepts whole numbers', () => {
    const result = validateDecimalPrecision('42');
    expect(result.isValid).toBe(true);
  });

  it('supports custom precision limit', () => {
    const result = validateDecimalPrecision('1.123', 2);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Maximum 2 decimal places');
  });
});

describe('sanitizeNumericInput', () => {
  it('strips non-numeric characters', () => {
    expect(sanitizeNumericInput('12abc34')).toBe('1234');
  });

  it('preserves single decimal point', () => {
    expect(sanitizeNumericInput('12.34')).toBe('12.34');
  });

  it('removes extra decimal points', () => {
    expect(sanitizeNumericInput('1.2.3')).toBe('1.23');
  });

  it('returns empty string for non-numeric input', () => {
    expect(sanitizeNumericInput('abc')).toBe('');
  });
});

describe('isPositiveInteger', () => {
  it('returns true for positive integer string', () => {
    expect(isPositiveInteger('42')).toBe(true);
  });

  it('returns false for zero', () => {
    expect(isPositiveInteger('0')).toBe(false);
  });

  it('returns false for decimal', () => {
    expect(isPositiveInteger('1.5')).toBe(false);
  });

  it('returns false for negative', () => {
    expect(isPositiveInteger('-3')).toBe(false);
  });
});

describe('isValidStxAddress', () => {
  it('accepts valid ST address', () => {
    expect(isValidStxAddress('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM')).toBe(true);
  });

  it('accepts valid SP address', () => {
    expect(isValidStxAddress('SP000000000000000000002Q6VF78')).toBe(true);
  });

  it('rejects address without S prefix', () => {
    expect(isValidStxAddress('XX1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM')).toBe(false);
  });

  it('rejects short address', () => {
    expect(isValidStxAddress('ST1PQ')).toBe(false);
  });
});

describe('validateStxAddress', () => {
  it('rejects empty address', () => {
    const result = validateStxAddress('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Address is required');
  });

  it('rejects invalid format', () => {
    const result = validateStxAddress('notanaddress');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Invalid Stacks address format');
  });

  it('accepts valid Stacks address', () => {
    const result = validateStxAddress('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });
});

describe('combineValidators', () => {
  it('returns first failing validator error', () => {
    const combined = combineValidators(validateAmount, (v) => validateDeposit(v));
    const result = combined('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Amount is required');
  });

  it('passes when all validators pass', () => {
    const combined = combineValidators(validateAmount, (v) => validateDeposit(v));
    const result = combined('1.0');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('chains to second validator when first passes', () => {
    const combined = combineValidators(validateAmount, (v) => validateDeposit(v));
    const result = combined('0.00001');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Minimum deposit is 0.0001 sBTC');
  });
});
