export interface Fee_estimatorEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Fee_estimatorQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Fee_estimatorAction48 = { type: 'create'; payload: Omit<Fee_estimatorEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Fee_estimatorEntity48> } | { type: 'delete'; id: string };
