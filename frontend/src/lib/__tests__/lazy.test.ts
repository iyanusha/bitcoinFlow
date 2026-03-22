import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

// Test the retry logic directly
async function retryImport<T>(
  factory: () => Promise<T>,
  maxRetries: number,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await factory();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 10)); // shortened for tests
      }
    }
  }
  throw lastError;
}

describe('retryImport', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves on first attempt if factory succeeds', async () => {
    const factory = vi.fn().mockResolvedValue({ default: 'Component' });
    const result = await retryImport(factory, 3);
    expect(result).toEqual({ default: 'Component' });
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('retries on failure and succeeds on second attempt', async () => {
    const factory = vi.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValue({ default: 'Component' });

    const promise = retryImport(factory, 3);
    await vi.advanceTimersByTimeAsync(100);
    const result = await promise;

    expect(result).toEqual({ default: 'Component' });
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('throws after all retries are exhausted', async () => {
    const error = new Error('Persistent failure');
    const factory = vi.fn().mockRejectedValue(error);

    const promise = retryImport(factory, 2);
    await vi.advanceTimersByTimeAsync(1000);

    await expect(promise).rejects.toThrow('Persistent failure');
    expect(factory).toHaveBeenCalledTimes(3); // initial + 2 retries
  });
});
