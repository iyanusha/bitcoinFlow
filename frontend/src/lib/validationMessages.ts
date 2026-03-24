/**
 * Centralized validation error messages for consistent user feedback.
 */

export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field} is required`,
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) => `${field} must be at most ${max} characters`,
  minValue: (min: number, unit?: string) => `Minimum is ${min}${unit ? ` ${unit}` : ''}`,
  maxValue: (max: number, unit?: string) => `Maximum is ${max}${unit ? ` ${unit}` : ''}`,
  invalidNumber: 'Please enter a valid number',
  positiveNumber: 'Amount must be greater than zero',
  invalidFormat: (field: string) => `Invalid ${field} format`,
  insufficientBalance: (balance: number, unit: string) =>
    `Insufficient balance. You have ${balance} ${unit}`,
  decimalPrecision: (max: number) => `Maximum ${max} decimal places`,
  cooldownActive: (remaining: string) => `Withdrawal cooldown active — ${remaining} remaining`,
  vaultPaused: 'Vault is currently paused',
  networkError: 'Network error. Please try again.',
  walletRequired: 'Please connect your wallet first',
} as const;

export type ValidationMessageKey = keyof typeof VALIDATION_MESSAGES;
