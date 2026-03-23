export interface Emergency_withdrawEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Emergency_withdrawQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Emergency_withdrawAction68 = { type: 'create'; payload: Omit<Emergency_withdrawEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Emergency_withdrawEntity68> } | { type: 'delete'; id: string };
