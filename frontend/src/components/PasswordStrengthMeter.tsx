import { memo, useMemo } from 'react';

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

function calculateStrength(password: string): { score: number; label: PasswordStrength } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: 'weak' };
  if (score <= 2) return { score: 2, label: 'fair' };
  if (score <= 3) return { score: 3, label: 'good' };
  return { score: 4, label: 'strong' };
}

export const PasswordStrengthMeter = memo(function PasswordStrengthMeter({
  password,
  className = '',
}: PasswordStrengthMeterProps) {
  const { score, label } = useMemo(() => calculateStrength(password), [password]);

  if (!password) return null;

  return (
    <div
      className={`password-strength ${className}`.trim()}
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={4}
      aria-label={`Password strength: ${label}`}
    >
      <div className="password-strength-bars">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`password-strength-bar ${level <= score ? `strength-${label}` : ''}`}
          />
        ))}
      </div>
      <span className={`password-strength-label strength-text-${label}`}>
        {label}
      </span>
    </div>
  );
});
