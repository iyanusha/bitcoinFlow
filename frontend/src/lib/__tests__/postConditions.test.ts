import { describe, expect, it } from 'vitest';
import {
  senderTransfersExactly,
  senderTransfersAtMost,
  contractSendsExactly,
  contractSendsAtMost,
} from '../postConditions';

describe('senderTransfersExactly', () => {
  it('creates a post-condition object', () => {
    const pc = senderTransfersExactly('ST123', 1_000_000);
    expect(pc).toBeDefined();
    expect(pc.type).toBeDefined();
  });

  it('creates with zero amount', () => {
    const pc = senderTransfersExactly('ST123', 0);
    expect(pc).toBeDefined();
  });
});

describe('senderTransfersAtMost', () => {
  it('creates a post-condition object', () => {
    const pc = senderTransfersAtMost('ST456', 5_000_000);
    expect(pc).toBeDefined();
    expect(pc.type).toBeDefined();
  });
});

describe('contractSendsExactly', () => {
  it('creates a contract post-condition', () => {
    const pc = contractSendsExactly(2_000_000);
    expect(pc).toBeDefined();
    expect(pc.type).toBeDefined();
  });
});

describe('contractSendsAtMost', () => {
  it('creates a contract post-condition', () => {
    const pc = contractSendsAtMost(10_000_000);
    expect(pc).toBeDefined();
    expect(pc.type).toBeDefined();
  });
});
