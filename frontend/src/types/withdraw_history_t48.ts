export interface Withdraw_historyEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Withdraw_historyQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Withdraw_historyAction48 = { type: 'create'; payload: Omit<Withdraw_historyEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Withdraw_historyEntity48> } | { type: 'delete'; id: string };
