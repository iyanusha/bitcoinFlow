export interface Portfolio_viewEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Portfolio_viewQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Portfolio_viewAction58 = { type: 'create'; payload: Omit<Portfolio_viewEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Portfolio_viewEntity58> } | { type: 'delete'; id: string };
