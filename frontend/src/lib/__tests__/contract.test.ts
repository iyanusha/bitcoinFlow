import { describe, expect, it } from 'vitest';
import type { ReadOnlyCallOptions } from '../contract';

describe('ReadOnlyCallOptions', () => {
  it('accepts minimal options', () => {
    const opts: ReadOnlyCallOptions = {
      functionName: 'get-vault-status',
    };
    expect(opts.functionName).toBe('get-vault-status');
    expect(opts.functionArgs).toBeUndefined();
    expect(opts.senderAddress).toBeUndefined();
  });

  it('accepts full options', () => {
    const opts: ReadOnlyCallOptions = {
      functionName: 'get-user-share',
      functionArgs: [],
      senderAddress: 'ST123',
      cacheTtlMs: 5000,
    };
    expect(opts.functionName).toBe('get-user-share');
    expect(opts.functionArgs).toEqual([]);
    expect(opts.senderAddress).toBe('ST123');
    expect(opts.cacheTtlMs).toBe(5000);
  });

  it('cacheTtlMs is optional', () => {
    const opts: ReadOnlyCallOptions = {
      functionName: 'get-exchange-rate',
    };
    expect(opts.cacheTtlMs).toBeUndefined();
  });
});
