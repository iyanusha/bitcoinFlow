import { ERROR_MESSAGES } from './constants';
import { logger } from './logger';

/** Known contract error codes */
export type ContractErrorCode = 100 | 101 | 102 | 103 | 104 | 105 | 106;

/** Type guard to check if a number is a known error code */
export function isKnownErrorCode(code: number): code is ContractErrorCode {
  return code in ERROR_MESSAGES;
}

/** Map contract error code to user-friendly message */
export function getContractError(code: number): string {
  return ERROR_MESSAGES[code] || `Unknown contract error (code ${code})`;
}

/** Extract error code from a Clarity error response */
export function extractErrorCode(error: unknown): number | null {
  if (error instanceof Error) {
    const match = error.message.match(/\(err u(\d+)\)/);
    if (match) return parseInt(match[1], 10);
  }
  return null;
}

/** Classify a contract error for UI display */
export function classifyContractError(code: number): 'user' | 'system' | 'unknown' {
  if (code === 100) return 'user';    // NOT_AUTHORIZED
  if (code === 101) return 'user';    // INSUFFICIENT_BALANCE
  if (code === 102) return 'user';    // INVALID_AMOUNT
  if (code === 106) return 'user';    // COOLDOWN_ACTIVE
  if (code === 103) return 'system';  // STACKING_ERROR
  if (code === 104) return 'system';  // SBTC_TRANSFER_FAILED
  if (code === 105) return 'system';  // VAULT_PAUSED
  return 'unknown';
}

/** Log and return a formatted contract error */
export function handleContractError(error: unknown): string {
  const code = extractErrorCode(error);
  if (code !== null) {
    const message = getContractError(code);
    const classification = classifyContractError(code);
    logger.error(`Contract error (${classification})`, { code, message });
    return message;
  }
  return error instanceof Error ? error.message : 'An unexpected error occurred';
}
