import { describe, expect, it } from 'vitest';
import {
  createMockTransaction,
  createMockVaultStats,
  createMockUserPosition,
  createMockToast,
  createMockCooldown,
  flushPromises,
} from './test-helpers';

describe('createMockTransaction', () => {
  it('returns valid default transaction', () => {
    const tx = createMockTransaction();
    expect(tx.txId).toBeTruthy();
    expect(tx.type).toBe('deposit');
    expect(tx.amount).toBe(1000000);
    expect(tx.status).toBe('pending');
    expect(tx.timestamp).toBeGreaterThan(0);
  });

  it('accepts overrides', () => {
    const tx = createMockTransaction({ type: 'withdraw', status: 'confirmed' });
    expect(tx.type).toBe('withdraw');
    expect(tx.status).toBe('confirmed');
  });

  it('generates unique txIds', () => {
    const tx1 = createMockTransaction();
    const tx2 = createMockTransaction();
    expect(tx1.txId).not.toBe(tx2.txId);
  });
});

describe('createMockVaultStats', () => {
  it('returns zeroed stats by default', () => {
    const stats = createMockVaultStats();
    expect(stats.totalDeposits).toBe(0);
    expect(stats.totalRewards).toBe(0);
    expect(stats.isPaused).toBe(false);
  });

  it('accepts overrides', () => {
    const stats = createMockVaultStats({ totalDeposits: 5000000, isPaused: true });
    expect(stats.totalDeposits).toBe(5000000);
    expect(stats.isPaused).toBe(true);
  });
});

describe('createMockUserPosition', () => {
  it('returns zeroed position by default', () => {
    const pos = createMockUserPosition();
    expect(pos.depositedAmount).toBe(0);
    expect(pos.flowTokenBalance).toBe(0);
    expect(pos.sharePct).toBe(0);
    expect(pos.lastDepositTime).toBeNull();
  });

  it('accepts overrides', () => {
    const pos = createMockUserPosition({ depositedAmount: 3000000, sharePct: 5000 });
    expect(pos.depositedAmount).toBe(3000000);
    expect(pos.sharePct).toBe(5000);
  });
});

describe('createMockToast', () => {
  it('returns info toast by default', () => {
    const toast = createMockToast();
    expect(toast.type).toBe('info');
    expect(toast.message).toBe('Test notification');
    expect(toast.id).toBeTruthy();
  });

  it('accepts overrides', () => {
    const toast = createMockToast({ type: 'error', message: 'Failed!' });
    expect(toast.type).toBe('error');
    expect(toast.message).toBe('Failed!');
  });
});

describe('createMockCooldown', () => {
  it('returns expired cooldown by default', () => {
    const cd = createMockCooldown();
    expect(cd.isExpired).toBe(true);
    expect(cd.blocksRemaining).toBe(0);
  });

  it('can create active cooldown', () => {
    const cd = createMockCooldown({ isExpired: false, blocksRemaining: 3 });
    expect(cd.isExpired).toBe(false);
    expect(cd.blocksRemaining).toBe(3);
  });
});

describe('flushPromises', () => {
  it('resolves after microtask queue', async () => {
    let resolved = false;
    Promise.resolve().then(() => { resolved = true; });
    await flushPromises();
    expect(resolved).toBe(true);
  });
});
