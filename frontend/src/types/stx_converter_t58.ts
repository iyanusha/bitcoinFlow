export interface Stx_converterEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stx_converterQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stx_converterAction58 = { type: 'create'; payload: Omit<Stx_converterEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Stx_converterEntity58> } | { type: 'delete'; id: string };
