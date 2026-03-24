import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useForm } from '../useForm';
import { validateAmount } from '../../lib/validation';

describe('useForm', () => {
  const initialValues = { amount: '', address: '' };

  it('initializes with provided values', () => {
    const { result } = renderHook(() => useForm(initialValues));
    expect(result.current.values.amount).toBe('');
    expect(result.current.values.address).toBe('');
  });

  it('updates a single field', () => {
    const { result } = renderHook(() => useForm(initialValues));
    act(() => result.current.setValue('amount', '42'));
    expect(result.current.values.amount).toBe('42');
    expect(result.current.values.address).toBe('');
  });

  it('tracks dirty state', () => {
    const { result } = renderHook(() => useForm(initialValues));
    expect(result.current.isDirty).toBe(false);
    act(() => result.current.setValue('amount', '5'));
    expect(result.current.isDirty).toBe(true);
  });

  it('validates on blur', () => {
    const { result } = renderHook(() =>
      useForm(initialValues, { amount: validateAmount })
    );
    act(() => result.current.onBlur('amount'));
    expect(result.current.errors.amount).toBe('Amount is required');
    expect(result.current.touched.amount).toBe(true);
  });

  it('validates all fields', () => {
    const { result } = renderHook(() =>
      useForm(initialValues, { amount: validateAmount })
    );
    let isValid: boolean;
    act(() => { isValid = result.current.validateAll(); });
    expect(isValid!).toBe(false);
    expect(result.current.errors.amount).toBeTruthy();
  });

  it('passes validateAll when fields are valid', () => {
    const values = { amount: '5' };
    const { result } = renderHook(() =>
      useForm(values, { amount: validateAmount })
    );
    let isValid: boolean;
    act(() => { isValid = result.current.validateAll(); });
    expect(isValid!).toBe(true);
  });

  it('resets to initial values', () => {
    const { result } = renderHook(() => useForm(initialValues));
    act(() => result.current.setValue('amount', '42'));
    act(() => result.current.reset());
    expect(result.current.values.amount).toBe('');
    expect(result.current.isDirty).toBe(false);
  });

  it('getFieldProps returns value, onChange, onBlur', () => {
    const { result } = renderHook(() => useForm(initialValues));
    const props = result.current.getFieldProps('amount');
    expect(props.value).toBe('');
    expect(typeof props.onChange).toBe('function');
    expect(typeof props.onBlur).toBe('function');
  });

  it('allows manual error setting', () => {
    const { result } = renderHook(() => useForm(initialValues));
    act(() => result.current.setError('amount', 'Server error'));
    expect(result.current.errors.amount).toBe('Server error');
  });
});
