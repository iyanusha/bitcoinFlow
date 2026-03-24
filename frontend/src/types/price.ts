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
