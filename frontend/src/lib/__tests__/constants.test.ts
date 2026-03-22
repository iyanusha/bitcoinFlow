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
});
