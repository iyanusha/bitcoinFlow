import { useState, useCallback } from 'react';

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';
type AsyncState<T> = { data: T | null; loading: boolean; error: string | null; status: AsyncStatus; };

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: false, error: null, status: 'idle' });

  const execute = useCallback(async (fn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null, status: 'loading' });
    try {
      const data = await fn();
      setState({ data, loading: false, error: null, status: 'success' });
      return data;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      setState({ data: null, loading: false, error, status: 'error' });
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null, status: 'idle' });
  }, []);

  return { ...state, execute, reset };
}
