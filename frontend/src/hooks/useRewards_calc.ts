import { useState, useCallback, useEffect } from 'react';

interface Rewards_calcState { data: unknown; loading: boolean; error: string | null; initialized: boolean; }

export function useRewards_calc() {
  const [state, setState] = useState<Rewards_calcState>({ data: null, loading: false, error: null, initialized: false });

  const fetch = useCallback(async () => {
    setState(p => ({ ...p, loading: true, error: null }));
    try {
      setState(p => ({ ...p, data: {}, loading: false, initialized: true }));
    } catch (err) {
      setState(p => ({ ...p, error: err instanceof Error ? err.message : 'Failed', loading: false }));
    }
  }, []);

  const reset = useCallback(() => setState({ data: null, loading: false, error: null, initialized: false }), []);
  useEffect(() => { fetch(); }, [fetch]);
  return { ...state, refetch: fetch, reset };
}
