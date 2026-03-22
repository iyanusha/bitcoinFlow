import { describe, expect, it } from 'vitest';
import { parseClarityInt, parseClarityBool, microToDecimal } from '../contractParsers';

describe('parseClarityInt', () => {
  it('parses valid integer string', () => {
    expect(parseClarityInt('1000000')).toBe(1_000_000);
  });

  it('returns 0 for undefined', () => {
    expect(parseClarityInt(undefined)).toBe(0);
  });

  it('returns 0 for empty string', () => {
    expect(parseClarityInt('')).toBe(0);
  });

  it('returns 0 for non-numeric string', () => {
    expect(parseClarityInt('abc')).toBe(0);
  });

  it('parses zero correctly', () => {
    expect(parseClarityInt('0')).toBe(0);
  });

  it('parses large numbers', () => {
    expect(parseClarityInt('21000000000000')).toBe(21_000_000_000_000);
  });
});

describe('parseClarityBool', () => {
  it('returns true for boolean true', () => {
    expect(parseClarityBool(true)).toBe(true);
  });

  it('returns false for boolean false', () => {
    expect(parseClarityBool(false)).toBe(false);
  });

  it('returns true for string "true"', () => {
    expect(parseClarityBool('true')).toBe(true);
  });

  it('returns false for string "false"', () => {
    expect(parseClarityBool('false')).toBe(false);
  });

  it('returns false for null', () => {
    expect(parseClarityBool(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(parseClarityBool(undefined)).toBe(false);
  });

  it('returns false for number', () => {
    expect(parseClarityBool(1)).toBe(false);
  });
});

describe('microToDecimal', () => {
  it('converts microstx to STX', () => {
    expect(microToDecimal(1_000_000, 6)).toBe('1.000000');
  });

  it('converts satoshis to BTC', () => {
    expect(microToDecimal(100_000_000, 8)).toBe('1.00000000');
  });

  it('handles zero', () => {
    expect(microToDecimal(0, 6)).toBe('0.000000');
  });

  it('handles fractional amounts', () => {
    expect(microToDecimal(500_000, 6)).toBe('0.500000');
  });
});
