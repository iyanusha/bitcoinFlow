export interface Batch_operationsEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Batch_operationsQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Batch_operationsAction38 = { type: 'create'; payload: Omit<Batch_operationsEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Batch_operationsEntity38> } | { type: 'delete'; id: string };
