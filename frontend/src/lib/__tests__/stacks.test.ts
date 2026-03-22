import { describe, expect, it } from 'vitest';
import {
  CONTRACT_NAME,
  CLARITY_VERSION,
  STACKING_THRESHOLD,
  WITHDRAWAL_COOLDOWN_BLOCKS,
  CONTRACT_ID,
  getTxExplorerUrl,
  getAddressExplorerUrl,
  getContractExplorerUrl,
  getContractEventsUrl,
  getAddressTxsUrl,
} from '../stacks';

describe('stacks constants', () => {
  it('CONTRACT_NAME is flow-vault', () => {
    expect(CONTRACT_NAME).toBe('flow-vault');
  });

  it('CLARITY_VERSION is 3', () => {
    expect(CLARITY_VERSION).toBe(3);
  });

  it('STACKING_THRESHOLD is 10 million', () => {
    expect(STACKING_THRESHOLD).toBe(10_000_000);
  });

  it('WITHDRAWAL_COOLDOWN_BLOCKS is 6', () => {
    expect(WITHDRAWAL_COOLDOWN_BLOCKS).toBe(6);
  });
});

describe('getTxExplorerUrl', () => {
  it('includes txId in URL', () => {
    const url = getTxExplorerUrl('0xabc123');
    expect(url).toContain('txid/0xabc123');
  });

  it('includes hiro.so domain', () => {
    const url = getTxExplorerUrl('0xtest');
    expect(url).toContain('explorer.hiro.so');
  });
});

describe('getAddressExplorerUrl', () => {
  it('includes address in URL path', () => {
    const url = getAddressExplorerUrl('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');
    expect(url).toContain('address/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');
  });
});

describe('getContractExplorerUrl', () => {
  it('includes contract name in URL', () => {
    const url = getContractExplorerUrl();
    expect(url).toContain('flow-vault');
  });

  it('uses hiro explorer domain', () => {
    const url = getContractExplorerUrl();
    expect(url).toContain('explorer.hiro.so');
  });

  it('includes both address and contract name joined by dot', () => {
    const url = getContractExplorerUrl();
    expect(url).toMatch(/address\/\w+\.flow-vault/);
  });
});

describe('URL format consistency', () => {
  it('tx URL starts with https', () => {
    const url = getTxExplorerUrl('0x123');
    expect(url.startsWith('https://')).toBe(true);
  });

  it('address URL starts with https', () => {
    const url = getAddressExplorerUrl('ST1234');
    expect(url.startsWith('https://')).toBe(true);
  });

  it('contract URL starts with https', () => {
    const url = getContractExplorerUrl();
    expect(url.startsWith('https://')).toBe(true);
  });
});

describe('CONTRACT_ID', () => {
  it('contains contract name', () => {
    expect(CONTRACT_ID).toContain(CONTRACT_NAME);
  });

  it('is in address.name format', () => {
    expect(CONTRACT_ID).toMatch(/^S\w+\.flow-vault$/);
  });
});

describe('getContractEventsUrl', () => {
  it('includes contract ID in path', () => {
    const url = getContractEventsUrl();
    expect(url).toContain(CONTRACT_ID);
  });

  it('includes limit and offset params', () => {
    const url = getContractEventsUrl(10, 5);
    expect(url).toContain('limit=10');
    expect(url).toContain('offset=5');
  });

  it('uses default limit of 20', () => {
    const url = getContractEventsUrl();
    expect(url).toContain('limit=20');
  });
});

describe('getAddressTxsUrl', () => {
  it('includes address in path', () => {
    const url = getAddressTxsUrl('ST123');
    expect(url).toContain('address/ST123');
  });

  it('includes pagination params', () => {
    const url = getAddressTxsUrl('ST123', 50, 10);
    expect(url).toContain('limit=50');
    expect(url).toContain('offset=10');
  });
});
