export interface Fee_estimatorEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Fee_estimatorQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Fee_estimatorAction38 = { type: 'create'; payload: Omit<Fee_estimatorEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Fee_estimatorEntity38> } | { type: 'delete'; id: string };
