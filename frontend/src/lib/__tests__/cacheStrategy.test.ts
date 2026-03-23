import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getCachedData, invalidateCache, clearCache } from '../cacheStrategy';

describe('cacheStrategy', () => {
  beforeEach(() => { clearCache(); });

  it('fetches and caches data with cache-first', async () => {
    const fetcher = vi.fn(async () => 42);
    const r1 = await getCachedData('test', fetcher, { strategy: 'cache-first' });
    expect(r1).toBe(42);
    const r2 = await getCachedData('test', fetcher, { strategy: 'cache-first' });
    expect(r2).toBe(42);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('fetches from network with network-first', async () => {
    const fetcher = vi.fn(async () => 'data');
    const result = await getCachedData('net', fetcher, { strategy: 'network-first' });
    expect(result).toBe('data');
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('falls back to cache on network failure', async () => {
    const fetcher = vi.fn(async () => 'cached');
    await getCachedData('fallback', fetcher, { strategy: 'network-first' });
    
    fetcher.mockRejectedValueOnce(new Error('offline'));
    const result = await getCachedData('fallback', fetcher, { strategy: 'network-first' });
    expect(result).toBe('cached');
  });

  it('returns stale data with SWR', async () => {
    const fetcher = vi.fn(async () => 'fresh');
    await getCachedData('swr', fetcher, { strategy: 'stale-while-revalidate', maxAge: 0 });
    
    fetcher.mockResolvedValueOnce('updated');
    const result = await getCachedData('swr', fetcher, { strategy: 'stale-while-revalidate', maxAge: 0 });
    expect(result).toBe('fresh'); // Returns stale data immediately
  });

  it('invalidates cache entry', async () => {
    const fetcher = vi.fn(async () => 'data');
    await getCachedData('inv', fetcher, { strategy: 'cache-first' });
    invalidateCache('inv');
    await getCachedData('inv', fetcher, { strategy: 'cache-first' });
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('clears all cache', async () => {
    const f1 = vi.fn(async () => 1);
    const f2 = vi.fn(async () => 2);
    await getCachedData('a', f1, { strategy: 'cache-first' });
    await getCachedData('b', f2, { strategy: 'cache-first' });
    clearCache();
    await getCachedData('a', f1, { strategy: 'cache-first' });
    await getCachedData('b', f2, { strategy: 'cache-first' });
    expect(f1).toHaveBeenCalledTimes(2);
    expect(f2).toHaveBeenCalledTimes(2);
  });
});
