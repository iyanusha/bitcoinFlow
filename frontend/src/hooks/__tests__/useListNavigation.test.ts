import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useListNavigation } from '../useListNavigation';

describe('useListNavigation', () => {
  it('starts with no active item', () => {
    const { result } = renderHook(() =>
      useListNavigation({ itemCount: 5 })
    );
    expect(result.current.activeIndex).toBe(-1);
  });

  it('returns list props with correct role', () => {
    const { result } = renderHook(() =>
      useListNavigation({ itemCount: 5 })
    );
    expect(result.current.listProps.role).toBe('listbox');
    expect(result.current.listProps.tabIndex).toBe(0);
  });

  it('generates unique item IDs', () => {
    const { result } = renderHook(() =>
      useListNavigation({ itemCount: 3 })
    );
    const id0 = result.current.getItemId(0);
    const id1 = result.current.getItemId(1);
    expect(id0).not.toBe(id1);
  });

  it('isActive returns false when no item is active', () => {
    const { result } = renderHook(() =>
      useListNavigation({ itemCount: 3 })
    );
    expect(result.current.isActive(0)).toBe(false);
    expect(result.current.isActive(1)).toBe(false);
  });

  it('has undefined activedescendant when no item active', () => {
    const { result } = renderHook(() =>
      useListNavigation({ itemCount: 3 })
    );
    expect(result.current.listProps['aria-activedescendant']).toBeUndefined();
  });

  it('handles zero items gracefully', () => {
    const { result } = renderHook(() =>
      useListNavigation({ itemCount: 0 })
    );
    expect(result.current.activeIndex).toBe(-1);
  });

  it('accepts onActivate callback', () => {
    const onActivate = vi.fn();
    const { result } = renderHook(() =>
      useListNavigation({ itemCount: 3, onActivate })
    );
    expect(result.current.listProps.onKeyDown).toBeDefined();
  });
});
