import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFieldTouched } from '../useFieldTouched';

describe('useFieldTouched', () => {
  it('initializes all fields as untouched', () => {
    const { result } = renderHook(() => useFieldTouched(['name', 'email']));
    expect(result.current.isTouched('name')).toBe(false);
    expect(result.current.isTouched('email')).toBe(false);
    expect(result.current.isAnyTouched).toBe(false);
  });

  it('touches a single field', () => {
    const { result } = renderHook(() => useFieldTouched(['name', 'email']));
    act(() => result.current.touch('name'));
    expect(result.current.isTouched('name')).toBe(true);
    expect(result.current.isTouched('email')).toBe(false);
    expect(result.current.isAnyTouched).toBe(true);
  });

  it('touches all fields', () => {
    const { result } = renderHook(() => useFieldTouched(['name', 'email']));
    act(() => result.current.touchAll());
    expect(result.current.isTouched('name')).toBe(true);
    expect(result.current.isTouched('email')).toBe(true);
  });

  it('resets all touched state', () => {
    const { result } = renderHook(() => useFieldTouched(['name', 'email']));
    act(() => result.current.touchAll());
    act(() => result.current.resetTouched());
    expect(result.current.isTouched('name')).toBe(false);
    expect(result.current.isTouched('email')).toBe(false);
    expect(result.current.isAnyTouched).toBe(false);
  });

  it('provides touched record', () => {
    const { result } = renderHook(() => useFieldTouched(['a', 'b']));
    act(() => result.current.touch('a'));
    expect(result.current.touched).toEqual({ a: true, b: false });
  });
});
