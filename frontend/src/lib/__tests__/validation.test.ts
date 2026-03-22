import { describe, expect, it } from 'vitest';
import { validateAmount } from '../validation';

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
