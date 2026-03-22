import { describe, expect, it } from 'vitest';
import { parseContractEvent, filterEvents } from '../contractEvents';
import type { ContractEvent } from '../../types';

const CONTRACT_ID = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.flow-vault';

describe('parseContractEvent', () => {
  it('parses a deposit event', () => {
    const raw = {
      event_type: 'smart_contract_log',
      contract_log: {
        contract_id: CONTRACT_ID,
        topic: 'deposit',
        value: { hex: '0x0100000000000f4240', repr: '(ok u1000000)' },
      },
      tx_id: '0xabc123',
      block_height: 50000,
      event_index: 0,
    };

    const result = parseContractEvent(raw);
    expect(result).not.toBeNull();
    expect(result!.type).toBe('deposit');
    expect(result!.amount).toBe(1_000_000);
    expect(result!.blockHeight).toBe(50000);
    expect(result!.txId).toBe('0xabc123');
  });

  it('parses a withdraw event', () => {
    const raw = {
      event_type: 'smart_contract_log',
      contract_log: {
        contract_id: CONTRACT_ID,
        topic: 'withdraw',
        value: { hex: '0x01', repr: '(ok u500000)' },
      },
      tx_id: '0xdef456',
      block_height: 50001,
      event_index: 1,
    };

    const result = parseContractEvent(raw);
    expect(result!.type).toBe('withdraw');
    expect(result!.amount).toBe(500_000);
  });

  it('returns null for non-matching contract', () => {
    const raw = {
      event_type: 'smart_contract_log',
      contract_log: {
        contract_id: 'ST999.other-contract',
        topic: 'deposit',
        value: { hex: '0x01', repr: '(ok u1)' },
      },
      tx_id: '0x111',
      block_height: 100,
      event_index: 0,
    };

    expect(parseContractEvent(raw)).toBeNull();
  });

  it('returns null for unknown topic', () => {
    const raw = {
      event_type: 'smart_contract_log',
      contract_log: {
        contract_id: CONTRACT_ID,
        topic: 'unknown-topic',
        value: { hex: '0x01', repr: 'none' },
      },
      tx_id: '0x222',
      block_height: 200,
      event_index: 0,
    };

    expect(parseContractEvent(raw)).toBeNull();
  });
});

describe('filterEvents', () => {
  const events: ContractEvent[] = [
    { type: 'deposit', sender: 'ST1', amount: 100, blockHeight: 1, txId: '0x1', timestamp: 0 },
    { type: 'withdraw', sender: 'ST2', amount: 50, blockHeight: 2, txId: '0x2', timestamp: 0 },
    { type: 'deposit', sender: 'ST3', amount: 200, blockHeight: 3, txId: '0x3', timestamp: 0 },
    { type: 'compound', sender: 'ST1', blockHeight: 4, txId: '0x4', timestamp: 0 },
  ];

  it('filters deposit events', () => {
    const deposits = filterEvents(events, 'deposit');
    expect(deposits).toHaveLength(2);
    expect(deposits.every(e => e.type === 'deposit')).toBe(true);
  });

  it('filters withdraw events', () => {
    const withdrawals = filterEvents(events, 'withdraw');
    expect(withdrawals).toHaveLength(1);
  });

  it('returns empty array for missing type', () => {
    const pauses = filterEvents(events, 'pause');
    expect(pauses).toHaveLength(0);
  });
});
