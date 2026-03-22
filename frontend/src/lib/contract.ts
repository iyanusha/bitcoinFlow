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

/**
 * Call a read-only function and return the raw integer value.
 */
export async function callReadOnlyInt(
  functionName: string,
  functionArgs: ClarityValue[] = []
): Promise<number> {
  const result = await callReadOnly<string>({ functionName, functionArgs });
  const parsed = parseInt(result, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Call a read-only function and return a boolean value.
 */
export async function callReadOnlyBool(
  functionName: string,
  functionArgs: ClarityValue[] = []
): Promise<boolean> {
  const result = await callReadOnly<boolean>({ functionName, functionArgs });
  return result === true;
}
