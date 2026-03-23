export interface Stx_converterEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stx_converterQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stx_converterAction8 = { type: 'create'; payload: Omit<Stx_converterEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Stx_converterEntity8> } | { type: 'delete'; id: string };
