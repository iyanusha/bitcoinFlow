export interface Stx_converterEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stx_converterQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stx_converterAction78 = { type: 'create'; payload: Omit<Stx_converterEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Stx_converterEntity78> } | { type: 'delete'; id: string };
