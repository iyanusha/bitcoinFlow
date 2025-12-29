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
