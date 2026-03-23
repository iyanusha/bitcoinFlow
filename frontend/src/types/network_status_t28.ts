export interface Network_statusEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_statusQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_statusAction28 = { type: 'create'; payload: Omit<Network_statusEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_statusEntity28> } | { type: 'delete'; id: string };
