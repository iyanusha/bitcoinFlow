export interface Stake_optimizerEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stake_optimizerQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stake_optimizerAction48 = { type: 'create'; payload: Omit<Stake_optimizerEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Stake_optimizerEntity48> } | { type: 'delete'; id: string };
