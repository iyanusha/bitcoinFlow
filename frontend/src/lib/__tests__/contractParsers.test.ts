import { describe, expect, it } from 'vitest';
import { parseClarityInt, parseClarityBool, microToDecimal, parseClarityOptional, isClarityError, stxToMicro, btcToSats } from '../contractParsers';

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

describe('parseClarityOptional', () => {
  it('returns value when present', () => {
    expect(parseClarityOptional({ value: 'hello' })).toBe('hello');
  });

  it('returns null for null input', () => {
    expect(parseClarityOptional(null)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(parseClarityOptional(undefined)).toBeNull();
  });
});

describe('isClarityError', () => {
  it('returns true for err type', () => {
    expect(isClarityError({ type: 'err' })).toBe(true);
  });

  it('returns false for ok type', () => {
    expect(isClarityError({ type: 'ok' })).toBe(false);
  });

  it('returns false for other types', () => {
    expect(isClarityError({ type: 'uint' })).toBe(false);
  });
});

describe('stxToMicro', () => {
  it('converts 1 STX to 1_000_000 micro', () => {
    expect(stxToMicro(1)).toBe(1_000_000);
  });

  it('converts fractional STX', () => {
    expect(stxToMicro(0.5)).toBe(500_000);
  });

  it('rounds to avoid floating point errors', () => {
    expect(stxToMicro(0.000001)).toBe(1);
  });

  it('handles zero', () => {
    expect(stxToMicro(0)).toBe(0);
  });
});

describe('btcToSats', () => {
  it('converts 1 BTC to 100_000_000 sats', () => {
    expect(btcToSats(1)).toBe(100_000_000);
  });

  it('converts fractional BTC', () => {
    expect(btcToSats(0.5)).toBe(50_000_000);
  });

  it('rounds correctly', () => {
    expect(btcToSats(0.00000001)).toBe(1);
  });

  it('handles zero', () => {
    expect(btcToSats(0)).toBe(0);
  });
});
