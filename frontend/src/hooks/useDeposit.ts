import { useCallback } from 'react';
import { uintCV } from '@stacks/transactions';
import { useContractCall } from './useContractCall';
import { senderTransfersExactly } from '../lib/postConditions';
import { stxToMicro } from '../lib/contractParsers';
import { validateDepositAmount } from '../lib/balanceValidation';
import { logger } from '../lib/logger';

interface UseDepositOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Hook that handles the full deposit flow including validation,
 * post-condition building, and contract call execution.
 */
export function useDeposit(options: UseDepositOptions = {}) {
  const { execute, loading, error, txId, reset } = useContractCall();

  const deposit = useCallback(
    async (amount: number, senderAddress: string, userBalance: number) => {
      const validation = validateDepositAmount(amount, userBalance);
      if (!validation.valid) {
        options.onError?.(validation.error!);
        return;
      }

      const microAmount = stxToMicro(amount);
      logger.info('Initiating deposit', { amount, microAmount, senderAddress });

      await execute({
        functionName: 'deposit',
        functionArgs: [uintCV(microAmount)],
        postConditions: [senderTransfersExactly(senderAddress, microAmount)],
        onSuccess: options.onSuccess,
        onError: options.onError,
      });
    },
    [execute, options]
  );

  return { deposit, loading, error, txId, reset };
}
