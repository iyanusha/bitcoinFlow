import { useState, useCallback } from 'react';
import { openContractCall } from '@stacks/connect';
import { PostConditionMode, type ClarityValue } from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from '../lib/stacks';
import { parseTransactionError } from '../lib/errorUtils';

interface UseContractCallOptions {
  functionName: string;
  functionArgs: ClarityValue[];
  onSuccess?: () => void;
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
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          setTxId(data.txId);
          setLoading(false);
          options.onSuccess?.();
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (err) {
      setError(parseTransactionError(err));
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setTxId(null);
  }, []);

  return { execute, loading, error, txId, reset };
}
