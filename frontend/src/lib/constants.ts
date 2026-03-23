export const MICROSTX_PER_STX = 1_000_000;
export const SATS_PER_BTC = 100_000_000;
export const SBTC_DECIMALS = 8;
export const FLOW_DECIMALS = 6;

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

export const MAX_TX_HISTORY = 50;
export const TX_POLL_INTERVAL_MS = 15_000;

export const SEO = {
  SITE_NAME: 'BitcoinFlow',
  SITE_URL: 'https://bitcoinflow.app',
  DESCRIPTION: 'Smart sBTC Stacking Vault with auto-compounding rewards',
  OG_IMAGE: 'https://bitcoinflow.app/og-image.png',
  TWITTER_HANDLE: '@bitcoinflow',
} as const;

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1200,
} as const;

export const ANIMATION = {
  TOAST_SLIDE_IN_MS: 300,
  TOAST_DURATION_MS: 5000,
  ERROR_TOAST_DURATION_MS: 8000,
  SKELETON_SHIMMER_MS: 1500,
  HOVER_TRANSITION_MS: 200,
  SPINNER_ROTATION_MS: 800,
  COPY_FEEDBACK_MS: 2000,
} as const;

export const PERFORMANCE = {
  RESIZE_DEBOUNCE_MS: 150,
  SCROLL_THROTTLE_MS: 100,
  ONLINE_DEBOUNCE_MS: 300,
  IDLE_TIMEOUT_MS: 1000,
} as const;

export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
} as const;
