import { describe, expect, it, vi, beforeEach } from 'vitest';
import { withRetry } from '../retry';

describe('withRetry', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('returns result on first success', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    const result = await withRetry(fn);
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries on network error and succeeds', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('network error'))
      .mockResolvedValue('ok');

    const promise = withRetry(fn, { baseDelayMs: 10, maxRetries: 2 });
    await vi.advanceTimersByTimeAsync(100);
    const result = await promise;

    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('throws non-retryable errors immediately', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('authorization failed'));

    await expect(withRetry(fn, { maxRetries: 3 })).rejects.toThrow('authorization failed');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('throws after max retries exhausted', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('network timeout'));

    const promise = withRetry(fn, { maxRetries: 2, baseDelayMs: 10, maxDelayMs: 50 });
    await vi.advanceTimersByTimeAsync(500);

    await expect(promise).rejects.toThrow('network timeout');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('retries on fetch errors', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('Failed to fetch'))
      .mockResolvedValue(42);

    const promise = withRetry(fn, { baseDelayMs: 10 });
    await vi.advanceTimersByTimeAsync(100);
    const result = await promise;

    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
