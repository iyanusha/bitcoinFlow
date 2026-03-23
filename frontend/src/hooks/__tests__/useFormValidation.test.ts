import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '../useFormValidation';
import type { ValidationResult } from '../../lib/validation';

describe('useFormValidation', () => {
  const positiveNumber = (v: string): ValidationResult => {
    const n = parseFloat(v);
    if (isNaN(n) || n <= 0) return { isValid: false, error: 'Must be a positive number' };
    return { isValid: true, error: null };
  };

  it('starts with no error and untouched', () => {
    const { result } = renderHook(() => useFormValidation(positiveNumber));
    expect(result.current.error).toBeNull();
    expect(result.current.touched).toBe(false);
    expect(result.current.isValid).toBe(false);
    expect(result.current.isInvalid).toBe(false);
  });

  it('validates a valid value', () => {
    const { result } = renderHook(() => useFormValidation(positiveNumber));
    act(() => {
      result.current.onBlur('42');
    });
    expect(result.current.touched).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.isValid).toBe(true);
    expect(result.current.isInvalid).toBe(false);
  });

  it('validates an invalid value', () => {
    const { result } = renderHook(() => useFormValidation(positiveNumber));
    act(() => {
      result.current.onBlur('-1');
    });
    expect(result.current.touched).toBe(true);
    expect(result.current.error).toBe('Must be a positive number');
    expect(result.current.isValid).toBe(false);
    expect(result.current.isInvalid).toBe(true);
  });

  it('clears error state', () => {
    const { result } = renderHook(() => useFormValidation(positiveNumber));
    act(() => {
      result.current.onBlur('-1');
    });
    expect(result.current.isInvalid).toBe(true);
    act(() => {
      result.current.clearError();
    });
    expect(result.current.error).toBeNull();
    expect(result.current.touched).toBe(false);
  });

  it('returns validation result from validate()', () => {
    const { result } = renderHook(() => useFormValidation(positiveNumber));
    let valid: boolean;
    act(() => {
      valid = result.current.validate('0');
    });
    expect(valid!).toBe(false);
    expect(result.current.error).toBe('Must be a positive number');
  });

  it('returns true from validate() for valid input', () => {
    const { result } = renderHook(() => useFormValidation(positiveNumber));
    let valid: boolean;
    act(() => {
      valid = result.current.validate('100');
    });
    expect(valid!).toBe(true);
    expect(result.current.error).toBeNull();
  });
});
