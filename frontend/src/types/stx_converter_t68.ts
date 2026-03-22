export interface Stx_converterEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Stx_converterQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Stx_converterAction68 = { type: 'create'; payload: Omit<Stx_converterEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Stx_converterEntity68> } | { type: 'delete'; id: string };
