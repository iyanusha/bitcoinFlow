import { describe, expect, it } from 'vitest';
import { formatSTX, formatBTC } from '../formatters';

describe('formatSTX', () => {
  it('converts micro-STX to STX with 6 decimals', () => {
    expect(formatSTX(1_000_000)).toBe('1.000000');
  });

  it('formats zero', () => {
    expect(formatSTX(0)).toBe('0.000000');
  });

  it('formats large amounts', () => {
    expect(formatSTX(100_000_000)).toBe('100.000000');
  });

  it('formats fractional amounts', () => {
    expect(formatSTX(500_000)).toBe('0.500000');
  });
});

describe('formatBTC', () => {
  it('converts satoshis to BTC with 8 decimals', () => {
    expect(formatBTC(100_000_000)).toBe('1.00000000');
  });

  it('formats zero satoshis', () => {
    expect(formatBTC(0)).toBe('0.00000000');
  });

  it('formats single satoshi', () => {
    expect(formatBTC(1)).toBe('0.00000001');
  });
});
