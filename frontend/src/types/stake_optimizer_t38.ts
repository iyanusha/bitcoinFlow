export interface Stake_optimizerEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stake_optimizerQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stake_optimizerAction38 = { type: 'create'; payload: Omit<Stake_optimizerEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Stake_optimizerEntity38> } | { type: 'delete'; id: string };
