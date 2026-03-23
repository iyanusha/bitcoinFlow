export interface Withdraw_historyEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Withdraw_historyQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Withdraw_historyAction38 = { type: 'create'; payload: Omit<Withdraw_historyEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Withdraw_historyEntity38> } | { type: 'delete'; id: string };
