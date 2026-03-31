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
