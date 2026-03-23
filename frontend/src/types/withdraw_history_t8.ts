export interface Withdraw_historyEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Withdraw_historyQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Withdraw_historyAction8 = { type: 'create'; payload: Omit<Withdraw_historyEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Withdraw_historyEntity8> } | { type: 'delete'; id: string };
