export interface Withdraw_historyEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Withdraw_historyQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Withdraw_historyAction78 = { type: 'create'; payload: Omit<Withdraw_historyEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Withdraw_historyEntity78> } | { type: 'delete'; id: string };
