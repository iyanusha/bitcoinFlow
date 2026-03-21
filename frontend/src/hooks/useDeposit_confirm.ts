import { useState, useCallback, useEffect } from 'react';

interface Deposit_confirmState { data: unknown; loading: boolean; error: string | null; initialized: boolean; }

export function useDeposit_confirm() {
  const [state, setState] = useState<Deposit_confirmState>({ data: null, loading: false, error: null, initialized: false });

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
