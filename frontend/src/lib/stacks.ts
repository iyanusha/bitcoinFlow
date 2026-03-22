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
