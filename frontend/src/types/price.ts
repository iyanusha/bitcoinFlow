export interface PriceData {
  usd: number;
  btc: number;
  change24h: number;
  updatedAt: number;
}

export interface PriceHistory {
  timestamps: number[];
  prices: number[];
}

export interface PriceFeedConfig {
  refreshIntervalMs: number;
  cacheTtlMs: number;
  apiBase: string;
}

export interface PriceFetchError {
  code: string;
  message: string;
  retryAfter?: number;
}

/** Possible error codes returned by the price API or service layer. */
export type PriceFetchErrorCode =
  | 'NETWORK_ERROR'
  | 'RATE_LIMITED'
  | 'PARSE_ERROR'
  | 'TIMEOUT'
  | 'UNKNOWN';

/** Snapshot of multiple asset prices at a single moment in time. */
export interface PriceSnapshot {
  stxUsd: number;
  stxBtc: number;
  capturedAt: number;
}

// Re-export all price types as a convenience barrel
export type { PriceData as STXPriceData };
