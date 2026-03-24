import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLatestRef } from '../useLatestRef';

describe('useLatestRef', () => {
  it('returns ref with initial value', () => {
    const { result } = renderHook(() => useLatestRef(42));
    expect(result.current.current).toBe(42);
  });

  it('updates ref on value change', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatestRef(value),
      { initialProps: { value: 'a' } },
    );
    expect(result.current.current).toBe('a');
    rerender({ value: 'b' });
    expect(result.current.current).toBe('b');
  });

  it('maintains same ref object across renders', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatestRef(value),
      { initialProps: { value: 1 } },
    );
    const firstRef = result.current;
    rerender({ value: 2 });
    expect(result.current).toBe(firstRef);
  });
});
