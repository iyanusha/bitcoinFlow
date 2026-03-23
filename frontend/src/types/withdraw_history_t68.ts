export interface Withdraw_historyEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Withdraw_historyQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Withdraw_historyAction68 = { type: 'create'; payload: Omit<Withdraw_historyEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Withdraw_historyEntity68> } | { type: 'delete'; id: string };
