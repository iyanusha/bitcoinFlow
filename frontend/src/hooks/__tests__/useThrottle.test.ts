import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useThrottle } from '../useThrottle';

describe('useThrottle', () => {
  afterEach(() => { vi.useRealTimers(); });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useThrottle('hello', 200));
    expect(result.current).toBe('hello');
  });

  it('throttles rapid value changes', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 200),
      { initialProps: { value: 'a' } },
    );
    expect(result.current).toBe('a');

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current).toBe('b');
  });

  it('updates immediately after interval has passed', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 100),
      { initialProps: { value: 1 } },
    );

    act(() => { vi.advanceTimersByTime(150); });
    rerender({ value: 2 });
    expect(result.current).toBe(2);
  });
});
