import { describe, expect, it, beforeEach } from 'vitest';
import {
  getCached,
  setCached,
  buildCacheKey,
  clearContractCache,
  getCacheSize,
} from '../contractCache';

beforeEach(() => {
  clearContractCache();
});

describe('buildCacheKey', () => {
  it('builds key from function name only', () => {
    expect(buildCacheKey('get-vault-status')).toBe('contract:get-vault-status');
  });

  it('builds key with args', () => {
    const key = buildCacheKey('get-user-share', ['ST123']);
    expect(key).toContain('get-user-share');
    expect(key).toContain('ST123');
  });

  it('builds key with empty args array', () => {
    expect(buildCacheKey('get-vault-tvl', [])).toBe('contract:get-vault-tvl');
  });
});

describe('getCached / setCached', () => {
  it('returns null for missing key', () => {
    expect(getCached('nonexistent')).toBeNull();
  });

  it('returns cached value within TTL', () => {
    setCached('test-key', { value: 42 });
    expect(getCached('test-key')).toEqual({ value: 42 });
  });

  it('returns null for expired entry', () => {
    setCached('test-key', 'hello');
    // Request with a 0ms TTL (already expired)
    expect(getCached('test-key', 0)).toBeNull();
  });

  it('caches different types', () => {
    setCached('string', 'hello');
    setCached('number', 42);
    setCached('bool', true);

    expect(getCached('string')).toBe('hello');
    expect(getCached('number')).toBe(42);
    expect(getCached('bool')).toBe(true);
  });
});

describe('clearContractCache', () => {
  it('clears all entries', () => {
    setCached('a', 1);
    setCached('b', 2);
    expect(getCacheSize()).toBe(2);

    clearContractCache();
    expect(getCacheSize()).toBe(0);
    expect(getCached('a')).toBeNull();
  });
});

describe('getCacheSize', () => {
  it('returns 0 for empty cache', () => {
    expect(getCacheSize()).toBe(0);
  });

  it('returns correct count', () => {
    setCached('x', 1);
    setCached('y', 2);
    setCached('z', 3);
    expect(getCacheSize()).toBe(3);
  });
});
