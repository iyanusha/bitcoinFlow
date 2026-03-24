import {
  makeStandardSTXPostCondition,
  makeContractSTXPostCondition,
  FungibleConditionCode,
} from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from './stacks';

/**
 * Build a post-condition requiring the sender transfers exactly `amount` microSTX.
 */
export function senderTransfersExactly(senderAddress: string, amount: number) {
  return makeStandardSTXPostCondition(
    senderAddress,
    FungibleConditionCode.Equal,
    amount
  );
}

/**
 * Build a post-condition requiring the sender transfers at most `amount` microSTX.
 */
export function senderTransfersAtMost(senderAddress: string, amount: number) {
  return makeStandardSTXPostCondition(
    senderAddress,
    FungibleConditionCode.LessEqual,
    amount
  );
}

/**
 * Build a post-condition requiring the contract sends exactly `amount` microSTX
 * back to the user (for withdrawals).
 */
export function contractSendsExactly(amount: number) {
  return makeContractSTXPostCondition(
    CONTRACT_ADDRESS,
    CONTRACT_NAME,
    FungibleConditionCode.Equal,
    amount
  );
}

/**
 * Build a post-condition requiring the contract sends at most `amount` microSTX.
 */
export function contractSendsAtMost(amount: number) {
  return makeContractSTXPostCondition(
    CONTRACT_ADDRESS,
    CONTRACT_NAME,
    FungibleConditionCode.LessEqual,
    amount
  );
}
