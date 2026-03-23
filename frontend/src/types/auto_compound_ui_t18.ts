export interface Auto_compound_uiEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Auto_compound_uiQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Auto_compound_uiAction18 = { type: 'create'; payload: Omit<Auto_compound_uiEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Auto_compound_uiEntity18> } | { type: 'delete'; id: string };
