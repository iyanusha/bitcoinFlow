export interface Network_statusEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_statusQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_statusAction8 = { type: 'create'; payload: Omit<Network_statusEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_statusEntity8> } | { type: 'delete'; id: string };
