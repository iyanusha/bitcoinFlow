export interface Portfolio_viewEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Portfolio_viewQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Portfolio_viewAction8 = { type: 'create'; payload: Omit<Portfolio_viewEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Portfolio_viewEntity8> } | { type: 'delete'; id: string };
