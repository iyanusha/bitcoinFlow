import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInputMask } from '../useInputMask';

describe('useInputMask', () => {
  const commasMask = {
    mask: (v: string) => {
      const num = parseFloat(v);
      return isNaN(num) ? v : num.toLocaleString('en-US');
    },
    unmask: (v: string) => v.replace(/,/g, ''),
  };

  it('initializes with empty value', () => {
    const { result } = renderHook(() => useInputMask('', commasMask));
    expect(result.current.rawValue).toBe('');
  });

  it('initializes with provided value', () => {
    const { result } = renderHook(() => useInputMask('1000', commasMask));
    expect(result.current.rawValue).toBe('1000');
    expect(result.current.displayValue).toBe('1,000');
  });

  it('updates raw value on change', () => {
    const { result } = renderHook(() => useInputMask('', commasMask));
    act(() => result.current.onChange('1,234'));
    expect(result.current.rawValue).toBe('1234');
  });

  it('applies mask to display value', () => {
    const { result } = renderHook(() => useInputMask('', commasMask));
    act(() => result.current.onChange('1,234,567'));
    expect(result.current.displayValue).toBe('1,234,567');
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useInputMask('100', commasMask));
    act(() => result.current.onChange('999'));
    act(() => result.current.reset());
    expect(result.current.rawValue).toBe('100');
  });

  it('works with identity unmask', () => {
    const { result } = renderHook(() =>
      useInputMask('', { mask: v => v.toUpperCase() })
    );
    act(() => result.current.onChange('hello'));
    expect(result.current.rawValue).toBe('hello');
    expect(result.current.displayValue).toBe('HELLO');
  });
});
