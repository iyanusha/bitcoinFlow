export interface Batch_operationsEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Batch_operationsQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Batch_operationsAction68 = { type: 'create'; payload: Omit<Batch_operationsEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Batch_operationsEntity68> } | { type: 'delete'; id: string };
