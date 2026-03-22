export interface Stx_converterEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stx_converterQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stx_converterAction38 = { type: 'create'; payload: Omit<Stx_converterEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Stx_converterEntity38> } | { type: 'delete'; id: string };
