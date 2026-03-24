import { useState, useCallback } from 'react';
import { openContractCall } from '@stacks/connect';
import { PostConditionMode, type ClarityValue, type PostCondition } from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';
import { parseTransactionError } from '../lib/errorUtils';
import { handleContractError } from '../lib/contractErrors';
import { logger } from '../lib/logger';

interface UseContractCallOptions {
  functionName: string;
  functionArgs: ClarityValue[];
  postConditions?: PostCondition[];
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useContractCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);

  const execute = useCallback(async (options: UseContractCallOptions) => {
    setLoading(true);
    setError(null);
    setTxId(null);

    try {
      await openContractCall({
        network,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: options.functionName,
        functionArgs: options.functionArgs,
        postConditions: options.postConditions ?? [],
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          logger.info(`Transaction submitted: ${options.functionName}`, { txId: data.txId });
          setTxId(data.txId);
          setLoading(false);
          options.onSuccess?.();
        },
        onCancel: () => {
          logger.debug(`Transaction cancelled: ${options.functionName}`);
          setLoading(false);
        },
      });
    } catch (err) {
      const contractMsg = handleContractError(err);
      const errorMsg = contractMsg || parseTransactionError(err);
      logger.error(`Contract call failed: ${options.functionName}`, err);
      setError(errorMsg);
      setLoading(false);
      options.onError?.(errorMsg);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setTxId(null);
  }, []);

  return { execute, loading, error, txId, reset };
}
