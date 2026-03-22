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
