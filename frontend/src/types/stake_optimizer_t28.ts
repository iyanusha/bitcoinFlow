export interface Stake_optimizerEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stake_optimizerQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stake_optimizerAction28 = { type: 'create'; payload: Omit<Stake_optimizerEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Stake_optimizerEntity28> } | { type: 'delete'; id: string };
