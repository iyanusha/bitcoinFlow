/**
 * Simple memoization with a single-entry cache.
 * Best for functions called repeatedly with the same arguments.
 */
export function memoizeOne<T extends (...args: unknown[]) => unknown>(fn: T): T {
  let lastArgs: unknown[] | null = null;
  let lastResult: unknown;

  const memoized = (...args: unknown[]) => {
    if (lastArgs && argsEqual(lastArgs, args)) {
      return lastResult;
    }
    lastResult = fn(...args);
    lastArgs = args;
    return lastResult;
  };

  return memoized as T;
}

function argsEqual(prev: unknown[], next: unknown[]): boolean {
  if (prev.length !== next.length) return false;
  for (let i = 0; i < prev.length; i++) {
    if (!Object.is(prev[i], next[i])) return false;
  }
  return true;
}
