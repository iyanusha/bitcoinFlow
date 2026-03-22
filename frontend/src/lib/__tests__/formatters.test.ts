import { describe, expect, it } from 'vitest';
import {
  formatSTX, formatBTC, formatSBTC, formatCompact,
  formatPercentage, formatBlocks,
} from '../formatters';

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

describe('formatCompact', () => {
  it('formats millions with M suffix', () => {
    expect(formatCompact(2_500_000)).toBe('2.50M');
  });

  it('formats thousands with K suffix', () => {
    expect(formatCompact(45_000)).toBe('45.00K');
  });

  it('formats small numbers with 2 decimals', () => {
    expect(formatCompact(123.456)).toBe('123.46');
  });

  it('formats exactly 1 million', () => {
    expect(formatCompact(1_000_000)).toBe('1.00M');
  });

  it('formats exactly 1 thousand', () => {
    expect(formatCompact(1_000)).toBe('1.00K');
  });
});

describe('formatPercentage', () => {
  it('converts basis points to percentage', () => {
    expect(formatPercentage(5000)).toBe('50.00%');
  });

  it('handles zero', () => {
    expect(formatPercentage(0)).toBe('0.00%');
  });

  it('handles 100%', () => {
    expect(formatPercentage(10000)).toBe('100.00%');
  });

  it('handles fractional basis points', () => {
    expect(formatPercentage(1)).toBe('0.01%');
  });
});

describe('formatBlocks', () => {
  it('formats few blocks as minutes', () => {
    expect(formatBlocks(3)).toBe('~30m');
  });

  it('formats many blocks as hours', () => {
    expect(formatBlocks(6)).toBe('~1h');
  });

  it('formats 1 block as 10 minutes', () => {
    expect(formatBlocks(1)).toBe('~10m');
  });
});
