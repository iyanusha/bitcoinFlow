export interface Batch_operationsEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Batch_operationsQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Batch_operationsAction58 = { type: 'create'; payload: Omit<Batch_operationsEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Batch_operationsEntity58> } | { type: 'delete'; id: string };
