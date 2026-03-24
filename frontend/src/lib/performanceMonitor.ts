export interface PerformanceEntry {
  name: string;
  duration: number;
  timestamp: number;
}

const entries: PerformanceEntry[] = [];
const MAX_ENTRIES = 100;

/**
 * Measure the execution time of a synchronous function.
 */
export function measureSync<T>(name: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  recordEntry(name, duration);
  return result;
}

/**
 * Measure the execution time of an async function.
 */
export async function measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;
  recordEntry(name, duration);
  return result;
}

function recordEntry(name: string, duration: number): void {
  entries.push({ name, duration, timestamp: Date.now() });
  if (entries.length > MAX_ENTRIES) {
    entries.splice(0, entries.length - MAX_ENTRIES);
  }
}

/**
 * Get all recorded performance entries.
 */
export function getPerformanceEntries(): readonly PerformanceEntry[] {
  return entries;
}

/**
 * Get entries filtered by name.
 */
export function getEntriesByName(name: string): PerformanceEntry[] {
  return entries.filter((e) => e.name === name);
}

/**
 * Get average duration for a named operation.
 */
export function getAverageDuration(name: string): number {
  const matching = getEntriesByName(name);
  if (matching.length === 0) return 0;
  return matching.reduce((sum, e) => sum + e.duration, 0) / matching.length;
}

/**
 * Clear all entries.
 */
export function clearPerformanceEntries(): void {
  entries.length = 0;
}

/**
 * Mark a point in time for later measurement.
 */
export function markStart(name: string): () => number {
  const start = performance.now();
  return () => {
    const duration = performance.now() - start;
    recordEntry(name, duration);
    return duration;
  };
}
