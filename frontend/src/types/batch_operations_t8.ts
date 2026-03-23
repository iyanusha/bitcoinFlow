export interface Batch_operationsEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Batch_operationsQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Batch_operationsAction8 = { type: 'create'; payload: Omit<Batch_operationsEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Batch_operationsEntity8> } | { type: 'delete'; id: string };
