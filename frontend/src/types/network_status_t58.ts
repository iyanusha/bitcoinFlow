export interface Network_statusEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_statusQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_statusAction58 = { type: 'create'; payload: Omit<Network_statusEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_statusEntity58> } | { type: 'delete'; id: string };
