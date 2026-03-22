import { logger } from './logger';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

/** Default TTL: 10 seconds */
const DEFAULT_TTL_MS = 10_000;

/**
 * Get a cached value if it exists and hasn't expired.
 */
export function getCached<T>(key: string, ttlMs = DEFAULT_TTL_MS): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const age = Date.now() - entry.timestamp;
  if (age > ttlMs) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

/**
 * Set a value in the cache.
 */
export function setCached<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Build a cache key from function name and args.
 */
export function buildCacheKey(functionName: string, args: unknown[] = []): string {
  const argsKey = args.length > 0 ? `:${JSON.stringify(args)}` : '';
  return `contract:${functionName}${argsKey}`;
}

/**
 * Clear all cached contract data.
 */
export function clearContractCache(): void {
  const count = cache.size;
  cache.clear();
  logger.debug(`Contract cache cleared (${count} entries)`);
}

/**
 * Get the number of entries currently in the cache.
 */
export function getCacheSize(): number {
  return cache.size;
}
