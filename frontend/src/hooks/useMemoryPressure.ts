import { useState, useEffect, useCallback } from 'react';

export interface MemoryInfo {
  /** Used JS heap in MB */
  usedMB: number;
  /** Total JS heap in MB */
  totalMB: number;
  /** Heap utilization ratio (0-1) */
  ratio: number;
  /** Whether the browser supports performance.memory */
  supported: boolean;
}

const DEFAULT_MEMORY: MemoryInfo = {
  usedMB: 0,
  totalMB: 0,
  ratio: 0,
  supported: false,
};

/**
 * Monitor JS heap memory usage for adaptive loading decisions.
 * Only works in Chromium browsers (performance.memory).
 * Falls back gracefully with supported: false in other browsers.
 */
export function useMemoryPressure(intervalMs = 10000): MemoryInfo {
  const [memory, setMemory] = useState<MemoryInfo>(DEFAULT_MEMORY);

  const sample = useCallback(() => {
    const perf = performance as Performance & {
      memory?: { usedJSHeapSize: number; totalJSHeapSize: number };
    };

    if (!perf.memory) {
      return DEFAULT_MEMORY;
    }

    const usedMB = Math.round(perf.memory.usedJSHeapSize / 1048576);
    const totalMB = Math.round(perf.memory.totalJSHeapSize / 1048576);
    const ratio = totalMB > 0 ? usedMB / totalMB : 0;

    return { usedMB, totalMB, ratio, supported: true };
  }, []);

  useEffect(() => {
    setMemory(sample());

    const id = setInterval(() => {
      setMemory(sample());
    }, intervalMs);

    return () => clearInterval(id);
  }, [sample, intervalMs]);

  return memory;
}
