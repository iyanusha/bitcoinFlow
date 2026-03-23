export interface Network_statusEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_statusQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_statusAction48 = { type: 'create'; payload: Omit<Network_statusEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_statusEntity48> } | { type: 'delete'; id: string };
