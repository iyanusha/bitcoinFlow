export interface Portfolio_viewEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Portfolio_viewQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Portfolio_viewAction38 = { type: 'create'; payload: Omit<Portfolio_viewEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Portfolio_viewEntity38> } | { type: 'delete'; id: string };
