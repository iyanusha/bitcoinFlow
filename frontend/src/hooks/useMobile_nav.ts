import { useState, useCallback, useEffect } from 'react';

interface Mobile_navState { data: unknown; loading: boolean; error: string | null; initialized: boolean; }

export function useMobile_nav() {
  const [state, setState] = useState<Mobile_navState>({ data: null, loading: false, error: null, initialized: false });

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
