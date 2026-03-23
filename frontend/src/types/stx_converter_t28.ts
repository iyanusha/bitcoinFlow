export interface Stx_converterEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stx_converterQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stx_converterAction28 = { type: 'create'; payload: Omit<Stx_converterEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Stx_converterEntity28> } | { type: 'delete'; id: string };
