export interface ValidationResult { isValid: boolean; error: string | null; }

export function validateAmount(value: string): ValidationResult {
  if (!value || value.trim() === '') return { isValid: false, error: 'Amount is required' };
  const num = parseFloat(value);
  if (isNaN(num)) return { isValid: false, error: 'Please enter a valid number' };
  if (num <= 0) return { isValid: false, error: 'Amount must be greater than zero' };
  return { isValid: true, error: null };
}

export function validateDeposit(value: string): ValidationResult {
  const base = validateAmount(value);
  if (!base.isValid) return base;
  const num = parseFloat(value);
  if (num < 0.0001) return { isValid: false, error: 'Minimum deposit is 0.0001 sBTC' };
  if (num > 21000000) return { isValid: false, error: 'Amount exceeds maximum supply' };
  return { isValid: true, error: null };
}

export function validateWithdraw(value: string, balance: number): ValidationResult {
  const base = validateAmount(value);
  if (!base.isValid) return base;
  const num = parseFloat(value);
  if (num > balance) return { isValid: false, error: `Insufficient balance. You have ${balance} FLOW tokens` };
  return { isValid: true, error: null };
}

export function validateDecimalPrecision(value: string, maxDecimals = 8): ValidationResult {
  const parts = value.split('.');
  if (parts.length > 1 && parts[1].length > maxDecimals) return { isValid: false, error: `Maximum ${maxDecimals} decimal places` };
  return { isValid: true, error: null };
}

export function sanitizeNumericInput(value: string): string {
  let s = value.replace(/[^0-9.]/g, '');
  const parts = s.split('.');
  if (parts.length > 2) s = parts[0] + '.' + parts.slice(1).join('');
  return s;
}
