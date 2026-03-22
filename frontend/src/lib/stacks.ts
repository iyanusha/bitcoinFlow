import { StacksTestnet, StacksMainnet } from "@stacks/network";

const isMainnet = import.meta.env.VITE_NETWORK === "mainnet";

export const network = isMainnet
  ? new StacksMainnet()
  : new StacksTestnet();

export const CONTRACT_ADDRESS =
  import.meta.env.VITE_CONTRACT_ADDRESS ||
  "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";

export const CONTRACT_NAME = "flow-vault";

export const CLARITY_VERSION = 3;

export const EXPLORER_URL = isMainnet
  ? "https://explorer.hiro.so"
  : "https://explorer.hiro.so/?chain=testnet";

export const API_URL = isMainnet
  ? "https://api.mainnet.hiro.so"
  : "https://api.testnet.hiro.so";

export const STACKING_THRESHOLD = 10_000_000;
export const WITHDRAWAL_COOLDOWN_BLOCKS = 6;

export function getTxExplorerUrl(txId: string): string {
  const chain = isMainnet ? '' : '&chain=testnet';
  return `https://explorer.hiro.so/txid/${txId}?${chain}`;
}

export function getAddressExplorerUrl(address: string): string {
  const chain = isMainnet ? '' : '&chain=testnet';
  return `https://explorer.hiro.so/address/${address}?${chain}`;
}

export function getContractExplorerUrl(): string {
  const chain = isMainnet ? '' : '&chain=testnet';
  return `https://explorer.hiro.so/address/${CONTRACT_ADDRESS}.${CONTRACT_NAME}?${chain}`;
}

/** Full contract identifier for API calls */
export const CONTRACT_ID = `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`;

/** API endpoint for contract events */
export function getContractEventsUrl(limit = 20, offset = 0): string {
  return `${API_URL}/extended/v1/contract/${CONTRACT_ID}/events?limit=${limit}&offset=${offset}`;
}

/** API endpoint for address transactions */
export function getAddressTxsUrl(address: string, limit = 20, offset = 0): string {
  return `${API_URL}/extended/v1/address/${address}/transactions?limit=${limit}&offset=${offset}`;
}
