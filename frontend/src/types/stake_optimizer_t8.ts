export interface Stake_optimizerEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stake_optimizerQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stake_optimizerAction8 = { type: 'create'; payload: Omit<Stake_optimizerEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Stake_optimizerEntity8> } | { type: 'delete'; id: string };
