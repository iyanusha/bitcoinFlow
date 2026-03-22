/**
 * Test helper utilities for BitcoinFlow frontend tests.
 * Provides mock factories and assertion helpers.
 */

import type {
  TransactionRecord,
  VaultStats,
  UserPosition,
  ToastMessage,
  CooldownInfo,
} from '../types';

export function createMockTransaction(
  overrides: Partial<TransactionRecord> = {}
): TransactionRecord {
  return {
    txId: '0x' + Math.random().toString(16).slice(2),
    type: 'deposit',
    amount: 1000000,
    timestamp: Date.now(),
    status: 'pending',
    ...overrides,
  };
}

export function createMockVaultStats(
  overrides: Partial<VaultStats> = {}
): VaultStats {
  return {
    totalDeposits: 0,
    totalRewards: 0,
    stxBalance: 0,
    depositCount: 0,
    withdrawCount: 0,
    isPaused: false,
    userBalance: 0,
    currentBlock: 100,
    ...overrides,
  };
}

export function createMockUserPosition(
  overrides: Partial<UserPosition> = {}
): UserPosition {
  return {
    depositedAmount: 0,
    flowTokenBalance: 0,
    pendingRewards: 0,
    lastDepositTime: null,
    sharePct: 0,
    ...overrides,
  };
}

export function createMockToast(
  overrides: Partial<ToastMessage> = {}
): ToastMessage {
  return {
    id: crypto.randomUUID(),
    type: 'info',
    message: 'Test notification',
    ...overrides,
  };
}

export function createMockCooldown(
  overrides: Partial<CooldownInfo> = {}
): CooldownInfo {
  return {
    blocksRemaining: 0,
    isExpired: true,
    ...overrides,
  };
}

export function mockLocalStorage(): {
  getItem: ReturnType<typeof vi.fn>;
  setItem: ReturnType<typeof vi.fn>;
  removeItem: ReturnType<typeof vi.fn>;
  clear: ReturnType<typeof vi.fn>;
} {
  const store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
  };
}

export function flushPromises(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
