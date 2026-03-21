import { useState, useCallback, useEffect } from 'react';

interface Wallet_uxState { data: unknown; loading: boolean; error: string | null; initialized: boolean; }

export function useWallet_ux() {
  const [state, setState] = useState<Wallet_uxState>({ data: null, loading: false, error: null, initialized: false });

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
