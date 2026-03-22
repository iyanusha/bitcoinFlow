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

export const FAVICON_ICONS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const OG_IMAGES_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const TWITTER_ENHANCE_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const CANONICAL_URLS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const SITEMAP_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const MOBILE_NAV_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const KEYBOARD_SHORTCUTS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const FOCUS_MANAGEMENT_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const SCREEN_READER_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const HIGH_CONTRAST_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const NETWORK_INDICATOR_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const STATS_POLLING_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const STAT_CARDS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const SECTION_HEADERS_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const EMPTY_STATES_CONFIG = { refreshMs: 30000, maxRetries: 3, pageSize: 25 } as const;

export const VAULT_DASHBOARD_S9 = { pageSize: 20, refreshMs: 30000 } as const;

export const VAULT_DASHBOARD_S19 = { pageSize: 20, refreshMs: 30000 } as const;

export const VAULT_DASHBOARD_S29 = { pageSize: 20, refreshMs: 30000 } as const;

export const VAULT_DASHBOARD_S39 = { pageSize: 20, refreshMs: 30000 } as const;

export const VAULT_DASHBOARD_S49 = { pageSize: 20, refreshMs: 30000 } as const;

export const TX_HISTORY_PAGE_S9 = { pageSize: 20, refreshMs: 30000 } as const;

export const TX_HISTORY_PAGE_S19 = { pageSize: 20, refreshMs: 30000 } as const;

export const TX_HISTORY_PAGE_S29 = { pageSize: 20, refreshMs: 30000 } as const;

export const TX_HISTORY_PAGE_S39 = { pageSize: 20, refreshMs: 30000 } as const;

export const TX_HISTORY_PAGE_S49 = { pageSize: 20, refreshMs: 30000 } as const;

export const SETTINGS_PAGE_S9 = { pageSize: 20, refreshMs: 30000 } as const;

export const SETTINGS_PAGE_S19 = { pageSize: 20, refreshMs: 30000 } as const;

export const SETTINGS_PAGE_S29 = { pageSize: 20, refreshMs: 30000 } as const;

export const SETTINGS_PAGE_S39 = { pageSize: 20, refreshMs: 30000 } as const;

export const SETTINGS_PAGE_S49 = { pageSize: 20, refreshMs: 30000 } as const;

export const FAQ_HELP_PAGE_S9 = { pageSize: 20, refreshMs: 30000 } as const;

export const FAQ_HELP_PAGE_S19 = { pageSize: 20, refreshMs: 30000 } as const;

export const FAQ_HELP_PAGE_S29 = { pageSize: 20, refreshMs: 30000 } as const;

export const FAQ_HELP_PAGE_S39 = { pageSize: 20, refreshMs: 30000 } as const;

export const FAQ_HELP_PAGE_S49 = { pageSize: 20, refreshMs: 30000 } as const;

export const ABOUT_PAGE_S9 = { pageSize: 20, refreshMs: 30000 } as const;

export const ABOUT_PAGE_S19 = { pageSize: 20, refreshMs: 30000 } as const;

export const ABOUT_PAGE_S29 = { pageSize: 20, refreshMs: 30000 } as const;

export const ABOUT_PAGE_S39 = { pageSize: 20, refreshMs: 30000 } as const;

export const ABOUT_PAGE_S49 = { pageSize: 20, refreshMs: 30000 } as const;

export const STACKING_ANALYTICS_S9 = { pageSize: 20, refreshMs: 30000 } as const;

export const STACKING_ANALYTICS_S19 = { pageSize: 20, refreshMs: 30000 } as const;

export const STACKING_ANALYTICS_S29 = { pageSize: 20, refreshMs: 30000 } as const;

export const STACKING_ANALYTICS_S39 = { pageSize: 20, refreshMs: 30000 } as const;

export const STACKING_ANALYTICS_S49 = { pageSize: 20, refreshMs: 30000 } as const;

export const MULTI_TOKEN_S9 = { pageSize: 20, refreshMs: 30000 } as const;

export const MULTI_TOKEN_S19 = { pageSize: 20, refreshMs: 30000 } as const;

export const MULTI_TOKEN_S29 = { pageSize: 20, refreshMs: 30000 } as const;

export const MULTI_TOKEN_S39 = { pageSize: 20, refreshMs: 30000 } as const;

export const MULTI_TOKEN_S49 = { pageSize: 20, refreshMs: 30000 } as const;

