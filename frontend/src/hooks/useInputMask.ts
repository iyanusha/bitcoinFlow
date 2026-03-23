import { useState, useCallback } from 'react';

interface UseInputMaskOptions {
  /** Function to transform raw input into masked format */
  mask: (value: string) => string;
  /** Function to extract raw value from masked format */
  unmask?: (value: string) => string;
}

export interface UseInputMaskResult {
  /** The masked display value */
  displayValue: string;
  /** The raw unmasked value */
  rawValue: string;
  /** Handle input change */
  onChange: (inputValue: string) => void;
  /** Reset to initial value */
  reset: () => void;
}

/**
 * Apply an input mask to format user input while preserving
 * the raw value for validation and submission.
 */
export function useInputMask(
  initialValue = '',
  options: UseInputMaskOptions,
): UseInputMaskResult {
  const { mask, unmask = (v: string) => v } = options;
  const [rawValue, setRawValue] = useState(initialValue);

  const displayValue = mask(rawValue);

  const onChange = useCallback((inputValue: string) => {
    const raw = unmask(inputValue);
    setRawValue(raw);
  }, [unmask]);

  const reset = useCallback(() => {
    setRawValue(initialValue);
  }, [initialValue]);

  return { displayValue, rawValue, onChange, reset };
}
