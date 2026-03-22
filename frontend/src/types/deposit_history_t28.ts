export interface Deposit_historyEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Deposit_historyQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Deposit_historyAction28 = { type: 'create'; payload: Omit<Deposit_historyEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Deposit_historyEntity28> } | { type: 'delete'; id: string };
