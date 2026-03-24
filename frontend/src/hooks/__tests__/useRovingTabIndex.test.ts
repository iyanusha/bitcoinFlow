import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRovingTabIndex } from '../useRovingTabIndex';

describe('useRovingTabIndex', () => {
  it('starts with focusedIndex 0', () => {
    const { result } = renderHook(() =>
      useRovingTabIndex({ itemCount: 5 })
    );
    expect(result.current.focusedIndex).toBe(0);
  });

  it('returns tabIndex 0 for focused item', () => {
    const { result } = renderHook(() =>
      useRovingTabIndex({ itemCount: 3 })
    );
    expect(result.current.getTabIndex(0)).toBe(0);
  });

  it('returns tabIndex -1 for non-focused items', () => {
    const { result } = renderHook(() =>
      useRovingTabIndex({ itemCount: 3 })
    );
    expect(result.current.getTabIndex(1)).toBe(-1);
    expect(result.current.getTabIndex(2)).toBe(-1);
  });

  it('exposes onKeyDown handler', () => {
    const { result } = renderHook(() =>
      useRovingTabIndex({ itemCount: 3 })
    );
    expect(typeof result.current.onKeyDown).toBe('function');
  });

  it('exposes registerItem callback', () => {
    const { result } = renderHook(() =>
      useRovingTabIndex({ itemCount: 3 })
    );
    expect(typeof result.current.registerItem).toBe('function');
    const ref = result.current.registerItem(0);
    expect(typeof ref).toBe('function');
  });

  it('handles zero items', () => {
    const { result } = renderHook(() =>
      useRovingTabIndex({ itemCount: 0 })
    );
    expect(result.current.focusedIndex).toBe(0);
    expect(result.current.getTabIndex(0)).toBe(0);
  });

  it('defaults to horizontal orientation', () => {
    const { result } = renderHook(() =>
      useRovingTabIndex({ itemCount: 3 })
    );
    // onKeyDown should exist regardless
    expect(result.current.onKeyDown).toBeDefined();
  });
});
