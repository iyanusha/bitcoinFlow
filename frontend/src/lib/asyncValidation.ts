import type { ValidationResult } from './validation';

export interface AsyncValidationResult extends ValidationResult {
  pending: boolean;
}

/**
 * Create an async validator that wraps a promise-based check.
 * Useful for server-side validation like checking address availability.
 */
export async function validateAsync(
  value: string,
  asyncCheck: (value: string) => Promise<boolean>,
  errorMessage: string,
): Promise<ValidationResult> {
  try {
    const isValid = await asyncCheck(value);
    return isValid
      ? { isValid: true, error: null }
      : { isValid: false, error: errorMessage };
  } catch {
    return { isValid: false, error: 'Validation failed — please try again' };
  }
}

/**
 * Create a validator that runs sync validation first,
 * and only runs async validation if sync passes.
 */
export function createAsyncValidator(
  syncValidator: (value: string) => ValidationResult,
  asyncCheck: (value: string) => Promise<boolean>,
  asyncErrorMessage: string,
): (value: string) => Promise<ValidationResult> {
  return async (value: string) => {
    const syncResult = syncValidator(value);
    if (!syncResult.isValid) return syncResult;
    return validateAsync(value, asyncCheck, asyncErrorMessage);
  };
}

/**
 * Debounce an async validator to avoid excessive API calls.
 */
export function debounceAsyncValidator(
  validator: (value: string) => Promise<ValidationResult>,
  delay = 300,
): (value: string) => Promise<ValidationResult> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastValue = '';

  return (value: string) => {
    lastValue = value;
    if (timeoutId) clearTimeout(timeoutId);

    return new Promise<ValidationResult>((resolve) => {
      timeoutId = setTimeout(async () => {
        if (value !== lastValue) {
          resolve({ isValid: true, error: null });
          return;
        }
        const result = await validator(value);
        if (value === lastValue) {
          resolve(result);
        } else {
          resolve({ isValid: true, error: null });
        }
      }, delay);
    });
  };
}
