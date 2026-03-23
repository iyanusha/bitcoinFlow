export interface Stake_optimizerEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stake_optimizerQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stake_optimizerAction58 = { type: 'create'; payload: Omit<Stake_optimizerEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Stake_optimizerEntity58> } | { type: 'delete'; id: string };