export const NOTIFICATION_CENTER_S9 = { pageSize: 20, refreshMs: 30000 } as const;

export const NOTIFICATION_CENTER_S19 = { pageSize: 20, refreshMs: 30000 } as const;

export const NOTIFICATION_CENTER_S29 = { pageSize: 20, refreshMs: 30000 } as const;

export const NOTIFICATION_CENTER_S39 = { pageSize: 20, refreshMs: 30000 } as const;

export const NOTIFICATION_CENTER_S49 = { pageSize: 20, refreshMs: 30000 } as const;

export const ADVANCED_FORMS_S9 = { pageSize: 20, refreshMs: 30000 } as const;

export const ADVANCED_FORMS_S19 = { pageSize: 20, refreshMs: 30000 } as const;

export const ADVANCED_FORMS_S29 = { pageSize: 20, refreshMs: 30000 } as const;

export const ADVANCED_FORMS_S39 = { pageSize: 20, refreshMs: 30000 } as const;

export const ADVANCED_FORMS_S49 = { pageSize: 20, refreshMs: 30000 } as const;

export const ADMIN_PANEL_S9 = { pageSize: 20, refreshMs: 30000 } as const;

export const ADMIN_PANEL_S19 = { pageSize: 20, refreshMs: 30000 } as const;

export const ADMIN_PANEL_S29 = { pageSize: 20, refreshMs: 30000 } as const;

export const ADMIN_PANEL_S39 = { pageSize: 20, refreshMs: 30000 } as const;

export const ADMIN_PANEL_S49 = { pageSize: 20, refreshMs: 30000 } as const;

export const VAULT_ANALYTICS_K9 = { endpoint: '/api/vault_analytics/9', timeout: 30000, retries: 3 } as const;

export const VAULT_ANALYTICS_K19 = { endpoint: '/api/vault_analytics/19', timeout: 30000, retries: 3 } as const;

export const VAULT_ANALYTICS_K29 = { endpoint: '/api/vault_analytics/29', timeout: 30000, retries: 3 } as const;

export const VAULT_ANALYTICS_K39 = { endpoint: '/api/vault_analytics/39', timeout: 30000, retries: 3 } as const;

export const VAULT_ANALYTICS_K49 = { endpoint: '/api/vault_analytics/49', timeout: 30000, retries: 3 } as const;

export const VAULT_ANALYTICS_K59 = { endpoint: '/api/vault_analytics/59', timeout: 30000, retries: 3 } as const;

export const VAULT_ANALYTICS_K69 = { endpoint: '/api/vault_analytics/69', timeout: 30000, retries: 3 } as const;

export const VAULT_ANALYTICS_K79 = { endpoint: '/api/vault_analytics/79', timeout: 30000, retries: 3 } as const;

export const DEPOSIT_HISTORY_K9 = { endpoint: '/api/deposit_history/9', timeout: 30000, retries: 3 } as const;

export const DEPOSIT_HISTORY_K19 = { endpoint: '/api/deposit_history/19', timeout: 30000, retries: 3 } as const;

export const DEPOSIT_HISTORY_K29 = { endpoint: '/api/deposit_history/29', timeout: 30000, retries: 3 } as const;

export const DEPOSIT_HISTORY_K39 = { endpoint: '/api/deposit_history/39', timeout: 30000, retries: 3 } as const;

export const DEPOSIT_HISTORY_K49 = { endpoint: '/api/deposit_history/49', timeout: 30000, retries: 3 } as const;

export const DEPOSIT_HISTORY_K59 = { endpoint: '/api/deposit_history/59', timeout: 30000, retries: 3 } as const;

export const DEPOSIT_HISTORY_K69 = { endpoint: '/api/deposit_history/69', timeout: 30000, retries: 3 } as const;

export const DEPOSIT_HISTORY_K79 = { endpoint: '/api/deposit_history/79', timeout: 30000, retries: 3 } as const;

export const WITHDRAW_HISTORY_K9 = { endpoint: '/api/withdraw_history/9', timeout: 30000, retries: 3 } as const;

export const WITHDRAW_HISTORY_K19 = { endpoint: '/api/withdraw_history/19', timeout: 30000, retries: 3 } as const;

export const WITHDRAW_HISTORY_K29 = { endpoint: '/api/withdraw_history/29', timeout: 30000, retries: 3 } as const;

