import { useState, useCallback } from 'react';

type AsyncState<T> = { data: T | null; loading: boolean; error: string | null; };

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: false, error: null });

  const execute = useCallback(async (fn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fn();
      setState({ data, loading: false, error: null });
      return data;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      setState({ data: null, loading: false, error });
      throw err;
    }
  }, []);

  return { ...state, execute };
}
