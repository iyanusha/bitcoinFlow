import { describe, expect, it } from 'vitest';
import { VALIDATION_MESSAGES } from '../validationMessages';

describe('VALIDATION_MESSAGES', () => {
  it('generates required message with field name', () => {
    expect(VALIDATION_MESSAGES.required('Email')).toBe('Email is required');
  });

  it('generates minLength message', () => {
    expect(VALIDATION_MESSAGES.minLength('Password', 8)).toBe('Password must be at least 8 characters');
  });

  it('generates maxLength message', () => {
    expect(VALIDATION_MESSAGES.maxLength('Name', 50)).toBe('Name must be at most 50 characters');
  });

  it('generates minValue message without unit', () => {
    expect(VALIDATION_MESSAGES.minValue(0.0001)).toBe('Minimum is 0.0001');
  });

  it('generates minValue message with unit', () => {
    expect(VALIDATION_MESSAGES.minValue(0.0001, 'sBTC')).toBe('Minimum is 0.0001 sBTC');
  });

  it('generates maxValue message', () => {
    expect(VALIDATION_MESSAGES.maxValue(21000000, 'BTC')).toBe('Maximum is 21000000 BTC');
  });

  it('has static error messages', () => {
    expect(VALIDATION_MESSAGES.invalidNumber).toBe('Please enter a valid number');
    expect(VALIDATION_MESSAGES.positiveNumber).toBe('Amount must be greater than zero');
    expect(VALIDATION_MESSAGES.vaultPaused).toBe('Vault is currently paused');
    expect(VALIDATION_MESSAGES.walletRequired).toBe('Please connect your wallet first');
  });

  it('generates insufficient balance message', () => {
    expect(VALIDATION_MESSAGES.insufficientBalance(5.5, 'FLOW')).toContain('5.5 FLOW');
  });

  it('generates decimal precision message', () => {
    expect(VALIDATION_MESSAGES.decimalPrecision(8)).toBe('Maximum 8 decimal places');
  });

  it('generates cooldown message', () => {
    expect(VALIDATION_MESSAGES.cooldownActive('10 blocks')).toContain('10 blocks');
  });

  it('generates invalid format message', () => {
    expect(VALIDATION_MESSAGES.invalidFormat('address')).toBe('Invalid address format');
  });
});