export const WITHDRAW_HISTORY_K39 = { endpoint: '/api/withdraw_history/39', timeout: 30000, retries: 3 } as const;

export const WITHDRAW_HISTORY_K49 = { endpoint: '/api/withdraw_history/49', timeout: 30000, retries: 3 } as const;

export const WITHDRAW_HISTORY_K59 = { endpoint: '/api/withdraw_history/59', timeout: 30000, retries: 3 } as const;

export const WITHDRAW_HISTORY_K69 = { endpoint: '/api/withdraw_history/69', timeout: 30000, retries: 3 } as const;

export const WITHDRAW_HISTORY_K79 = { endpoint: '/api/withdraw_history/79', timeout: 30000, retries: 3 } as const;

export const STX_CONVERTER_K9 = { endpoint: '/api/stx_converter/9', timeout: 30000, retries: 3 } as const;

export const STX_CONVERTER_K19 = { endpoint: '/api/stx_converter/19', timeout: 30000, retries: 3 } as const;

export const STX_CONVERTER_K29 = { endpoint: '/api/stx_converter/29', timeout: 30000, retries: 3 } as const;

export const STX_CONVERTER_K39 = { endpoint: '/api/stx_converter/39', timeout: 30000, retries: 3 } as const;

export const STX_CONVERTER_K49 = { endpoint: '/api/stx_converter/49', timeout: 30000, retries: 3 } as const;

export const STX_CONVERTER_K59 = { endpoint: '/api/stx_converter/59', timeout: 30000, retries: 3 } as const;

export const STX_CONVERTER_K69 = { endpoint: '/api/stx_converter/69', timeout: 30000, retries: 3 } as const;

export const STX_CONVERTER_K79 = { endpoint: '/api/stx_converter/79', timeout: 30000, retries: 3 } as const;

export const CONTRACT_EVENTS_K9 = { endpoint: '/api/contract_events/9', timeout: 30000, retries: 3 } as const;

export const CONTRACT_EVENTS_K19 = { endpoint: '/api/contract_events/19', timeout: 30000, retries: 3 } as const;

export const CONTRACT_EVENTS_K29 = { endpoint: '/api/contract_events/29', timeout: 30000, retries: 3 } as const;

export const CONTRACT_EVENTS_K39 = { endpoint: '/api/contract_events/39', timeout: 30000, retries: 3 } as const;

export const CONTRACT_EVENTS_K49 = { endpoint: '/api/contract_events/49', timeout: 30000, retries: 3 } as const;

export const CONTRACT_EVENTS_K59 = { endpoint: '/api/contract_events/59', timeout: 30000, retries: 3 } as const;

export const CONTRACT_EVENTS_K69 = { endpoint: '/api/contract_events/69', timeout: 30000, retries: 3 } as const;

export const CONTRACT_EVENTS_K79 = { endpoint: '/api/contract_events/79', timeout: 30000, retries: 3 } as const;

export const BLOCK_EXPLORER_LINK_K9 = { endpoint: '/api/block_explorer_link/9', timeout: 30000, retries: 3 } as const;

export const BLOCK_EXPLORER_LINK_K19 = { endpoint: '/api/block_explorer_link/19', timeout: 30000, retries: 3 } as const;

export const BLOCK_EXPLORER_LINK_K29 = { endpoint: '/api/block_explorer_link/29', timeout: 30000, retries: 3 } as const;

export const BLOCK_EXPLORER_LINK_K39 = { endpoint: '/api/block_explorer_link/39', timeout: 30000, retries: 3 } as const;

export const BLOCK_EXPLORER_LINK_K49 = { endpoint: '/api/block_explorer_link/49', timeout: 30000, retries: 3 } as const;

export const BLOCK_EXPLORER_LINK_K59 = { endpoint: '/api/block_explorer_link/59', timeout: 30000, retries: 3 } as const;

export const BLOCK_EXPLORER_LINK_K69 = { endpoint: '/api/block_explorer_link/69', timeout: 30000, retries: 3 } as const;

export const BLOCK_EXPLORER_LINK_K79 = { endpoint: '/api/block_explorer_link/79', timeout: 30000, retries: 3 } as const;

export const FEE_ESTIMATOR_K9 = { endpoint: '/api/fee_estimator/9', timeout: 30000, retries: 3 } as const;

