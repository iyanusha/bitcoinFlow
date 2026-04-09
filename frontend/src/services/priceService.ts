import type { PriceData, PriceFetchError } from '../types/price';

const CACHE_KEY = 'stx_price_cache';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const PRICE_API_URL = 'https://api.hiro.so/extended/v1/market/stx/price';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2_000;

interface PriceCache {
  data: PriceData;
  fetchedAt: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class PriceService {
  private static _instance: PriceService | null = null;

  static get instance(): PriceService {
    if (!PriceService._instance) {
      PriceService._instance = new PriceService();
    }
    return PriceService._instance;
  }

  private async fetchWithRetry(retries = MAX_RETRIES): Promise<PriceData> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8_000);

        const response = await fetch(PRICE_API_URL, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('Retry-After') || '60', 10);
          const error: PriceFetchError = {
            code: 'RATE_LIMITED',
            message: 'Rate limited by price API',
            retryAfter: retryAfter * 1000,
          };
          throw new Error(error.message);
        }

        if (!response.ok) {
          throw new Error(`Price API error: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();

        const priceData: PriceData = {
          usd: parseFloat(json.price || json.usd || '0'),
          btc: parseFloat(json.btc_price || json.btc || '0'),
          change24h: parseFloat(json.change_24h || json.percent_change_24h || '0'),
          updatedAt: Date.now(),
        };

        this.saveCache(priceData);
        return priceData;
      } catch (err) {
        const isLastAttempt = attempt === retries;
        if (isLastAttempt) throw err;
        await sleep(RETRY_DELAY_MS * Math.pow(2, attempt));
      }
    }
    throw new Error('Exhausted retries fetching STX price');
  }

  async fetchCurrentPrice(): Promise<PriceData> {
    try {
      return await this.fetchWithRetry();
    } catch (err) {
      const cached = this.getCached();
      if (cached) return cached;
      throw err;
    }
  }

  getCached(): PriceData | null {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;

      const cache: PriceCache = JSON.parse(raw);
      const age = Date.now() - cache.fetchedAt;

      if (age > CACHE_TTL_MS) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return cache.data;
    } catch {
      return null;
    }
  }

  saveCache(data: PriceData): void {
    try {
      const cache: PriceCache = { data, fetchedAt: Date.now() };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {
      // localStorage may be unavailable in some environments
    }
  }

  subscribe(callback: (data: PriceData) => void, onError?: (err: Error) => void): () => void {
    let active = true;

    const poll = async () => {
      if (!active) return;
      try {
        const data = await this.fetchCurrentPrice();
        if (active) callback(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error('[PriceService] subscribe poll error:', error.message);
        if (active && onError) onError(error);
      }
    };

    poll();
    const interval = setInterval(poll, 30_000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }
}
