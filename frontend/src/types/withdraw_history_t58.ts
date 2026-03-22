export interface Withdraw_historyEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Withdraw_historyQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Withdraw_historyAction58 = { type: 'create'; payload: Omit<Withdraw_historyEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Withdraw_historyEntity58> } | { type: 'delete'; id: string };
