export interface Portfolio_viewEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Portfolio_viewQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Portfolio_viewAction68 = { type: 'create'; payload: Omit<Portfolio_viewEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Portfolio_viewEntity68> } | { type: 'delete'; id: string };
