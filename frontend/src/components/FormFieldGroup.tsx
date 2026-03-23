import type { ReactNode } from 'react';

interface FormFieldGroupProps {
  legend: string;
  children: ReactNode;
  error?: string | null;
  className?: string;
}

export function FormFieldGroup({
  legend,
  children,
  error,
  className = '',
}: FormFieldGroupProps) {
  return (
    <fieldset className={`form-field-group ${className}`.trim()}>
      <legend className="form-field-group-legend">{legend}</legend>
      {children}
      {error && (
        <p className="form-error-message" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
