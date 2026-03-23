import { useState, memo } from 'react';
import type { ValidationResult } from '../lib/validation';

interface Props {
  value: string;
  onChange: (v: string) => void;
  validator?: (v: string) => ValidationResult;
  placeholder?: string;
  type?: string;
  id?: string;
  disabled?: boolean;
  label?: string;
  helpText?: string;
  inputMode?: 'text' | 'decimal' | 'numeric';
  autoComplete?: string;
  'aria-describedby'?: string;
}

export const ValidatedInput = memo(function ValidatedInput({ value, onChange, validator, placeholder, type = 'text', id, disabled, ...rest }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    if (validator) {
      const result = validator(value);
      setError(result.error);
    }
  };

  const handleChange = (v: string) => {
    onChange(v);
    if (touched && validator) {
      const result = validator(v);
      setError(result.error);
    }
  };

  const errorId = id ? `${id}-error` : undefined;

  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={touched ? (error ? 'invalid' : 'valid') : ''}
        aria-invalid={touched && !!error}
        aria-describedby={[rest['aria-describedby'], touched && error ? errorId : null].filter(Boolean).join(' ') || undefined}
        aria-errormessage={touched && error && errorId ? errorId : undefined}
      />
      {touched && error && (
        <div id={errorId} className="field-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});
