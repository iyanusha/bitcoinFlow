export const MICROSTX_PER_STX = 1_000_000;
export const SATS_PER_BTC = 100_000_000;

export const ERROR_MESSAGES: Record<number, string> = {
  100: 'Not authorized to perform this action',
  101: 'Insufficient balance for this operation',
  102: 'Invalid amount specified',
  103: 'Stacking error occurred',
  104: 'sBTC transfer failed',
  105: 'Vault is currently paused',
};

export const MIN_DEPOSIT_AMOUNT = 0.0001;
export const MAX_DEPOSIT_AMOUNT = 1000;
export const DEPOSIT_DECIMALS = 8;

export const VALIDATION = {
  MIN_DEPOSIT: 0.0001,
  MAX_DEPOSIT: 21_000_000,
  MAX_DECIMALS: 8,
} as const;

export const RESPONSIVE_DESIGN_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const SEO_META_TAGS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const ENV_VALIDATION_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const VAULT_STATUS_HOOKS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const WALLET_UX_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const TX_TRACKING_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const POST_CONDITIONS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const TOAST_SYSTEM_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const MODAL_DIALOGS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;
