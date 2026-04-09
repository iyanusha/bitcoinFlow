import type { PriceFeedConfig } from '../types/price';

/** How often to poll for a new STX price (30 seconds). */
export const PRICE_REFRESH_INTERVAL_MS = 30_000;

/** How long a cached price reading is considered fresh (5 minutes). */
export const PRICE_CACHE_TTL_MS = 300_000;

/** Hiro API endpoint for current STX/USD price. */
export const HIRO_PRICE_API = 'https://api.hiro.so/extended/v1/market/stx/price';

/** Maximum number of data points kept in the price history ring buffer. */
export const PRICE_HISTORY_MAX_POINTS = 20;

/** Request timeout for price fetches. */
export const PRICE_REQUEST_TIMEOUT_MS = 8_000;

/** Number of retries on network failure before giving up. */
export const PRICE_MAX_RETRIES = 3;

/** Default PriceFeedConfig used by PriceService. */
export const DEFAULT_PRICE_FEED_CONFIG: PriceFeedConfig = {
  refreshIntervalMs: PRICE_REFRESH_INTERVAL_MS,
  cacheTtlMs: PRICE_CACHE_TTL_MS,
  apiBase: HIRO_PRICE_API,
};
