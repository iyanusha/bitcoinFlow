import { logger } from './logger';

export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 10000,
};

/**
 * Retry an async operation with exponential backoff.
 * Only retries on network-like errors.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxRetries, baseDelayMs, maxDelayMs } = { ...DEFAULT_OPTIONS, ...options };

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      if (attempt >= maxRetries) break;

      const isRetryable =
        err instanceof Error &&
        (err.message.includes('network') ||
          err.message.includes('fetch') ||
          err.message.includes('timeout') ||
          err.message.includes('ECONNREFUSED') ||
          err.message.includes('429'));

      if (!isRetryable) throw err;

      const delay = Math.min(baseDelayMs * Math.pow(2, attempt), maxDelayMs);
      logger.warn(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, err);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
