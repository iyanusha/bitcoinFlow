import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTransactionHistory } from '../useTransactionHistory';

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('useTransactionHistory', () => {
  it('starts with empty transactions', () => {
    const { result } = renderHook(() => useTransactionHistory());
    expect(result.current.transactions).toEqual([]);
  });

  it('adds a transaction', () => {
    const { result } = renderHook(() => useTransactionHistory());
    act(() => {
      result.current.addTransaction({ txId: '0x1', type: 'deposit', amount: 100 });
    });
    expect(result.current.transactions).toHaveLength(1);
    expect(result.current.transactions[0].status).toBe('pending');
    expect(result.current.transactions[0].txId).toBe('0x1');
  });

  it('updates transaction status', () => {
    const { result } = renderHook(() => useTransactionHistory());
    act(() => {
      result.current.addTransaction({ txId: '0x1', type: 'deposit', amount: 100 });
    });
    act(() => {
      result.current.updateStatus('0x1', 'confirmed');
    });
    expect(result.current.transactions[0].status).toBe('confirmed');
  });

  it('clears history', () => {
    const { result } = renderHook(() => useTransactionHistory());
    act(() => {
      result.current.addTransaction({ txId: '0x1', type: 'deposit', amount: 100 });
    });
    act(() => {
      result.current.clearHistory();
    });
    expect(result.current.transactions).toHaveLength(0);
  });

  it('tracks pending count', () => {
    const { result } = renderHook(() => useTransactionHistory());
    act(() => {
      result.current.addTransaction({ txId: '0x1', type: 'deposit', amount: 100 });
      result.current.addTransaction({ txId: '0x2', type: 'withdraw', amount: 50 });
    });
    expect(result.current.pendingCount).toBe(2);
    expect(result.current.hasPending).toBe(true);
  });

  it('hasPending is false when no pending', () => {
    const { result } = renderHook(() => useTransactionHistory());
    expect(result.current.hasPending).toBe(false);
  });

  it('newest transaction appears first', () => {
    const { result } = renderHook(() => useTransactionHistory());
    act(() => {
      result.current.addTransaction({ txId: '0x1', type: 'deposit', amount: 100 });
    });
    act(() => {
      result.current.addTransaction({ txId: '0x2', type: 'withdraw', amount: 50 });
    });
    expect(result.current.transactions[0].txId).toBe('0x2');
  });
});
