export interface Deposit_historyEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Deposit_historyQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Deposit_historyAction68 = { type: 'create'; payload: Omit<Deposit_historyEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Deposit_historyEntity68> } | { type: 'delete'; id: string };
