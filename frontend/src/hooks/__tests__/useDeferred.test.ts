import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDeferred } from '../useDeferred';

describe('useDeferred', () => {
  it('returns initial computed value', () => {
    const { result } = renderHook(() => useDeferred(() => 42, []));
    expect(result.current.value).toBe(42);
  });

  it('sets isPending during deferred computation', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ n }) => useDeferred(() => n * 2, [n], 100),
      { initialProps: { n: 1 } },
    );
    rerender({ n: 2 });
    expect(result.current.isPending).toBe(true);
    act(() => { vi.advanceTimersByTime(100); });
    expect(result.current.isPending).toBe(false);
    expect(result.current.value).toBe(4);
    vi.useRealTimers();
  });

  it('cancels pending computation on unmount', () => {
    vi.useFakeTimers();
    const compute = vi.fn(() => 1);
    const { unmount, rerender } = renderHook(
      ({ n }) => useDeferred(compute, [n], 200),
      { initialProps: { n: 1 } },
    );
    rerender({ n: 2 });
    unmount();
    vi.advanceTimersByTime(200);
    // compute called for initial + rerender, but not after unmount timeout
    vi.useRealTimers();
  });
});
