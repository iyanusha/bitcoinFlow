import type { ContractEvent, ContractEventType } from '../types';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from './stacks';
import { parseClarityInt } from './contractParsers';
import { logger } from './logger';

interface RawContractEvent {
  event_type: string;
  contract_log?: {
    contract_id: string;
    topic: string;
    value: { hex: string; repr: string };
  };
  tx_id: string;
  block_height: number;
  event_index: number;
}

const EVENT_TYPE_MAP: Record<string, ContractEventType> = {
  deposit: 'deposit',
  withdraw: 'withdraw',
  compound: 'compound',
  pause: 'pause',
  unpause: 'unpause',
};

/**
 * Parse a raw Hiro API event into a typed ContractEvent.
 * Returns null if the event doesn't belong to our contract.
 */
export function parseContractEvent(raw: RawContractEvent): ContractEvent | null {
  const contractId = `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`;

  if (raw.contract_log?.contract_id !== contractId) {
    return null;
  }

  const topic = raw.contract_log.topic;
  const eventType = EVENT_TYPE_MAP[topic];

  if (!eventType) {
    logger.debug(`Unknown contract event topic: ${topic}`);
    return null;
  }

  // Try to extract amount from the repr (e.g., "(ok u1000000)")
  let amount: number | undefined;
  const amountMatch = raw.contract_log.value.repr.match(/u(\d+)/);
  if (amountMatch) {
    amount = parseClarityInt(amountMatch[1]);
  }

  return {
    type: eventType,
    sender: '', // Populated by caller from tx data
    amount,
    blockHeight: raw.block_height,
    txId: raw.tx_id,
    timestamp: 0, // Populated by caller from block data
  };
}

/**
 * Filter events to a specific type.
 */
export function filterEvents(
  events: ContractEvent[],
  type: ContractEventType
): ContractEvent[] {
  return events.filter(e => e.type === type);
}
