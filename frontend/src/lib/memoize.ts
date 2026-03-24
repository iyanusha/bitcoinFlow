/**
 * Memoize a function's return value based on its arguments.
 * Uses a Map for O(1) cache lookups.
 */
export function memoize<T extends (...args: string[]) => unknown>(
  fn: T,
  options: { maxSize?: number } = {},
): T & { cache: Map<string, unknown>; clear: () => void } {
  const { maxSize = 100 } = options;
  const cache = new Map<string, unknown>();

  const memoized = ((...args: string[]) => {
    const key = args.join('\0');
    if (cache.has(key)) return cache.get(key);

    const result = fn(...args);
    cache.set(key, result);

    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) cache.delete(firstKey);
    }

    return result;
  }) as T & { cache: Map<string, unknown>; clear: () => void };

  memoized.cache = cache;
  memoized.clear = () => cache.clear();

  return memoized;
}

/**
 * Memoize a function with a TTL (time-to-live) in milliseconds.
 */
export function memoizeWithTTL<T extends (...args: string[]) => unknown>(
  fn: T,
  ttl: number,
): T & { clear: () => void } {
  const cache = new Map<string, { value: unknown; expiry: number }>();

  const memoized = ((...args: string[]) => {
    const key = args.join('\0');
    const now = Date.now();
    const cached = cache.get(key);

    if (cached && cached.expiry > now) return cached.value;

    const result = fn(...args);
    cache.set(key, { value: result, expiry: now + ttl });
    return result;
  }) as T & { clear: () => void };

  memoized.clear = () => cache.clear();

  return memoized;
}
