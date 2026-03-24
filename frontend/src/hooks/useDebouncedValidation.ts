import { useState, useEffect, useRef } from 'react';
import type { ValidationResult } from '../lib/validation';

/**
 * Debounced validation hook that delays validation until
 * the user stops typing for the specified delay.
 */
export function useDebouncedValidation(
  value: string,
  validator: (value: string) => ValidationResult,
  delay = 300,
): { error: string | null; isValidating: boolean } {
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!value) {
      setError(null);
      setIsValidating(false);
      return;
    }

    setIsValidating(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const result = validator(value);
      setError(result.error);
      setIsValidating(false);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, validator, delay]);

  return { error, isValidating };
}
