export interface Portfolio_viewEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Portfolio_viewQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Portfolio_viewAction48 = { type: 'create'; payload: Omit<Portfolio_viewEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Portfolio_viewEntity48> } | { type: 'delete'; id: string };
