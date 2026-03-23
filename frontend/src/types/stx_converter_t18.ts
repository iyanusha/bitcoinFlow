export interface Stx_converterEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stx_converterQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stx_converterAction18 = { type: 'create'; payload: Omit<Stx_converterEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Stx_converterEntity18> } | { type: 'delete'; id: string };
