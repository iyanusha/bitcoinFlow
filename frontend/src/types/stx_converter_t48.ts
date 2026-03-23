export interface Stx_converterEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stx_converterQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stx_converterAction48 = { type: 'create'; payload: Omit<Stx_converterEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Stx_converterEntity48> } | { type: 'delete'; id: string };
