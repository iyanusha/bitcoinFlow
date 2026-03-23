export interface Fee_estimatorEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Fee_estimatorQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Fee_estimatorAction28 = { type: 'create'; payload: Omit<Fee_estimatorEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Fee_estimatorEntity28> } | { type: 'delete'; id: string };
