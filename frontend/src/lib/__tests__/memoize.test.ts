import { describe, expect, it, vi } from 'vitest';
import { memoize, memoizeWithTTL } from '../memoize';

describe('memoize', () => {
  it('caches function results', () => {
    const fn = vi.fn((a: string) => a.toUpperCase());
    const memoized = memoize(fn);
    expect(memoized('hello')).toBe('HELLO');
    expect(memoized('hello')).toBe('HELLO');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('uses different cache keys for different args', () => {
    const fn = vi.fn((a: string) => a.length.toString());
    const memoized = memoize(fn);
    memoized('ab');
    memoized('abc');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('evicts oldest entry when maxSize exceeded', () => {
    const fn = vi.fn((a: string) => a);
    const memoized = memoize(fn, { maxSize: 2 });
    memoized('a');
    memoized('b');
    memoized('c');
    expect(memoized.cache.size).toBe(2);
    expect(memoized.cache.has('a')).toBe(false);
  });

  it('clears cache', () => {
    const memoized = memoize((a: string) => a);
    memoized('a');
    memoized.clear();
    expect(memoized.cache.size).toBe(0);
  });
});

describe('memoizeWithTTL', () => {
  it('returns cached value within TTL', () => {
    const fn = vi.fn((a: string) => a);
    const memoized = memoizeWithTTL(fn, 1000);
    memoized('x');
    memoized('x');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('recalculates after TTL expires', () => {
    vi.useFakeTimers();
    const fn = vi.fn((a: string) => a);
    const memoized = memoizeWithTTL(fn, 100);
    memoized('x');
    vi.advanceTimersByTime(200);
    memoized('x');
    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('clears cache', () => {
    const memoized = memoizeWithTTL((a: string) => a, 1000);
    memoized('test');
    memoized.clear();
    // After clear, next call should recompute
    const fn2 = vi.fn((a: string) => a);
    const memoized2 = memoizeWithTTL(fn2, 1000);
    memoized2('t');
    memoized2.clear();
    memoized2('t');
    expect(fn2).toHaveBeenCalledTimes(2);
  });
});
