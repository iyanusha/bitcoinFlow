import { useState, useCallback, useRef } from 'react';
import { copyToClipboard } from '../lib/clipboard';
import { ANIMATION } from '../lib/constants';

/**
 * Hook for clipboard operations with feedback state.
 * Returns { copy, copied } where copied is true for COPY_FEEDBACK_MS after a successful copy.
 */
export function useClipboard(feedbackMs = ANIMATION.COPY_FEEDBACK_MS) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), feedbackMs);
    }
    return success;
  }, [feedbackMs]);

  return { copy, copied };
}
