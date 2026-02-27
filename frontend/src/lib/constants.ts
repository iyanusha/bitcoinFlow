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

export const HEADER_FOOTER_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const CONTRACT_TESTS_V2_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const DEPOSIT_CONFIRM_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const NETWORK_STATUS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const STATS_REFRESH_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const DASHBOARD_LAYOUT_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const DARK_MODE_VARS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const DARK_MODE_TOGGLE_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const DARK_MODE_APPLY_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const VAULT_METRICS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const STACKING_INFO_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const REWARDS_CALC_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const FLOW_TOKEN_INFO_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const INPUT_SANITIZE_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const SECURITY_HEADERS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const CSP_CONFIG_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const HOOK_TESTS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const COMPONENT_TESTS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const TEST_SETUP_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const TEST_UTILS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const MOCK_DATA_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const README_UPDATE_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const CONTRIBUTING_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const ENV_DOCS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const API_DOCS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const COMPONENT_DOCS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const LAZY_LOADING_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const CODE_SPLITTING_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const MEMOIZATION_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const IMAGE_OPTIMIZE_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const BUNDLE_ANALYZE_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;
