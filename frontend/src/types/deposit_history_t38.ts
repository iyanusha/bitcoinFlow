export interface Deposit_historyEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Deposit_historyQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Deposit_historyAction38 = { type: 'create'; payload: Omit<Deposit_historyEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Deposit_historyEntity38> } | { type: 'delete'; id: string };
