import type { PriceData } from '../types/price';

const CACHE_KEY = 'stx_price_cache';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const PRICE_API_URL = 'https://api.hiro.so/extended/v1/market/stx/price';

interface PriceCache {
  data: PriceData;
  fetchedAt: number;
}

export class PriceService {
  private static _instance: PriceService | null = null;

  static get instance(): PriceService {
    if (!PriceService._instance) {
      PriceService._instance = new PriceService();
    }
    return PriceService._instance;
  }

  async fetchCurrentPrice(): Promise<PriceData> {
    try {
      const response = await fetch(PRICE_API_URL, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

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

  subscribe(callback: (data: PriceData) => void): () => void {
    let active = true;

    const poll = async () => {
      if (!active) return;
      try {
        const data = await this.fetchCurrentPrice();
        if (active) callback(data);
      } catch (err) {
        console.error('[PriceService] subscribe poll error:', err);
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
