import { cvToJSON, fetchCallReadOnlyFunction, type ClarityValue } from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from './stacks';
import { logger } from './logger';

export interface ReadOnlyCallOptions {
  functionName: string;
  functionArgs?: ClarityValue[];
  senderAddress?: string;
}

/**
 * Call a read-only function on the flow-vault contract.
 * Returns the parsed JSON value from the Clarity response.
 */
export async function callReadOnly<T = unknown>(
  options: ReadOnlyCallOptions
): Promise<T> {
  const { functionName, functionArgs = [], senderAddress = CONTRACT_ADDRESS } = options;

  logger.debug(`callReadOnly: ${functionName}`, { args: functionArgs.length });

  const result = await fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName,
    functionArgs,
    network,
    senderAddress,
  });

  const json = cvToJSON(result);
  return json.value as T;
}
