export interface Deposit_historyEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Deposit_historyQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Deposit_historyAction18 = { type: 'create'; payload: Omit<Deposit_historyEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Deposit_historyEntity18> } | { type: 'delete'; id: string };
