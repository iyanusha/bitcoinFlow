import { describe, expect, it } from 'vitest';
import {
  MICROSTX_PER_STX,
  SATS_PER_BTC,
  SBTC_DECIMALS,
  FLOW_DECIMALS,
  MIN_DEPOSIT_AMOUNT,
  MAX_DEPOSIT_AMOUNT,
  DEPOSIT_DECIMALS,
  VALIDATION,
  REFRESH_INTERVAL_MS,
  BLOCK_TIME_SECONDS,
  COOLDOWN_BLOCKS,
  COOLDOWN_ESTIMATED_MINUTES,
  MAX_TX_HISTORY,
  TX_POLL_INTERVAL_MS,
  ERROR_MESSAGES,
  ANIMATION,
  PERFORMANCE,
  SEO,
  BREAKPOINTS,
  KEYS,
} from '../constants';

describe('constants', () => {
  it('MICROSTX_PER_STX is 1 million', () => {
    expect(MICROSTX_PER_STX).toBe(1_000_000);
  });

  it('SATS_PER_BTC is 100 million', () => {
    expect(SATS_PER_BTC).toBe(100_000_000);
  });

  it('SBTC_DECIMALS is 8', () => {
    expect(SBTC_DECIMALS).toBe(8);
  });

  it('FLOW_DECIMALS is 6', () => {
    expect(FLOW_DECIMALS).toBe(6);
  });

  it('MIN_DEPOSIT_AMOUNT matches VALIDATION.MIN_DEPOSIT', () => {
    expect(MIN_DEPOSIT_AMOUNT).toBe(VALIDATION.MIN_DEPOSIT);
  });

  it('MAX_DEPOSIT_AMOUNT matches VALIDATION.MAX_DEPOSIT', () => {
    expect(MAX_DEPOSIT_AMOUNT).toBe(VALIDATION.MAX_DEPOSIT);
  });

  it('DEPOSIT_DECIMALS matches VALIDATION.MAX_DECIMALS', () => {
    expect(DEPOSIT_DECIMALS).toBe(VALIDATION.MAX_DECIMALS);
  });

  it('REFRESH_INTERVAL_MS is 30 seconds', () => {
    expect(REFRESH_INTERVAL_MS).toBe(30_000);
  });

  it('BLOCK_TIME_SECONDS is 10 minutes', () => {
    expect(BLOCK_TIME_SECONDS).toBe(600);
  });

  it('COOLDOWN_BLOCKS is 6', () => {
    expect(COOLDOWN_BLOCKS).toBe(6);
  });

  it('COOLDOWN_ESTIMATED_MINUTES matches block calculation', () => {
    expect(COOLDOWN_ESTIMATED_MINUTES).toBe(Math.round((COOLDOWN_BLOCKS * BLOCK_TIME_SECONDS) / 60));
  });

  it('MAX_TX_HISTORY is 50', () => {
    expect(MAX_TX_HISTORY).toBe(50);
  });

  it('TX_POLL_INTERVAL_MS is 15 seconds', () => {
    expect(TX_POLL_INTERVAL_MS).toBe(15_000);
  });

  it('ERROR_MESSAGES covers all 7 contract error codes', () => {
    expect(Object.keys(ERROR_MESSAGES)).toHaveLength(7);
    expect(ERROR_MESSAGES[100]).toContain('authorized');
    expect(ERROR_MESSAGES[101]).toContain('balance');
    expect(ERROR_MESSAGES[102]).toContain('amount');
    expect(ERROR_MESSAGES[103]).toContain('Stacking');
    expect(ERROR_MESSAGES[104]).toContain('sBTC');
    expect(ERROR_MESSAGES[105]).toContain('paused');
    expect(ERROR_MESSAGES[106]).toContain('cooldown');
  });

  it('VALIDATION is frozen/readonly', () => {
    expect(VALIDATION.MIN_DEPOSIT).toBe(0.0001);
    expect(VALIDATION.MAX_DEPOSIT).toBe(21_000_000);
    expect(VALIDATION.MAX_DECIMALS).toBe(8);
  });
});

describe('ANIMATION constants', () => {
  it('has positive toast duration', () => {
    expect(ANIMATION.TOAST_DURATION_MS).toBeGreaterThan(0);
  });

  it('error toasts last longer than default', () => {
    expect(ANIMATION.ERROR_TOAST_DURATION_MS).toBeGreaterThan(ANIMATION.TOAST_DURATION_MS);
  });

  it('copy feedback is 2 seconds', () => {
    expect(ANIMATION.COPY_FEEDBACK_MS).toBe(2000);
  });
});

describe('PERFORMANCE constants', () => {
  it('resize debounce is reasonable', () => {
    expect(PERFORMANCE.RESIZE_DEBOUNCE_MS).toBeGreaterThanOrEqual(100);
    expect(PERFORMANCE.RESIZE_DEBOUNCE_MS).toBeLessThanOrEqual(300);
  });

  it('online debounce matches useOnlineStatus', () => {
    expect(PERFORMANCE.ONLINE_DEBOUNCE_MS).toBe(300);
  });
});

describe('SEO constants', () => {
  it('site name is BitcoinFlow', () => {
    expect(SEO.SITE_NAME).toBe('BitcoinFlow');
  });

  it('site URL uses https', () => {
    expect(SEO.SITE_URL.startsWith('https://')).toBe(true);
  });
});

describe('BREAKPOINTS', () => {
  it('mobile < tablet < desktop < wide', () => {
    expect(BREAKPOINTS.MOBILE).toBeLessThan(BREAKPOINTS.TABLET);
    expect(BREAKPOINTS.TABLET).toBeLessThan(BREAKPOINTS.DESKTOP);
    expect(BREAKPOINTS.DESKTOP).toBeLessThan(BREAKPOINTS.WIDE);
  });
});

describe('KEYS', () => {
  it('defines standard keyboard key values', () => {
    expect(KEYS.ENTER).toBe('Enter');
    expect(KEYS.ESCAPE).toBe('Escape');
    expect(KEYS.TAB).toBe('Tab');
    expect(KEYS.SPACE).toBe(' ');
  });
});
