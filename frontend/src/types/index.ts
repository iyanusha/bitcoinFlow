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
