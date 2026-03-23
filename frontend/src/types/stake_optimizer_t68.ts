export interface Stake_optimizerEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stake_optimizerQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stake_optimizerAction68 = { type: 'create'; payload: Omit<Stake_optimizerEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Stake_optimizerEntity68> } | { type: 'delete'; id: string };
