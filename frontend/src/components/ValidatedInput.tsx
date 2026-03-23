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

export const ValidatedInput = memo(function ValidatedInput({ value, onChange, validator, placeholder, type = 'text', id, disabled, label, helpText, inputMode, autoComplete, ...rest }: Props) {
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
  const helpId = id && helpText ? `${id}-help` : undefined;
  const describedByParts = [
    rest['aria-describedby'],
    helpId,
    touched && error ? errorId : null,
  ].filter(Boolean);

  return (
    <div className="validated-input-wrapper">
      {label && id && (
        <label htmlFor={id} className="validated-input-label">{label}</label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className={touched ? (error ? 'input-error' : 'input-valid') : ''}
        aria-invalid={touched && !!error}
        aria-describedby={describedByParts.length > 0 ? describedByParts.join(' ') : undefined}
        aria-errormessage={touched && error && errorId ? errorId : undefined}
      />
      {helpText && (
        <small id={helpId} className="validated-input-help">{helpText}</small>
      )}
      {touched && error && (
        <div id={errorId} className="form-error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});
