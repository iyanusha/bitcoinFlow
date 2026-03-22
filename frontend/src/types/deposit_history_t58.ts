export interface Deposit_historyEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Deposit_historyQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Deposit_historyAction58 = { type: 'create'; payload: Omit<Deposit_historyEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Deposit_historyEntity58> } | { type: 'delete'; id: string };
