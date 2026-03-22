import { describe, expect, it } from 'vitest';
import {
  validateDepositAmount,
  validateWithdrawalAmount,
  validateDecimals,
} from '../balanceValidation';

describe('validateDepositAmount', () => {
  it('rejects zero amount', () => {
    const result = validateDepositAmount(0, 1_000_000);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('greater than zero');
  });

  it('rejects negative amount', () => {
    const result = validateDepositAmount(-1, 1_000_000);
    expect(result.valid).toBe(false);
  });

  it('rejects below minimum', () => {
    const result = validateDepositAmount(0.00001, 1_000_000);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Minimum');
  });

  it('rejects above maximum', () => {
    const result = validateDepositAmount(22_000_000, 100_000_000_000_000);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Maximum');
  });

  it('rejects when exceeds balance', () => {
    const result = validateDepositAmount(1, 500_000); // 0.5 STX balance
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Insufficient');
  });

  it('accepts valid amount within balance', () => {
    const result = validateDepositAmount(1, 2_000_000);
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('accepts minimum amount', () => {
    const result = validateDepositAmount(0.0001, 1_000_000);
    expect(result.valid).toBe(true);
  });
});

describe('validateWithdrawalAmount', () => {
  it('rejects zero amount', () => {
    const result = validateWithdrawalAmount(0, 1000);
    expect(result.valid).toBe(false);
  });

  it('rejects amount exceeding flow balance', () => {
    const result = validateWithdrawalAmount(1000, 500);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('FLOW token');
  });

  it('accepts valid withdrawal', () => {
    const result = validateWithdrawalAmount(500, 1000);
    expect(result.valid).toBe(true);
  });

  it('accepts exact balance withdrawal', () => {
    const result = validateWithdrawalAmount(1000, 1000);
    expect(result.valid).toBe(true);
  });
});

describe('validateDecimals', () => {
  it('accepts integer', () => {
    expect(validateDecimals('100', 8)).toBe(true);
  });

  it('accepts within limit', () => {
    expect(validateDecimals('1.00000001', 8)).toBe(true);
  });

  it('rejects exceeding limit', () => {
    expect(validateDecimals('1.000000001', 8)).toBe(false);
  });

  it('accepts exactly at limit', () => {
    expect(validateDecimals('0.12345678', 8)).toBe(true);
  });
});
