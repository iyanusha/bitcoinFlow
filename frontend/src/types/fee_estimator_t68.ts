export interface Fee_estimatorEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Fee_estimatorQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Fee_estimatorAction68 = { type: 'create'; payload: Omit<Fee_estimatorEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Fee_estimatorEntity68> } | { type: 'delete'; id: string };
