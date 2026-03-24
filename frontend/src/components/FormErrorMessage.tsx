import { memo } from 'react';

interface FormErrorMessageProps {
  error: string | null | undefined;
  id?: string;
}

export const FormErrorMessage = memo(function FormErrorMessage({
  error,
  id,
}: FormErrorMessageProps) {
  if (!error) return null;

  return (
    <p
      className="form-error-message"
      role="alert"
      aria-live="polite"
      id={id}
    >
      {error}
    </p>
  );
});
