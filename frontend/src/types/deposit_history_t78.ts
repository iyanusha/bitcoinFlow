export interface Deposit_historyEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Deposit_historyQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Deposit_historyAction78 = { type: 'create'; payload: Omit<Deposit_historyEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Deposit_historyEntity78> } | { type: 'delete'; id: string };
