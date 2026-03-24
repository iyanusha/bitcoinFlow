import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMemoryPressure } from '../useMemoryPressure';

describe('useMemoryPressure', () => {
  const originalMemory = (performance as unknown as Record<string, unknown>).memory;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    if (originalMemory) {
      Object.defineProperty(performance, 'memory', {
        value: originalMemory,
        configurable: true,
      });
    } else {
      delete (performance as unknown as Record<string, unknown>).memory;
    }
  });

  it('returns default values when performance.memory is unavailable', () => {
    delete (performance as unknown as Record<string, unknown>).memory;
    const { result } = renderHook(() => useMemoryPressure());
    expect(result.current.supported).toBe(false);
    expect(result.current.usedMB).toBe(0);
    expect(result.current.ratio).toBe(0);
  });

  it('reports memory info when performance.memory is available', () => {
    Object.defineProperty(performance, 'memory', {
      value: {
        usedJSHeapSize: 50 * 1048576, // 50 MB
        totalJSHeapSize: 100 * 1048576, // 100 MB
      },
      configurable: true,
    });

    const { result } = renderHook(() => useMemoryPressure());
    expect(result.current.supported).toBe(true);
    expect(result.current.usedMB).toBe(50);
    expect(result.current.totalMB).toBe(100);
    expect(result.current.ratio).toBeCloseTo(0.5);
  });

  it('updates on interval', () => {
    let used = 30 * 1048576;
    Object.defineProperty(performance, 'memory', {
      get: () => ({
        usedJSHeapSize: used,
        totalJSHeapSize: 100 * 1048576,
      }),
      configurable: true,
    });

    const { result } = renderHook(() => useMemoryPressure(5000));
    expect(result.current.usedMB).toBe(30);

    used = 60 * 1048576;
    act(() => { vi.advanceTimersByTime(5000); });
    expect(result.current.usedMB).toBe(60);
  });

  it('cleans up interval on unmount', () => {
    Object.defineProperty(performance, 'memory', {
      value: { usedJSHeapSize: 10 * 1048576, totalJSHeapSize: 50 * 1048576 },
      configurable: true,
    });

    const clearSpy = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = renderHook(() => useMemoryPressure());
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
