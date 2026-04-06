export type TxType = 'deposit' | 'withdrawal' | 'lock' | 'unlock' | 'reward';

export interface Transaction {
  id: string;
  type: TxType;
  amount: number;
  fee: number;
  status: 'confirmed' | 'pending' | 'failed';
  blockHeight: number;
  timestamp: number;
  txHash: string;
  sender: string;
  recipient?: string;
}

export interface TxFilter {
  type?: TxType;
  status?: 'confirmed' | 'pending' | 'failed';
  dateFrom?: number;
  dateTo?: number;
}
