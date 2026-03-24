import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRenderCount } from '../useRenderCount';

describe('useRenderCount', () => {
  it('starts at 1 on first render', () => {
    const { result } = renderHook(() => useRenderCount());
    expect(result.current).toBe(1);
  });

  it('increments on rerender', () => {
    const { result, rerender } = renderHook(() => useRenderCount());
    expect(result.current).toBe(1);
    rerender();
    expect(result.current).toBe(2);
    rerender();
    expect(result.current).toBe(3);
  });
});
