export interface Network_statusEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Network_statusQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Network_statusAction68 = { type: 'create'; payload: Omit<Network_statusEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Network_statusEntity68> } | { type: 'delete'; id: string };
