export interface Withdraw_historyEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Withdraw_historyQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Withdraw_historyAction18 = { type: 'create'; payload: Omit<Withdraw_historyEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Withdraw_historyEntity18> } | { type: 'delete'; id: string };
