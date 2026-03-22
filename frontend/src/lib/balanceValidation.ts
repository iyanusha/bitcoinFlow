import { VALIDATION, MICROSTX_PER_STX } from './constants';

export interface BalanceValidationResult {
  valid: boolean;
  error: string | null;
}

/**
 * Validate a deposit amount against business rules.
 */
export function validateDepositAmount(
  amount: number,
  userBalance: number
): BalanceValidationResult {
  if (amount <= 0) {
    return { valid: false, error: 'Amount must be greater than zero' };
  }

  if (amount < VALIDATION.MIN_DEPOSIT) {
    return {
      valid: false,
      error: `Minimum deposit is ${VALIDATION.MIN_DEPOSIT} sBTC`,
    };
  }

  if (amount > VALIDATION.MAX_DEPOSIT) {
    return {
      valid: false,
      error: `Maximum deposit is ${VALIDATION.MAX_DEPOSIT.toLocaleString()} sBTC`,
    };
  }

  const amountMicro = Math.round(amount * MICROSTX_PER_STX);
  if (amountMicro > userBalance) {
    return { valid: false, error: 'Insufficient balance' };
  }

  return { valid: true, error: null };
}

/**
 * Validate a withdrawal amount against user's flow token balance.
 */
export function validateWithdrawalAmount(
  amount: number,
  flowTokenBalance: number
): BalanceValidationResult {
  if (amount <= 0) {
    return { valid: false, error: 'Amount must be greater than zero' };
  }

  if (amount > flowTokenBalance) {
    return { valid: false, error: 'Exceeds your FLOW token balance' };
  }

  return { valid: true, error: null };
}

/**
 * Check if a decimal string has too many decimal places.
 */
export function validateDecimals(value: string, maxDecimals: number): boolean {
  const parts = value.split('.');
  if (parts.length < 2) return true;
  return parts[1].length <= maxDecimals;
}
