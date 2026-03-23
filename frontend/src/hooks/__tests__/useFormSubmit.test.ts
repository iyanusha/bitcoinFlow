import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormSubmit } from '../useFormSubmit';

describe('useFormSubmit', () => {
  it('starts with idle state', () => {
    const { result } = renderHook(() => useFormSubmit(vi.fn()));
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitError).toBeNull();
  });

  it('sets submitting during submit', async () => {
    let resolve: () => void;
    const onSubmit = vi.fn(() => new Promise<void>(r => { resolve = r; }));
    const { result } = renderHook(() => useFormSubmit(onSubmit));

    let submitPromise: Promise<void>;
    act(() => { submitPromise = result.current.submit({ amount: '5' }); });
    expect(result.current.isSubmitting).toBe(true);

    await act(async () => { resolve!(); await submitPromise!; });
    expect(result.current.isSubmitting).toBe(false);
  });

  it('calls onSuccess on successful submit', async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useFormSubmit(vi.fn().mockResolvedValue(undefined), { onSuccess })
    );
    await act(async () => { await result.current.submit({}); });
    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it('sets error on failed submit', async () => {
    const { result } = renderHook(() =>
      useFormSubmit(vi.fn().mockRejectedValue(new Error('Network error')))
    );
    await act(async () => { await result.current.submit({}); });
    expect(result.current.submitError).toBe('Network error');
  });

  it('calls onError on failed submit', async () => {
    const onError = vi.fn();
    const { result } = renderHook(() =>
      useFormSubmit(vi.fn().mockRejectedValue(new Error('Failed')), { onError })
    );
    await act(async () => { await result.current.submit({}); });
    expect(onError).toHaveBeenCalledWith('Failed');
  });

  it('clears error', async () => {
    const { result } = renderHook(() =>
      useFormSubmit(vi.fn().mockRejectedValue(new Error('Error')))
    );
    await act(async () => { await result.current.submit({}); });
    expect(result.current.submitError).toBe('Error');
    act(() => result.current.clearError());
    expect(result.current.submitError).toBeNull();
  });

  it('handles non-Error throws', async () => {
    const { result } = renderHook(() =>
      useFormSubmit(vi.fn().mockRejectedValue('string error'))
    );
    await act(async () => { await result.current.submit({}); });
    expect(result.current.submitError).toBe('An error occurred');
  });
});
