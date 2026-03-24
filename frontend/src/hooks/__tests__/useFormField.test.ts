import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormField } from '../useFormField';
import { validateAmount } from '../../lib/validation';

describe('useFormField', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useFormField());
    expect(result.current.value).toBe('');
    expect(result.current.error).toBeNull();
    expect(result.current.touched).toBe(false);
    expect(result.current.dirty).toBe(false);
  });

  it('initializes with custom value', () => {
    const { result } = renderHook(() => useFormField('42'));
    expect(result.current.value).toBe('42');
  });

  it('updates value and marks dirty', () => {
    const { result } = renderHook(() => useFormField());
    act(() => result.current.setValue('test'));
    expect(result.current.value).toBe('test');
    expect(result.current.dirty).toBe(true);
  });

  it('validates on blur', () => {
    const { result } = renderHook(() => useFormField('', validateAmount));
    act(() => result.current.onBlur());
    expect(result.current.touched).toBe(true);
    expect(result.current.error).toBe('Amount is required');
    expect(result.current.isInvalid).toBe(true);
  });

  it('validates on change after touch', () => {
    const { result } = renderHook(() => useFormField('', validateAmount));
    act(() => result.current.onBlur());
    act(() => result.current.setValue('5'));
    expect(result.current.error).toBeNull();
    expect(result.current.isValid).toBe(true);
  });

  it('does not validate on change before touch', () => {
    const { result } = renderHook(() => useFormField('', validateAmount));
    act(() => result.current.setValue('abc'));
    expect(result.current.error).toBeNull();
  });

  it('resets all state', () => {
    const { result } = renderHook(() => useFormField('initial', validateAmount));
    act(() => result.current.setValue('changed'));
    act(() => result.current.onBlur());
    act(() => result.current.reset());
    expect(result.current.value).toBe('initial');
    expect(result.current.error).toBeNull();
    expect(result.current.touched).toBe(false);
    expect(result.current.dirty).toBe(false);
  });

  it('validate returns boolean', () => {
    const { result } = renderHook(() => useFormField('', validateAmount));
    let isValid: boolean;
    act(() => { isValid = result.current.validate(); });
    expect(isValid!).toBe(false);
  });

  it('allows manual error setting', () => {
    const { result } = renderHook(() => useFormField());
    act(() => result.current.setError('Custom error'));
    expect(result.current.error).toBe('Custom error');
  });
});
