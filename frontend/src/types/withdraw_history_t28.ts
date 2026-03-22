export interface Withdraw_historyEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Withdraw_historyQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Withdraw_historyAction28 = { type: 'create'; payload: Omit<Withdraw_historyEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Withdraw_historyEntity28> } | { type: 'delete'; id: string };
