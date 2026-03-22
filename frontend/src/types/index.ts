export interface VaultStats {
  totalDeposits: number;
  totalRewards: number;
  userBalance: number;
  stxBalance: number;
  depositCount: number;
  withdrawCount: number;
  isPaused: boolean;
  currentBlock: number;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
}

export type TransactionStatus = 'pending' | 'confirmed' | 'failed';

export interface TransactionRecord {
  txId: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: TransactionStatus;
  timestamp: number;
}

export interface ContractCallOptions {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: unknown[];
}

export interface DepositParams {
  amount: number;
  senderAddress: string;
}

export interface WithdrawParams {
  amount: number;
  tokensToBurn: number;
}

export type ErrorCode =
  | 'NOT_AUTHORIZED'
  | 'INSUFFICIENT_BALANCE'
  | 'INVALID_AMOUNT'
  | 'STACKING_ERROR'
  | 'SBTC_TRANSFER_FAILED'
  | 'VAULT_PAUSED'
  | 'COOLDOWN_ACTIVE';

export interface AppError {
  code: ErrorCode;
  message: string;
  details?: string;
}

export interface VaultConfig {
  contractAddress: string;
  contractName: string;
  network: 'mainnet' | 'testnet';
  explorerUrl: string;
  clarityVersion: number;
}

export interface NetworkInfo {
  name: string;
  chainId: number;
  explorerUrl: string;
}

export interface UserPosition {
  depositedAmount: number;
  flowTokenBalance: number;
  pendingRewards: number;
  lastDepositTime: number | null;
  sharePct: number;
}

export interface StackingInfo {
  delegationPool: string | null;
  lastCompoundCycle: number;
  isVaultPaused: boolean;
  currentBlockHeight: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface FormField<T = string> {
  value: T;
  error: string | null;
  touched: boolean;
}

export interface ExchangeRate {
  rate: number;
  formattedRate: string;
}

export interface CooldownInfo {
  blocksRemaining: number;
  isExpired: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  txId?: string;
  duration?: number;
}

/** Parsed response from get-vault-status read-only call */
export interface VaultStatusResponse {
  'total-deposits': { value: string };
  'total-rewards': { value: string };
  'stx-balance': { value: string };
  'deposit-count': { value: string };
  'withdraw-count': { value: string };
  paused: { value: boolean };
  'current-block': { value: string };
}

/** Parsed response from get-user-share read-only call */
export interface UserShareResponse {
  deposited: { value: string };
  'flow-balance': { value: string };
  'share-pct': { value: string };
}

/** Raw response shape from Hiro API for transaction status */
export interface HiroTxResponse {
  tx_id: string;
  tx_status: 'success' | 'abort_by_response' | 'abort_by_post_condition' | 'pending';
  tx_type: string;
  sender_address: string;
  block_height?: number;
  burn_block_time?: number;
}

/** Raw response shape from Hiro API for address balances */
export interface HiroBalanceResponse {
  stx: {
    balance: string;
    total_sent: string;
    total_received: string;
  };
  fungible_tokens: Record<string, { balance: string }>;
  non_fungible_tokens: Record<string, { count: number }>;
}
