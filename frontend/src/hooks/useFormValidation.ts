import { useState, useCallback } from 'react';
import type { ValidationResult } from '../lib/validation';

export function useFormValidation(validator: (value: string) => ValidationResult) {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validate = useCallback((value: string): boolean => {
    const result = validator(value);
    setError(result.error);
    return result.isValid;
  }, [validator]);

  const onBlur = useCallback((value: string) => {
    setTouched(true);
    validate(value);
  }, [validate]);

  const clearError = useCallback(() => { setError(null); setTouched(false); }, []);

  const isValid = touched && error === null;
  const isInvalid = touched && error !== null;

  return { error, touched, isValid, isInvalid, validate, onBlur, clearError };
}
