import { describe, expect, it } from 'vitest';
import { formatSTX, formatBTC, formatSBTC } from '../formatters';

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

describe('formatSBTC', () => {
  it('formats zero as "0"', () => {
    expect(formatSBTC(0)).toBe('0');
  });

  it('formats small value below threshold as "< 0.0001"', () => {
    expect(formatSBTC(100)).toBe('< 0.0001');
  });

  it('formats normal amount with 4 decimals', () => {
    expect(formatSBTC(50_000_000)).toBe('0.5000');
  });

  it('supports custom decimal places', () => {
    expect(formatSBTC(50_000_000, 2)).toBe('0.50');
  });
});
