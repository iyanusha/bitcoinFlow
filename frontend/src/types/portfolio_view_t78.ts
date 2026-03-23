export interface Portfolio_viewEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Portfolio_viewQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Portfolio_viewAction78 = { type: 'create'; payload: Omit<Portfolio_viewEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Portfolio_viewEntity78> } | { type: 'delete'; id: string };
