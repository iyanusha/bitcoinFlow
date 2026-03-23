export type CacheStrategy = 'stale-while-revalidate' | 'cache-first' | 'network-first';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  maxAge: number;
}

const store = new Map<string, CacheEntry<unknown>>();

/**
 * Get cached data with a cache strategy.
 */
export function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    strategy?: CacheStrategy;
    maxAge?: number;
  } = {},
): Promise<T> {
  const { strategy = 'stale-while-revalidate', maxAge = 60_000 } = options;

  switch (strategy) {
    case 'cache-first':
      return cacheFirst(key, fetcher, maxAge);
    case 'network-first':
      return networkFirst(key, fetcher, maxAge);
    case 'stale-while-revalidate':
    default:
      return staleWhileRevalidate(key, fetcher, maxAge);
  }
}

async function cacheFirst<T>(key: string, fetcher: () => Promise<T>, maxAge: number): Promise<T> {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (entry && Date.now() - entry.timestamp < entry.maxAge) {
    return entry.data;
  }
  const data = await fetcher();
  store.set(key, { data, timestamp: Date.now(), maxAge });
  return data;
}

async function networkFirst<T>(key: string, fetcher: () => Promise<T>, maxAge: number): Promise<T> {
  try {
    const data = await fetcher();
    store.set(key, { data, timestamp: Date.now(), maxAge });
    return data;
  } catch {
    const entry = store.get(key) as CacheEntry<T> | undefined;
    if (entry) return entry.data;
    throw new Error(`No cached data for "${key}" and network request failed`);
  }
}

async function staleWhileRevalidate<T>(key: string, fetcher: () => Promise<T>, maxAge: number): Promise<T> {
  const entry = store.get(key) as CacheEntry<T> | undefined;

  if (entry) {
    // Return stale data immediately, revalidate in background
    if (Date.now() - entry.timestamp > entry.maxAge) {
      fetcher().then((data) => {
        store.set(key, { data, timestamp: Date.now(), maxAge });
      }).catch(() => { /* ignore background refresh failures */ });
    }
    return entry.data;
  }

  const data = await fetcher();
  store.set(key, { data, timestamp: Date.now(), maxAge });
  return data;
}

/**
 * Invalidate a cache entry.
 */
export function invalidateCache(key: string): void {
  store.delete(key);
}

/**
 * Clear the entire cache.
 */
export function clearCache(): void {
  store.clear();
}
