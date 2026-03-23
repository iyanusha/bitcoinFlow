export interface Batch_operationsEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Batch_operationsQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Batch_operationsAction28 = { type: 'create'; payload: Omit<Batch_operationsEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Batch_operationsEntity28> } | { type: 'delete'; id: string };
