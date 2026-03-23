/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NETWORK: 'mainnet' | 'testnet';
  readonly VITE_CONTRACT_ADDRESS: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
