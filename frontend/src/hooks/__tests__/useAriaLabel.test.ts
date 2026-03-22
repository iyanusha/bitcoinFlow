import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAriaLabel } from '../useAriaLabel';

describe('useAriaLabel', () => {
  it('returns just the label when no options set', () => {
    const { result } = renderHook(() => useAriaLabel({ label: 'Vault stats' }));
    expect(result.current).toBe('Vault stats');
  });

  it('appends state when provided', () => {
    const { result } = renderHook(() =>
      useAriaLabel({ label: 'Vault stats', state: 'loaded' })
    );
    expect(result.current).toBe('Vault stats, loaded');
  });

  it('shows loading state', () => {
    const { result } = renderHook(() =>
      useAriaLabel({ label: 'Vault stats', loading: true })
    );
    expect(result.current).toBe('Vault stats, loading');
  });

  it('shows error state', () => {
    const { result } = renderHook(() =>
      useAriaLabel({ label: 'Vault stats', error: 'Failed to load' })
    );
    expect(result.current).toBe('Vault stats, error: Failed to load');
  });

  it('prioritizes loading over state', () => {
    const { result } = renderHook(() =>
      useAriaLabel({ label: 'Stats', loading: true, state: 'ready' })
    );
    expect(result.current).toBe('Stats, loading');
  });

  it('includes count when provided', () => {
    const { result } = renderHook(() =>
      useAriaLabel({ label: 'Transactions', count: 5 })
    );
    expect(result.current).toBe('Transactions, 5 items');
  });

  it('combines state and count', () => {
    const { result } = renderHook(() =>
      useAriaLabel({ label: 'List', state: 'filtered', count: 3 })
    );
    expect(result.current).toBe('List, filtered, 3 items');
  });
});
