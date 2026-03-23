export interface Network_statusEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_statusQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_statusAction38 = { type: 'create'; payload: Omit<Network_statusEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_statusEntity38> } | { type: 'delete'; id: string };
