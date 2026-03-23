export interface Auto_compound_uiEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Auto_compound_uiQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Auto_compound_uiAction8 = { type: 'create'; payload: Omit<Auto_compound_uiEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Auto_compound_uiEntity8> } | { type: 'delete'; id: string };
