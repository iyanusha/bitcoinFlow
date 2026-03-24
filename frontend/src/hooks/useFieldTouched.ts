import { useState, useCallback } from 'react';

export interface UseFieldTouchedResult<T extends string> {
  touched: Record<T, boolean>;
  isTouched: (field: T) => boolean;
  touch: (field: T) => void;
  touchAll: () => void;
  resetTouched: () => void;
  isAnyTouched: boolean;
}

/**
 * Track which form fields have been touched (blurred).
 * Useful for showing validation errors only after user interaction.
 */
export function useFieldTouched<T extends string>(
  fields: T[],
): UseFieldTouchedResult<T> {
  const initial = Object.fromEntries(fields.map((f) => [f, false])) as Record<T, boolean>;
  const [touched, setTouched] = useState(initial);

  const isTouched = useCallback((field: T) => touched[field] ?? false, [touched]);

  const touch = useCallback((field: T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const touchAll = useCallback(() => {
    setTouched((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next) as T[]) {
        next[key] = true;
      }
      return next;
    });
  }, []);

  const resetTouched = useCallback(() => {
    setTouched(initial);
  }, [initial]);

  const isAnyTouched = Object.values<boolean>(touched).some(Boolean);

  return { touched, isTouched, touch, touchAll, resetTouched, isAnyTouched };
}
