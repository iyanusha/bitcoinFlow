export interface Portfolio_viewEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Portfolio_viewQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Portfolio_viewAction28 = { type: 'create'; payload: Omit<Portfolio_viewEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Portfolio_viewEntity28> } | { type: 'delete'; id: string };
