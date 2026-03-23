export interface Stake_optimizerEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stake_optimizerQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stake_optimizerAction78 = { type: 'create'; payload: Omit<Stake_optimizerEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Stake_optimizerEntity78> } | { type: 'delete'; id: string };
