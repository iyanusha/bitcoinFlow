export function getContractErrorMessage(code: number): string {
  const messages: Record<number, string> = {
    100: 'Not authorized to perform this action',
    101: 'Insufficient balance for this operation',
    102: 'Invalid amount — must be greater than zero',
    103: 'Stacking operation failed',
    104: 'sBTC transfer could not be completed',
    105: 'Vault operations are currently paused',
  };
  return messages[code] || `Unknown contract error (code: ${code})`;
}

export function parseTransactionError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('UserRejected')) return 'Transaction was cancelled by user';
    if (error.message.includes('ContractCall')) return 'Contract call failed — check your inputs';
    return error.message;
  }
  return 'An unexpected error occurred';
}
