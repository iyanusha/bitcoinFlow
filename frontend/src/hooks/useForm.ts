import { useState, useCallback, useMemo } from 'react';
import type { ValidationResult } from '../lib/validation';

type ValidatorMap<T extends string> = Partial<Record<T, (value: string) => ValidationResult>>;

interface FormState<T extends string> {
  values: Record<T, string>;
  errors: Partial<Record<T, string | null>>;
  touched: Partial<Record<T, boolean>>;
}

export interface UseFormResult<T extends string> {
  values: Record<T, string>;
  errors: Partial<Record<T, string | null>>;
  touched: Partial<Record<T, boolean>>;
  isValid: boolean;
  isDirty: boolean;
  setValue: (field: T, value: string) => void;
  setError: (field: T, error: string | null) => void;
  onBlur: (field: T) => void;
  validateAll: () => boolean;
  reset: () => void;
  getFieldProps: (field: T) => {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
}

export function useForm<T extends string>(
  initialValues: Record<T, string>,
  validators?: ValidatorMap<T>,
): UseFormResult<T> {
  const [state, setState] = useState<FormState<T>>({
    values: { ...initialValues },
    errors: {},
    touched: {},
  });

  const setValue = useCallback((field: T, value: string) => {
    setState(prev => {
      const newValues = { ...prev.values, [field]: value };
      const newErrors = { ...prev.errors };

      if (prev.touched[field] && validators?.[field]) {
        const result = validators[field]!(value);
        newErrors[field] = result.error;
      }

      return { ...prev, values: newValues, errors: newErrors };
    });
  }, [validators]);

  const setError = useCallback((field: T, error: string | null) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error },
    }));
  }, []);

  const onBlur = useCallback((field: T) => {
    setState(prev => {
      const newTouched = { ...prev.touched, [field]: true };
      const newErrors = { ...prev.errors };

      if (validators?.[field]) {
        const result = validators[field]!(prev.values[field]);
        newErrors[field] = result.error;
      }

      return { ...prev, touched: newTouched, errors: newErrors };
    });
  }, [validators]);

  const validateAll = useCallback((): boolean => {
    const fields = Object.keys(state.values) as T[];
    const newErrors: Partial<Record<T, string | null>> = {};
    const newTouched: Partial<Record<T, boolean>> = {};
    let allValid = true;

    fields.forEach(field => {
      newTouched[field] = true;
      if (validators?.[field]) {
        const result = validators[field]!(state.values[field]);
        newErrors[field] = result.error;
        if (!result.isValid) allValid = false;
      }
    });

    setState(prev => ({
      ...prev,
      errors: newErrors,
      touched: newTouched,
    }));

    return allValid;
  }, [state.values, validators]);

  const reset = useCallback(() => {
    setState({
      values: { ...initialValues },
      errors: {},
      touched: {},
    });
  }, [initialValues]);

  const getFieldProps = useCallback((field: T) => ({
    value: state.values[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(field, e.target.value),
    onBlur: () => onBlur(field),
  }), [state.values, setValue, onBlur]);

  const isValid = useMemo(() => {
    return Object.values(state.errors).every(e => e === null || e === undefined);
  }, [state.errors]);

  const isDirty = useMemo(() => {
    const fields = Object.keys(initialValues) as T[];
    return fields.some(f => state.values[f] !== initialValues[f]);
  }, [state.values, initialValues]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isValid,
    isDirty,
    setValue,
    setError,
    onBlur,
    validateAll,
    reset,
    getFieldProps,
  };
}
