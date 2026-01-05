export interface VaultStats {
  totalDeposits: number;
  totalRewards: number;
  userBalance: number;
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
  | 'VAULT_PAUSED';

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
}

export interface StackingInfo {
  delegationPool: string | null;
  lastCompoundCycle: number;
  isVaultPaused: boolean;
  currentBlockHeight: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface FormField<T = string> {
  value: T;
  error: string | null;
  touched: boolean;
}

export interface Responsive_designConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Responsive_designItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }
