/**
 * Vitest global test setup for BitcoinFlow frontend.
 * Runs before all test suites.
 */

import { afterEach } from 'vitest';

// Clean up after each test
afterEach(() => {
  // Clear all mocks
  vi.restoreAllMocks();

  // Reset localStorage
  localStorage.clear();

  // Reset sessionStorage
  sessionStorage.clear();
});

// Mock import.meta.env for tests
Object.defineProperty(import.meta, 'env', {
  value: {
    DEV: true,
    PROD: false,
    VITE_NETWORK: 'testnet',
    VITE_CONTRACT_ADDRESS: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  },
  writable: true,
});
