import { lazy } from 'react';

/**
 * Enhanced lazy loader with retry logic for dynamic imports.
 * Handles network failures by retrying the import up to `maxRetries` times
 * with exponential backoff before giving up.
 */
export function lazyWithRetry<T extends React.ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  maxRetries = 3,
) {
  return lazy(() => retryImport(factory, maxRetries));
}

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
        // Exponential backoff: 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  throw lastError;
}
