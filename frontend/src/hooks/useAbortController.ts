import { useRef, useEffect, useCallback } from 'react';

/**
 * Manage an AbortController that auto-aborts on unmount.
 * Useful for cancelling pending fetch/API requests.
 */
export function useAbortController(): {
  getSignal: () => AbortSignal;
  abort: () => void;
} {
  const controllerRef = useRef<AbortController>(new AbortController());

  const getSignal = useCallback(() => {
    if (controllerRef.current.signal.aborted) {
      controllerRef.current = new AbortController();
    }
    return controllerRef.current.signal;
  }, []);

  const abort = useCallback(() => {
    controllerRef.current.abort();
  }, []);

  useEffect(() => {
    return () => {
      controllerRef.current.abort();
    };
  }, []);

  return { getSignal, abort };
}
