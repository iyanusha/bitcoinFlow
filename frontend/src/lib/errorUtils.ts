export function getContractErrorMessage(code: number): string {
  const messages: Record<number, string> = {
    100: 'Not authorized to perform this action',
    101: 'Insufficient balance for this operation',
    102: 'Invalid amount — must be greater than zero',
    103: 'Stacking operation failed',
    104: 'sBTC transfer could not be completed',
    105: 'Vault operations are currently paused',
    106: 'Please wait for the cooldown period to end before withdrawing',
  };
  return messages[code] || `Unknown contract error (code: ${code})`;
}

export function isRetryableError(error: unknown): boolean {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    return msg.includes('network') ||
      msg.includes('timeout') ||
      msg.includes('fetch') ||
      msg.includes('econnrefused') ||
      msg.includes('429');
  }
  return false;
}

export function getErrorSeverity(error: unknown): 'low' | 'medium' | 'high' {
  if (error instanceof Error) {
    if (error.message.includes('UserRejected')) return 'low';
    if (error.message.includes('network')) return 'medium';
    return 'high';
  }
  return 'high';
}

export function parseTransactionError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('UserRejected')) return 'Transaction was cancelled by user';
    if (error.message.includes('ContractCall')) return 'Contract call failed — check your inputs';
    if (error.message.includes('InsufficientFunds')) return 'Insufficient funds for this transaction';
    if (error.message.includes('network')) return 'Network error — please check your connection';
    const contractMatch = error.message.match(/\(err u(\d+)\)/);
    if (contractMatch) {
      return getContractErrorMessage(parseInt(contractMatch[1], 10));
    }
    return error.message;
  }
  return 'An unexpected error occurred';
}
