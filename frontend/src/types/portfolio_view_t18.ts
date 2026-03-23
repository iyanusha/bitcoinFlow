export interface Portfolio_viewEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Portfolio_viewQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Portfolio_viewAction18 = { type: 'create'; payload: Omit<Portfolio_viewEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Portfolio_viewEntity18> } | { type: 'delete'; id: string };
