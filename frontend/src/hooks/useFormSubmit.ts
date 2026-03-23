import { useState, useCallback } from 'react';

interface UseFormSubmitResult<T> {
  isSubmitting: boolean;
  submitError: string | null;
  submit: (data: T) => Promise<void>;
  clearError: () => void;
}

/**
 * Handle form submission with loading state and error management.
 */
export function useFormSubmit<T>(
  onSubmit: (data: T) => Promise<void>,
  options?: {
    onSuccess?: () => void;
    onError?: (error: string) => void;
  },
): UseFormSubmitResult<T> {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = useCallback(async (data: T) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit(data);
      options?.onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setSubmitError(message);
      options?.onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, options]);

  const clearError = useCallback(() => {
    setSubmitError(null);
  }, []);

  return { isSubmitting, submitError, submit, clearError };
}
