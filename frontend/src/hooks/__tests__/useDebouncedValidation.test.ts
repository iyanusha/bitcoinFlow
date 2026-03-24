import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedValidation } from '../useDebouncedValidation';
import { validateAmount } from '../../lib/validation';

describe('useDebouncedValidation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns null error initially', () => {
    const { result } = renderHook(() => useDebouncedValidation('', validateAmount));
    expect(result.current.error).toBeNull();
  });

  it('does not validate empty value', () => {
    const { result } = renderHook(() => useDebouncedValidation('', validateAmount));
    expect(result.current.isValidating).toBe(false);
  });

  it('sets isValidating while waiting', () => {
    const { result } = renderHook(() => useDebouncedValidation('abc', validateAmount, 300));
    expect(result.current.isValidating).toBe(true);
  });

  it('validates after delay', () => {
    const { result } = renderHook(() => useDebouncedValidation('abc', validateAmount, 300));
    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current.error).toBe('Please enter a valid number');
    expect(result.current.isValidating).toBe(false);
  });

  it('clears error for valid input after delay', () => {
    const { result } = renderHook(() => useDebouncedValidation('5', validateAmount, 300));
    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current.error).toBeNull();
  });

  it('resets when value changes to empty', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValidation(value, validateAmount, 300),
      { initialProps: { value: 'abc' } },
    );
    rerender({ value: '' });
    expect(result.current.error).toBeNull();
    expect(result.current.isValidating).toBe(false);
  });
});
