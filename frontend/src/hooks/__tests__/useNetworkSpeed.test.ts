import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useNetworkSpeed } from '../useNetworkSpeed';

describe('useNetworkSpeed', () => {
  it('returns default values when API unavailable', () => {
    const { result } = renderHook(() => useNetworkSpeed());
    expect(result.current.effectiveType).toBe('unknown');
    expect(result.current.downlink).toBe(10);
    expect(result.current.saveData).toBe(false);
  });

  it('returns network info shape', () => {
    const { result } = renderHook(() => useNetworkSpeed());
    expect(result.current).toHaveProperty('effectiveType');
    expect(result.current).toHaveProperty('downlink');
    expect(result.current).toHaveProperty('rtt');
    expect(result.current).toHaveProperty('saveData');
  });
});
