import { describe, expect, it, vi } from 'vitest';
import { memoizeOne } from '../memoize';

describe('memoizeOne', () => {
  it('returns cached result for same arguments', () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memoizeOne(fn);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('recomputes for different arguments', () => {
    const fn = vi.fn((a: number) => a * 2);
    const memoized = memoizeOne(fn);

    expect(memoized(5)).toBe(10);
    expect(memoized(3)).toBe(6);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('only caches the most recent call', () => {
    const fn = vi.fn((a: number) => a);
    const memoized = memoizeOne(fn);

    memoized(1);
    memoized(2);
    memoized(1); // should recompute, not cached
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('uses Object.is for equality', () => {
    const fn = vi.fn((a: unknown) => a);
    const memoized = memoizeOne(fn);

    memoized(NaN);
    memoized(NaN);
    expect(fn).toHaveBeenCalledTimes(1); // NaN === NaN with Object.is
  });

  it('handles zero arguments', () => {
    const fn = vi.fn(() => 42);
    const memoized = memoizeOne(fn);

    expect(memoized()).toBe(42);
    expect(memoized()).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
