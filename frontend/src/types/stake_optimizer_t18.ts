export interface Stake_optimizerEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stake_optimizerQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stake_optimizerAction18 = { type: 'create'; payload: Omit<Stake_optimizerEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Stake_optimizerEntity18> } | { type: 'delete'; id: string };
