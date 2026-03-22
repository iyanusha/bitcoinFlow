export interface Deposit_historyEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Deposit_historyQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Deposit_historyAction48 = { type: 'create'; payload: Omit<Deposit_historyEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Deposit_historyEntity48> } | { type: 'delete'; id: string };
