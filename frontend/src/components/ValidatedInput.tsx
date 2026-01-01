import { useState } from 'react';
import type { ValidationResult } from '../lib/validation';

interface Props {
  value: string;
  onChange: (v: string) => void;
  validator?: (v: string) => ValidationResult;
  placeholder?: string;
  type?: string;
  id?: string;
}

export function ValidatedInput({ value, onChange, validator, placeholder, type = 'text', id }: Props) {
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

  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={touched ? (error ? 'invalid' : 'valid') : ''}
      />
      {touched && error && <div className="field-error">{error}</div>}
    </div>
  );
}
