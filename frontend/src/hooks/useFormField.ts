import { useState, useCallback, useMemo } from 'react';
import type { ValidationResult } from '../lib/validation';

export interface FormFieldState {
  value: string;
  error: string | null;
  touched: boolean;
  dirty: boolean;
  isValid: boolean;
  isInvalid: boolean;
}

export interface FormFieldActions {
  setValue: (value: string) => void;
  setError: (error: string | null) => void;
  onBlur: () => void;
  reset: () => void;
  validate: () => boolean;
}

export type UseFormFieldResult = FormFieldState & FormFieldActions;

export function useFormField(
  initialValue = '',
  validator?: (value: string) => ValidationResult,
): UseFormFieldResult {
  const [value, setValueState] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);

  const validate = useCallback((): boolean => {
    if (!validator) return true;
    const result = validator(value);
    setError(result.error);
    return result.isValid;
  }, [value, validator]);

  const setValue = useCallback((newValue: string) => {
    setValueState(newValue);
    setDirty(true);
    if (touched && validator) {
      const result = validator(newValue);
      setError(result.error);
    }
  }, [touched, validator]);

  const onBlur = useCallback(() => {
    setTouched(true);
    validate();
  }, [validate]);

  const reset = useCallback(() => {
    setValueState(initialValue);
    setError(null);
    setTouched(false);
    setDirty(false);
  }, [initialValue]);

  const isValid = useMemo(() => touched && error === null, [touched, error]);
  const isInvalid = useMemo(() => touched && error !== null, [touched, error]);

  return {
    value,
    error,
    touched,
    dirty,
    isValid,
    isInvalid,
    setValue,
    setError,
    onBlur,
    reset,
    validate,
  };
}
