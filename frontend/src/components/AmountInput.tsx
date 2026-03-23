import { sanitizeNumericInput } from '../lib/validation';

interface Props {
  value: string;
  onChange: (v: string) => void;
  label: string;
  unit: string;
  max?: number;
  id?: string;
  disabled?: boolean;
  error?: string | null;
}

export function AmountInput({ value, onChange, label, unit, max, id, disabled, error }: Props) {
  const handleChange = (raw: string) => {
    const sanitized = sanitizeNumericInput(raw);
    onChange(sanitized);
  };

  const handleMax = () => {
    if (max !== undefined) onChange(max.toString());
  };

  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary, #374151)', marginBottom: '0.35rem' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input id={id} type="text" inputMode="decimal" value={value} onChange={e => handleChange(e.target.value)} placeholder="0.00" disabled={disabled}
          className={error ? 'invalid' : value ? 'valid' : ''}
          style={{ width: '100%', padding: '0.75rem', paddingRight: max !== undefined ? '4.5rem' : '3rem', borderRadius: '8px', border: `1px solid ${error ? 'var(--error-text, #dc2626)' : 'var(--border-color, #d1d5db)'}`, fontSize: '1rem', background: 'var(--bg-primary, #fff)', color: 'var(--text-primary, #333)' }} />
        <span style={{ position: 'absolute', right: max !== undefined ? '3rem' : '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#9ca3af' }}>{unit}</span>
        {max !== undefined && (
          <button type="button" onClick={handleMax} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', padding: '0.15rem 0.35rem', borderRadius: '4px', border: '1px solid #d1d5db', background: '#f9fafb', cursor: 'pointer', color: '#6b7280' }}>MAX</button>
        )}
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
