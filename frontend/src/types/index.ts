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
