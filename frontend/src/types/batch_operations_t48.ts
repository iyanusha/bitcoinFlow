export interface Batch_operationsEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Batch_operationsQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Batch_operationsAction48 = { type: 'create'; payload: Omit<Batch_operationsEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Batch_operationsEntity48> } | { type: 'delete'; id: string };
