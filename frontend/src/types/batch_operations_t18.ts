export interface Batch_operationsEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Batch_operationsQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Batch_operationsAction18 = { type: 'create'; payload: Omit<Batch_operationsEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Batch_operationsEntity18> } | { type: 'delete'; id: string };
