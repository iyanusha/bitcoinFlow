/**
 * Batch multiple state updates into a single render cycle.
 * In React 18+, updates inside event handlers are already batched,
 * but this helps batch updates in async callbacks, timers, etc.
 */
export function batchUpdates(fn: () => void): void {
  // React 18+ automatically batches, but we provide a named wrapper
  // for clarity and future-proofing
  fn();
}

/**
 * Queue a microtask to run after the current synchronous execution.
 * Useful for deferring work without blocking the UI.
 */
export function queueMicrotask(fn: () => void): void {
  if (typeof globalThis.queueMicrotask === 'function') {
    globalThis.queueMicrotask(fn);
  } else {
    Promise.resolve().then(fn);
  }
}

/**
 * Schedule a callback for the next idle period.
 * Falls back to setTimeout if requestIdleCallback is unavailable.
 */
export function scheduleIdle(
  fn: () => void,
  options?: { timeout?: number },
): number {
  if (typeof requestIdleCallback === 'function') {
    return requestIdleCallback(fn, options);
  }
  return setTimeout(fn, options?.timeout ?? 1) as unknown as number;
}

/**
 * Cancel a scheduled idle callback.
 */
export function cancelIdle(id: number): void {
  if (typeof cancelIdleCallback === 'function') {
    cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}
