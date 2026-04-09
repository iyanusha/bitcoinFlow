import type { LockPeriod, LockStatus } from '../types/lock';

/** Approximate minutes per Stacks block. */
const MINUTES_PER_BLOCK = 10;

/** Convert a block count to hours. */
export function blocksToHours(blocks: number): number {
  return (blocks * MINUTES_PER_BLOCK) / 60;
}

/** Convert block count to a human-readable string like "2 days 4 hours". */
export function blocksToReadable(blocks: number): string {
  const totalMinutes = blocks * MINUTES_PER_BLOCK;
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  if (minutes > 0 && days === 0) parts.push(`${minutes} min`);
  return parts.join(' ') || 'less than a minute';
}

/** Compute how many blocks remain and an estimated unlock timestamp. */
export function getUnlockEstimate(
  lockedAtBlock: number,
  lockBlocks: number,
  currentBlock: number
): { blocksRemaining: number; estimatedMs: number } {
  const unlockBlock = lockedAtBlock + lockBlocks;
  const blocksRemaining = Math.max(0, unlockBlock - currentBlock);
  const estimatedMs = Date.now() + blocksRemaining * MINUTES_PER_BLOCK * 60 * 1000;
  return { blocksRemaining, estimatedMs };
}

/** Returns true when the lock period has elapsed. */
export function canUnlock(lockStatus: LockStatus): boolean {
  if (!lockStatus.isLocked) return false;
  return (lockStatus.remainingBlocks ?? 1) <= 0;
}

/** Format an estimated unlock timestamp as a readable date string. */
export function formatUnlockDate(estimatedMs: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(estimatedMs));
}

/** Return a warning level based on how long the lock period is. */
export function getLockWarningLevel(blocks: number): 'none' | 'low' | 'medium' | 'high' {
  if (blocks <= 144) return 'none';      // up to ~1 day
  if (blocks <= 1_008) return 'low';    // up to ~1 week
  if (blocks <= 4_320) return 'medium'; // up to ~1 month
  return 'high';
}

/** Seconds between Stacks blocks on average. */
export const SECONDS_PER_BLOCK = MINUTES_PER_BLOCK * 60;

/**
 * Given a current timestamp and a block height, estimate the wall-clock time
 * at which a future block will be produced.
 */
export function estimateBlockTime(
  currentBlock: number,
  targetBlock: number,
  nowMs: number = Date.now()
): number {
  const blockDelta = targetBlock - currentBlock;
  return nowMs + blockDelta * SECONDS_PER_BLOCK * 1000;
}

/**
 * Format a block count as a short label for display in tight spaces.
 * e.g. 144 → "1d", 1008 → "1w", 4320 → "1mo"
 */
export function formatBlocksShort(blocks: number): string {
  const days = Math.round((blocks * MINUTES_PER_BLOCK) / (60 * 24));
  if (days >= 30) return `${Math.round(days / 30)}mo`;
  if (days >= 7) return `${Math.round(days / 7)}w`;
  return `${days}d`;
}

/** Preset lock periods available in the UI. */
export const LOCK_PRESETS: LockPeriod[] = [
  { blocks: 144,    label: '1 Day',     daysEstimate: 1   },
  { blocks: 1_008,  label: '1 Week',    daysEstimate: 7   },
  { blocks: 4_320,  label: '1 Month',   daysEstimate: 30  },
  { blocks: 12_960, label: '3 Months',  daysEstimate: 90  },
];
