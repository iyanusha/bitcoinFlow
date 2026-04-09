export interface LockPeriod {
  blocks: number;
  label: string;
  daysEstimate: number;
}

export interface LockStatus {
  isLocked: boolean;
  lockedUntilBlock: number | null;
  currentBlock: number;
  remainingBlocks: number | null;
}

export interface LockAction {
  type: 'lock' | 'unlock';
  blocks?: number;
  txId?: string;
  timestamp: number;
}

export interface LockContractConfig {
  contractAddress: string;
  contractName: string;
  lockFn: string;
  unlockFn: string;
  getLockStatusFn: string;
}

// Resolved at import time from the same env vars used by stacks.ts
const CONTRACT_ADDRESS =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTRACT_ADDRESS) ||
  'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

export const LOCK_CONTRACT_CONFIG: LockContractConfig = {
  contractAddress: CONTRACT_ADDRESS,
  contractName: 'flow-vault',
  lockFn: 'lock-vault',
  unlockFn: 'unlock-vault',
  getLockStatusFn: 'get-lock-status',
};
