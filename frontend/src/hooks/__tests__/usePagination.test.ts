import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../usePagination';

const items = Array.from({ length: 25 }, (_, i) => i + 1);

describe('usePagination', () => {
  it('returns first page items', () => {
    const { result } = renderHook(() => usePagination(items, 10));
    expect(result.current.pageItems).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('starts on page 0', () => {
    const { result } = renderHook(() => usePagination(items, 10));
    expect(result.current.currentPage).toBe(0);
  });

  it('calculates total pages', () => {
    const { result } = renderHook(() => usePagination(items, 10));
    expect(result.current.totalPages).toBe(3);
  });

  it('has next on first page', () => {
    const { result } = renderHook(() => usePagination(items, 10));
    expect(result.current.hasNext).toBe(true);
    expect(result.current.hasPrev).toBe(false);
  });

  it('navigates to next page', () => {
    const { result } = renderHook(() => usePagination(items, 10));
    act(() => result.current.nextPage());
    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageItems).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it('navigates to previous page', () => {
    const { result } = renderHook(() => usePagination(items, 10));
    act(() => result.current.nextPage());
    act(() => result.current.prevPage());
    expect(result.current.currentPage).toBe(0);
  });

  it('does not go before first page', () => {
    const { result } = renderHook(() => usePagination(items, 10));
    act(() => result.current.prevPage());
    expect(result.current.currentPage).toBe(0);
  });

  it('does not go past last page', () => {
    const { result } = renderHook(() => usePagination(items, 10));
    act(() => result.current.goToPage(2));
    act(() => result.current.nextPage());
    expect(result.current.currentPage).toBe(2);
  });

  it('goes to a specific page', () => {
    const { result } = renderHook(() => usePagination(items, 10));
    act(() => result.current.goToPage(2));
    expect(result.current.currentPage).toBe(2);
    expect(result.current.pageItems).toEqual([21, 22, 23, 24, 25]);
  });

  it('resets to first page', () => {
    const { result } = renderHook(() => usePagination(items, 10));
    act(() => result.current.nextPage());
    act(() => result.current.reset());
    expect(result.current.currentPage).toBe(0);
  });

  it('handles empty items', () => {
    const { result } = renderHook(() => usePagination([], 10));
    expect(result.current.totalPages).toBe(1);
    expect(result.current.pageItems).toEqual([]);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.hasPrev).toBe(false);
  });
});
