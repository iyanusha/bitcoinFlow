export const MICROSTX_PER_STX = 1_000_000;
export const SATS_PER_BTC = 100_000_000;

export const ERROR_MESSAGES: Record<number, string> = {
  100: 'Not authorized to perform this action',
  101: 'Insufficient balance for this operation',
  102: 'Invalid amount specified',
  103: 'Stacking error occurred',
  104: 'sBTC transfer failed',
  105: 'Vault is currently paused',
  106: 'Withdrawal cooldown is still active',
};

export const MIN_DEPOSIT_AMOUNT = 0.0001;
export const MAX_DEPOSIT_AMOUNT = 21_000_000;
export const DEPOSIT_DECIMALS = 8;

export const VALIDATION = {
  MIN_DEPOSIT: 0.0001,
  MAX_DEPOSIT: 21_000_000,
  MAX_DECIMALS: 8,
} as const;

export const REFRESH_INTERVAL_MS = 30_000;
export const BLOCK_TIME_SECONDS = 600;
export const COOLDOWN_BLOCKS = 6;
export const COOLDOWN_ESTIMATED_MINUTES = Math.round((COOLDOWN_BLOCKS * BLOCK_TIME_SECONDS) / 60);
