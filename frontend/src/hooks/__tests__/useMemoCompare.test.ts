import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMemoCompare } from '../useMemoCompare';

describe('useMemoCompare', () => {
  it('returns initial value on first render', () => {
    const { result } = renderHook(() =>
      useMemoCompare({ a: 1 }, (prev, next) => prev?.a === next.a),
    );
    expect(result.current).toEqual({ a: 1 });
  });

  it('returns previous reference when compare says equal', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const { result, rerender } = renderHook(
      ({ value }) => useMemoCompare(value, (prev, next) => prev?.a === next.a),
      { initialProps: { value: obj1 } },
    );
    const firstResult = result.current;
    rerender({ value: obj2 });
    expect(result.current).toBe(firstResult);
  });

  it('returns new value when compare says not equal', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 2 };
    const { result, rerender } = renderHook(
      ({ value }) => useMemoCompare(value, (prev, next) => prev?.a === next.a),
      { initialProps: { value: obj1 } },
    );
    rerender({ value: obj2 });
    expect(result.current).toEqual({ a: 2 });
  });
});