export const FEE_ESTIMATOR_K19 = { endpoint: '/api/fee_estimator/19', timeout: 30000, retries: 3 } as const;

export const FEE_ESTIMATOR_K29 = { endpoint: '/api/fee_estimator/29', timeout: 30000, retries: 3 } as const;

export const FEE_ESTIMATOR_K39 = { endpoint: '/api/fee_estimator/39', timeout: 30000, retries: 3 } as const;

export const FEE_ESTIMATOR_K49 = { endpoint: '/api/fee_estimator/49', timeout: 30000, retries: 3 } as const;

export const FEE_ESTIMATOR_K59 = { endpoint: '/api/fee_estimator/59', timeout: 30000, retries: 3 } as const;

export const FEE_ESTIMATOR_K69 = { endpoint: '/api/fee_estimator/69', timeout: 30000, retries: 3 } as const;

export const FEE_ESTIMATOR_K79 = { endpoint: '/api/fee_estimator/79', timeout: 30000, retries: 3 } as const;

export const VAULT_COMPARISON_K9 = { endpoint: '/api/vault_comparison/9', timeout: 30000, retries: 3 } as const;

export const VAULT_COMPARISON_K19 = { endpoint: '/api/vault_comparison/19', timeout: 30000, retries: 3 } as const;

export const VAULT_COMPARISON_K29 = { endpoint: '/api/vault_comparison/29', timeout: 30000, retries: 3 } as const;

export const VAULT_COMPARISON_K39 = { endpoint: '/api/vault_comparison/39', timeout: 30000, retries: 3 } as const;

export const VAULT_COMPARISON_K49 = { endpoint: '/api/vault_comparison/49', timeout: 30000, retries: 3 } as const;

export const VAULT_COMPARISON_K59 = { endpoint: '/api/vault_comparison/59', timeout: 30000, retries: 3 } as const;

export const VAULT_COMPARISON_K69 = { endpoint: '/api/vault_comparison/69', timeout: 30000, retries: 3 } as const;

export const VAULT_COMPARISON_K79 = { endpoint: '/api/vault_comparison/79', timeout: 30000, retries: 3 } as const;

export const PORTFOLIO_VIEW_K9 = { endpoint: '/api/portfolio_view/9', timeout: 30000, retries: 3 } as const;

export const PORTFOLIO_VIEW_K19 = { endpoint: '/api/portfolio_view/19', timeout: 30000, retries: 3 } as const;

export const PORTFOLIO_VIEW_K29 = { endpoint: '/api/portfolio_view/29', timeout: 30000, retries: 3 } as const;

export const PORTFOLIO_VIEW_K39 = { endpoint: '/api/portfolio_view/39', timeout: 30000, retries: 3 } as const;

export const PORTFOLIO_VIEW_K49 = { endpoint: '/api/portfolio_view/49', timeout: 30000, retries: 3 } as const;

export const PORTFOLIO_VIEW_K59 = { endpoint: '/api/portfolio_view/59', timeout: 30000, retries: 3 } as const;

export const PORTFOLIO_VIEW_K69 = { endpoint: '/api/portfolio_view/69', timeout: 30000, retries: 3 } as const;

export const PORTFOLIO_VIEW_K79 = { endpoint: '/api/portfolio_view/79', timeout: 30000, retries: 3 } as const;

export const BATCH_OPERATIONS_K9 = { endpoint: '/api/batch_operations/9', timeout: 30000, retries: 3 } as const;

export const BATCH_OPERATIONS_K19 = { endpoint: '/api/batch_operations/19', timeout: 30000, retries: 3 } as const;

export const BATCH_OPERATIONS_K29 = { endpoint: '/api/batch_operations/29', timeout: 30000, retries: 3 } as const;

export const BATCH_OPERATIONS_K39 = { endpoint: '/api/batch_operations/39', timeout: 30000, retries: 3 } as const;

export const BATCH_OPERATIONS_K49 = { endpoint: '/api/batch_operations/49', timeout: 30000, retries: 3 } as const;

export const BATCH_OPERATIONS_K59 = { endpoint: '/api/batch_operations/59', timeout: 30000, retries: 3 } as const;

export const BATCH_OPERATIONS_K69 = { endpoint: '/api/batch_operations/69', timeout: 30000, retries: 3 } as const;

export const BATCH_OPERATIONS_K79 = { endpoint: '/api/batch_operations/79', timeout: 30000, retries: 3 } as const;
