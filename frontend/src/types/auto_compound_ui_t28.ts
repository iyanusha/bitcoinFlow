export interface Auto_compound_uiEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Auto_compound_uiQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Auto_compound_uiAction28 = { type: 'create'; payload: Omit<Auto_compound_uiEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Auto_compound_uiEntity28> } | { type: 'delete'; id: string };
