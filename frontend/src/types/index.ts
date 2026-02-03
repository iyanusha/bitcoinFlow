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

export interface Seo_meta_tagsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Seo_meta_tagsItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Env_validationConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Env_validationItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Vault_status_hooksConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Vault_status_hooksItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Wallet_uxConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Wallet_uxItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Tx_trackingConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Tx_trackingItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Post_conditionsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Post_conditionsItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Toast_systemConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Toast_systemItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Modal_dialogsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Modal_dialogsItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Header_footerConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Header_footerItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Contract_tests_v2Config { enabled: boolean; interval: number; maxItems: number; }
export interface Contract_tests_v2Item { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Deposit_confirmConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Deposit_confirmItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Network_statusConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Network_statusItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Stats_refreshConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Stats_refreshItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Dashboard_layoutConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Dashboard_layoutItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Dark_mode_varsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Dark_mode_varsItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Dark_mode_toggleConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Dark_mode_toggleItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Dark_mode_applyConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Dark_mode_applyItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Vault_metricsConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Vault_metricsItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Stacking_infoConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Stacking_infoItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Rewards_calcConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Rewards_calcItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }

export interface Flow_token_infoConfig { enabled: boolean; interval: number; maxItems: number; }
export interface Flow_token_infoItem { id: string; label: string; value: number; status: 'active' | 'inactive'; }
