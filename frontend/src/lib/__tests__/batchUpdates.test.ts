import { describe, expect, it, vi } from 'vitest';
import { batchUpdates, scheduleIdle, cancelIdle } from '../batchUpdates';

describe('batchUpdates', () => {
  it('executes the provided function', () => {
    const fn = vi.fn();
    batchUpdates(fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('scheduleIdle', () => {
  it('schedules callback using requestIdleCallback when available', () => {
    const mockRIC = vi.fn(() => 42);
    vi.stubGlobal('requestIdleCallback', mockRIC);
    const fn = vi.fn();
    const id = scheduleIdle(fn);
    expect(id).toBe(42);
    expect(mockRIC).toHaveBeenCalledWith(fn, undefined);
    vi.unstubAllGlobals();
  });

  it('falls back to setTimeout when requestIdleCallback unavailable', () => {
    vi.useFakeTimers();
    const original = globalThis.requestIdleCallback;
    // @ts-expect-error: removing for test
    delete globalThis.requestIdleCallback;
    const fn = vi.fn();
    scheduleIdle(fn, { timeout: 10 });
    vi.advanceTimersByTime(10);
    expect(fn).toHaveBeenCalledTimes(1);
    globalThis.requestIdleCallback = original;
    vi.useRealTimers();
  });
});

describe('cancelIdle', () => {
  it('calls cancelIdleCallback when available', () => {
    const mockCIC = vi.fn();
    vi.stubGlobal('cancelIdleCallback', mockCIC);
    cancelIdle(42);
    expect(mockCIC).toHaveBeenCalledWith(42);
    vi.unstubAllGlobals();
  });
});
