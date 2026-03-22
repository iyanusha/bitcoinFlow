import { describe, expect, it } from 'vitest';
import {
  validateAmount,
  validateDeposit,
  validateWithdraw,
  validateDecimalPrecision,
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
