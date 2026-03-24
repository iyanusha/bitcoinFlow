import { useCallback } from 'react';
import { uintCV } from '@stacks/transactions';
import { useContractCall } from './useContractCall';
import { contractSendsAtMost } from '../lib/postConditions';
import { validateWithdrawalAmount } from '../lib/balanceValidation';
import { logger } from '../lib/logger';

interface UseWithdrawOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Hook that handles the full withdrawal flow including validation,
 * cooldown checking, post-condition building, and contract call execution.
 */
export function useWithdraw(options: UseWithdrawOptions = {}) {
  const { execute, loading, error, txId, reset } = useContractCall();

  const withdraw = useCallback(
    async (flowTokenAmount: number, flowTokenBalance: number) => {
      const validation = validateWithdrawalAmount(flowTokenAmount, flowTokenBalance);
      if (!validation.valid) {
        options.onError?.(validation.error!);
        return;
      }

      logger.info('Initiating withdrawal', { flowTokenAmount });

      await execute({
        functionName: 'withdraw',
        functionArgs: [uintCV(flowTokenAmount)],
        postConditions: [contractSendsAtMost(flowTokenAmount)],
        onSuccess: options.onSuccess,
        onError: options.onError,
      });
    },
    [execute, options]
  );

  return { withdraw, loading, error, txId, reset };
}
