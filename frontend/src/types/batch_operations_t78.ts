export interface Batch_operationsEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Batch_operationsQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Batch_operationsAction78 = { type: 'create'; payload: Omit<Batch_operationsEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Batch_operationsEntity78> } | { type: 'delete'; id: string };
